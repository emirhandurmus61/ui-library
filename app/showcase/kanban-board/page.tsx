"use client";

import { useState } from "react";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { KanbanBoard, type KanbanColumn } from "@/components/ui/kanban-board";

const IMPORT = `import { KanbanBoard, type KanbanColumn } from "@/components/ui/kanban-board";`;

/* ─── Dataset 1: Yazılım Geliştirme ─────────────────────────── */

const DEV_COLUMNS: KanbanColumn[] = [
  {
    id: "backlog", title: "Backlog", color: "slate",
    cards: [
      { id: "d1", title: "Kullanıcı profili sayfası tasarımı", description: "Avatar, bio, sosyal linkler ve aktivite akışı.", priority: "low", tags: ["Tasarım"], dueDate: "12 Haz" },
      { id: "d2", title: "E-posta bildirim şablonları", priority: "medium", tags: ["Backend"], assignee: { name: "Selin A" } },
      { id: "d3", title: "API rate limiting implementasyonu", description: "Redis tabanlı sliding window algoritması.", priority: "high", tags: ["Backend", "Güvenlik"] },
      { id: "d4", title: "Mobil uygulama push notification", description: "FCM entegrasyonu ve topic subscription.", priority: "low", tags: ["Mobil"] },
    ],
  },
  {
    id: "todo", title: "Yapılacak", color: "blue", limit: 4,
    cards: [
      { id: "d5", title: "Auth akışı yenileme", description: "OAuth2 + PKCE + refresh token rotasyonu.", priority: "critical", tags: ["Auth"], assignee: { name: "Burak Y" }, dueDate: "8 Haz" },
      { id: "d6", title: "Dashboard widget sistemi", priority: "medium", tags: ["Frontend"], assignee: { name: "Zeynep Ç" } },
      { id: "d7", title: "WebSocket bağlantı yönetimi", description: "Reconnect stratejisi ve heartbeat.", priority: "high", tags: ["Backend"], dueDate: "10 Haz" },
    ],
  },
  {
    id: "inprogress", title: "Devam Ediyor", color: "amber", limit: 3,
    cards: [
      { id: "d8", title: "Arama bileşeni — komut paleti", description: "Fuzzy search + klavye navigasyonu.", priority: "high", tags: ["Frontend"], assignee: { name: "Can Ö" }, dueDate: "5 Haz" },
      { id: "d9", title: "Test coverage %80'e çıkarma", priority: "medium", tags: ["QA"], assignee: { name: "Ayşe K" } },
    ],
  },
  {
    id: "review", title: "Code Review", color: "violet",
    cards: [
      { id: "d10", title: "Pricing sayfası A/B testi", priority: "medium", tags: ["Frontend"], assignee: { name: "Mehmet D" }, dueDate: "3 Haz" },
      { id: "d11", title: "DB migration scripti v2.4", description: "Index optimizasyonu ve NULL sütun kaldırma.", priority: "high", tags: ["Backend"], assignee: { name: "Burak Y" } },
    ],
  },
  {
    id: "done", title: "Tamamlandı", color: "emerald",
    cards: [
      { id: "d12", title: "Login formu erişilebilirlik iyileştirmeleri", priority: "low", tags: ["A11Y"], assignee: { name: "Selin A" } },
      { id: "d13", title: "Dark mode token sistemi", priority: "medium", tags: ["Tasarım"] },
      { id: "d14", title: "CI/CD pipeline optimizasyonu", description: "Build süresi %40 kısaldı.", priority: "high", tags: ["DevOps"] },
    ],
  },
];

/* ─── Dataset 2: Oyun Geliştirme ────────────────────────────── */

