import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">{title}</h2>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </section>
  );
}

export default function BadgeShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Badge</h1>
        <p className="text-foreground-muted text-sm">
          8 variant · 3 size · 4 stylePreset · dot (status) · icon desteği
        </p>
      </div>

      {/* ── Variants ───────────────────────────────────────────── */}
      <Section title="Variants">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="solid">Solid</Badge>
      </Section>

      {/* ── Sizes ──────────────────────────────────────────────── */}
      <Section title="Sizes">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </Section>

      {/* ── Dot ────────────────────────────────────────────────── */}
      <Section title="Status (Dot)">
        <Badge variant="success" dot dotColor="success">Aktif</Badge>
        <Badge variant="danger" dot dotColor="danger">Pasif</Badge>
        <Badge variant="warning" dot dotColor="warning">Beklemede</Badge>
        <Badge variant="info" dot dotColor="info">İşleniyor</Badge>
        <Badge variant="secondary" dot dotColor="muted">Kapalı</Badge>
      </Section>

      {/* ── Stil Presetleri ────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
          Stil Presetleri
        </h2>
        <div className="space-y-6">

          <ShowcaseSection
            title="gradient"
            description="Primary → Violet yatay gradient. Öne çıkan içerik için."
            previewClassName="flex flex-wrap items-center gap-3"
            code={`<Badge stylePreset="gradient">Yeni Özellik</Badge>
<Badge stylePreset="gradient" size="lg" leftIcon={<ZapIcon />}>Pro</Badge>`}
          >
            <Badge stylePreset="gradient">Yeni Özellik</Badge>
            <Badge stylePreset="gradient" size="sm">Beta</Badge>
            <Badge stylePreset="gradient" size="lg">Enterprise</Badge>
            <Badge stylePreset="gradient" size="lg" leftIcon={<ZapIcon />}>Pro Plan</Badge>
            <Badge stylePreset="gradient" leftIcon={<StarIcon />}>Öne Çıkan</Badge>
          </ShowcaseSection>

          <ShowcaseSection
            title="glow"
            description="Primary glow efekti. Koyu arka planlarda öne çıkar."
            previewClassName="flex flex-wrap items-center gap-3 bg-gray-950 px-6 py-4 rounded-[var(--radius-xl)]"
            code={`<Badge stylePreset="glow">Canlı</Badge>
<Badge stylePreset="glow" size="lg" leftIcon={<ZapIcon />}>Aktif</Badge>`}
          >
            <Badge stylePreset="glow">Canlı</Badge>
            <Badge stylePreset="glow" size="sm">Beta</Badge>
            <Badge stylePreset="glow" size="lg">Premium</Badge>
            <Badge stylePreset="glow" leftIcon={<ZapIcon />}>Aktif</Badge>
          </ShowcaseSection>

          <ShowcaseSection
            title="brutal"
            description="Siyah border + offset shadow, sert köşe. Brutalist / indie estetik."
            previewClassName="flex flex-wrap items-center gap-4"
            code={`<Badge stylePreset="brutal">New</Badge>
<Badge stylePreset="brutal" size="lg">v2.0</Badge>`}
          >
            <Badge stylePreset="brutal">New</Badge>
            <Badge stylePreset="brutal" size="sm">Beta</Badge>
            <Badge stylePreset="brutal" size="lg">v2.0</Badge>
            <Badge stylePreset="brutal" leftIcon={<CheckIcon />}>Onaylı</Badge>
            <Badge stylePreset="brutal" leftIcon={<XIcon />}>Reddedildi</Badge>
          </ShowcaseSection>

          <ShowcaseSection
            title="minimal"
            description="Sadece metin + alt çizgi. Tablo etiketleri ve dense UI için."
            previewClassName="flex flex-wrap items-center gap-5"
            code={`<Badge variant="primary" stylePreset="minimal">Başlangıç</Badge>
<Badge variant="success" stylePreset="minimal">Tamamlandı</Badge>`}
          >
            <Badge variant="primary" stylePreset="minimal">Başlangıç</Badge>
            <Badge variant="success" stylePreset="minimal">Tamamlandı</Badge>
            <Badge variant="danger" stylePreset="minimal">İptal</Badge>
            <Badge variant="warning" stylePreset="minimal">Beklemede</Badge>
            <Badge variant="info" stylePreset="minimal">İşleniyor</Badge>
          </ShowcaseSection>

        </div>
      </div>

      {/* ── İkon ile ───────────────────────────────────────────── */}
      <Section title="İkon ile">
        <Badge variant="success" leftIcon={<CheckIcon />}>Onaylandı</Badge>
        <Badge variant="danger" leftIcon={<XIcon />}>Reddedildi</Badge>
        <Badge variant="primary" leftIcon={<StarIcon />}>Öne Çıkan</Badge>
        <Badge variant="warning" rightIcon={<XIcon />}>İptal</Badge>
        <Badge variant="info" leftIcon={<ZapIcon />}>Hızlı</Badge>
      </Section>

      {/* ── Örnek kullanım ─────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
          Örnek Kullanım — Kullanıcı Tablosu
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { name: "Emirhan Durmuş", role: "Admin",  status: "active"   },
            { name: "Ayşe Kaya",     role: "Editör", status: "pending"  },
            { name: "Mehmet Yıldız", role: "Üye",    status: "inactive" },
          ].map((user) => (
            <div key={user.name} className="flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-[var(--radius-lg)]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{user.name}</span>
                <Badge variant="outline" size="sm">{user.role}</Badge>
              </div>
              {user.status === "active"   && <Badge variant="success"   dot dotColor="success" size="sm">Aktif</Badge>}
              {user.status === "pending"  && <Badge variant="warning"   dot dotColor="warning" size="sm">Beklemede</Badge>}
              {user.status === "inactive" && <Badge variant="secondary" dot dotColor="muted"   size="sm">Pasif</Badge>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
