# ChangeLog

## 1.0.0 - Embedded Conversation Rewrite

- Now uses the existing route in Tesseract for initial load of iframes. (`/c?phoneNumber={ PHONE_NUMBER }`).
- Recreated sample app to use NextJS. 

https://www.loom.com/share/43140c573fcf4cddbb1b05c8968f1ea0?sid=b363f463-1756-4cd4-86c8-3f2c7e27c4bd

## Wednesday, June 12, 2024 - Embedded Conversation (Basic functionality)

- Call endpoint using account id and phone number to get conversation id.
- Uses conversation id to generate iframe src.
- Iframe src can be used to display Conversation view.

## Monday, March 25, 2024 - Initial commit

https://www.loom.com/share/9e59c5d939b24fd8a54d3fc457f8fa77?sid=27bd99ba-4fd2-40ab-8a4a-6d18af3ea680

- Initial commit.
- Allows embedding Tesseract into an iframe via a snippet (textus-embed.js).