const GAME_COLUMNS: KanbanColumn[] = [
  {
    id: "g-ideas", title: "Fikirler", color: "slate",
    cards: [
      { id: "g1", title: "Boss savaşı — Ejderha Lordu", description: "3 fazlı boss, özel animasyonlar ve drop tablosu.", priority: "medium", tags: ["Oyun Tasarımı"] },
      { id: "g2", title: "Crafting sistemi v2", description: "Recipe ağacı, materyal kombinasyonları.", priority: "low", tags: ["Sistem"] },
      { id: "g3", title: "Multiplayer lobi ekranı", priority: "high", tags: ["UI", "Network"] },
    ],
  },
  {
    id: "g-todo", title: "Sprint'e Al", color: "blue",
    cards: [
      { id: "g4", title: "Karakter skill ağacı UI", description: "Passive + active skill düğümleri, tooltip ile.", priority: "high", tags: ["UI"], assignee: { name: "Alp K" }, dueDate: "14 Haz" },
      { id: "g5", title: "Ses motoru entegrasyonu", description: "FMOD ile ambient + efekt katmanlaması.", priority: "critical", tags: ["Audio"], dueDate: "10 Haz" },
    ],
  },
  {
    id: "g-dev", title: "Geliştiriliyor", color: "amber", limit: 3,
    cards: [
      { id: "g6", title: "Procedural zindan üreteci", description: "BSP ağaç algoritması, oda bağlantıları.", priority: "critical", tags: ["Algoritma"], assignee: { name: "Ece T" } },
      { id: "g7", title: "NPC diyalog sistemi", description: "Branching dialog + lokalizasyon desteği.", priority: "high", tags: ["Sistem"], assignee: { name: "Deniz M" } },
    ],
  },
  {
    id: "g-qa", title: "QA & Playtesting", color: "violet",
    cards: [
      { id: "g8", title: "Denge testi — silah hasarları", description: "PvP ve PvE için ayrı multiplier.", priority: "high", tags: ["Balancing"], assignee: { name: "Alp K" } },
    ],
  },
  {
    id: "g-done", title: "Shipped", color: "emerald",
    cards: [
      { id: "g9", title: "Ana menü animasyonları", priority: "medium", tags: ["UI", "Animasyon"] },
      { id: "g10", title: "Çarpışma algılama optimizasyonu", description: "Framerate %15 iyileşti.", priority: "high", tags: ["Performans"] },
      { id: "g11", title: "Oyun içi ekonomi tasarımı", description: "Altın kazanım eğrileri ve dengeleme.", priority: "medium", tags: ["Oyun Tasarımı"] },
    ],
  },
];

/* ─── Dataset 3: İçerik Üretimi / Medya ─────────────────────── */

const CONTENT_COLUMNS: KanbanColumn[] = [
  {
    id: "ct-ideas", title: "İçerik Fikirleri", color: "slate",
    cards: [
      { id: "ct1", title: '"Next.js 15 ile SSR" makale serisi', description: "4 bölümlük deep-dive serisi.", priority: "medium", tags: ["Yazı", "Teknik"] },
      { id: "ct2", title: "Figma → Kod canlı yayın", description: "Tasarımdan component'a gerçek zamanlı.", priority: "low", tags: ["Video"] },
      { id: "ct3", title: "UI kütüphanesi karşılaştırma videosu", priority: "high", tags: ["Video", "Araştırma"] },
    ],
  },
  {
    id: "ct-script", title: "Yazılıyor", color: "blue", limit: 3,
    cards: [
      { id: "ct4", title: "TypeScript generic'leri açıklayan rehber", description: "Başlangıç seviyesi, görseller hazır.", priority: "high", tags: ["Yazı"], assignee: { name: "Buse Y" }, dueDate: "9 Haz" },
      { id: "ct5", title: "Tailwind CSS best practices", description: "Do & don't örnekleri ile.", priority: "medium", tags: ["Yazı"], assignee: { name: "Kaan S" } },
    ],
  },
  {
    id: "ct-prod", title: "Üretimde", color: "amber", limit: 2,
    cards: [
      { id: "ct6", title: '"React state yönetimi 2026" video kaydı', description: "Zustand, Jotai ve Context karşılaştırması.", priority: "critical", tags: ["Video"], assignee: { name: "Buse Y" }, dueDate: "7 Haz" },
    ],
  },
  {
    id: "ct-edit", title: "Düzenleme", color: "violet",
    cards: [
      { id: "ct7", title: "CSS grid masterclass — montaj", description: "1h raw footage → 22 dakika final.", priority: "high", tags: ["Video"], assignee: { name: "Tarık D" } },
    ],
  },
  {
    id: "ct-pub", title: "Yayınlandı", color: "emerald",
    cards: [
      { id: "ct8", title: '"Bento grid" tasarım kılavuzu', description: "3.2k görüntüleme, 340 paylaşım.", priority: "medium", tags: ["Yazı"] },
      { id: "ct9", title: "Framer Motion tutorial", description: "En çok izlenen video — 14k view.", priority: "high", tags: ["Video"] },
    ],
  },
];

