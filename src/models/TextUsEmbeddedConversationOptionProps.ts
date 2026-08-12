export interface TextUsEmbeddedConversationOptionProps {
  channelPartner: string;
  height?: string;
  initiallyHidden?: boolean;
  width?: string;
  contact: {
    phoneNumber: string;
    firstName?: string;
    lastName?: string;
  };
}
