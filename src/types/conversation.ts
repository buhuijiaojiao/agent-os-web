export interface Conversation {
  id: number;
  title: string;
}

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export interface RawMessage {
  id: number;
  senderType: number;  // 1 = user, 2 = assistant
  content: string;
}

export function transformRawMessage(raw: RawMessage): Message {
  return {
    id: raw.id,
    role: raw.senderType === 1 ? 'user' : 'assistant',
    content: raw.content,
  };
}