/* ─── Dataset 4: Startup Launch ─────────────────────────────── */

const LAUNCH_COLUMNS: KanbanColumn[] = [
  {
    id: "l-todo", title: "Yapılacak", color: "blue",
    cards: [
      { id: "l1", title: "Landing page copywriting", description: "Headline, subheadline ve feature metinleri.", priority: "high", tags: ["Pazarlama"], assignee: { name: "İpek A" } },
      { id: "l2", title: "Stripe ödeme entegrasyonu", priority: "critical", tags: ["Backend"], dueDate: "6 Haz" },
      { id: "l3", title: "KVKK ve gizlilik politikası", priority: "medium", tags: ["Hukuki"] },
    ],
  },
  {
    id: "l-wip", title: "Devam Ediyor", color: "amber", limit: 4,
    cards: [
      { id: "l4", title: "Product Hunt lansman materyalleri", description: "Banner, thumbnail ve açıklama metni.", priority: "critical", tags: ["Pazarlama"], assignee: { name: "İpek A" }, dueDate: "8 Haz" },
      { id: "l5", title: "Beta kullanıcı onboarding akışı", description: "3 adımlı karşılama e-postası serisi.", priority: "high", tags: ["Ürün"], assignee: { name: "Ozan B" } },
      { id: "l6", title: "Performans optimizasyonu", description: "Core Web Vitals — LCP < 2.5s hedefi.", priority: "high", tags: ["Teknik"] },
    ],
  },
  {
    id: "l-review", title: "İnceleme", color: "violet",
    cards: [
      { id: "l7", title: "SEO meta tagları ve sitemap", priority: "medium", tags: ["SEO"], assignee: { name: "Ozan B" } },
      { id: "l8", title: "Erişilebilirlik denetimi", description: "WCAG 2.1 AA uyumluluğu.", priority: "high", tags: ["A11Y"] },
    ],
  },
  {
    id: "l-done", title: "Hazır", color: "emerald",
    cards: [
      { id: "l9", title: "Domain ve SSL kurulumu", priority: "critical", tags: ["DevOps"] },
      { id: "l10", title: "Analytics kurulumu (GA4 + Mixpanel)", priority: "medium", tags: ["Analitik"] },
      { id: "l11", title: "Error monitoring (Sentry)", priority: "high", tags: ["DevOps"] },
    ],
  },
];

/* ─── Dataset 5: Tasarım Sprint ─────────────────────────────── */

