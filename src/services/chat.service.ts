import { httpGet, httpPost, httpPut, httpDelete } from '@/lib/http';
import type { Conversation, RawMessage } from '@/types/conversation';

export const chatService = {
  getList: () => httpGet<Conversation[]>('/api/proxy/chat/conversations'),

  create: (title: string = 'New thread') =>
    httpPost<number>('/api/proxy/chat/conversations', { title }),

  updateTitle: (id: number, title: string) =>
    httpPut<void>(`/api/proxy/chat/conversations/${id}`, { title }),

  delete: (id: number) =>
    httpDelete<void>(`/api/proxy/chat/conversations/${id}`),

  getMessages: (conversationId: number) =>
    httpGet<RawMessage[]>(`/api/proxy/chat/conversations/${conversationId}/messages`),

  sendMessage: (conversationId: number, content: string) =>
    httpPost<string>(`/api/proxy/chat/conversations/${conversationId}/messages`, { content }),
};
