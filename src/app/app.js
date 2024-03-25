/**
 * This files creates 3 TextUs embed instances and dynamically injects them
 * into the index.html page.
 * Each instance targets an individual div by id.
 */

import { TextUsEmbed } from "/packages/textus-embed.js";

const iframe01Opts = {
  authSSOKey: "auth_sso_key",
  height: "600",
  id: "textus-embed-01",
  width: "400",
  contactContext: {
    phoneNumber: "123-444-5555",
    fullName: "John Doe",
  },
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
};

const iframe02Opts = {
  ...iframe01Opts,
  height: "600",
  id: "textus-embed-02",
  width: "800",
  styling: {
    logo: "assets/logo.jpeg",
    headerBackgroundColor: "#f00",
    headerColor: "#333",
  },
  navItems: ["inbox", "campaigns"],
};

const iframe03Opts = {
  ...iframe01Opts,
  height: "400",
  id: "textus-embed-03",
  width: "1200",
  styling: {
    logo: "assets/logo.jpeg",
    headerBackgroundColor: "#00f",
    headerColor: "#f00",
  },
  navItems: ["groups"],
};

let textUsEmbed01 = new TextUsEmbed("auth_sso_key", iframe01Opts);
let textUsEmbed02 = new TextUsEmbed("auth_sso_key", iframe02Opts);
let textUsEmbed03 = new TextUsEmbed("auth_sso_key", iframe03Opts);

textUsEmbed01.inject("iframe-container-01");
textUsEmbed02.inject("iframe-container-02");
textUsEmbed03.inject("iframe-container-03");
