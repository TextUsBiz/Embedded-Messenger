# Documentation

This project is a proof-of-concept for a Tesseract embedding snippet.

[See Product Brief here.](https://docs.google.com/document/d/1UsiN4ofpQJX6YDd7cLIqEDxByUSzH-97EIV8N-tdz18/edit#heading=h.ndhwij4ro1rd)

[See Milestone here.](https://docs.google.com/document/d/1MYvtnniBdSfM-RkpUaLGtDvo_n_bddbuX8pq8heqqv0/edit#heading=h.5t4voixysj7v)

## How it _may_ work

- We will develop a snippet library that can be used by the end user.
- The end user would pull our snippet code library via npm, CDN, or other means.
- The end user targets an empty container element on their page via the `id` key.
- The end user instantiates an instance of our TextUsEmbed class and injects it into the container.

## The TextUsEmbed Class

- The TextUsEmbed class will return an iframe.
- The class constructor will take parameters that will be used to generate query params.
- The iframe returned will point to Tesseract and include the generated query params.
- The query params will be used for styling, hiding and displaying certain nav items, and more within Tesseract.

## Motivation

- [Youtube embed snippet architecture](https://developers.google.com/youtube/player_parameters)