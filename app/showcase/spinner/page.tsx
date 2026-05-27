import { Spinner } from "@/components/ui/spinner";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </section>
  );
}

function LabeledItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-xs text-foreground-muted">{label}</span>
    </div>
  );
}

export default function SpinnerShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Spinner</h1>
        <p className="text-foreground-muted">
          5 variant · 5 size · 7 renk · erişilebilir (role=status, sr-only label)
        </p>
      </div>

      {/* Variants */}
      <Section title="Variants">
        <LabeledItem label="circle">
          <Spinner variant="circle" size="lg" />
        </LabeledItem>
        <LabeledItem label="ring">
          <Spinner variant="ring" size="lg" />
        </LabeledItem>
        <LabeledItem label="dots">
          <Spinner variant="dots" size="lg" />
        </LabeledItem>
        <LabeledItem label="bars">
          <Spinner variant="bars" size="lg" />
        </LabeledItem>
        <LabeledItem label="pulse">
          <Spinner variant="pulse" size="lg" />
        </LabeledItem>
      </Section>

      {/* Sizes */}
      <Section title="Sizes (circle)">
        <LabeledItem label="xs"><Spinner size="xs" /></LabeledItem>
        <LabeledItem label="sm"><Spinner size="sm" /></LabeledItem>
        <LabeledItem label="md"><Spinner size="md" /></LabeledItem>
        <LabeledItem label="lg"><Spinner size="lg" /></LabeledItem>
        <LabeledItem label="xl"><Spinner size="xl" /></LabeledItem>
      </Section>

      {/* Sizes dots */}
      <Section title="Sizes (dots)">
        <LabeledItem label="xs"><Spinner variant="dots" size="xs" /></LabeledItem>
        <LabeledItem label="sm"><Spinner variant="dots" size="sm" /></LabeledItem>
        <LabeledItem label="md"><Spinner variant="dots" size="md" /></LabeledItem>
        <LabeledItem label="lg"><Spinner variant="dots" size="lg" /></LabeledItem>
        <LabeledItem label="xl"><Spinner variant="dots" size="xl" /></LabeledItem>
      </Section>

      {/* Renkler */}
      <Section title="Renkler">
        <LabeledItem label="primary">  <Spinner color="primary"   size="lg" /></LabeledItem>
        <LabeledItem label="secondary"><Spinner color="secondary" size="lg" /></LabeledItem>
        <LabeledItem label="success">  <Spinner color="success"   size="lg" /></LabeledItem>
        <LabeledItem label="danger">   <Spinner color="danger"    size="lg" /></LabeledItem>
        <LabeledItem label="warning">  <Spinner color="warning"   size="lg" /></LabeledItem>
        <LabeledItem label="current">  <Spinner color="current"   size="lg" className="text-pink-500" /></LabeledItem>
        <LabeledItem label="white">
          <div className="bg-primary rounded-lg p-2">
            <Spinner color="white" size="lg" />
          </div>
        </LabeledItem>
      </Section>

      {/* Gerçek kullanım örnekleri */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
          Örnek Kullanım
        </h2>
        <div className="flex flex-col gap-4">

          {/* Buton içi */}
          <div className="flex flex-wrap gap-3">
            <button
              disabled
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium opacity-80 cursor-not-allowed"
            >
              <Spinner size="sm" color="white" />
              Kaydediliyor...
            </button>
            <button
              disabled
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[var(--radius-md)] border border-border bg-surface text-foreground text-sm font-medium opacity-80 cursor-not-allowed"
            >
              <Spinner size="sm" color="secondary" />
              Yükleniyor...
            </button>
          </div>

          {/* Tam sayfa loader */}
          <div className="relative h-36 flex items-center justify-center border border-border rounded-[var(--radius-lg)] bg-surface">
            <div className="flex flex-col items-center gap-3">
              <Spinner size="xl" variant="ring" />
              <p className="text-sm text-foreground-muted">İçerik yükleniyor...</p>
            </div>
          </div>

          {/* Satır içi */}
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <Spinner size="xs" color="secondary" />
            <span>Veriler senkronize ediliyor</span>
          </div>
        </div>
      </section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Spinner } from "@/components/ui/spinner";

// Temel
<Spinner />

// Variant + size + renk
<Spinner variant="ring" size="lg" color="success" />
<Spinner variant="dots" size="md" />
<Spinner variant="bars" size="sm" color="danger" />
<Spinner variant="pulse" size="xl" />

// Buton içi
<button disabled>
  <Spinner size="sm" color="white" />
  Kaydediliyor...
</button>

// Özel erişilebilirlik etiketi
<Spinner label="Kullanıcılar yükleniyor..." />`}
        </pre>
      </section>
    </div>
  );
}
