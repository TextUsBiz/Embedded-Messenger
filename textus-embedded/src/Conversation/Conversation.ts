import { TextUsEmbeddedConversationOptionProps } from "../models/TextUsEmbeddedConversationOptionProps";

// Replaced during the build process.
const textUsUrl = process.env.TEXTUS_URL;

/**
 * Method to build the iframe URL to display an embedded conversation.
 * @param phoneNumber Phone number of contact.
 * @returns URL for iframe.
 * @example 
 * <iframe src="getConversationUrl(number)" />
 */
export function getConversationUrl(phoneNumber: string, channelPartner: string): string {
  return `${textUsUrl}/c/embedded?phoneNumber=${encodeURIComponent(phoneNumber)}&channelPartner=${channelPartner}`;
}

/**
 * Class to build an iframe with URL to display an embedded conversation.
 * @param conatinerId Id of container.
 * @param props Props for embedded conversation.
 * @returns Embedded Conversation iframe (placed inside of container).
 * @example 
 * <div id="iframe-here">
 *  <!-- The generated iframe will be placed here -->
 * </div>
 * 
 * const embeddedConversation = new TextUsEmbeddedConversation('iframe-here', {
 *    channelPartner: 'CompanyName',
 *    height: '800px',
 *    width: '800px',
 *     contact: {
 *       phoneNumber: '555-555-5555',
 *     }
 *   });
 */
export class TextUsEmbeddedConversation {
  iframe: HTMLIFrameElement | null = null;

  constructor(
    public containerId: string,
    public props: TextUsEmbeddedConversationOptionProps,
  ) { }

  render() {
    try {
      const { channelPartner, height, width, contact } = this.props;

      if (!channelPartner) {
        throw new Error('No channel partner provided.');
      }

      if (!contact) {
        throw new Error('No contact provided.');
      }

      // Create an iframe element.
      this.iframe = document.createElement("iframe");

      // Reference to container.
      const container = document.querySelector(`#${this.containerId}`);

      if (!container) {
        throw new Error(`Could not find container with id: ${this.containerId}`);
      }

      // Set iframe attributes. 
      this.iframe.src = getConversationUrl(contact.phoneNumber, channelPartner);
      this.iframe.width = width || String(container.clientWidth) + 'px';
      this.iframe.height = height || String(container.clientHeight) + 'px';

      // Clear container.
      container.innerHTML = '';

      // Append iframe to container.
      container.appendChild(this.iframe);
    } catch (err) {
      console.error(err);
    }
  }

  setContact(contact: TextUsEmbeddedConversationOptionProps['contact']) {
    this.props.contact = contact;
    this.iframe!.src = getConversationUrl(contact.phoneNumber, this.props.channelPartner);
  }
}