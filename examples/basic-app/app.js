// Fetch the embedded conversation script.
import { TextUsEmbeddedConversation } from "./embedded.dev.js";

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
document.querySelector("#update-contact").addEventListener("click", () => {
  textUsEmbeddedConversation.setContact({
    phoneNumber: "444-444-4444",
  });
});
