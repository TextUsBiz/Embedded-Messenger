import { GetConversationByPhoneNumberResponse } from "../models/GetConversationByPhoneNumberResponse";

export async function getConversationUrl(accountId: string, phoneNumber: string): Promise<string | null> {
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

    const json = await response.json() as GetConversationByPhoneNumberResponse;

    return `http://localhost:3000/c/${accountId}/inbox/open/${json.slug}`;
  } catch (err) {
    console.error(err);
    return null;
  }
}