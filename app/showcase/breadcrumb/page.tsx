import { Breadcrumb } from "@/components/ui/breadcrumb";

function HomeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function BreadcrumbShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Breadcrumb</h1>
        <p className="text-foreground-muted">
          chevron · slash · özel separator · icon · maxItems ile collapse · a11y (nav, aria-current)
        </p>
      </div>

      <Section title="Chevron (Varsayılan)">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "#" },
            { label: "Kategoriler", href: "#" },
            { label: "Elektronik", href: "#" },
            { label: "Telefonlar" },
          ]}
        />
      </Section>

      <Section title="Slash Separator">
        <Breadcrumb
          separator="slash"
          items={[
            { label: "Ana Sayfa", href: "#" },
            { label: "Projeler", href: "#" },
            { label: "UI Library" },
          ]}
        />
      </Section>

      <Section title="İkon ile">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "#", icon: <HomeIcon /> },
            { label: "Ayarlar", href: "#" },
            { label: "Güvenlik" },
          ]}
        />
      </Section>

      <Section title="maxItems ile Collapse">
        <Breadcrumb
          maxItems={3}
          items={[
            { label: "Ana Sayfa", href: "#" },
            { label: "Kategoriler", href: "#" },
            { label: "Elektronik", href: "#" },
            { label: "Bilgisayarlar", href: "#" },
            { label: "Dizüstü", href: "#" },
            { label: "Gaming" },
          ]}
        />
      </Section>

      <Section title="Özel Separator">
        <Breadcrumb
          separator={<span className="text-foreground-subtle">›</span>}
          items={[
            { label: "Docs", href: "#" },
            { label: "Components", href: "#" },
            { label: "Breadcrumb" },
          ]}
        />
      </Section>
    </div>
  );
}
