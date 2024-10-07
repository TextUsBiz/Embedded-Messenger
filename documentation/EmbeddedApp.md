# TextUs Embedded App

## Overview

This document explains how to embed the TextUs app within your application.

## Whitelisting your website

In order to load TextUs on your platform, your website must be whitelisted by the TextUs team. Please reach out to your customer support representative to verify that you have been whitelisted.

## Embed using the TextUsEmbeddedApp() class

### Create a container element

To render the generated iframe, you need to create a container element. Give the container element a unique `id`.

```html
<html>
  <body>

    <div id="iframe-here">
      <!-- The generated iframe will be placed here -->
    </div>

  </body>
</html>
```

### Import the code

You can import the Embedded codebase from our CDN provider. Create a `<script>` that is of `type="module"`. Using  `import`, you can destructure the classes and methods you want to use in your code.

```html
<script defer type="module">
  ...

  import { 
    TextUsEmbeddedApp, 
  } from 'https://static.textus.com/715863c/1/embedded.min.js';

  // Your code here.
  ...
</script>
```

You may also use the `import()` method.

```html
<script defer type="module">
  ...

  import('https://static.textus.com/715863c/1/embedded.min.js').then((TextUsModule) => {
    const { 
      TextUsEmbeddedApp, 
    } = TextUsModule;

    // Your code here.
  });

  ...
</script>
```

### Render the iframe

Then, create an instance of the TextUsEmbeddedApp() class. Ensure to pass in the `id` used by your container element. Afterwards, you can render the instance with the `render()` method.

```html
<script defer>
  ...

  // Generate the embedded conversation iframe.
  const textUsEmbeddedApp = new TextUsEmbeddedApp('iframe-here', {
    channelPartner: 'CompanyName',
    height: '800px',
    width: '800px',
    contact: {
      phoneNumber: '555-555-5555',
    }
  });

  // Render the iframe.
  textUsEmbeddedApp.render();

  ...
</script>
```

To update the contact details and re-render the iframe, use the `setContact()` method.

```js
textUsEmbeddedApp.setContact({ 
  phoneNumber: '444-444-4444',
});
```

## Basic Example

Here's a fully working example.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Basic sample app</title>
    <script defer type="module">
      // Fetch the embedded conversation script.
      import { TextUsEmbeddedApp } from "https://static.textus.com/715863c/1/embedded.min.js";

      // Generate the embedded conversation iframe.
      const textUsEmbeddedApp = new TextUsEmbeddedApp(
        "iframe-here",
        {
          channelPartner: "CompanyName",
          height: "800px",
          width: "800px",
          contact: {
            phoneNumber: "555-555-5555",
          },
        }
      );

      // Render the iframe.
      textUsEmbeddedApp.render();

      // Grab a list of contacts from your app. Mocked here for example.
      const contacts = [
        {
          phone_numbers: ['(111)-111-1111'],
          first_name: 'John',
          last_name: 'Doe',
        },
        {
          phone_numbers: ['(222)-222-2222'],
          first_name: 'Jane',
          last_name: 'Doe',
        }
      ];
      
      // Import a list of contacts.
      document
        .querySelector("#import-contacts")
        .addEventListener("click", () => {
          textUsEmbeddedApp.importContacts(contacts);
        });
    </script>
  </head>
  <body>
    <div id="iframe-here">
      <!-- The generated iframe will be placed here -->
    </div>

    <button id="import-contacts">Update contact</button>
  </body>
</html>
```
