import { Spinner } from "@/components/ui/spinner";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Spinner } from "@/components/ui/spinner";`;

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

      <ShowcaseSection
        title="Variants"
        description="circle, ring, dots, bars ve pulse animasyon çeşitleri."
        importLine={IMPORT}
        code={`<Spinner variant="circle" size="lg" />
<Spinner variant="ring"   size="lg" />
<Spinner variant="dots"   size="lg" />
<Spinner variant="bars"   size="lg" />
<Spinner variant="pulse"  size="lg" />`}
        previewClassName="flex flex-wrap items-center gap-6"
      >
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes (circle)"
        description="xs, sm, md, lg ve xl boyut seçenekleri."
        importLine={IMPORT}
        code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        previewClassName="flex flex-wrap items-center gap-6"
      >
        <LabeledItem label="xs"><Spinner size="xs" /></LabeledItem>
        <LabeledItem label="sm"><Spinner size="sm" /></LabeledItem>
        <LabeledItem label="md"><Spinner size="md" /></LabeledItem>
        <LabeledItem label="lg"><Spinner size="lg" /></LabeledItem>
        <LabeledItem label="xl"><Spinner size="xl" /></LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes (dots)"
        description="dots variant için boyut seçenekleri."
        importLine={IMPORT}
        code={`<Spinner variant="dots" size="xs" />
<Spinner variant="dots" size="sm" />
<Spinner variant="dots" size="md" />
<Spinner variant="dots" size="lg" />
<Spinner variant="dots" size="xl" />`}
        previewClassName="flex flex-wrap items-center gap-6"
      >
        <LabeledItem label="xs"><Spinner variant="dots" size="xs" /></LabeledItem>
        <LabeledItem label="sm"><Spinner variant="dots" size="sm" /></LabeledItem>
        <LabeledItem label="md"><Spinner variant="dots" size="md" /></LabeledItem>
        <LabeledItem label="lg"><Spinner variant="dots" size="lg" /></LabeledItem>
        <LabeledItem label="xl"><Spinner variant="dots" size="xl" /></LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Renkler"
        description="primary, secondary, success, danger, warning, current ve white renk seçenekleri."
        importLine={IMPORT}
        code={`<Spinner color="primary"   size="lg" />
<Spinner color="secondary" size="lg" />
<Spinner color="success"   size="lg" />
<Spinner color="danger"    size="lg" />
<Spinner color="warning"   size="lg" />
<Spinner color="current"   size="lg" className="text-pink-500" />
<Spinner color="white"     size="lg" />`}
        previewClassName="flex flex-wrap items-center gap-6"
      >
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Örnek Kullanım"
        description="Buton içi, tam sayfa loader ve satır içi kullanım örnekleri."
        importLine={IMPORT}
        code={`// Buton içi
<button disabled>
  <Spinner size="sm" color="white" />
  Kaydediliyor...
</button>

// Tam sayfa loader
<div className="flex flex-col items-center gap-3">
  <Spinner size="xl" variant="ring" />
  <p>İçerik yükleniyor...</p>
</div>

// Satır içi
<div className="flex items-center gap-2">
  <Spinner size="xs" color="secondary" />
  <span>Veriler senkronize ediliyor</span>
</div>`}
      >
        <div className="flex flex-col gap-4">
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

          <div className="relative h-36 flex items-center justify-center border border-border rounded-[var(--radius-lg)] bg-surface">
            <div className="flex flex-col items-center gap-3">
              <Spinner size="xl" variant="ring" />
              <p className="text-sm text-foreground-muted">İçerik yükleniyor...</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <Spinner size="xs" color="secondary" />
            <span>Veriler senkronize ediliyor</span>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
