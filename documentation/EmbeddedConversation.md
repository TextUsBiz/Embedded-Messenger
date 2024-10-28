# TextUs Embedded Conversation

## Overview

This document explains how to embed a TextUs Conversation in your application.

## Whitelisting your website

In order to load Embedded Conversations on your platform, your website must be whitelisted by the TextUs team. Please reach out to your customer support representative to verify that you have been whitelisted.

## Embed using the TextUsEmbeddedConversation() class

### Create a container element

To render the generated conversation iframe, you need to create a container element. Give the container element a unique `id`.

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
    TextUsEmbeddedConversation, 
    getConversationUrl 
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
      TextUsEmbeddedConversation, 
      getConversationUrl 
    } = TextUsModule;

    // Your code here.
  });

  ...
</script>
```

### Render the iframe

Then, create an instance of the TextUsEmbeddedConversation() class. Ensure to pass in the `id` used by your container element. Afterwards, you can render the instance with the `render()` method.

The iframe will render by default. If you want to hide it until prompted, set `initiallyHidden` to true in the options prop. In addition to `.render()`, you can use `.hide()`, `.show()` or `.toggle()` to control whether the iframe is visible.
```html
<script defer>
  ...

  // Generate the embedded conversation iframe.
  const textUsEmbeddedConversation = new TextUsEmbeddedConversation('iframe-here', {
    channelPartner: 'CompanyName',
    height: '800px',
    initiallyHidden: true,
    width: '800px',
    contact: {
      phoneNumber: '555-555-5555',
    }
  });

  // Render the iframe.
  textUsEmbeddedConversation.render();

  // Hides the iframe.
  textUsEmbeddedConversation.hide();

  // Unhides the iframe.
  textUsEmbeddedConversation.show();

  // Toggles the iframe.
  textUsEmbeddedConversation.toggle();

  ...
</script>
```

To update the contact details and re-render the iframe, use the `setContact()` method.

```js
textUsEmbeddedConversation.setContact({ 
  phoneNumber: '444-444-4444',
});
```

## Embed using the global getConversationUrl() method

If you prefer, you can use the `getConversationUrl()` global method to return the conversation iframe URL.

```js
const conversationIframeUrl = getConversationUrl('555-555-5555', 'CompanyName');
```

Then, use the returned URL as your iframe `src`.

```html
<html>
  <body>

    <iframe   
      src={conversationIframeUrl}   
      width={800}   
      height={400}  
    />
  
  </body>
 </html>
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
      import { TextUsEmbeddedConversation } from "https://static.textus.com/715863c/1/embedded.min.js";

      // Generate the embedded conversation iframe.
      const textUsEmbeddedConversation = new TextUsEmbeddedConversation(
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
      textUsEmbeddedConversation.render();

      // Update contact phone number.
      document
        .querySelector("#update-contact")
        .addEventListener("click", () => {
          textUsEmbeddedConversation.setContact({
            phoneNumber: "444-444-4444",
          });
        });
    </script>
  </head>
  <body>
    <div id="iframe-here">
      <!-- The generated iframe will be placed here -->
    </div>

    <button id="update-contact">Update contact</button>
  </body>
</html>
```
