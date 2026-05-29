"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { KanbanBoard, type KanbanColumn } from "@/components/ui/kanban-board";

const COLUMNS: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "slate",
    cards: [
      { id: "c1", title: "Kullanıcı profili sayfası tasarımı", description: "Avatar, bio, sosyal linkler ve aktivite akışı.", priority: "low", tags: ["Tasarım"], dueDate: "12 Haz" },
      { id: "c2", title: "E-posta bildirim şablonları", priority: "medium", tags: ["Backend"], assignee: { name: "Selin A" } },
      { id: "c3", title: "API rate limiting implementasyonu", description: "Redis tabanlı sliding window.", priority: "high", tags: ["Backend", "Güvenlik"] },
    ],
  },
  {
    id: "todo",
    title: "Yapılacak",
    color: "blue",
    limit: 4,
    cards: [
      { id: "c4", title: "Auth akışı yenileme", description: "OAuth2 + refresh token stratejisi.", priority: "critical", tags: ["Auth"], assignee: { name: "Burak Y" }, dueDate: "8 Haz" },
      { id: "c5", title: "Dashboard widget sistemi", priority: "medium", tags: ["Frontend"], assignee: { name: "Zeynep Ç" } },
    ],
  },
  {
    id: "inprogress",
    title: "Devam Ediyor",
    color: "amber",
    limit: 3,
    cards: [
      { id: "c6", title: "Arama bileşeni geliştirme", description: "Komut paleti + fuzzy search.", priority: "high", tags: ["Frontend"], assignee: { name: "Can Ö" }, dueDate: "5 Haz" },
      { id: "c7", title: "Test coverage artırma", priority: "medium", tags: ["QA"], assignee: { name: "Ayşe K" } },
    ],
  },
  {
    id: "review",
    title: "İnceleme",
    color: "violet",
    cards: [
      { id: "c8", title: "Pricing sayfası güncelleme", priority: "medium", tags: ["Frontend"], assignee: { name: "Mehmet D" }, dueDate: "3 Haz" },
    ],
  },
  {
    id: "done",
    title: "Tamamlandı",
    color: "emerald",
    cards: [
      { id: "c9", title: "Login formu erişilebilirlik iyileştirmeleri", priority: "low", tags: ["A11Y"], assignee: { name: "Selin A" } },
      { id: "c10", title: "Dark mode token sistemi", priority: "medium", tags: ["Tasarım"] },
    ],
  },
];

export default function KanbanBoardShowcase() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Kanban Board</h1>
        <p className="text-foreground-muted">
          Sürükle-bırak destekli kanban panosu. Öncelik seviyeleri, atanan kişi, etiketler ve kolon limiti.
        </p>
      </div>

      <ShowcaseSection
        title="Tam Kanban Panosu"
        description="5 kolon, öncelik badge'leri, kişi ataması, sürükle-bırak ile kart taşıma."
        importLine={`import { KanbanBoard } from "@/components/ui/kanban-board";`}
        code={`<KanbanBoard columns={columns} onChange={setColumns} />`}
        previewClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <KanbanBoard columns={COLUMNS} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Kolon Limiti"
        description="limit prop ile WIP (Work In Progress) kısıtı. Limit aşıldığında sayaç kırmızı olur."
        importLine={`import { KanbanBoard } from "@/components/ui/kanban-board";`}
        code={`const columns = [
  { id: "todo", title: "Yapılacak", limit: 3, color: "blue", cards: [...] },
  { id: "done", title: "Tamamlandı", color: "emerald", cards: [...] },
];
<KanbanBoard columns={columns} />`}
      >
        <KanbanBoard
          columns={[
            { id: "todo2", title: "Yapılacak", color: "blue", limit: 2, cards: [
              { id: "l1", title: "Task A", priority: "high", tags: ["Frontend"] },
              { id: "l2", title: "Task B", priority: "medium", tags: ["Backend"] },
              { id: "l3", title: "Task C — limit aşıldı", priority: "critical", tags: ["QA"] },
            ]},
            { id: "done2", title: "Tamamlandı", color: "emerald", cards: [
              { id: "l4", title: "Task D", priority: "low" },
            ]},
          ]}
        />
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>{["Prop","Tip","Açıklama"].map(h=><th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["columns","KanbanColumn[]","Kolon ve kart listesi (zorunlu)"],
                ["onChange","(columns) => void","Kart taşındığında güncellenen state callback'i"],
                ["className","string","Ek CSS sınıfı"],
              ].map(([p,t,d])=>(
                <tr key={p} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 text-foreground-muted">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
