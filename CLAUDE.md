# Embedded Messenger

`@textus/embedded` — a small, standalone TypeScript library that generates TextUs
`<iframe>` embeds for customer websites. No backend, no framework, no runtime
dependencies in the shipped output. Source lives in `src/`; everything else is
either build output or integration docs.

Customer-facing usage docs live in `documentation/` (`EmbeddedApp.md`,
`EmbeddedConversation.md`). Keep them in sync when the public API changes.

## General Rules

1. **Think before coding.** Don't assume. State assumptions explicitly. If a request is ambiguous, present the interpretations and ask rather than choosing silently. Surface tradeoffs before committing to an approach.
2. **Simplicity first.** Write the minimum code that solves the problem. No speculative flexibility, unrequested features, or handling for impossible scenarios. No comments on self-explanatory code.
3. **Surgical changes.** Touch only what you must. Don't touch files you haven't been asked to touch. If a change outside the prompt's scope seems necessary, ask first. Match the surrounding code's style; clean up only messes your change created.
4. **Keep the public API stable.** This library is consumed by external customers via a CDN. Renaming or removing an exported class, method, or function is a breaking change — flag it, don't do it silently.
5. **Assume every change is a breaking change until proven otherwise.** Different clients embed this library in different, often invisible ways — different props, different URL params, different show/hide flows, different versions pinned in their CDN URL. You can't see how they call it, so you can't assume a change is safe. Default to the safest path:
   - **Prefer additive changes.** New optional params, new optional props, new methods. Never make a previously-optional argument required, and never change the meaning, order, or default of an existing one.
   - **Preserve existing behavior when inputs are omitted.** A client that upgrades without changing their code must get exactly the behavior they had before.
   - **When something genuinely can't be done additively, stop and flag it.** Lay out who it could break and the migration path (e.g. a new method alongside the old one) rather than changing the existing contract in place.


## How this codebase works

### The public API

Everything customers can use is re-exported from `src/index.ts`:

- `TextUsEmbeddedApp` (`src/App/`) — full embedded app iframe. Methods: `render`, `show`, `hide`, `toggle`, `importContacts`.
- `TextUsEmbeddedConversation` (`src/Conversation/`) — single-conversation iframe. Methods: `render`, `show`, `hide`, `toggle`, `setContact`.
- `getConversationUrl(phoneNumber, channelPartner, firstName?, lastName?)` — builds the conversation iframe URL without a class.
- Prop/model types (`src/models/`): `TextUsEmbeddedAppProps`, `TextUsEmbeddedConversationOptionProps`, `PhoneExtractionContact`.

Each class takes a container element `id` plus a props object, then builds an
`<iframe>`, clears the container, and appends the iframe. Errors are caught and
logged to the console rather than thrown to the host page.

### Coupling to the Tesseract app

This library does not work on its own. The iframe it builds loads **Tesseract**
routes (e.g. `/c/embedded`), and the two sides share a silent contract. Nothing
in this repo will fail if you break it — Tesseract just stops understanding the
iframe — so treat these as load-bearing:

- **URL param casing.** `getConversationUrl` deliberately emits **lowercase**
  `firstname` / `lastname` (`src/Conversation/Conversation.ts`) because that is
  what Tesseract reads. Don't "tidy" these into camelCase, and coordinate with
  Tesseract before renaming or adding params.
- **postMessage shape.** `importContacts` posts
  `{ type: "findNumbersResponse", payload: contacts }` to the iframe
  (`src/App/TextUsEmbeddedApp.ts`). The `type` string and payload shape must
  match what Tesseract listens for — changing either silently breaks contact
  import.

When you touch a URL param or a postMessage, assume it needs a matching change
on the Tesseract side.

### The `textUsUrl` placeholder

Both entry files hardcode `const textUsUrl = "http://localhost:3000"`. This is
intentional — it's the local-dev target. During CI deploy, a `sed` step in
`.circleci/config.yml` (`transform-snippet_connection`) rewrites it to the real
environment URL (staging / production). **Don't "fix" the localhost URL** and
don't reach for it from runtime config; the build owns that substitution.

### Where things live

| Path                | What                                                                    |
| ------------------- | ----------------------------------------------------------------------- |
| `src/`              | The TypeScript source — the only files you edit.                        |
| `src/App/`          | `TextUsEmbeddedApp` class + its barrel export.                          |
| `src/Conversation/` | `TextUsEmbeddedConversation` class and `getConversationUrl`.            |
| `src/models/`       | Shared prop/contact interfaces.                                         |
| `dist/`             | `tsc` output (JS + `.d.ts` + source maps). **Generated — gitignored.**  |
| `lib/<version>/`    | esbuild bundle served by the CDN. **Generated — gitignored.**           |
| `docs/`             | TypeDoc HTML output. **Generated — gitignored.**                        |
| `documentation/`    | Hand-written customer integration guides. Edit these.                   |
| `scripts/build.js`  | esbuild bundle + minify step (`dist/` → `lib/<version>/embedded.min.js`).|
| `.circleci/`        | CDN deploy pipeline (S3), with dev → staging → prod approval gates.      |

## Build & verify

```shell
npm run build        # clean, tsc (src → dist), typedoc, then bundle (dist → lib)
npm run build:watch  # tsc in watch mode while developing
npm run docs         # open the generated TypeDoc HTML
```

There is currently **no automated test suite** in this repo. Verify changes by:

1. Running `npm run build` and confirming it completes without TypeScript errors.
2. Testing against the Playground repo (see `README.md`), which has sample apps
   that load the snippet in a real browser.

If you add tests, document how to run them here.

## Versioning & the CDN

The version in `package.json` drives the output path: `npm run build` writes the
bundle to `lib/<version>/embedded.min.js`, and clients embed a **version-pinned**
CDN URL. That pin is the safety net behind the backward-compatibility rule — a
client on an old version keeps getting the old code untouched.

Because of that:

- **A truly breaking change means a version bump, not an in-place edit.** Bump
  the version in `package.json` so the change ships under a new `lib/<version>/`
  path; leave the old path serving the old behavior for clients still pinned to
  it.
- **Additive, backward-compatible changes can stay on the current version** —
  existing clients get the improvement, no migration needed.
- Don't repoint or overwrite an existing published version's artifact.

## What not to do

1. **Don't add runtime dependencies casually** — this ships as a browser bundle. New deps inflate the file customers download.
2. **Don't let iframe errors escape to the host page** — the classes deliberately catch and log; keep that contract.
