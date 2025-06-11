export interface Message {
  messageId: number;
  userId: number;
  roomId: number;
  text: string;
  createdAt: string;
  room: any;
  user: any;
}
