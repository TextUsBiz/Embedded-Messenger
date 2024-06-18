export async function getConversationUrl(phoneNumber: string): Promise<string | null> {
  return `http://localhost:3000/c?phoneNumber=${encodeURIComponent(phoneNumber)}`;
}