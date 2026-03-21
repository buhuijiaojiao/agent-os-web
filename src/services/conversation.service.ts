import { httpGet, httpPost, httpPut, httpDelete } from '@/lib/http';
import type { Conversation, Message, RawMessage } from '@/types/conversation';

export const conversationService = {
  getList: () => httpGet<Conversation[]>('/api/proxy/conversation/list'),

  create: () => httpPost<Conversation>('/api/proxy/conversation/create', {}),

  updateTitle: (id: number, title: string) =>
    httpPut<void>('/api/proxy/conversation/update', { id, title }),

  delete: (id: number) =>
    httpDelete<void>(`/api/proxy/conversation/delete?id=${id}`),

  getMessages: (conversationId: number) =>
    httpGet<RawMessage[]>(`/api/proxy/message/list?conversationId=${conversationId}`),

  sendMessage: (conversationId: number, content: string) =>
    httpPost<Message>('/api/proxy/message/chat', { conversationId, content }),
};
