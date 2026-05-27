"use client";

import { NavbarMinimal, NavbarFull, NavbarSticky } from "@/components/ui/navbar";

const LINKS = [
  { label: "Ürün", href: "#" },
  { label: "Özellikler", href: "#", active: true },
  { label: "Fiyatlandırma", href: "#" },
  { label: "Blog", href: "#" },
];

function PreviewFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-foreground-muted">{description}</p>
      </div>
      <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden bg-background-subtle">
        {children}
      </div>
    </section>
  );
}

export default function NavbarShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Navbar</h1>
        <p className="text-foreground-muted">
          3 tasarım · tam responsive · mobil hamburger menü · avatar dropdown
        </p>
      </div>

      {/* 1 — Minimal */}
      <PreviewFrame
        title="1. Minimal"
        description="Logo + nav linkleri. Sağa rightSlot ile ek eleman eklenebilir."
      >
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
      </PreviewFrame>

      {/* 2 — Full */}
      <PreviewFrame
        title="2. Full — Giriş yapmamış kullanıcı"
        description="Logo + orta nav + sağda CTA butonu."
      >
        <NavbarFull
          logoText="MyApp"
          links={LINKS}
          ctaLabel="Ücretsiz Dene"
          ctaHref="#"
        />
        <div className="px-6 py-8 text-sm text-foreground-muted text-center">
          CTA butonu görünür
        </div>
      </PreviewFrame>

      {/* 3 — Full + User */}
      <PreviewFrame
        title="3. Full — Giriş yapmış kullanıcı"
        description="CTA yerine avatar + dropdown menü gösterilir."
      >
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
      </PreviewFrame>

      {/* 4 — Sticky blur */}
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">4. Sticky + Blur</h2>
          <p className="text-sm text-foreground-muted">
            Sayfanın tepesine sabitlenir. Scroll'da arka plan blur + border belirir.
            Rounded pill CTA butonu.
          </p>
        </div>
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
      </section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import {
  NavbarMinimal,
  NavbarFull,
  NavbarSticky,
} from "@/components/ui/navbar";

const links = [
  { label: "Ürün", href: "/urun" },
  { label: "Fiyat", href: "/fiyat", active: true },
];

// Minimal — rightSlot ile ek eleman
<NavbarMinimal
  logoText="Brand"
  links={links}
  rightSlot={<Button size="sm">Başla</Button>}
/>

// Full — oturum açmamış
<NavbarFull logoText="MyApp" links={links} ctaLabel="Dene" />

// Full — oturum açmış (avatar + dropdown)
<NavbarFull
  logoText="MyApp"
  links={links}
  user={{ name: "Ali Veli", email: "ali@example.com" }}
  userMenuItems={[
    { label: "Profil", href: "/profil" },
    { label: "Çıkış", onClick: logout, danger: true, divider: true },
  ]}
/>

// Sticky blur — layout'un en üstüne koy
<NavbarSticky
  logoText="SaaS"
  links={links}
  ctaLabel="Ücretsiz Başla"
  secondaryLabel="Giriş Yap"
/>`}
        </pre>
      </section>
    </div>
  );
}
