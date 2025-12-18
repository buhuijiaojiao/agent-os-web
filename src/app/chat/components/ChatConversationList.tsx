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
import { httpGet, httpPost } from "@/lib/http"; // 你自己的工具层

interface Conversation {
  id: number;
  title: string;
}

export default function ChatConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [current, setCurrent] = useState<number | null>(null);

  // 编辑弹窗
  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // 删除确认弹窗
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /** 查询会话列表 */
  async function loadConversations() {
    const list = await httpGet<Conversation[]>("/api/proxy/conversation/list");
    setConversations(list);

    if (!current && list.length > 0) {
      setCurrent(list[0].id);
    }
  }

  /** 新建会话（后端 create） */
  async function createConversation() {
    const newId = await httpPost<number>("/api/proxy/conversation/create", {
      conversationTitle: "新的会话",
    });

    await loadConversations();
    setCurrent(newId);
  }

  /** 打开编辑弹窗 */
  function openEditDialog(conv: Conversation) {
    setEditingId(conv.id);
    setEditValue(conv.title);
    setEditOpen(true);
  }

  /** 打开删除确认弹窗 */
  function openDeleteDialog(id: number) {
    setDeletingId(id);
    setDeleteOpen(true);
  }

  // TODO: 待完善后端接口
  async function confirmEdit() {
    console.log("更新会话标题：", editingId, "=>", editValue);
    setEditOpen(false);
  }

  async function confirmDelete() {
    console.log("删除会话：", deletingId);
    setDeleteOpen(false);
  }
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ update/delete API

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <>
      {/* 主 UI */}
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
                onClick={() => setCurrent(c.id)}
                onEdit={() => openEditDialog(c)}
                onDelete={() => openDeleteDialog(c.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 编辑 Dialog */}
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

      {/* 删除确认 Dialog */}
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
