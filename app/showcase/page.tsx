import { CodeBlock } from "@/components/ui/code-block";

const phases = [
  { id: 0, label: "Altyapı",          status: "done",  count: null },
  { id: 1, label: "Primitive",         status: "done",  count: 11 },
  { id: 2, label: "Layout",            status: "done",  count: 6 },
  { id: 3, label: "Auth",              status: "done",  count: 4 },
  { id: 4, label: "Feedback & Overlay",status: "done",  count: 6 },
  { id: 5, label: "Data Display",      status: "done",  count: 9 },
  { id: 6, label: "Showcase Sistemi",  status: "done",  count: null },
  { id: 7, label: "Sayfa Şablonları",  status: "done",  count: 5 },
] as const;

const QUICK_START = `import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

export default function Example() {
  return (
    <Card variant="elevated">
      <CardHeader
        title="Merhaba Dünya"
        action={<Badge variant="success">Aktif</Badge>}
      />
      <Button leftIcon={<PlusIcon />}>Yeni Ekle</Button>
    </Card>
  );
}`;

export default function ShowcasePage() {
  const done  = phases.filter((p) => p.status === "done").length;
  const total = phases.length;

  return (
    <div className="max-w-3xl space-y-12">
      {/* Hero */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-[var(--radius-lg)] bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">U</span>
          <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">UI Library</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 leading-tight">
          Kişisel UI Bileşen Kütüphanesi
        </h1>
        <p className="text-foreground-muted text-base leading-relaxed">
          Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · CVA
        </p>

        {/* Progress bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-foreground-muted">
            <span>{done} / {total} faz tamamlandı</span>
            <span className="font-semibold text-foreground">{Math.round((done / total) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-background-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phase grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Fazlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`rounded-[var(--radius-xl)] border p-4 flex items-start gap-3 transition-colors ${
                phase.status === "done"
                  ? "border-success/20 bg-success-subtle/50"
                  : "border-border bg-surface"
              }`}
            >
              <span
                className={`mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                  phase.status === "done" ? "bg-success" : "bg-border"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Faz {phase.id} — {phase.label}
                </p>
                <p className="text-xs text-foreground-subtle mt-0.5">
                  {phase.status === "done"
                    ? phase.count
                      ? `${phase.count} bileşen · Tamamlandı ✓`
                      : "Tamamlandı ✓"
                    : phase.count
                    ? `${phase.count} bileşen planlandı`
                    : "Planlandı"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Hızlı Başlangıç</h2>
        <CodeBlock code={QUICK_START} lang="tsx" filename="app/page.tsx" />
      </div>

      {/* Token preview */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Renk Tokenları</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "primary",          bg: "bg-primary" },
            { label: "danger",           bg: "bg-danger" },
            { label: "success",          bg: "bg-success" },
            { label: "warning",          bg: "bg-warning" },
            { label: "info",             bg: "bg-info" },
            { label: "foreground",       bg: "bg-foreground" },
            { label: "surface",          bg: "bg-surface border border-border" },
            { label: "background-muted", bg: "bg-background-muted" },
            { label: "border",           bg: "bg-border" },
          ].map(({ label, bg }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-[var(--radius-md)] shrink-0 ${bg}`} />
              <span className="text-xs text-foreground-muted font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Tipografi</h2>
        <div className="space-y-3 border border-border rounded-[var(--radius-xl)] p-5 bg-surface">
          <p className="text-3xl font-bold text-foreground">Heading 1</p>
          <p className="text-2xl font-semibold text-foreground">Heading 2</p>
          <p className="text-xl font-semibold text-foreground">Heading 3</p>
          <p className="text-base text-foreground">Body text — normal paragraf metni burada görünür.</p>
          <p className="text-sm text-foreground-muted">Small / muted metin buraya gelir.</p>
          <p className="text-xs text-foreground-subtle font-mono">Mono / kod metni: const x = 42;</p>
        </div>
      </div>
    </div>
  );
}
