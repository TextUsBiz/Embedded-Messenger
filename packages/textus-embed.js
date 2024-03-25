import "./types.js";

export class TextUsEmbed {
  /**
   *
   * @param {string} ssoKey - Useless for now.
   * @param {EmbedOptions} options - Embed options for the frame.
   */
  constructor(ssoKey, options) {
    this.login(ssoKey);

    const defaultOptions = {
      height: "400",
      id: "textUs-embed-id",
      showBorder: false,
      width: "400",
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
      ...options,
    };
  }

  /** Log in... somehow 🤷🏾‍♂️. */
  login(ssoKey) {
    return;
  }

  inject(docId) {
    const { height, showBorder, width, id, contactContext, navItems, styling } =
      this.options;

    const qs = new URLSearchParams({
      contactPhoneNumber: contactContext.phoneNumber,
      contactFullName: contactContext.fullName,
      headerBgColor: styling.headerBackgroundColor,
      headerColor: styling.headerColor,
      logo: styling.logo,
      navItems: [...navItems],
    });

    // TODO: CREATE AN /EMBED ROUTE TO PREVENT REDIRECT TO /DASHBOARD.
    const src = `http://localhost:3000?${qs}`;
    console.log(`### Embed src for ${id}:`, src);

    // TODO: ALLOW EMBEDDING FROM SPECIFIC URLS.
    // const src = `https://next.textus.com?${qs}`;

    // Just for logging.
    const url = new URL(src);
    const urlP = new URLSearchParams(url.search);
    const params = Object.fromEntries(urlP);
    console.log(`### Embed params for ${id}:`, params);

    // Create an iframe element
    const iframe = document.createElement("iframe");

    // Set iframe attributes
    iframe.src = src;
    iframe.width = width;
    iframe.height = height;
    iframe.id = id;
    iframe.frameBorder = Number(showBorder);

    // Append iframe to the body of the document
    document.querySelector(`#${docId}`).appendChild(iframe);
  }
}
