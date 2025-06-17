export interface Message {
  messageId: number;
  userId: number;
  roomId: number;
  text: string;
  createdAt: string;
  userName?: string;
  filePath?: string;
}
