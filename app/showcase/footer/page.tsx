"use client";

import {
  FooterMinimal,
  FooterMultiColumn,
  FooterCentered,
  FooterDark,
  FooterNewsletter,
  FooterSplit,
  FooterGradient,
  FooterApp,
  FooterBig,
  FooterStacked,
} from "@/components/ui/footer";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import {
  FooterMinimal,
  FooterMultiColumn,
  FooterCentered,
  FooterDark,
  FooterNewsletter,
  FooterSplit,
  FooterGradient,
  FooterApp,
  FooterBig,
  FooterStacked,
} from "@/components/ui/footer";`;

/* ─── Shared social icons ─────────────────────────────────────── */

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const Socials = () => (
  <>
    <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors"><GithubIcon /></a>
    <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors"><TwitterIcon /></a>
    <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><LinkedinIcon /></a>
    <a href="#" aria-label="Instagram" className="hover:text-foreground transition-colors"><InstagramIcon /></a>
  </>
);

/* ─── Shared data ─────────────────────────────────────────────── */

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

const SIMPLE_LINKS = [
  { label: "Hakkımızda", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Fiyatlandırma", href: "#" },
  { label: "İletişim", href: "#" },
];

/* ─── Showcase ────────────────────────────────────────────────── */

export default function FooterShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Footer</h1>
        <p className="text-foreground-muted">
          10 farklı footer tipi · minimal · multi-column · centered · dark · newsletter · split · gradient · app store · mega · stacked
        </p>
      </div>

      {/* 1. Minimal */}
      <ShowcaseSection
        title="1. Minimal"
        description="Tek satır — logo + copyright + linkler + sosyal ikonlar. Portfolio ve küçük projeler için idealdir."
        importLine={IMPORT}
        code={`<FooterMinimal
  logoText="MyApp"
  links={[
    { label: "Gizlilik", href: "/gizlilik" },
    { label: "Kullanım Şartları", href: "/sartlar" },
    { label: "İletişim", href: "/iletisim" },
  ]}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterMinimal
            logoText="MyApp"
            links={SIMPLE_LINKS}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* 2. Multi-Column */}
      <ShowcaseSection
        title="2. Multi-Column"
        description="Sitemap tarzı — marka kolonu + link kolonları + alt bant. SaaS ve kurumsal siteler için standart."
        importLine={IMPORT}
        code={`<FooterMultiColumn
  logoText="MyApp"
  tagline="Modern projeler için hızlı ve güvenilir UI bileşen kütüphanesi."
  columns={columns}
  bottomLinks={bottomLinks}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterMultiColumn
            logoText="MyApp"
            tagline="Modern projeler için hızlı ve güvenilir UI bileşen kütüphanesi."
            columns={COLUMNS}
            bottomLinks={BOTTOM_LINKS}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* 3. Centered */}
      <ShowcaseSection
        title="3. Centered"
        description="Tüm içerik ortalanmış — logo, tagline, navigasyon ve sosyal ikonlar simetrik şekilde dizilir. Portfolio ve ajans siteleri için idealdir."
        importLine={IMPORT}
        code={`<FooterCentered
  logoText="Studio"
  tagline="Güzel şeyler tasarlıyoruz."
  links={[
    { label: "Hakkımızda", href: "#" },
    { label: "Çalışmalar", href: "#" },
    { label: "Servisler", href: "#" },
    { label: "İletişim", href: "#" },
  ]}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterCentered
            logoText="Studio"
            tagline="Güzel şeyler tasarlıyoruz."
            links={[
              { label: "Hakkımızda", href: "#" },
              { label: "Çalışmalar", href: "#" },
              { label: "Servisler", href: "#" },
              { label: "İletişim", href: "#" },
            ]}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* 4. Dark */}
      <ShowcaseSection
        title="4. Dark"
        description="Tema ne olursa olsun daima koyu arka planlı footer. Üst kısımda primary renk gradyan aksanı var. Teknoloji ve startup siteleri için güçlü bir görünüm."
        importLine={IMPORT}
        code={`<FooterDark
  logoText="NexTech"
  tagline="Geleceği bugünden inşa ediyoruz."
  columns={columns}
  bottomLinks={bottomLinks}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterDark
            logoText="NexTech"
            tagline="Geleceği bugünden inşa ediyoruz."
            columns={COLUMNS}
            bottomLinks={BOTTOM_LINKS}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* 5. Newsletter */}
      <ShowcaseSection
        title="5. Newsletter"
        description="Üst kısımda belirgin e-posta abonelik alanı, alt kısımda minimal link satırı. E-posta pazarlaması yapan ürünler için kullanışlı."
        importLine={IMPORT}
        code={`<FooterNewsletter
  logoText="MyApp"
  newsletterTitle="Haberdar Olun"
  newsletterDescription="Haftada bir en iyi içerikler, güncellemeler ve ipuçları doğrudan gelen kutunuza."
  newsletterPlaceholder="eposta@adresiniz.com"
  onSubscribe={(email) => console.log("Abone:", email)}
  links={links}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterNewsletter
            logoText="MyApp"
            newsletterTitle="Haberdar Olun"
            newsletterDescription="Haftada bir en iyi içerikler, güncellemeler ve ipuçları doğrudan gelen kutunuza."
            newsletterPlaceholder="eposta@adresiniz.com"
            onSubscribe={(email) => console.log("Abone:", email)}
            links={SIMPLE_LINKS}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* 6. Split */}
      <ShowcaseSection
        title="6. Split"
        description="Sol yarı marka alanı (logo + tagline + sosyal ikonlar), sağ yarı link kolonları. İki bölge arasında net bir ayrım var. SaaS ürünleri için modern bir seçenek."
        importLine={IMPORT}
        code={`<FooterSplit
  logoText="SaaS Co"
  tagline="İşinizi büyütmek için ihtiyacınız olan tüm araçlar tek bir platformda."
  columns={columns}
  bottomLinks={bottomLinks}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterSplit
            logoText="SaaS Co"
            tagline="İşinizi büyütmek için ihtiyacınız olan tüm araçlar tek bir platformda."
            columns={COLUMNS}
            bottomLinks={BOTTOM_LINKS}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* 7. Gradient */}
      <ShowcaseSection
        title="7. Gradient"
        description="Üst kenarında renkli gradyan şerit — minimal tek satır tasarımla dikkat çekici bir görsel vurgu. Yaratıcı projeler ve landing page'ler için."
        importLine={IMPORT}
        code={`<FooterGradient
  logoText="Vivid"
  links={links}
  socials={<Socials />}
  gradientFrom="#6366f1"
  gradientVia="#a855f7"
  gradientTo="#ec4899"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterGradient
            logoText="Vivid"
            links={SIMPLE_LINKS}
            socials={<Socials />}
            gradientFrom="#6366f1"
            gradientVia="#a855f7"
            gradientTo="#ec4899"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="7b. Gradient — Yeşil / Teal Tema"
        description="Gradyan renkleri değiştirerek farklı marka kimliklerine uyum sağlanabilir."
        importLine={IMPORT}
        code={`<FooterGradient
  logoText="EcoApp"
  links={links}
  socials={<Socials />}
  gradientFrom="#10b981"
  gradientVia="#06b6d4"
  gradientTo="#3b82f6"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterGradient
            logoText="EcoApp"
            links={SIMPLE_LINKS}
            socials={<Socials />}
            gradientFrom="#10b981"
            gradientVia="#06b6d4"
            gradientTo="#3b82f6"
          />
        </div>
      </ShowcaseSection>

      {/* 8. App Store */}
      <ShowcaseSection
        title="8. App Store"
        description="App Store ve Google Play indirme butonları içeren footer. Mobil uygulama landing page'leri için tasarlandı. Sol tarafta marka + indirme butonları, sağda link kolonları."
        importLine={IMPORT}
        code={`<FooterApp
  logoText="AppName"
  tagline="iOS ve Android için güçlü bir deneyim."
  columns={columns.slice(0, 2)}
  appStoreUrl="https://apps.apple.com"
  playStoreUrl="https://play.google.com"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterApp
            logoText="AppName"
            tagline="iOS ve Android için güçlü bir deneyim."
            columns={COLUMNS.slice(0, 2)}
            appStoreUrl="#"
            playStoreUrl="#"
          />
        </div>
      </ShowcaseSection>

      {/* 9. Big / Mega */}
      <ShowcaseSection
        title="9. Mega Footer"
        description="Kurumsal düzeyde büyük footer — büyük marka alanı, iletişim bilgileri (e-posta, telefon, adres), 4 link kolonu ve tam alt bant. Büyük kurumsal siteler için."
        importLine={IMPORT}
        code={`<FooterBig
  logoText="Enterprise"
  tagline="Kurumsal çözümler için güvenilir teknoloji ortağı."
  email="info@enterprise.com"
  phone="+90 212 555 0100"
  address="Maslak Mahallesi, Büyükdere Cad. No:123, İstanbul"
  columns={columns}
  bottomLinks={bottomLinks}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterBig
            logoText="Enterprise"
            tagline="Kurumsal çözümler için güvenilir teknoloji ortağı."
            email="info@enterprise.com"
            phone="+90 212 555 0100"
            address="Maslak Mahallesi, Büyükdere Cad. No:123, İstanbul"
            columns={COLUMNS}
            bottomLinks={BOTTOM_LINKS}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* 10. Stacked */}
      <ShowcaseSection
        title="10. Stacked"
        description="Üç katmanlı yatay bant tasarımı — üst bant link kolonları, orta bant sosyal ikonlar (ortalanmış), alt bant telif hakkı ve yasal linkler. Her bant farklı arka plan tonu."
        importLine={IMPORT}
        code={`<FooterStacked
  logoText="Layers"
  tagline="Katman katman güzellik."
  columns={columns}
  bottomLinks={bottomLinks}
  socials={<Socials />}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <FooterStacked
            logoText="Layers"
            tagline="Katman katman güzellik."
            columns={COLUMNS}
            bottomLinks={BOTTOM_LINKS}
            socials={<Socials />}
          />
        </div>
      </ShowcaseSection>

      {/* Props table */}
      <ShowcaseSection
        title="Props — Genel Bakış"
        description="Tüm footer bileşenlerinin desteklediği prop'lar."
        importLine={IMPORT}
        code={`// Ortak props (hepsinde var)
logoText?: string       // Marka adı
logo?: ReactNode        // Özel logo elementi
copyright?: string      // Telif hakkı metni (yoksa otomatik)
className?: string      // Ekstra CSS sınıfı

// Sosyal + linkler
socials?: ReactNode     // Sosyal medya butonları
links?: FooterLink[]    // { label, href }

// Kolonlar (MultiColumn, Dark, Split, App, Big, Stacked)
columns?: FooterColumn[] // { title, links[] }
bottomLinks?: FooterLink[]

// Gradient özel
gradientFrom?: string   // başlangıç rengi (hex)
gradientVia?: string    // orta renk
gradientTo?: string     // bitiş rengi

// Newsletter özel
newsletterTitle?: string
newsletterDescription?: string
onSubscribe?: (email: string) => void

// Big / Mega özel
email?: string
phone?: string
address?: string

// App Store özel
appStoreUrl?: string
playStoreUrl?: string`}
        previewClassName="p-0"
      >
        <div className="overflow-x-auto border border-border rounded-[var(--radius-lg)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background-muted border-b border-border">
                <th className="text-left px-4 py-3 text-foreground font-semibold">Bileşen</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Kullanım Amacı</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Öne Çıkan Özellik</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["FooterMinimal", "Portfolio, küçük projeler", "Tek satır, sade"],
                ["FooterMultiColumn", "SaaS, kurumsal", "Sitemap + alt bant"],
                ["FooterCentered", "Ajans, portfolio", "Simetrik ortalanmış düzen"],
                ["FooterDark", "Teknoloji, startup", "Her zaman koyu tema"],
                ["FooterNewsletter", "Blog, içerik siteleri", "E-posta abonelik formu"],
                ["FooterSplit", "SaaS, uygulama", "Sol marka / sağ linkler"],
                ["FooterGradient", "Landing page, yaratıcı", "Renkli üst gradyan şerit"],
                ["FooterApp", "Mobil uygulama sitesi", "App Store & Play Store butonları"],
                ["FooterBig", "Kurumsal, enterprise", "İletişim bilgileri + mega layout"],
                ["FooterStacked", "Kapsamlı siteler", "3 katmanlı bant tasarımı"],
              ].map(([name, usage, feature]) => (
                <tr key={name} className="border-b border-border last:border-0 hover:bg-background-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{name}</td>
                  <td className="px-4 py-3 text-foreground-muted">{usage}</td>
                  <td className="px-4 py-3 text-foreground-muted">{feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}
