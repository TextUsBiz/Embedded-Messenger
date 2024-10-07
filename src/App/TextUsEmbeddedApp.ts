import { PhoneExtractionContact, TextUsEmbeddedAppProps } from "../models";

// Replaced during the build process.
const textUsUrl = "http://localhost:3000";

export class TextUsEmbeddedApp {
  private iframe: HTMLIFrameElement | null = null;

  /**
   * Class to build an iframe with URL to display embedded app.
   * @param containerId Id of container element.
   * @param props Props for embedded app.
   * @returns Embedded app iframe (placed inside of container).
   */
  constructor(
    public containerId: string,
    public props: TextUsEmbeddedAppProps,
  ) { }

  /**
   * Render the embedded app iframe.
   */
  render() {
    try {
      const { channelPartner, height, width } = this.props;

      if (!channelPartner) {
        throw new Error('No channel partner provided.');
      }

      // Create an iframe element.
      this.iframe = document.createElement("iframe");

      // Reference to container.
      const container = document.querySelector(`#${this.containerId}`);

      if (!container) {
        throw new Error(`Could not find container with id: ${this.containerId}`);
      }

      // Set iframe attributes. 
      this.iframe.id = 'embedded-app-iframe';
      this.iframe.src = textUsUrl;
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

  /**
   * Imports a list of contacts.
   * @param contacts List of contacts to import.
   */
  importContacts(contacts: PhoneExtractionContact[]) {
    if (!this.iframe || !this.iframe.contentWindow) {
      return;
    }

    this.iframe.contentWindow.postMessage({
      type: 'findNumbersResponse',
      payload: contacts,
    }, '*');
  }
}