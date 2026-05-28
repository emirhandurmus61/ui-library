"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

type Priority = "Yüksek" | "Orta" | "Düşük";

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  points: number;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  color: string;
  wipLimit: number | null;
  cards: KanbanCard[];
}

/* ─── Data ───────────────────────────────────────────────────── */

const TEAM = [
  { name: "Emirhan Durmuş" },
  { name: "Zeynep Arslan" },
  { name: "Mert Yıldız" },
  { name: "Ayşe Kaya" },
];

const COLUMNS: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "bg-foreground-muted",
    wipLimit: null,
    cards: [
      { id: "BL-1", title: "Kullanıcı onboarding akışı", description: "Yeni kullanıcılar için adım adım kurulum sihirbazı.", priority: "Orta", assignee: "Zeynep Arslan", points: 5, tags: ["UX", "Frontend"] },
      { id: "BL-2", title: "E-posta şablonları", description: "Transactional e-posta tasarımları ve şablonları.", priority: "Düşük", assignee: "Ayşe Kaya", points: 3, tags: ["Design"] },
      { id: "BL-3", title: "Bildirim sistemi", description: "In-app ve push notification altyapısı.", priority: "Yüksek", assignee: "Mert Yıldız", points: 8, tags: ["Backend", "Mobile"] },
      { id: "BL-4", title: "A/B test altyapısı", description: "Feature flag ve deney yönetimi sistemi.", priority: "Orta", assignee: "Emirhan Durmuş", points: 5, tags: ["Altyapı"] },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "bg-info",
    wipLimit: null,
    cards: [
      { id: "TD-1", title: "Sidebar navigasyon bileşeni", description: "Collapsible sidebar, responsive davranış.", priority: "Yüksek", assignee: "Emirhan Durmuş", points: 5, tags: ["Frontend", "UI"] },
      { id: "TD-2", title: "API rate limiting", description: "Redis tabanlı rate limiter implementasyonu.", priority: "Yüksek", assignee: "Mert Yıldız", points: 8, tags: ["Backend"] },
      { id: "TD-3", title: "Dark mode desteği", description: "Sistem temasına göre otomatik tema geçişi.", priority: "Orta", assignee: "Zeynep Arslan", points: 3, tags: ["UI", "CSS"] },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "bg-warning",
    wipLimit: 4,
    cards: [
      { id: "IP-1", title: "Authentication modülü", description: "JWT + refresh token, OAuth2 entegrasyonu.", priority: "Yüksek", assignee: "Mert Yıldız", points: 8, tags: ["Backend", "Security"] },
      { id: "IP-2", title: "Dashboard analytics", description: "Ziyaretçi ve gelir grafikleri, kart bileşenleri.", priority: "Yüksek", assignee: "Emirhan Durmuş", points: 5, tags: ["Frontend", "Charts"] },
      { id: "IP-3", title: "Dosya yükleme bileşeni", description: "Drag-and-drop, ilerleme göstergesi, validasyon.", priority: "Orta", assignee: "Zeynep Arslan", points: 3, tags: ["Frontend"] },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-success",
    wipLimit: null,
    cards: [
      { id: "DN-1", title: "Design token sistemi", description: "CSS değişkenleri ile renk, tipografi ve spacing.", priority: "Yüksek", assignee: "Ayşe Kaya", points: 5, tags: ["Design", "CSS"] },
      { id: "DN-2", title: "Button bileşeni", description: "Tüm varyantlar, boyutlar ve stil presetleri.", priority: "Orta", assignee: "Emirhan Durmuş", points: 3, tags: ["UI"] },
      { id: "DN-3", title: "Badge bileşeni", description: "Variant, size, dot ve icon desteği.", priority: "Düşük", assignee: "Emirhan Durmuş", points: 2, tags: ["UI"] },
      { id: "DN-4", title: "Avatar bileşeni", description: "Initials fallback, status dot, AvatarGroup.", priority: "Düşük", assignee: "Zeynep Arslan", points: 3, tags: ["UI"] },
    ],
  },
];

/* ─── Priority variant ───────────────────────────────────────── */
function priorityVariant(p: Priority): "danger" | "warning" | "success" {
  if (p === "Yüksek") return "danger";
  if (p === "Orta") return "warning";
  return "success";
}

/* ─── KanbanTemplate ─────────────────────────────────────────── */
export function KanbanTemplate() {
  return (
    <div className="bg-background min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Sprint 4</h1>
          <p className="text-xs text-foreground-muted mt-0.5">1 Mayıs — 14 Mayıs 2025 · 14 gün kaldı</p>
        </div>
        <div className="flex items-center gap-3">
          <AvatarGroup avatars={TEAM} max={4} size="sm" />
          <Button variant="primary" size="sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Kart Ekle
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const atLimit = col.wipLimit !== null && col.cards.length >= col.wipLimit;
          return (
            <div key={col.id} className="flex flex-col">
              {/* Column header */}
              <div className="flex items-center gap-2 mb-3">
                <span className={cn("size-2.5 rounded-full shrink-0", col.color)} />
                <h2 className="text-sm font-semibold text-foreground flex-1">{col.title}</h2>
                <span className="text-xs text-foreground-muted bg-background-muted rounded-full px-2 py-0.5">
                  {col.cards.length}
                </span>
                {col.wipLimit !== null && (
                  <span className={cn("text-xs font-medium rounded-full px-2 py-0.5", atLimit ? "bg-warning-subtle text-warning" : "text-foreground-muted")}>
                    WIP {col.cards.length}/{col.wipLimit}
                  </span>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-surface border border-border rounded-[var(--radius-lg)] p-3 cursor-grab hover:border-border-strong hover:shadow-sm transition-all"
                  >
                    {/* Card ID + Priority */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-foreground-muted">{card.id}</span>
                      <Badge variant={priorityVariant(card.priority)} size="sm">{card.priority}</Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-semibold text-foreground mb-1 leading-snug">{card.title}</h3>
                    <p className="text-[11px] text-foreground-muted leading-relaxed mb-3 line-clamp-2">{card.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {card.tags.map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <Avatar name={card.assignee} size="xs" />
                      <div className="flex items-center gap-1 text-[10px] text-foreground-muted">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {card.points} sp
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add card button */}
              <button className="mt-2 w-full py-2 text-xs text-foreground-muted hover:text-foreground hover:bg-background-muted rounded-[var(--radius-lg)] transition-colors flex items-center justify-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Kart ekle
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
