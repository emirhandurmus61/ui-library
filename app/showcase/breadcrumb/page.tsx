import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Breadcrumb } from "@/components/ui/breadcrumb";`;

function HomeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
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

      <ShowcaseSection
        title="Chevron (Varsayılan)"
        description="Varsayılan separator chevron ikon ile yol gösterimi."
        importLine={IMPORT}
        code={`<Breadcrumb
  items={[
    { label: "Ana Sayfa", href: "#" },
    { label: "Kategoriler", href: "#" },
    { label: "Elektronik", href: "#" },
    { label: "Telefonlar" },
  ]}
/>`}
      >
        <div className="space-y-4">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "#" },
              { label: "Kategoriler", href: "#" },
              { label: "Elektronik", href: "#" },
              { label: "Telefonlar" },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Slash Separator"
        description='separator="slash" ile eğik çizgi ayırıcı kullanılır.'
        importLine={IMPORT}
        code={`<Breadcrumb
  separator="slash"
  items={[
    { label: "Ana Sayfa", href: "#" },
    { label: "Projeler", href: "#" },
    { label: "UI Library" },
  ]}
/>`}
      >
        <Breadcrumb
          separator="slash"
          items={[
            { label: "Ana Sayfa", href: "#" },
            { label: "Projeler", href: "#" },
            { label: "UI Library" },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="İkon ile"
        description="Maddelere icon prop ekleyerek ikon+metin kombinasyonu elde edilir."
        importLine={IMPORT}
        code={`<Breadcrumb
  items={[
    { label: "Ana Sayfa", href: "#", icon: <HomeIcon /> },
    { label: "Ayarlar", href: "#" },
    { label: "Güvenlik" },
  ]}
/>`}
      >
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "#", icon: <HomeIcon /> },
            { label: "Ayarlar", href: "#" },
            { label: "Güvenlik" },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="maxItems ile Collapse"
        description="maxItems aşıldığında ortadaki maddeler … olarak gizlenir."
        importLine={IMPORT}
        code={`<Breadcrumb
  maxItems={3}
  items={[
    { label: "Ana Sayfa", href: "#" },
    { label: "Kategoriler", href: "#" },
    { label: "Elektronik", href: "#" },
    { label: "Bilgisayarlar", href: "#" },
    { label: "Dizüstü", href: "#" },
    { label: "Gaming" },
  ]}
/>`}
      >
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Separator"
        description="separator prop'una herhangi bir ReactNode geçilebilir."
        importLine={IMPORT}
        code={`<Breadcrumb
  separator={<span className="text-foreground-subtle">›</span>}
  items={[
    { label: "Docs", href: "#" },
    { label: "Components", href: "#" },
    { label: "Breadcrumb" },
  ]}
/>`}
      >
        <Breadcrumb
          separator={<span className="text-foreground-subtle">›</span>}
          items={[
            { label: "Docs", href: "#" },
            { label: "Components", href: "#" },
            { label: "Breadcrumb" },
          ]}
        />
      </ShowcaseSection>
    </div>
  );
}
