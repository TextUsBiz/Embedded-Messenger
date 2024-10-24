# Embedded Messenger

This codebase houses the code for embedded conversation and embedded messenger.

## Making changes to embedded snippet

Make changes to files in `/src` directory.

To compile typescript changes.

```shell
npm run build
```

Or, compile and watch for typescript changes.

```shell
npm run build:watch
```

On change, the `/dist` folder will be updated with generated javascript and source maps.

### Build the library files

The `scripts/build.js` file handles bundling and outputting the library files that will be hosted by our CDN.

Run the following command to build the scripts and update the lib files.

```shell
npm run build
```

### View docs

```shell
npm run docs
```

### Code flow

`src/*` --> `dist/*` --> `lib/*`

```text
src/    # contains the typescript files we create.
dist/   # contains the compiled javascript files. (Compiled with tsc)
lib/    # contains the bundled and minified lib files. (Build with build.js)
```

## Testing

To test changes locally, use the Playground repo. It contains sample apps that use the snippet.

```shell
git clone git@github.com:TextUsBiz/Embedded-Tesseract-Playground.git
```
