import { TextUsEmbed } from "/packages/textus-embed.js";

let conversationId = "2YJGVL";

let textUsEmbed = new TextUsEmbed("iframe-container", {
  account: "bandwidth-v2-dev",
  contactContext: {
    conversationId,
    phoneNumber: "123-444-5555",
    fullName: "John Doe",
  },

  // ==== Below do nothing currently. ==== //
  authSSOKey: "auth_sso_key",
  id: "textus-embed",
  styling: {
    logo: "assets/logo.jpeg",
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
});

textUsEmbed.load();

window.updateConversationId = (id) => {
  textUsEmbed.updateOptions({ contactContext: { conversationId: id } });
  textUsEmbed.load();
};
