export enum ChatMessageType {
    UserJoined = 0,
    UserLeft,
    UserNewMessage
}

export interface ChatMessage {
    type: ChatMessageType,
    username: string,
    data: string
}