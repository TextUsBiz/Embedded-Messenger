/**
 * @typedef {Object} ContactContext
 * @property {string} conversationId - Id of conversation.
 * @property {string} phoneNumber - Phone number of selected contact.
 * @property {string} fullName - Full name of selected contact.
 */

/**
 * @typedef {"inbox" | "campaigns" | "contacts" | "groups" | "analytics" | "settings"} NavItem
 */

/**
 * @typedef {Object} StylingOption
 * @property {string} headerBackgroundColor - Color hex for header background in Tesseract.
 * @property {string} headerColor - Color hex for header in Tesseract.
 */

/**
 * @typedef {Object} EmbedOptions
 * @property {string} [account] - Account name.
 * @property {string} [height] - Height of the frame.
 * @property {boolean} [showBorder] - Whether to show frame border. Defaults to false.
 * @property {string} [width] - Width of the frame.
 * @property {string} [id] - Id for frame.
 * @property {ContactContext} [contactContext] - Selected contact details.
 * @property {NavItem[]} [navItems] - Nav items to show. Defaults to showing all.
 * @property {StylingOption} [styling] - Styling options.
 */
