import { TextUsEmbeddedConversationOptionProps } from "../models";

// Replaced during the build process.
const textUsUrl = "http://localhost:3000";

/**
 * Method to build the iframe URL to display an embedded conversation.
 * @param phoneNumber Phone number of contact.
 * @param channelPartner Channel partner name.
 * @param firstName Optional first name of contact.
 * @param lastName Optional last name of contact.
 * @returns URL for iframe.
 */
export function getConversationUrl(
  phoneNumber: string,
  channelPartner: string,
  firstName?: string,
  lastName?: string,
): string {
  const params = new URLSearchParams({ phoneNumber, channelPartner });
  // Emit lowercase param names — the tesseract app reads `firstname`/`lastname`.
  if (firstName) params.set("firstname", firstName);
  if (lastName) params.set("lastname", lastName);
  return `${textUsUrl}/c/embedded?${params.toString()}`;
}

export class TextUsEmbeddedConversation {
  private iframe: HTMLIFrameElement | null = null;

  /**
   * Class to build an iframe with URL to display an embedded conversation.
   * @param containerId Id of container element.
   * @param props Props for embedded conversation.
   * @returns Embedded Conversation iframe (placed inside of container).
   */
  constructor(
    public containerId: string,
    public props: TextUsEmbeddedConversationOptionProps,
  ) {}

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

      // Create an iframe element.
      this.iframe = document.createElement("iframe");

      // Reference to container.
      const container = document.querySelector(`#${this.containerId}`);

      if (!container) {
        throw new Error(
          `Could not find container with id: ${this.containerId}`,
        );
      }

      // Set iframe attributes.
      this.iframe.id = "embedded-conversation-iframe";
      this.iframe.width = width || String(container.clientWidth) + "px";
      this.iframe.height = height || String(container.clientHeight) + "px";

      // Hide iframe if initiallyHidden is true.
      if (this.props.initiallyHidden) {
        this.iframe.style.display = "none";
      } else {
        this.iframe.src = getConversationUrl(
          contact.phoneNumber,
          channelPartner,
          contact.firstName,
          contact.lastName,
        );
      }

      // Clear container.
      container.innerHTML = "";

      // Append iframe to container.
      container.appendChild(this.iframe);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Show the iframe.
   */
  show() {
    if (this.iframe) {
      !this.iframe.src &&
        (this.iframe.src = getConversationUrl(
          this.props.contact.phoneNumber,
          this.props.channelPartner,
          this.props.contact.firstName,
          this.props.contact.lastName,
        ));
      this.iframe.style.display = "block";
    }
  }

  /**
   * Hide the iframe.
   */
  hide() {
    if (this.iframe) {
      this.iframe.style.display = "none";
    }
  }

  /**
   * Toggle the iframe visibility.
   */
  toggle() {
    if (this.iframe) {
      this.iframe.style.display === "none" ? this.show() : this.hide();
    }
  }

  /**
   * Update the contact for the embedded conversation and re-render the iframe.
   * @param contact Contact to set for the embedded conversation.
   */
  setContact(contact: TextUsEmbeddedConversationOptionProps["contact"]) {
    this.props.contact = contact;
    this.iframe!.src = getConversationUrl(
      contact.phoneNumber,
      this.props.channelPartner,
      contact.firstName,
      contact.lastName,
    );
  }
}
