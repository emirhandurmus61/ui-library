export default function ShowcasePage() {
  const phases = [
    { id: 0, label: "Altyapı", status: "done", count: null },
    { id: 1, label: "Primitive Bileşenler", status: "upcoming", count: 12 },
    { id: 2, label: "Layout", status: "upcoming", count: 7 },
    { id: 3, label: "Auth", status: "upcoming", count: 4 },
    { id: 4, label: "Feedback & Overlay", status: "upcoming", count: 5 },
    { id: 5, label: "Data Display", status: "upcoming", count: 9 },
    { id: 6, label: "Showcase Sistemi", status: "upcoming", count: null },
    { id: 7, label: "Sayfa Şablonları", status: "upcoming", count: 5 },
  ];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Genel Bakış</h1>
      <p className="text-foreground-muted mb-8">
        Bileşenler faz faz ekleniyor. Altyapı tamamlandı.
      </p>

      {/* Faz kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="border border-border rounded-lg p-4 bg-surface flex items-start gap-3"
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
                  ? "Tamamlandı"
                  : phase.count
                  ? `${phase.count} bileşen planlandı`
                  : "Planlandı"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Token önizleme */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Renk Tokenları
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "primary", bg: "bg-primary" },
            { label: "danger", bg: "bg-danger" },
            { label: "success", bg: "bg-success" },
            { label: "warning", bg: "bg-warning" },
            { label: "info", bg: "bg-info" },
            { label: "foreground", bg: "bg-foreground" },
            { label: "surface", bg: "bg-surface border border-border" },
            { label: "background-muted", bg: "bg-background-muted" },
            { label: "border", bg: "bg-border" },
          ].map(({ label, bg }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-md shrink-0 ${bg}`} />
              <span className="text-xs text-foreground-muted font-mono">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Tipografi
        </h2>
        <div className="space-y-3 border border-border rounded-lg p-5 bg-surface">
          <p className="text-3xl font-bold text-foreground">Heading 1</p>
          <p className="text-2xl font-semibold text-foreground">Heading 2</p>
          <p className="text-xl font-semibold text-foreground">Heading 3</p>
          <p className="text-base text-foreground">
            Body text — normal paragraf metni burada görünür.
          </p>
          <p className="text-sm text-foreground-muted">
            Small / muted metin buraya gelir.
          </p>
          <p className="text-xs text-foreground-subtle font-mono">
            Mono / kod metni: const x = 42;
          </p>
        </div>
      </div>
    </div>
  );
}