const DESIGN_COLUMNS: KanbanColumn[] = [
  {
    id: "ds-research", title: "Araştırma", color: "slate",
    cards: [
      { id: "ds1", title: "Rakip ürün analizi", description: "6 rakibin UX pattern karşılaştırması.", priority: "high", tags: ["UX Araştırma"] },
      { id: "ds2", title: "Kullanıcı görüşmeleri — 8 katılımcı", priority: "medium", tags: ["User Research"], assignee: { name: "Naz B" } },
    ],
  },
  {
    id: "ds-define", title: "Tanımlama", color: "blue",
    cards: [
      { id: "ds3", title: "Persona kartları oluşturma", description: "3 ana persona + yolculuk haritası.", priority: "high", tags: ["UX"], assignee: { name: "Naz B" } },
      { id: "ds4", title: "Problem statement workshop", priority: "medium", tags: ["Workshop"], dueDate: "11 Haz" },
    ],
  },
  {
    id: "ds-design", title: "Tasarım", color: "violet", limit: 3,
    cards: [
      { id: "ds5", title: "Wireframe — onboarding akışı", description: "Low-fi, 12 ekran.", priority: "critical", tags: ["UI"], assignee: { name: "Serra K" }, dueDate: "8 Haz" },
      { id: "ds6", title: "Design system güncellemesi", description: "Yeni token yapısı ve bileşen kütüphanesi.", priority: "high", tags: ["Design System"], assignee: { name: "Serra K" } },
      { id: "ds7", title: "Dark mode renk paleti", priority: "medium", tags: ["UI"] },
    ],
  },
  {
    id: "ds-proto", title: "Prototipleme", color: "amber",
    cards: [
      { id: "ds8", title: "Interaktif mobil prototip", description: "Figma + smart animate.", priority: "high", tags: ["Prototip"], assignee: { name: "Serra K" } },
    ],
  },
  {
    id: "ds-test", title: "Usability Test", color: "rose",
    cards: [
      { id: "ds9", title: "A/B testi — CTA rengi", description: "Mavi vs yeşil — dönüşüm oranı.", priority: "medium", tags: ["Test"] },
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function KanbanBoardShowcase() {
  const [activeBoard, setActiveBoard] = useState<"dev" | "game" | "content" | "launch" | "design">("dev");

  const boards = {
    dev:     { label: "Yazılım Ekibi",    emoji: "💻", columns: DEV_COLUMNS },
    game:    { label: "Oyun Stüdyosu",    emoji: "🎮", columns: GAME_COLUMNS },
    content: { label: "İçerik Ekibi",     emoji: "🎬", columns: CONTENT_COLUMNS },
    launch:  { label: "Startup Launch",   emoji: "🚀", columns: LAUNCH_COLUMNS },
    design:  { label: "Tasarım Sprint",   emoji: "🎨", columns: DESIGN_COLUMNS },
  } as const;

  return (
    <div className="max-w-6xl space-y-12">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Kanban Board</h1>
        <p className="text-sm text-foreground-muted">
          Sürükle-bırak destekli kanban panosu. Öncelik seviyeleri, atanan kişi, etiketler, kolon limiti (WIP).
        </p>
      </div>

      {/* ── Çok Tema — Tek Bileşen ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">5 Farklı Ekip Senaryosu</h2>
            <p className="text-xs text-foreground-muted mt-0.5">Aynı bileşen, farklı içerik yapıları — sekmeye tıklayarak geçiş yapın.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(boards) as Array<keyof typeof boards>).map((k) => (
              <button
                key={k}
                onClick={() => setActiveBoard(k)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium transition-all border ${
                  activeBoard === k
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "border-border text-foreground-muted hover:text-foreground hover:border-border-strong"
                }`}
              >
                <span>{boards[k].emoji}</span>
                <span>{boards[k].label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Board etiket */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{boards[activeBoard].emoji}</span>
          <span className="text-sm font-semibold text-foreground">{boards[activeBoard].label}</span>
          <span className="text-xs text-foreground-muted">— Kartları kolonlar arası sürükleyip bırakabilirsiniz</span>
        </div>

        <div className="overflow-x-auto -mx-2 px-2 pb-2">
          <KanbanBoard key={activeBoard} columns={boards[activeBoard].columns} />
        </div>
      </section>

      <SectionDivider label="Kategoriye Özel Demolar" />

      {/* ── 1: Yazılım Takımı ── */}
      <ShowcaseSection
        title="💻 Yazılım Geliştirme Takımı"
        description="5 kolonlu klasik sprint panosu. Backlog → Review → Done akışı. Kolon limiti WIP'i kontrol eder."
        importLine={IMPORT}
        code={`const columns: KanbanColumn[] = [
  {
    id: "backlog", title: "Backlog", color: "slate",
    cards: [
      { id: "1", title: "API rate limiting", priority: "high",
        tags: ["Backend", "Güvenlik"] },
    ],
  },
  {
    id: "inprogress", title: "Devam Ediyor", color: "amber",
    limit: 3, // WIP limiti
    cards: [
      { id: "2", title: "Arama bileşeni", priority: "high",
        tags: ["Frontend"], assignee: { name: "Can Ö" },
        dueDate: "5 Haz" },
    ],
  },
  { id: "done", title: "Tamamlandı", color: "emerald", cards: [] },
];

<KanbanBoard columns={columns} onChange={setColumns} />`}
        previewClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <KanbanBoard columns={DEV_COLUMNS} />
        </div>
      </ShowcaseSection>

      {/* ── 2: Oyun Stüdyosu ── */}
      <ShowcaseSection
        title="🎮 Oyun Stüdyosu — Geliştirme Panosu"
        description="Oyun geliştirme sürecine uygun kolonlar: Fikirler → Sprint → Geliştiriliyor → QA → Shipped."
        importLine={IMPORT}
        code={`const columns: KanbanColumn[] = [
  {
    id: "ideas", title: "Fikirler", color: "slate",
    cards: [
      { id: "g1", title: "Boss savaşı — Ejderha Lordu",
        description: "3 fazlı boss, özel animasyonlar.",
        priority: "medium", tags: ["Oyun Tasarımı"] },
    ],
  },
  {
    id: "dev", title: "Geliştiriliyor", color: "amber", limit: 3,
    cards: [
      { id: "g2", title: "Procedural zindan üreteci",
        priority: "critical", tags: ["Algoritma"],
        assignee: { name: "Ece T" } },
    ],
  },
  { id: "shipped", title: "Shipped", color: "emerald", cards: [] },
];`}
        previewClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <KanbanBoard columns={GAME_COLUMNS} />
        </div>
      </ShowcaseSection>

      {/* ── 3: İçerik Üretimi ── */}
      <ShowcaseSection
        title="🎬 İçerik Ekibi — Yayın Takvimi"
        description="YouTube ve blog içerikleri için yaratıcı üretim akışı. Fikir → Script → Üretim → Düzenleme → Yayın."
        importLine={IMPORT}
        code={`const columns: KanbanColumn[] = [
  {
    id: "ideas", title: "İçerik Fikirleri", color: "slate",
    cards: [
      { id: "c1", title: '"Next.js 15 ile SSR" makale serisi',
        priority: "medium", tags: ["Yazı", "Teknik"] },
    ],
  },
  {
    id: "prod", title: "Üretimde", color: "amber", limit: 2,
    cards: [
      { id: "c2", title: "React state yönetimi 2026 video kaydı",
        priority: "critical", tags: ["Video"],
        assignee: { name: "Buse Y" }, dueDate: "7 Haz" },
    ],
  },
  { id: "pub", title: "Yayınlandı", color: "emerald", cards: [] },
];`}
        previewClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <KanbanBoard columns={CONTENT_COLUMNS} />
        </div>
      </ShowcaseSection>

      {/* ── 4: Startup Launch ── */}
      <ShowcaseSection
        title="🚀 Startup Lansman Hazırlığı"
        description="Product Hunt lansmanı için görev panosu. Pazarlama, teknik, hukuki ve analitik görevler tek yerde."
        importLine={IMPORT}
        code={`const columns: KanbanColumn[] = [
  {
    id: "todo", title: "Yapılacak", color: "blue",
    cards: [
      { id: "l1", title: "Stripe ödeme entegrasyonu",
        priority: "critical", tags: ["Backend"], dueDate: "6 Haz" },
      { id: "l2", title: "KVKK ve gizlilik politikası",
        priority: "medium", tags: ["Hukuki"] },
    ],
  },
  {
    id: "wip", title: "Devam Ediyor", color: "amber", limit: 4,
    cards: [
      { id: "l3", title: "Product Hunt lansman materyalleri",
        priority: "critical", tags: ["Pazarlama"],
        assignee: { name: "İpek A" }, dueDate: "8 Haz" },
    ],
  },
  { id: "ready", title: "Hazır", color: "emerald", cards: [] },
];`}
        previewClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <KanbanBoard columns={LAUNCH_COLUMNS} />
        </div>
      </ShowcaseSection>

      {/* ── 5: Tasarım Sprint ── */}
      <ShowcaseSection
        title="🎨 Tasarım Sprint Panosu"
        description="Double Diamond sürecine uygun 5 kolon: Araştırma → Tanımlama → Tasarım → Prototip → Test."
        importLine={IMPORT}
        code={`const columns: KanbanColumn[] = [
  {
    id: "research", title: "Araştırma", color: "slate",
    cards: [
      { id: "ds1", title: "Rakip ürün analizi",
        priority: "high", tags: ["UX Araştırma"] },
    ],
  },
  {
    id: "design", title: "Tasarım", color: "violet", limit: 3,
    cards: [
      { id: "ds2", title: "Wireframe — onboarding akışı",
        priority: "critical", tags: ["UI"],
        assignee: { name: "Serra K" }, dueDate: "8 Haz" },
    ],
  },
  { id: "test", title: "Usability Test", color: "rose", cards: [] },
];`}
        previewClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <KanbanBoard columns={DESIGN_COLUMNS} />
        </div>
      </ShowcaseSection>

      <SectionDivider label="Özellikler" />

      {/* ── WIP Limiti ── */}
      <ShowcaseSection
        title="WIP Limiti (Kolon Limiti)"
        description="limit prop ile kolona maksimum kart sayısı atanır. Limit aşıldığında sayaç kırmızıya döner — kanban disiplinini korur."
        importLine={IMPORT}
        code={`// limit: 2 → 3. kart eklenince sayaç kırmızı olur
const columns: KanbanColumn[] = [
  {
    id: "wip", title: "Devam Ediyor",
    color: "amber",
    limit: 2,  // ← WIP limiti
    cards: [
      { id: "a", title: "Task A", priority: "high" },
      { id: "b", title: "Task B", priority: "medium" },
      { id: "c", title: "Task C — limit aşıldı! 🔴", priority: "critical" },
    ],
  },
];`}
      >
        <KanbanBoard
          columns={[
            {
              id: "wip-demo", title: "Devam Ediyor", color: "amber", limit: 2,
              cards: [
                { id: "w1", title: "Ödeme sayfası yenileme", priority: "high", tags: ["Frontend"], assignee: { name: "Zeynep Ç" } },
                { id: "w2", title: "E-posta doğrulama akışı", priority: "medium", tags: ["Backend"], assignee: { name: "Burak Y" } },
                { id: "w3", title: "Bildirim merkezi — limit aşıldı!", priority: "critical", tags: ["Frontend"] },
              ],
            },
            {
              id: "wip-done", title: "Tamamlandı", color: "emerald",
              cards: [
                { id: "w4", title: "Buraya sürükle →", priority: "low" },
              ],
            },
          ]}
        />
      </ShowcaseSection>

      {/* ── Öncelik Seviyeleri ── */}
      <ShowcaseSection
        title="Öncelik Seviyeleri"
        description="4 seviyeli öncelik sistemi: low, medium, high, critical. Her biri farklı renk badge ile gösterilir."
        importLine={IMPORT}
        code={`// priority değerleri: "low" | "medium" | "high" | "critical"
const cards = [
  { id: "1", title: "Düşük öncelik",    priority: "low" },
  { id: "2", title: "Orta öncelik",     priority: "medium" },
  { id: "3", title: "Yüksek öncelik",  priority: "high" },
  { id: "4", title: "Kritik!",          priority: "critical" },
];`}
      >
        <KanbanBoard
          columns={[
            {
              id: "prio", title: "Öncelik Örnekleri", color: "blue",
              cards: [
                { id: "p1", title: "Dokümantasyon güncellemesi", description: "README ve API docs.", priority: "low", tags: ["Docs"] },
                { id: "p2", title: "UI performans iyileştirmeleri", description: "Re-render optimizasyonu.", priority: "medium", tags: ["Frontend"] },
                { id: "p3", title: "Güvenlik açığı yaması", description: "XSS koruması güçlendirme.", priority: "high", tags: ["Güvenlik"] },
                { id: "p4", title: "Ödeme sistemi kesintisi!", description: "Acil müdahale gerekiyor.", priority: "critical", tags: ["Prod Bug"], dueDate: "Bugün" },
              ],
            },
          ]}
        />
      </ShowcaseSection>

      {/* ── Kişi Atama ve Tarihler ── */}
      <ShowcaseSection
        title="Atanan Kişi ve Son Tarih"
        description="assignee ile kişi avatarı (baş harfler + renk), dueDate ile takvim ikonu gösterilir."
        importLine={IMPORT}
        code={`const cards = [
  {
    id: "1",
    title: "Landing page yeniden tasarımı",
    assignee: { name: "Serra K" },  // ← baş harflerden avatar üretilir
    dueDate: "15 Haz",              // ← takvim ikonu ile gösterilir
    priority: "high",
    tags: ["Tasarım"],
  },
  {
    id: "2",
    title: "Özel avatar — URL ile",
    assignee: {
      name: "Can Ö",
      avatar: "https://example.com/avatar.jpg",  // ← gerçek fotoğraf
    },
  },
];`}
      >
        <KanbanBoard
          columns={[
            {
              id: "assign", title: "Sprint 12", color: "violet",
              cards: [
                { id: "a1", title: "Landing page yeniden tasarımı", description: "Hero, feature ve pricing bölümleri.", priority: "high", tags: ["Tasarım"], assignee: { name: "Serra K" }, dueDate: "15 Haz" },
                { id: "a2", title: "Checkout akışı optimizasyonu", description: "3 adımdan 1'e indirilecek.", priority: "critical", tags: ["UX"], assignee: { name: "Naz B" }, dueDate: "8 Haz" },
                { id: "a3", title: "API dokümantasyonu", priority: "medium", tags: ["Backend"], assignee: { name: "Burak Y" } },
                { id: "a4", title: "Kullanıcı araştırması raporu", priority: "low", tags: ["Araştırma"], assignee: { name: "İpek A" }, dueDate: "20 Haz" },
              ],
            },
          ]}
        />
      </ShowcaseSection>

      {/* ── Renk Paleti ── */}
      <ShowcaseSection
        title="Kolon Renkleri"
        description="6 hazır renk seçeneği: slate, blue, violet, amber, emerald, rose. Her renk kolon başlığındaki noktayı renklendirir."
        importLine={IMPORT}
        code={`// color: "slate" | "blue" | "violet" | "amber" | "emerald" | "rose"
const columns = [
  { id: "c1", title: "Slate",   color: "slate",   cards: [...] },
  { id: "c2", title: "Blue",    color: "blue",    cards: [...] },
  { id: "c3", title: "Violet",  color: "violet",  cards: [...] },
  { id: "c4", title: "Amber",   color: "amber",   cards: [...] },
  { id: "c5", title: "Emerald", color: "emerald", cards: [...] },
  { id: "c6", title: "Rose",    color: "rose",    cards: [...] },
];`}
        previewClassName="overflow-x-auto"
      >
        <div className="overflow-x-auto -mx-2 px-2">
          <KanbanBoard
            columns={[
              { id: "col-slate",   title: "Slate",   color: "slate",   cards: [{ id: "r1", title: "Planlama aşaması", priority: "low" }] },
              { id: "col-blue",    title: "Blue",    color: "blue",    cards: [{ id: "r2", title: "Başlamaya hazır", priority: "medium" }] },
              { id: "col-violet",  title: "Violet",  color: "violet",  cards: [{ id: "r3", title: "İnceleme bekliyor", priority: "high" }] },
              { id: "col-amber",   title: "Amber",   color: "amber",   cards: [{ id: "r4", title: "Aktif çalışma", priority: "high" }] },
              { id: "col-emerald", title: "Emerald", color: "emerald", cards: [{ id: "r5", title: "Tamamlandı ✓", priority: "low" }] },
              { id: "col-rose",    title: "Rose",    color: "rose",    cards: [{ id: "r6", title: "Kritik / Acil", priority: "critical" }] },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* ── Minimal 2 Kolon ── */}
      <ShowcaseSection
        title="Minimal — 2 Kolon"
        description="Basit Yapılacak / Tamamlandı ikilisi. Kişisel görev takibi veya küçük projeler için yeterli."
        importLine={IMPORT}
        code={`<KanbanBoard
  columns={[
    {
      id: "todo", title: "Yapılacak", color: "blue",
      cards: [
        { id: "1", title: "Blog yazısı yaz", priority: "medium" },
        { id: "2", title: "PR açıklamalarını güncelle", priority: "low" },
      ],
    },
    {
      id: "done", title: "Tamamlandı", color: "emerald",
      cards: [
        { id: "3", title: "Bağımlılıkları güncelle", priority: "low" },
      ],
    },
  ]}
/>`}
      >
        <KanbanBoard
          columns={[
            {
              id: "m-todo", title: "Yapılacak", color: "blue",
              cards: [
                { id: "m1", title: "Blog yazısı — Kanban best practices", priority: "medium", tags: ["Yazı"] },
                { id: "m2", title: "PR açıklama şablonu hazırla", priority: "low" },
                { id: "m3", title: "Haftalık ekip toplantısı ajandası", priority: "medium", dueDate: "9 Haz" },
              ],
            },
            {
              id: "m-done", title: "Tamamlandı", color: "emerald",
              cards: [
                { id: "m4", title: "Bağımlılıkları güncelle (npm audit)", priority: "low", tags: ["DevOps"] },
                { id: "m5", title: "Kod review standartları belgesi", priority: "medium" },
              ],
            },
          ]}
        />
      </ShowcaseSection>

      <SectionDivider label="API Referansı" />

      {/* Props Tablosu */}
      <section className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">KanbanBoard Props</h3>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-border">
            <table className="w-full text-sm text-left">
              <thead className="bg-background-muted border-b border-border">
                <tr>{["Prop", "Tip", "Varsayılan", "Açıklama"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["columns",   "KanbanColumn[]",          "—",         "Kolon ve kart listesi (zorunlu)"],
                  ["onChange",  "(columns: KanbanColumn[]) => void", "—", "Kart taşındığında çağrılır"],
                  ["className", "string",                  "—",         "Wrapper'a eklenen CSS sınıfı"],
                ].map(([p, t, d, desc]) => (
                  <tr key={p} className="hover:bg-background-muted/50">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{p}</td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground-muted">{t}</td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground-subtle">{d}</td>
                    <td className="px-4 py-3 text-xs text-foreground-muted">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">KanbanColumn Alanları</h3>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-border">
            <table className="w-full text-sm text-left">
              <thead className="bg-background-muted border-b border-border">
                <tr>{["Alan", "Tip", "Zorunlu", "Açıklama"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["id",    "string",        "✓", "Benzersiz kolon kimliği"],
                  ["title", "string",        "✓", "Kolon başlığı"],
                  ["cards", "KanbanCard[]",  "✓", "Kart listesi"],
                  ["color", "KanbanColor",   "—", "Başlık rengi: slate · blue · violet · amber · emerald · rose"],
                  ["limit", "number",        "—", "Maksimum kart sayısı (WIP limiti)"],
                ].map(([a, t, z, desc]) => (
                  <tr key={a} className="hover:bg-background-muted/50">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{a}</td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground-muted">{t}</td>
                    <td className="px-4 py-3 text-xs text-center">{z === "✓" ? <span className="text-success font-bold">✓</span> : <span className="text-foreground-subtle">—</span>}</td>
                    <td className="px-4 py-3 text-xs text-foreground-muted">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">KanbanCard Alanları</h3>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-border">
            <table className="w-full text-sm text-left">
              <thead className="bg-background-muted border-b border-border">
                <tr>{["Alan", "Tip", "Zorunlu", "Açıklama"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["id",          "string",                               "✓", "Benzersiz kart kimliği"],
                  ["title",       "string",                               "✓", "Kart başlığı"],
                  ["description", "string",                               "—", "Alt açıklama (2 satır ile sınırlandırılır)"],
                  ["priority",    '"low" | "medium" | "high" | "critical"', "—", "Öncelik seviyesi — renkli badge gösterir"],
                  ["tags",        "string[]",                             "—", "Etiket listesi — primary rengiyle pill gösterir"],
                  ["assignee",    "{ name: string; avatar?: string }",    "—", "Atanan kişi — baş harften avatar üretilir"],
                  ["dueDate",     "string",                               "—", "Son tarih metni (ör: '15 Haz')"],
                ].map(([a, t, z, desc]) => (
                  <tr key={a} className="hover:bg-background-muted/50">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{a}</td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground-muted">{t}</td>
                    <td className="px-4 py-3 text-xs text-center">{z === "✓" ? <span className="text-success font-bold">✓</span> : <span className="text-foreground-subtle">—</span>}</td>
                    <td className="px-4 py-3 text-xs text-foreground-muted">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
