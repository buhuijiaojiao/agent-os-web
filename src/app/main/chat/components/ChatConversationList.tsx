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
import type { Conversation } from "@/types/conversation";

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
      conversationTitle: "New thread",
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
      `/api/proxy/conversation/delete?conversationId=${deletingId}`,
    );

    setDeleteOpen(false);
    await loadConversations();

    if (current === deletingId) {
      onSelect(null as unknown as number);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full min-h-0 text-foreground">
        {/* Header */}
        <div className="px-4 py-4 space-y-3 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
              Conversations
            </h2>

            <button
              onClick={createConversation}
              className="
                group relative w-7 h-7 flex items-center justify-center
                rounded-md border border-border
                hover:border-[#4ef2c2]/50 transition
              "
            >
              <Plus className="w-4 h-4 text-muted-foreground group-hover:text-[#4ef2c2]" />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                              bg-[radial-gradient(circle,rgba(78,242,194,0.2),transparent_70%)]
                              transition"
              />
            </button>
          </div>
        </div>

        {/* List */}
        <ScrollArea className="flex-1 px-2 py-3">
          <div className="space-y-1">
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

      {/* dialogs */}
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
          <p className="text-muted-foreground">此操作将删除会话及其全部消息。</p>
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
