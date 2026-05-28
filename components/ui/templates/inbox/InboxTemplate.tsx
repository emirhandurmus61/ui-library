"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────── */

interface Message {
  id: number;
  from: "them" | "me";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  preview: string;
  time: string;
  unread: number;
  messages: Message[];
  projects: string[];
  files: string[];
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Zeynep Arslan",
    preview: "PR'ı review ettim, birkaç yorum bıraktım.",
    time: "09:41",
    unread: 3,
    messages: [
      { id: 1, from: "them", text: "Merhaba! Sprint 4 için planlama toplantısı yarın 10:00'da mı?", time: "09:30" },
      { id: 2, from: "me", text: "Evet, 10:00 uygun. Meeting linki paylaşıyorum birazdan.", time: "09:32" },
      { id: 3, from: "them", text: "Harika, teşekkürler. Bir de ButtonTemplate PR'ını inceleyebilir misin?", time: "09:35" },
      { id: 4, from: "me", text: "Tabii, şimdi bakıyorum.", time: "09:38" },
      { id: 5, from: "them", text: "PR'ı review ettim, birkaç yorum bıraktım.", time: "09:41" },
    ],
    projects: ["nexus-ui", "design-system"],
    files: ["sprint4-plan.pdf", "design-tokens.fig"],
  },
  {
    id: 2,
    name: "Mert Yıldız",
    preview: "Deploy başarıyla tamamlandı 🚀",
    time: "Dün",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Staging ortamına deploy ettin mi?", time: "Dün 14:00" },
      { id: 2, from: "them", text: "Evet, şu an test ediyorum.", time: "Dün 14:15" },
      { id: 3, from: "them", text: "Deploy başarıyla tamamlandı 🚀", time: "Dün 15:30" },
    ],
    projects: ["form-wizard"],
    files: ["deployment-log.txt"],
  },
  {
    id: 3,
    name: "Ayşe Kaya",
    preview: "Figma dosyasını güncelledim.",
    time: "Sal",
    unread: 1,
    messages: [
      { id: 1, from: "them", text: "Yeni renk paletini Figma'ya ekledim.", time: "Sal 11:00" },
      { id: 2, from: "me", text: "Harika görünüyor! Dark mode varyantları da var mı?", time: "Sal 11:30" },
      { id: 3, from: "them", text: "Figma dosyasını güncelledim.", time: "Sal 13:00" },
    ],
    projects: ["design-system"],
    files: ["color-palette-v2.fig", "brand-guide.pdf"],
  },
  {
    id: 4,
    name: "Burak Çelik",
    preview: "Toplantı notları ekte.",
    time: "Pzt",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Q2 roadmap toplantısı nasıldı?", time: "Pzt 16:00" },
      { id: 2, from: "me", text: "Verimli geçti. Yeni özellikler için önceliklendirme yapıldı.", time: "Pzt 16:20" },
      { id: 3, from: "them", text: "Toplantı notları ekte.", time: "Pzt 17:00" },
    ],
    projects: ["theme-engine"],
    files: ["q2-roadmap-notes.docx"],
  },
  {
    id: 5,
    name: "Fatma Demir",
    preview: "Test sonuçları hazır, bakabilir misin?",
    time: "Cum",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "E2E testleri yazdım, review edebilir misin?", time: "Cum 10:00" },
      { id: 2, from: "me", text: "Bugün bakabilirim, link gönderir misin?", time: "Cum 10:30" },
      { id: 3, from: "them", text: "Test sonuçları hazır, bakabilir misin?", time: "Cum 14:00" },
    ],
    projects: ["nexus-ui"],
    files: ["test-results.html"],
  },
];

/* ─── InboxTemplate ──────────────────────────────────────────── */
export function InboxTemplate() {
  const [selectedId, setSelectedId] = useState(CONVERSATIONS[0].id);
  const [inputValue, setInputValue] = useState("");

  const selected = CONVERSATIONS.find((c) => c.id === selectedId) ?? CONVERSATIONS[0];

  return (
    <div className="bg-background flex h-[600px] overflow-hidden">
      {/* Column 1: Conversation List */}
      <aside className="w-64 shrink-0 border-r border-border flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Mesajlar</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((conv) => {
            const isActive = conv.id === selectedId;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-background-muted border-b border-border/50",
                  isActive && "bg-primary-subtle"
                )}
              >
                <Avatar name={conv.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={cn("text-xs font-semibold truncate", isActive ? "text-primary" : "text-foreground")}>
                      {conv.name}
                    </span>
                    <span className="text-[10px] text-foreground-muted shrink-0 ml-1">{conv.time}</span>
                  </div>
                  <p className="text-[11px] text-foreground-muted truncate">{conv.preview}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="shrink-0 mt-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1">
                    {conv.unread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Column 2: Messages */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-3">
          <Avatar name={selected.name} size="sm" />
          <div>
            <p className="text-sm font-semibold text-foreground">{selected.name}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success inline-block" />
              Çevrimiçi
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {selected.messages.map((msg) => {
            const isMe = msg.from === "me";
            return (
              <div key={msg.id} className={cn("flex gap-2 items-end", isMe && "flex-row-reverse")}>
                {!isMe && <Avatar name={selected.name} size="xs" />}
                <div className="max-w-[65%]">
                  <div
                    className={cn(
                      "rounded-[var(--radius-lg)] px-3 py-2 text-xs leading-relaxed",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-background-muted text-foreground rounded-bl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                  <p className={cn("text-[10px] text-foreground-muted mt-0.5", isMe && "text-right")}>
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-border flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Mesaj yaz..."
            className="flex-1 bg-background-muted rounded-[var(--radius-lg)] px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted outline-none focus:ring-1 focus:ring-primary/50 transition"
          />
          <button
            onClick={() => setInputValue("")}
            className="bg-primary text-primary-foreground rounded-[var(--radius-lg)] px-3 py-2 text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>
        </div>
      </main>

      {/* Column 3: Contact Detail (xl only) */}
      <aside className="w-56 shrink-0 border-l border-border hidden xl:flex flex-col">
        <div className="p-4 flex flex-col items-center text-center border-b border-border">
          <Avatar name={selected.name} size="lg" />
          <p className="text-sm font-semibold text-foreground mt-2">{selected.name}</p>
          <p className="text-xs text-foreground-muted">Frontend Engineer</p>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <p className="text-[10px] font-semibold text-foreground-muted uppercase tracking-wider mb-2">Ortak Projeler</p>
            <div className="space-y-1.5">
              {selected.projects.map((p) => (
                <div key={p} className="flex items-center gap-2 text-xs text-foreground-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3 shrink-0" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span className="font-mono">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-foreground-muted uppercase tracking-wider mb-2">Paylaşılan Dosyalar</p>
            <div className="space-y-1.5">
              {selected.files.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-foreground-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3 shrink-0" aria-hidden="true">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
