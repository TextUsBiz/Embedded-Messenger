# TextUs Embedded Conversation

## Overview

This document explains how to embed a TextUs Conversation in your application.

## Embed using the TextUsEmbeddedConversation class

The TextUsEmbeddedConversation class takes a target container id along with a number of parameters and generates an iframe that renders a conversation.

To get started, define a container element that will hold the generated iframe. Give the container element an `id`.

```html
<html>
  <body>

    <div id="iframe-here">
      <!-- The generated iframe will be placed here -->
    </div>

  </body>
</html>
```

Then, create an instance of the TextUsEmbeddedConversation class. Ensure to pass in the `id` used by the container element.

```js
const textUsEmbeddedConversation = new TextUsEmbeddedConversation('iframe-here', {
  channelPartner: 'CompanyName',
  height: '800px',
  width: '800px',
  contact: {
    phoneNumber: '555-555-5555',
  }
});
```

Finally, call the `render()` method on the conversation instance to render the iframe.

```js
textUsEmbeddedConversation.render();
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

    <iframe src={conversationIframeUrl} width={800} height={400} />
  
  </body>
 </html>
```