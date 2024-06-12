# POC Embedded Messenger

This codebase houses the proof-of-concept code for embedded conversation and messenger.

## Getting Started

Install depedencies.

```shell
cd sample-app 
npm i
```

Start dev server.

```shell
cd sample-app
npm run dev
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

## Project Structure

```text
├── textus-embedded/       // Where the TextUs Embedded snippet lives.
├── sample-app/            // The poc application that uses the embedded snippet.
```

## Making changes to embedded snippet

Watch for typescript changes.

```shell
cd textus-embedded
npm run build:watch
```

Make changes to files in `/src` directory.
On change, the `/dist` folder will be updated with generated javascript and source maps.
