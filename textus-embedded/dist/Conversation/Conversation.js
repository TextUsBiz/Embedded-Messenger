"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationUrl = void 0;
async function getConversationUrl(accountId, phoneNumber) {
    try {
        const response = await fetch(`http://localhost:3000/${accountId}/conversations/${encodeURIComponent(phoneNumber)}`, {
            headers: {
                'Accept': 'application/vnd.textus+jsonld',
                'Authorization': 'Bearer 6wIbohApflVeMh6HX-opFHLYXQLggOOX7hox4a6SMvc',
                'Content-Type': 'application/json',
                'X-TextUs-Client': 'tesseract',
                'X-TextUs-Client-Version': ''
            }
        });
        const json = await response.json();
        return `http://localhost:3000/c/${accountId}/inbox/open/${json.slug}`;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
exports.getConversationUrl = getConversationUrl;
