import { Badge } from "@/components/ui/badge";

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </section>
  );
}

export default function BadgeShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Badge</h1>
        <p className="text-foreground-muted">
          8 variant · 3 size · dot (status) · icon desteği
        </p>
      </div>

      {/* Variants */}
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

      {/* Sizes */}
      <Section title="Sizes">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </Section>

      {/* Dot — status badge */}
      <Section title="Status (Dot)">
        <Badge variant="success" dot dotColor="success">Aktif</Badge>
        <Badge variant="danger" dot dotColor="danger">Pasif</Badge>
        <Badge variant="warning" dot dotColor="warning">Beklemede</Badge>
        <Badge variant="info" dot dotColor="info">İşleniyor</Badge>
        <Badge variant="secondary" dot dotColor="muted">Kapalı</Badge>
      </Section>

      {/* İkon ile */}
      <Section title="İkon ile">
        <Badge variant="success" leftIcon={<CheckIcon />}>Onaylandı</Badge>
        <Badge variant="danger" leftIcon={<XIcon />}>Reddedildi</Badge>
        <Badge variant="primary" leftIcon={<StarIcon />}>Öne Çıkan</Badge>
        <Badge variant="warning" rightIcon={<XIcon />}>İptal</Badge>
      </Section>

      {/* Gerçek kullanım senaryoları */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
          Örnek Kullanım
        </h2>
        <div className="flex flex-col gap-3">
          {/* Tablo satırı gibi */}
          {[
            { name: "Emirhan Durmuş", role: "Admin", status: "active" },
            { name: "Ayşe Kaya", role: "Editör", status: "pending" },
            { name: "Mehmet Yıldız", role: "Üye", status: "inactive" },
          ].map((user) => (
            <div
              key={user.name}
              className="flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{user.name}</span>
                <Badge variant="outline" size="sm">{user.role}</Badge>
              </div>
              {user.status === "active" && (
                <Badge variant="success" dot dotColor="success" size="sm">Aktif</Badge>
              )}
              {user.status === "pending" && (
                <Badge variant="warning" dot dotColor="warning" size="sm">Beklemede</Badge>
              )}
              {user.status === "inactive" && (
                <Badge variant="secondary" dot dotColor="muted" size="sm">Pasif</Badge>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Badge } from "@/components/ui/badge";

// Temel
<Badge variant="success">Onaylandı</Badge>

// Status dot
<Badge variant="success" dot dotColor="success">Aktif</Badge>

// İkon ile
<Badge variant="danger" leftIcon={<XIcon />}>Reddedildi</Badge>

// Size
<Badge size="lg" variant="primary">Büyük</Badge>`}
        </pre>
      </section>
    </div>
  );
}
