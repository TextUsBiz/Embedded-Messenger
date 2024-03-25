# POC Embedded Messenger

This codebase houses the proof-of-concept code for embedded messenger.

## Getting Started

Install depedencies.

```shell
npm i
```

Serve.

```shell
npm run serve
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

## Generate and view docs

```shell
npm run docs
```
