import { EmbeddedConversationOptionProps } from "../models/EmbeddedConversationOptionProps";

/**
 * Method to build the iframe URL to display an embedded conversation.
 * @param phoneNumber Phone number of contact.
 * @returns URL for iframe.
 * @example 
 * <iframe src="getConversationUrl(number)" />
 */
export function getConversationUrl(phoneNumber: string): string {
  return `http://localhost:3000/c?phoneNumber=${encodeURIComponent(phoneNumber)}`;
}

/**
 * Class to build an iframe with URL to display an embedded conversation.
 * @param docId Id of container.
 * @returns Embedded Conversation iframe (placed inside of container).
 * @example 
 * <div id="iframe-here">
 *  <!-- The generated iframe will be placed here -->
 * </div>
 * 
 * const embeddedConversation = new EmbeddedConversation('iframe-here', {
 *    height: 800,
 *     width: 800,
 *     contact: {
 *       phoneNumber: '555-555-5555'
 *     }
 *   });
 */
export class EmbeddedConversation {
  constructor(docId: string, props: EmbeddedConversationOptionProps) {
    try {
      const { height, width, contact } = props;

      // Create an iframe element.
      const iframe = document.createElement("iframe");

      // Reference to container.
      const container = document.querySelector(`#${docId}`);

      if (!container) {
        throw new Error(`Could not find container with id: ${docId}`);
      }

      // Set iframe attributes.
      iframe.src = getConversationUrl(contact.phoneNumber);
      iframe.width = String(width) ?? container.clientWidth;
      iframe.height = String(height) ?? container.clientHeight;

      // Clear container.
      container.innerHTML = '';

      // Append iframe to container.
      container.appendChild(iframe);
    } catch (err) {
      console.error(err);
    }
  }
}