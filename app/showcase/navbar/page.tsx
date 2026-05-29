"use client";

import { NavbarMinimal, NavbarFull, NavbarSticky } from "@/components/ui/navbar";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { NavbarMinimal, NavbarFull, NavbarSticky } from "@/components/ui/navbar";`;

const LINKS = [
  { label: "Ürün", href: "#" },
  { label: "Özellikler", href: "#", active: true },
  { label: "Fiyatlandırma", href: "#" },
  { label: "Blog", href: "#" },
];

export default function NavbarShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Navbar</h1>
        <p className="text-foreground-muted">
          3 tasarım · tam responsive · mobil hamburger menü · avatar dropdown
        </p>
      </div>

      <ShowcaseSection
        title="1. Minimal"
        description="Logo + nav linkleri. Sağa rightSlot ile ek eleman eklenebilir."
        importLine={IMPORT}
        code={`<NavbarMinimal
  logoText="Minimal"
  links={links}
  rightSlot={
    <a href="#" className="inline-flex items-center h-8 px-3 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium">
      Başla
    </a>
  }
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarMinimal
            logoText="Minimal"
            links={LINKS}
            rightSlot={
              <a href="#" className="inline-flex items-center h-8 px-3 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors">
                Başla
              </a>
            }
          />
          <div className="px-6 py-8 text-sm text-foreground-muted text-center">
            ↑ Ekranı küçülterek hamburger menüyü test edin
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="2. Full — Giriş yapmamış kullanıcı"
        description="Logo + orta nav + sağda CTA butonu."
        importLine={IMPORT}
        code={`<NavbarFull
  logoText="MyApp"
  links={links}
  ctaLabel="Ücretsiz Dene"
  ctaHref="#"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarFull
            logoText="MyApp"
            links={LINKS}
            ctaLabel="Ücretsiz Dene"
            ctaHref="#"
          />
          <div className="px-6 py-8 text-sm text-foreground-muted text-center">
            CTA butonu görünür
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="3. Full — Giriş yapmış kullanıcı"
        description="CTA yerine avatar + dropdown menü gösterilir."
        importLine={IMPORT}
        code={`<NavbarFull
  logoText="MyApp"
  links={links}
  user={{ name: "Emirhan Durmuş", email: "emirhan@example.com" }}
  userMenuItems={[
    { label: "Profil", href: "#" },
    { label: "Ayarlar", href: "#" },
    { label: "Çıkış Yap", onClick: logout, danger: true, divider: true },
  ]}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarFull
            logoText="MyApp"
            links={LINKS}
            user={{
              name: "Emirhan Durmuş",
              email: "emirhan@example.com",
            }}
            userMenuItems={[
              { label: "Profil", href: "#" },
              { label: "Ayarlar", href: "#" },
              { label: "Yardım", href: "#" },
              { label: "Çıkış Yap", onClick: () => alert("Çıkış"), danger: true, divider: true },
            ]}
          />
          <div className="px-6 py-8 text-sm text-foreground-muted text-center">
            Avatar'a tıklayarak dropdown'ı açın
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="4. Sticky + Blur"
        description="Sayfanın tepesine sabitlenir. Scroll'da arka plan blur + border belirir. Rounded pill CTA butonu."
        importLine={IMPORT}
        code={`// Layout'un en üstüne koy — scroll'da blur efekti tetiklenir
<NavbarSticky
  logoText="Launch"
  links={links}
  ctaLabel="Ücretsiz Başla"
  secondaryLabel="Giriş Yap"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-br from-primary-subtle to-background h-48 relative">
          <NavbarSticky
            logoText="Launch"
            links={[
              { label: "Özellikler", href: "#" },
              { label: "Fiyat", href: "#", active: true },
              { label: "Hakkımızda", href: "#" },
            ]}
            ctaLabel="Ücretsiz Başla"
            secondaryLabel="Giriş Yap"
            className="!fixed-none !relative"
          />
          <p className="text-sm text-foreground-muted text-center pt-4">
            Gerçek kullanımda <code className="text-xs bg-background-muted px-1 py-0.5 rounded">{"<NavbarSticky />"}</code> sayfanın en üstüne konur — scroll'da blur efekti tetiklenir
          </p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
