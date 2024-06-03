import "./types.js";

export class TextUsEmbed {
  /**
   *
   * @param {string} docId - Container to use for iframe.
   * @param {EmbedOptions} options - Embed options for the frame.
   */
  constructor(docId, options) {
    this.updateOptions(options);

    this.iframe = null;
    this.docId = docId;
  }

  updateOptions(updatedOptions) {
    const defaultOptions = {
      id: "textUs-embed-id",
      showBorder: false,
      contactContext: {},
      styling: {
        headerBackgroundColor: "#283C59",
        headerColor: "#fff",
      },
      navItems: [
        "inbox",
        "campaigns",
        "contacts",
        "groups",
        "analytics",
        "settings",
      ],
    };

    this.options = {
      ...defaultOptions,
      ...this.options,
      ...updatedOptions,
    };
  }

  load() {
    const {
      account,
      height,
      showBorder,
      width,
      id,
      contactContext,
      navItems,
      styling,
    } = this.options;

    const qs = new URLSearchParams({
      account: account,
      conversationId: contactContext.conversationId,
      contactPhoneNumber: contactContext.phoneNumber,
      contactFullName: contactContext.fullName,
      headerBgColor: styling.headerBackgroundColor,
      headerColor: styling.headerColor,
      logo: styling.logo,
      navItems: [...navItems],
    });

    // TODO: FLOW FOR GETTING CONVERSATION ID.
    const src = `http://localhost:3000/c/${account}/inbox/open/${contactContext.conversationId}`;

    // TODO: CREATE AN /EMBED ROUTE TO PREVENT REDIRECT TO /DASHBOARD.
    // const src = `http://localhost:3000?${qs}`;

    // TODO: ALLOW EMBEDDING FROM SPECIFIC URLS.
    // const src = `https://next.textus.com?${qs}`;

    console.log(`### Embed src for ${id}:`, src);

    // Just for logging.
    const url = new URL(src);
    const urlP = new URLSearchParams(url.search);
    const params = Object.fromEntries(urlP);
    console.log(`### Embed params for ${id}:`, params);

    // Create an iframe element
    this.iframe = document.createElement("iframe");

    // Reference to container
    const container = document.querySelector(`#${this.docId}`);

    // Clear container
    container.innerHTML = null;

    // Set iframe attributes
    this.iframe.src = src;
    this.iframe.width = width ?? container.clientWidth;
    this.iframe.height = height ?? container.clientHeight;
    this.iframe.id = id;
    this.iframe.frameBorder = Number(showBorder);

    // Append iframe to the body of the document
    container.appendChild(this.iframe);
  }
}
