"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ChatConversationItem from "./ChatConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { httpGet, httpPost, httpDelete, httpPut } from "@/lib/http";

interface Conversation {
  id: number;
  title: string;
}

interface Props {
  current: number | null;
  onSelect: (id: number) => void;
}

export default function ChatConversationList({ current, onSelect }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function loadConversations() {
    const list = await httpGet<Conversation[]>("/api/proxy/conversation/list");
    setConversations(list);

    if (!current && list.length > 0) {
      onSelect(list[0].id);
    }
  }

  async function createConversation() {
    const newId = await httpPost<number>("/api/proxy/conversation/create", {
      conversationTitle: "新的会话",
    });
    await loadConversations();
    onSelect(newId);
  }

  function openEditDialog(conv: Conversation) {
    setEditingId(conv.id);
    setEditValue(conv.title);
    setEditOpen(true);
  }

  async function confirmEdit() {
    if (!editingId) return;

    await httpPut("/api/proxy/conversation/update", {
      conversationId: String(editingId),
      conversationTitle: editValue,
    });

    setEditOpen(false);
    await loadConversations();
    onSelect(editingId);
  }

  function openDeleteDialog(id: number) {
    setDeletingId(id);
    setDeleteOpen(true);
  }

  async function confirmDelete() {
    if (!deletingId) return;

    await httpDelete(
      `/api/proxy/conversation/delete?conversationId=${deletingId}`
    );

    setDeleteOpen(false);
    await loadConversations();

    if (current === deletingId) {
      onSelect(null as any);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full min-h-0">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
          <h2 className="text-sm font-semibold">历史</h2>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={createConversation}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-3">
          <div className="space-y-2">
            {conversations.map((c) => (
              <ChatConversationItem
                key={c.id}
                conversation={{ id: String(c.id), title: c.title }}
                active={c.id === current}
                onClick={() => onSelect(c.id)}
                onEdit={() => openEditDialog(c)}
                onDelete={() => openDeleteDialog(c.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Dialogs 原样保留 */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>更新会话标题</DialogTitle>
          </DialogHeader>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={confirmEdit}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除？</DialogTitle>
          </DialogHeader>
          <p>此操作将删除会话及其全部消息。</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
