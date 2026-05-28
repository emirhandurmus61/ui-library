"use client";
import { KanbanTemplate } from "@/components/ui/templates/kanban";

export default function KanbanTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Kanban Board Şablonu</h1>
        <p className="text-sm text-foreground-muted">Proje yönetimi için 4 sütunlu kanban board — sprint başlığı, WIP limiti ve öncelik badge'leri.</p>
      </div>
      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <KanbanTemplate />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { KanbanTemplate } from "@/components/ui/templates/kanban";
export default function Page() { return <KanbanTemplate />; }`}
        </pre>
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bileşenler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Header — sprint başlığı, tarih, AvatarGroup, Kart Ekle Button</li>
          <li>4 sütun: Backlog / To Do / In Progress / Done</li>
          <li>WIP limit göstergesi (In Progress: mevcut/limit)</li>
          <li>Kartlar — başlık, açıklama, öncelik Badge, assignee Avatar, story points, etiketler</li>
          <li>Badge — öncelik (Yüksek/Orta/Düşük) ve teknoloji etiketleri</li>
        </ul>
      </section>
    </div>
  );
}
