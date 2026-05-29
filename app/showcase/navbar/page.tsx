"use client";

import {
  NavbarMinimal,
  NavbarFull,
  NavbarSticky,
  NavbarEcommerce,
  NavbarBooking,
  NavbarDashboard,
  NavbarGlass,
  NavbarLuxury,
  NavbarSocial,
  NavbarCentered,
} from "@/components/ui/navbar";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import {
  NavbarMinimal, NavbarFull, NavbarSticky,
  NavbarEcommerce, NavbarBooking, NavbarDashboard,
  NavbarGlass, NavbarLuxury, NavbarSocial, NavbarCentered,
} from "@/components/ui/navbar";`;

const LINKS = [
  { label: "Ürün", href: "#" },
  { label: "Özellikler", href: "#", active: true },
  { label: "Fiyatlandırma", href: "#" },
  { label: "Blog", href: "#" },
];

const CATEGORIES = [
  {
    label: "Elektronik",
    href: "#",
    children: [
      { label: "Telefon", href: "#" },
      { label: "Bilgisayar", href: "#" },
      { label: "Tablet", href: "#" },
      { label: "Aksesuar", href: "#" },
    ],
  },
  {
    label: "Giyim",
    href: "#",
    children: [
      { label: "Kadın", href: "#" },
      { label: "Erkek", href: "#" },
      { label: "Çocuk", href: "#" },
    ],
  },
  {
    label: "Ev & Yaşam",
    href: "#",
    children: [
      { label: "Mobilya", href: "#" },
      { label: "Dekorasyon", href: "#" },
      { label: "Mutfak", href: "#" },
    ],
  },
  {
    label: "Spor",
    href: "#",
    children: [
      { label: "Fitness", href: "#" },
      { label: "Outdoor", href: "#" },
      { label: "Ayakkabı", href: "#" },
    ],
  },
];

const BREADCRUMBS = [
  { label: "Dashboard", href: "#" },
  { label: "Kullanıcılar", href: "#" },
  { label: "Detay" },
];

export default function NavbarShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Navbar</h1>
        <p className="text-foreground-muted">
          10 farklı tasarım · e-ticaret · rezervasyon · dashboard · glass · lüks · sosyal · centered · minimal · full · sticky
        </p>
      </div>

      {/* 1. Minimal */}
      <ShowcaseSection
        title="1. Minimal"
        description="Logo + nav linkleri + sağ slot. Sade projeler ve blog'lar için ideal."
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
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            ↑ Ekranı küçülterek hamburger menüyü test edin
          </div>
        </div>
      </ShowcaseSection>

      {/* 2. Full */}
      <ShowcaseSection
        title="2. Full — CTA + Avatar Dropdown"
        description="Logo + orta nav + sağda CTA butonu veya kullanıcı avatar dropdown'ı. SaaS uygulamaları için standart."
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
            user={{ name: "Emirhan Durmuş", email: "emirhan@example.com" }}
            userMenuItems={[
              { label: "Profil", href: "#" },
              { label: "Ayarlar", href: "#" },
              { label: "Yardım", href: "#" },
              { label: "Çıkış Yap", onClick: () => {}, danger: true, divider: true },
            ]}
          />
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            Avatar&apos;a tıklayarak dropdown menüyü açın
          </div>
        </div>
      </ShowcaseSection>

      {/* 3. Sticky + Blur */}
      <ShowcaseSection
        title="3. Sticky + Blur"
        description="Sayfanın tepesine sabitlenir. Scroll'da arka plan blur + border belirir. Landing page'ler için."
        importLine={IMPORT}
        code={`<NavbarSticky
  logoText="Launch"
  links={links}
  ctaLabel="Ücretsiz Başla"
  secondaryLabel="Giriş Yap"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-br from-primary-subtle to-background h-44 relative">
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
            Gerçek kullanımda scroll ile blur efekti tetiklenir
          </p>
        </div>
      </ShowcaseSection>

      {/* 4. E-Commerce */}
      <ShowcaseSection
        title="4. E-Commerce"
        description="Online mağaza — arama çubuğu, sepet badge, mega kategori menüsü. Trendyol/Amazon tarzı."
        importLine={IMPORT}
        code={`<NavbarEcommerce
  logoText="Mağaza"
  links={links}
  categories={categories}
  cartCount={3}
  searchPlaceholder="Ürün, kategori veya marka ara..."
  onSearch={(q) => console.log(q)}
  user={{ name: "Kullanıcı", email: "user@example.com" }}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarEcommerce
            logoText="Mağaza"
            links={LINKS}
            categories={CATEGORIES}
            cartCount={3}
            searchPlaceholder="Ürün, kategori veya marka ara..."
            onSearch={(q) => console.log(q)}
            user={{ name: "Kullanıcı", email: "user@example.com" }}
          />
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            Kategoriler butonuna tıklayarak mega menüyü açın · Sepet ikonundaki badge&apos;e dikkat
          </div>
        </div>
      </ShowcaseSection>

      {/* 5. Booking / Reservation */}
      <ShowcaseSection
        title="5. Booking / Rezervasyon"
        description="Otel, uçak, araç kiralama — gömülü arama barı ile hedef, tarih ve misafir seçimi. Airbnb tarzı."
        importLine={IMPORT}
        code={`<NavbarBooking
  logoText="TravelApp"
  links={[{ label: "Konaklama", href: "#", active: true }, { label: "Uçuşlar", href: "#" }]}
  destination="İstanbul"
  dateRange="15 Haz — 20 Haz"
  guestCount={2}
  ctaLabel="Ara"
  onSearch={() => console.log("Arama")}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarBooking
            logoText="TravelApp"
            links={[
              { label: "Konaklama", href: "#", active: true },
              { label: "Uçuşlar", href: "#" },
              { label: "Deneyimler", href: "#" },
            ]}
            destination="İstanbul"
            dateRange="15 Haz — 20 Haz"
            guestCount={2}
            ctaLabel="Ara"
            onSearch={() => {}}
          />
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            Misafir sayısını +/- butonlarıyla değiştirin · Mobilde booking bar dikey açılır
          </div>
        </div>
      </ShowcaseSection>

      {/* 6. Dashboard */}
      <ShowcaseSection
        title="6. Dashboard / Admin Panel"
        description="Breadcrumb navigasyonu, bildirim zili (badge), ayarlar ve kullanıcı dropdown. Admin panelleri için."
        importLine={IMPORT}
        code={`<NavbarDashboard
  logoText="Admin"
  breadcrumbs={[
    { label: "Dashboard", href: "#" },
    { label: "Kullanıcılar", href: "#" },
    { label: "Detay" },
  ]}
  user={{ name: "Emirhan", email: "admin@company.com" }}
  notificationCount={5}
  onNotificationClick={() => console.log("Bildirimler")}
  onSettingsClick={() => console.log("Ayarlar")}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarDashboard
            logoText="Admin"
            breadcrumbs={BREADCRUMBS}
            user={{ name: "Emirhan", email: "admin@company.com" }}
            notificationCount={5}
            onNotificationClick={() => {}}
            onSettingsClick={() => {}}
            userMenuItems={[
              { label: "Profil", href: "#" },
              { label: "Hesap Ayarları", href: "#" },
              { label: "Çıkış Yap", onClick: () => {}, danger: true, divider: true },
            ]}
          />
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            Breadcrumb&apos;da sayfalar arası geçiş · Bildirim zili badge · Avatar dropdown
          </div>
        </div>
      </ShowcaseSection>

      {/* 7. Glass */}
      <ShowcaseSection
        title="7. Glass — Floating Pill"
        description="Glassmorphism efektli yüzen pill navbar. Modern landing page'ler ve estetik siteler için. Saydam arka plan + blur."
        importLine={IMPORT}
        code={`<NavbarGlass
  logoText="Glass"
  links={links}
  ctaLabel="Başla"
  ctaHref="#"
  floating={true}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 min-h-[140px] flex items-start justify-center pt-4">
          <NavbarGlass
            logoText="Glass"
            links={[
              { label: "Ana Sayfa", href: "#", active: true },
              { label: "Hakkımızda", href: "#" },
              { label: "Projeler", href: "#" },
              { label: "İletişim", href: "#" },
            ]}
            ctaLabel="Başla"
            ctaHref="#"
            floating={true}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="7b. Glass — Full Width"
        description='floating={false} ile tam genişlik modunda glassmorphism navbar.'
        importLine={IMPORT}
        code={`<NavbarGlass
  logoText="Glass"
  links={links}
  ctaLabel="İletişim"
  floating={false}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-r from-emerald-500/20 to-cyan-500/20">
          <NavbarGlass
            logoText="Glass"
            links={LINKS}
            ctaLabel="İletişim"
            ctaHref="#"
            floating={false}
          />
          <div className="px-6 py-8 text-sm text-foreground-muted text-center">
            Arka plan gradyanı navbar&apos;ın arkasından görünür
          </div>
        </div>
      </ShowcaseSection>

      {/* 8. Luxury */}
      <ShowcaseSection
        title="8. Luxury — Lüks Marka"
        description="Her zaman koyu arka plan, altın aksent rengi, ortalanmış logo, ince tracking'li uppercase linkler. Mücevher, moda ve premium markalar için."
        importLine={IMPORT}
        code={`<NavbarLuxury
  logoText="MAISON"
  links={[
    { label: "Koleksiyon", href: "#" },
    { label: "Atölye", href: "#", active: true },
    { label: "Miras", href: "#" },
    { label: "Mağazalar", href: "#" },
  ]}
  accentColor="#c9a96e"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarLuxury
            logoText="MAISON"
            links={[
              { label: "Koleksiyon", href: "#" },
              { label: "Atölye", href: "#", active: true },
              { label: "Miras", href: "#" },
              { label: "Mağazalar", href: "#" },
            ]}
            accentColor="#c9a96e"
          />
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            Logo ortada, linkler iki yana bölünmüş · Altın alt çizgi aksanı
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="8b. Luxury — Rose Gold Aksent"
        description="Aksent rengi özelleştirilebilir — rose gold, gümüş veya herhangi bir renk."
        importLine={IMPORT}
        code={`<NavbarLuxury
  logoText="ÉLÉGANCE"
  links={links}
  accentColor="#b76e79"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarLuxury
            logoText="ÉLÉGANCE"
            links={[
              { label: "Kadın", href: "#", active: true },
              { label: "Erkek", href: "#" },
              { label: "Aksesuar", href: "#" },
              { label: "Parfüm", href: "#" },
            ]}
            accentColor="#b76e79"
          />
        </div>
      </ShowcaseSection>

      {/* 9. Social */}
      <ShowcaseSection
        title="9. Social — Sosyal Platform"
        description="Belirgin arama çubuğu, oluştur butonu, bildirim/mesaj ikonları badge ile. Twitter/Instagram tarzı."
        importLine={IMPORT}
        code={`<NavbarSocial
  logoText="Social"
  links={links}
  user={{ name: "Emirhan", avatarSrc: "" }}
  searchPlaceholder="Kişi, içerik veya etiket ara..."
  notificationCount={3}
  messageCount={7}
  onCreateClick={() => console.log("Yeni gönderi")}
  onSearch={(q) => console.log(q)}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarSocial
            logoText="Social"
            links={LINKS}
            user={{ name: "Emirhan" }}
            searchPlaceholder="Kişi, içerik veya etiket ara..."
            notificationCount={3}
            messageCount={7}
            onCreateClick={() => {}}
            onSearch={(q) => console.log(q)}
          />
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            İkonların üzerine gelerek tooltip&apos;leri görün · Badge sayıları dinamik
          </div>
        </div>
      </ShowcaseSection>

      {/* 10. Centered */}
      <ShowcaseSection
        title="10. Centered — İki Satırlı"
        description="Üst satır: logo ortalanmış. Alt satır: linkler ortalanmış. Portfolio, ajans ve yaratıcı siteler için ultra minimal."
        importLine={IMPORT}
        code={`<NavbarCentered
  logoText="Portfolio"
  links={[
    { label: "Ana Sayfa", href: "#", active: true },
    { label: "Çalışmalar", href: "#" },
    { label: "Hakkımda", href: "#" },
    { label: "Blog", href: "#" },
  ]}
  ctaLabel="İletişim"
  ctaHref="#"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <NavbarCentered
            logoText="Portfolio"
            links={[
              { label: "Ana Sayfa", href: "#", active: true },
              { label: "Çalışmalar", href: "#" },
              { label: "Hakkımda", href: "#" },
              { label: "Blog", href: "#" },
            ]}
            ctaLabel="İletişim"
            ctaHref="#"
          />
          <div className="px-6 py-6 text-sm text-foreground-muted text-center">
            İki satırlı minimal tasarım · CTA soft pill olarak görünür
          </div>
        </div>
      </ShowcaseSection>

      {/* Props Overview */}
      <ShowcaseSection
        title="Props — Genel Bakış"
        description="Tüm navbar bileşenlerinin desteklediği props."
        importLine={IMPORT}
        code={`// Ortak props (hepsinde var)
logoText?: string         // Marka adı
logo?: ReactNode          // Özel logo elementi
links?: NavLink[]         // { label, href, active? }
className?: string        // Ek CSS

// E-Commerce özel
categories?: NavCategory[]  // Mega menü kategorileri
cartCount?: number          // Sepet badge sayısı
onSearch?: (q: string) => void

// Booking özel
destination?: string
dateRange?: string
guestCount?: number

// Dashboard özel
breadcrumbs?: NavBreadcrumb[]  // { label, href? }
notificationCount?: number

// Glass özel
floating?: boolean  // Yüzen pill modu (default: true)

// Luxury özel
accentColor?: string  // Aksent rengi (default: #c9a96e)

// Social özel
notificationCount?: number
messageCount?: number
onCreateClick?: () => void`}
        previewClassName="p-0"
      >
        <div className="overflow-x-auto border border-border rounded-[var(--radius-lg)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background-muted border-b border-border">
                <th className="text-left px-4 py-3 text-foreground font-semibold">Bileşen</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Kullanım Alanı</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Öne Çıkan Özellik</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["NavbarMinimal", "Blog, küçük projeler", "Sade, rightSlot ile genişler"],
                ["NavbarFull", "SaaS uygulamaları", "Avatar dropdown + CTA"],
                ["NavbarSticky", "Landing page", "Scroll'da blur efekti"],
                ["NavbarEcommerce", "Online mağaza", "Arama + sepet + mega menü"],
                ["NavbarBooking", "Otel/uçak rezervasyon", "Gömülü booking bar"],
                ["NavbarDashboard", "Admin panel", "Breadcrumb + bildirim + ayarlar"],
                ["NavbarGlass", "Modern/estetik", "Glassmorphism floating pill"],
                ["NavbarLuxury", "Lüks marka", "Koyu bg + altın aksent + centered logo"],
                ["NavbarSocial", "Sosyal platform", "Belirgin arama + ikon kümesi"],
                ["NavbarCentered", "Portfolio/ajans", "İki satırlı centered layout"],
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
