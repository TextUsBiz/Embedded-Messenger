export interface GetConversationByPhoneNumberResponse {
  "@type": string;
  "@context": string;
  id: string;
  phoneNumber: string;
  formattedPhoneNumber: string;
  slug: string;
  currentState: string;
  unsubscribed: boolean;
  blocked: boolean;
  unanswered: boolean;
  account: string;
  stats: string;
  requestingUserInfo: string;
  participants: {
    "@type": string;
    "@context": string;
    id: string;
    members: any;
    totalItems: number;
  };
  assignments: string;
  assignedContact: string;
  assignContact: string;
  associatedContacts: {
    "@type": string;
    "@context": string;
    id: string;
    members: {
      "@type": string;
      "@context": string;
      id: string;
      name: string;
      firstName: string;
      lastName: string;
      phones: {
        "@type": string;
        "@context": string;
        id: string;
        members: [
          {
            "@type": string;
            "@context": string;
            id: string;
            phoneNumber: string;
            formattedPhoneNumber: string;
            extension: any;
            type: any;
            deliverabilityStatus: string;
            contact: string;
          },
        ];
        totalItems: number;
      };
      notes: {
        "@type": string;
        "@context": string;
        id: string;
        members: any;
        totalItems: number;
      };
      conversations: string;
      createdAt: string;
    }[];
    totalItems: 1;
  };
  readConversation: string;
  unreadConversation: string;
  starConversation: string;
  unstarConversation: string;
  reopenConversation: any;
  closeConversation: string;
  blockConversation: string;
  unblockConversation: any;
  subscribeConversation: any;
  unsubscribeConversation: string;
  latestPreviewableItem: any;
  timeline: {
    "@type": string;
    "@context": string;
    id: string;
    members: any;
    totalItems: number;
    view: {
      "@type": string;
      "@context": string;
      id: string;
      first: string;
      next: any;
      previous: any;
    };
  };
}
