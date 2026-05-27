import { FooterMinimal, FooterMultiColumn } from "@/components/ui/footer";

/* ─── Sosyal ikonlar ─────────────────────────────────────────── */
const GithubIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const LinkedinIcon= () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

const Socials = () => (
  <>
    <a href="#" aria-label="GitHub"   className="hover:text-foreground transition-colors"><GithubIcon /></a>
    <a href="#" aria-label="Twitter"  className="hover:text-foreground transition-colors"><TwitterIcon /></a>
    <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><LinkedinIcon /></a>
  </>
);

/* ─── Veri ───────────────────────────────────────────────────── */
const COLUMNS = [
  {
    title: "Ürün",
    links: [
      { label: "Özellikler", href: "#" },
      { label: "Fiyatlandırma", href: "#" },
      { label: "Değişiklik Günlüğü", href: "#", badge: "Yeni" },
      { label: "Yol Haritası", href: "#" },
    ],
  },
  {
    title: "Şirket",
    links: [
      { label: "Hakkımızda", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Kariyer", href: "#", badge: "3 açık" },
      { label: "İletişim", href: "#" },
    ],
  },
  {
    title: "Destek",
    links: [
      { label: "Dokümantasyon", href: "#" },
      { label: "API Referansı", href: "#" },
      { label: "Topluluk", href: "#" },
      { label: "Durum", href: "#" },
    ],
  },
];

const BOTTOM_LINKS = [
  { label: "Gizlilik Politikası", href: "#" },
  { label: "Kullanım Şartları", href: "#" },
  { label: "KVKK", href: "#" },
];

function PreviewFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-foreground-muted">{description}</p>
      </div>
      <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
        {children}
      </div>
    </section>
  );
}

export default function FooterShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Footer</h1>
        <p className="text-foreground-muted">
          2 tasarım · sosyal ikonlar · badge · alt bant · tam responsive
        </p>
      </div>

      {/* 1 — Minimal */}
      <PreviewFrame
        title="1. Minimal"
        description="Tek satır — logo + copyright + linkler + sosyal ikonlar."
      >
        <FooterMinimal
          logoText="MyApp"
          links={[
            { label: "Gizlilik", href: "#" },
            { label: "Kullanım Şartları", href: "#" },
            { label: "İletişim", href: "#" },
          ]}
          socials={<Socials />}
        />
      </PreviewFrame>

      {/* 1b — Minimal sadece copyright */}
      <PreviewFrame
        title="1b. Minimal — Sade"
        description="Sadece copyright — en basit hali."
      >
        <FooterMinimal
          logoText="MyApp"
          copyright="© 2026 MyApp Inc."
        />
      </PreviewFrame>

      {/* 2 — Multi column */}
      <PreviewFrame
        title="2. Multi-Column"
        description="Sitemap tarzı — marka kolonu + link kolonları + alt bant."
      >
        <FooterMultiColumn
          logoText="MyApp"
          tagline="Modern projeler için hızlı ve güvenilir UI bileşen kütüphanesi."
          columns={COLUMNS}
          bottomLinks={BOTTOM_LINKS}
          socials={<Socials />}
        />
      </PreviewFrame>

      {/* 2b — Multi column surface alt bant */}
      <PreviewFrame
        title="2b. Multi-Column — Alt bant surface"
        description={`bottomVariant="surface" ile alt bant ana yüzey rengiyle eşleşir.`}
      >
        <FooterMultiColumn
          logoText="MyApp"
          tagline="Modern projeler için hızlı ve güvenilir UI bileşen kütüphanesi."
          columns={COLUMNS.slice(0, 2)}
          bottomLinks={BOTTOM_LINKS}
          bottomVariant="surface"
          socials={<Socials />}
        />
      </PreviewFrame>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { FooterMinimal, FooterMultiColumn } from "@/components/ui/footer";

// Minimal
<FooterMinimal
  logoText="MyApp"
  links={[
    { label: "Gizlilik", href: "/gizlilik" },
    { label: "İletişim", href: "/iletisim" },
  ]}
  socials={<Socials />}
/>

// Multi-column
<FooterMultiColumn
  logoText="MyApp"
  tagline="Kısa açıklama metni."
  columns={[
    {
      title: "Ürün",
      links: [
        { label: "Özellikler", href: "/ozellikler" },
        { label: "Fiyat", href: "/fiyat", badge: "Yeni" },
      ],
    },
  ]}
  bottomLinks={[{ label: "Gizlilik", href: "/gizlilik" }]}
  socials={<Socials />}
  bottomVariant="muted"
/>`}
        </pre>
      </section>
    </div>
  );
}
