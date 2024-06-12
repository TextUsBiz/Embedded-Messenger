import { GetConversationByPhoneNumberResponse } from "../models/GetConversationByPhoneNumberResponse";

export async function getConversationUrl(accountId: string, phoneNumber: string): Promise<string | null> {
  try {
    // TODO: (JOHN BROWN): FIGURE OUT HOW TO HANDLE AUTH TOKEN
    const Authorization = 'Bearer ...';

    // TODO (JOHN BROWN): UPDATE URL TO POINT TO NEXT.TEXTUS.COM
    const url = `http://localhost:3000/${accountId}/conversations/${encodeURIComponent(phoneNumber)}`;

    const response = await fetch(url, {
      headers: {
        Authorization,
        'Accept': 'application/vnd.textus+jsonld',
        'Content-Type': 'application/json',
        'X-TextUs-Client': 'tesseract',
        'X-TextUs-Client-Version': ''
      }
    });

    const json = await response.json() as GetConversationByPhoneNumberResponse;

    // TODO (JOHN BROWN): UPDATE RETURN URL TO POINT TO NEXT.TEXTUS.COM
    return `http://localhost:3000/c/${accountId}/inbox/open/${json.slug}`;
  } catch (err) {
    console.error(err);
    return null;
  }
}