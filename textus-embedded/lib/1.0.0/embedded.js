// dist/Conversation/Conversation.js
var textUsUrl = "https://next.textus.com";
function getConversationUrl(phoneNumber, channelPartner) {
  return `${textUsUrl}/c/embedded?phoneNumber=${encodeURIComponent(phoneNumber)}&channelPartner=${channelPartner}`;
}
var TextUsEmbeddedConversation = class {
  containerId;
  props;
  iframe = null;
  /**
   * Class to build an iframe with URL to display an embedded conversation.
   * @param conatinerId Id of container element.
   * @param props Props for embedded conversation.
   * @returns Embedded Conversation iframe (placed inside of container).
   */
  constructor(containerId, props) {
    this.containerId = containerId;
    this.props = props;
  }
  /**
   * Render the embedded conversation iframe.
   */
  render() {
    try {
      const { channelPartner, height, width, contact } = this.props;
      if (!channelPartner) {
        throw new Error("No channel partner provided.");
      }
      if (!contact) {
        throw new Error("No contact provided.");
      }
      this.iframe = document.createElement("iframe");
      const container = document.querySelector(`#${this.containerId}`);
      if (!container) {
        throw new Error(`Could not find container with id: ${this.containerId}`);
      }
      this.iframe.src = getConversationUrl(contact.phoneNumber, channelPartner);
      this.iframe.width = width || String(container.clientWidth) + "px";
      this.iframe.height = height || String(container.clientHeight) + "px";
      container.innerHTML = "";
      container.appendChild(this.iframe);
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * Update the contact for the embedded conversation and re-render the iframe.
   * @param contact Contact to set for the embedded conversation.
   */
  setContact(contact) {
    this.props.contact = contact;
    this.iframe.src = getConversationUrl(contact.phoneNumber, this.props.channelPartner);
  }
};

// dist/Messenger/Messenger.js
function TextUsEmbeddedMessenger() {
  return "Hello from Messenger";
}
export {
  TextUsEmbeddedConversation,
  TextUsEmbeddedMessenger,
  getConversationUrl
};
