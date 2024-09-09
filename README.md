# Embedded Messenger

This codebase houses the code for embedded conversation and embedded messenger.

## Getting Started

Install depedencies and set up a link to the textus-embedded package.

```shell
npm run init
```

Edit Tesseract to allow embedding in iframes from port 8080.

```text
// (Tesseract) config/initializers/zzz_content_security_policy.rb

if !EnvConfig.production?
  frame_ancestors += [
    "http://localhost:5000/", # Sideshow testing playground
    "http://localhost:8080/" # Embedded Messenger Test - DO NOT MERGE
  ]
end
```

Run Tesseract.

```shell
./bin/start
```

Start dev server.

```shell
npm run sample
```

> View on localhost:8080

## Making changes to embedded snippet

Compile typescript changes.

```shell
npm run build
```

Or, compile and watch for typescript changes.

```shell
npm run build:watch
```

Make changes to files in `/src` directory.
On change, the `/dist` folder will be updated with generated javascript and source maps.

## Project Structure

```text
├── textus-embedded/       // Where the TextUs Embedded snippet lives.
├── examples/              // The poc application that uses the embedded snippet.
```
