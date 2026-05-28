"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CommandPalette, useCommandPalette } from "@/components/ui/command-palette";
import type { CommandItem } from "@/components/ui/command-palette";

/* ─── All searchable showcase items ─────────────────────────────
   label       = görünen ad
   group       = kategori (sidebar ile eşleşir)
   keywords    = arama terimleri (Türkçe kullanım bağlamları dahil)
   href        = showcase URL'i
   importPath  = kopyalanacak import satırı
   minimalCode = "Hızlı Kopyala" için minimal snippet
──────────────────────────────────────────────────────────────── */

type ShowcaseEntry = {
  id:          string;
  label:       string;
  group:       string;
  keywords:    string[];
  href:        string;
  importLine?: string;
  minimalCode?: string;
};

const ENTRIES: ShowcaseEntry[] = [
  /* ── Primitives ── */
  { id: "button",   label: "Button",   group: "Primitives",
    keywords: ["buton", "cta", "aksiyon", "form", "tıkla", "primary", "gradient", "icon"],
    href: "/showcase/button",
    importLine: 'import { Button } from "@/components/ui/button";',
    minimalCode: '<Button variant="primary">Tıkla</Button>' },

  { id: "input",    label: "Input",    group: "Primitives",
    keywords: ["girdi", "metin", "form", "email", "şifre", "arama", "text field"],
    href: "/showcase/input",
    importLine: 'import { Input } from "@/components/ui/input";',
    minimalCode: '<Input placeholder="Metin girin" />' },

  { id: "textarea", label: "Textarea", group: "Primitives",
    keywords: ["çok satır", "yorum", "mesaj", "açıklama"],
    href: "/showcase/textarea",
    importLine: 'import { Textarea } from "@/components/ui/textarea";',
    minimalCode: '<Textarea placeholder="Mesajınızı yazın..." />' },

  { id: "select",   label: "Select",   group: "Primitives",
    keywords: ["seçim", "dropdown", "açılır menü", "opsiyon", "combobox benzeri"],
    href: "/showcase/select",
    importLine: 'import { Select } from "@/components/ui/select";',
    minimalCode: '<Select options={[{ label: "Seçenek", value: "opt" }]} />' },

  { id: "checkbox", label: "Checkbox", group: "Primitives",
    keywords: ["onay kutusu", "işaret", "seçim", "çoklu seçim"],
    href: "/showcase/checkbox",
    importLine: 'import { Checkbox } from "@/components/ui/checkbox";',
    minimalCode: '<Checkbox label="Kabul ediyorum" />' },

  { id: "radio",    label: "Radio",    group: "Primitives",
    keywords: ["radyo düğmesi", "tek seçim", "seçenek grubu"],
    href: "/showcase/radio",
    importLine: 'import { Radio, RadioGroup } from "@/components/ui/radio";',
    minimalCode: '<RadioGroup name="choice" options={[{ label: "A", value: "a" }]} />' },

  { id: "toggle",   label: "Toggle",   group: "Primitives",
    keywords: ["switch", "açık kapalı", "toggle", "karanlık mod"],
    href: "/showcase/toggle",
    importLine: 'import { Toggle } from "@/components/ui/toggle";',
    minimalCode: '<Toggle label="Bildirimleri Aç" />' },

  { id: "badge",    label: "Badge",    group: "Primitives",
    keywords: ["etiket", "chip", "pill", "durum", "sayaç", "bildirim", "yeni"],
    href: "/showcase/badge",
    importLine: 'import { Badge } from "@/components/ui/badge";',
    minimalCode: '<Badge variant="primary">Yeni</Badge>' },

  { id: "avatar",   label: "Avatar",   group: "Primitives",
    keywords: ["profil resmi", "kullanıcı", "inisyal", "ekip"],
    href: "/showcase/avatar",
    importLine: 'import { Avatar, AvatarGroup } from "@/components/ui/avatar";',
    minimalCode: '<Avatar name="Ali Veli" size="md" status="online" />' },

  { id: "spinner",  label: "Spinner",  group: "Primitives",
    keywords: ["yükleme", "loading", "dönen", "bekle"],
    href: "/showcase/spinner",
    importLine: 'import { Spinner } from "@/components/ui/spinner";',
    minimalCode: '<Spinner variant="ring" size="md" />' },

  { id: "tooltip",  label: "Tooltip",  group: "Primitives",
    keywords: ["ipucu", "açıklama", "hover bilgi"],
    href: "/showcase/tooltip",
    importLine: 'import { Tooltip } from "@/components/ui/tooltip";',
    minimalCode: '<Tooltip content="Açıklama"><span>Üzerine gel</span></Tooltip>' },

  /* ── Layout ── */
  { id: "navbar",    label: "Navbar",    group: "Layout",
    keywords: ["üst bar", "navigasyon", "logo", "menü", "header", "hamburger"],
    href: "/showcase/navbar",
    importLine: 'import { NavbarFull } from "@/components/ui/navbar";',
    minimalCode: '<NavbarFull logo={<span>Logo</span>} />' },

  { id: "sidebar",   label: "Sidebar",   group: "Layout",
    keywords: ["yan panel", "sol menü", "navigasyon", "collapsible"],
    href: "/showcase/sidebar",
    importLine: 'import { SidebarFull } from "@/components/ui/sidebar";',
    minimalCode: '<SidebarFull sections={[]} />' },

  { id: "footer",    label: "Footer",    group: "Layout",
    keywords: ["alt bilgi", "copyright", "bağlantılar", "sosyal"],
    href: "/showcase/footer",
    importLine: 'import { FooterMultiColumn } from "@/components/ui/footer";',
    minimalCode: '<FooterMultiColumn brand={<span>Marka</span>} columns={[]} />' },

  { id: "container", label: "Container / Grid / Stack", group: "Layout",
    keywords: ["düzen", "ızgara", "grid", "stack", "yerleşim"],
    href: "/showcase/container",
    importLine: 'import { Container, Grid, Stack } from "@/components/ui/container";',
    minimalCode: '<Container size="lg"><Grid cols={3}>...</Grid></Container>' },

  /* ── Auth ── */
  { id: "login",          label: "Login Form",     group: "Auth",
    keywords: ["giriş", "oturum", "şifre", "email", "sosyal giriş"],
    href: "/showcase/login",
    importLine: 'import { LoginCard } from "@/components/ui/login";',
    minimalCode: '<LoginCard onSubmit={handleLogin} showSocials />' },

  { id: "register",       label: "Register Form",  group: "Auth",
    keywords: ["kayıt", "üyelik", "hesap oluştur"],
    href: "/showcase/register",
    importLine: 'import { RegisterForm } from "@/components/ui/register";',
    minimalCode: '<RegisterForm onSubmit={handleRegister} />' },

  { id: "forgot-password",label: "Forgot Password",group: "Auth",
    keywords: ["şifre sıfırla", "unuttum", "reset"],
    href: "/showcase/forgot-password",
    importLine: 'import { ForgotPasswordForm } from "@/components/ui/forgot-password";',
    minimalCode: '<ForgotPasswordForm onSubmit={handleReset} />' },

  { id: "otp",            label: "OTP Input",      group: "Auth",
    keywords: ["doğrulama kodu", "sms kodu", "6 haneli", "pin"],
    href: "/showcase/otp",
    importLine: 'import { OTPInput } from "@/components/ui/otp";',
    minimalCode: '<OTPInput length={6} onComplete={handleOTP} />' },

  /* ── Feedback ── */
  { id: "modal",       label: "Modal",       group: "Feedback",
    keywords: ["diyalog", "dialog", "popup", "overlay", "onay"],
    href: "/showcase/modal",
    importLine: 'import { Modal } from "@/components/ui/modal";',
    minimalCode: '<Modal open={open} onClose={() => setOpen(false)} title="Başlık">...</Modal>' },

  { id: "drawer",      label: "Drawer",      group: "Feedback",
    keywords: ["yan panel", "çekmece", "slide", "sheet", "mobil menü"],
    href: "/showcase/drawer",
    importLine: 'import { Drawer } from "@/components/ui/drawer";',
    minimalCode: '<Drawer open={open} onClose={() => setOpen(false)} side="right">...</Drawer>' },

  { id: "toast",       label: "Toast",       group: "Feedback",
    keywords: ["bildirim", "snackbar", "başarı", "hata", "uyarı", "notification"],
    href: "/showcase/toast",
    importLine: 'import { useToast } from "@/components/ui/toast";',
    minimalCode: 'const { toast } = useToast();\ntoast({ title: "Kaydedildi!", variant: "success" });' },

  { id: "alert",       label: "Alert",       group: "Feedback",
    keywords: ["uyarı", "hata mesajı", "inline bildirim", "banner"],
    href: "/showcase/alert",
    importLine: 'import { Alert } from "@/components/ui/alert";',
    minimalCode: '<Alert variant="success" title="Başarılı!" description="İşlem tamamlandı." />' },

  { id: "skeleton",    label: "Skeleton",    group: "Feedback",
    keywords: ["yükleme animasyonu", "placeholder", "shimmer", "ghost"],
    href: "/showcase/skeleton",
    importLine: 'import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";',
    minimalCode: '<SkeletonCard />' },

  { id: "empty-state", label: "Empty State", group: "Feedback",
    keywords: ["boş sayfa", "veri yok", "sıfır durum", "ilk kullanım"],
    href: "/showcase/empty-state",
    importLine: 'import { EmptyState } from "@/components/ui/empty-state";',
    minimalCode: '<EmptyState title="Henüz veri yok" description="İlk kaydınızı ekleyin." />' },

  /* ── Data Display ── */
  { id: "card",       label: "Card",       group: "Data Display",
    keywords: ["kart", "ürün kartı", "makale", "e-ticaret", "profil", "saas", "glass", "brutal", "gradient"],
    href: "/showcase/card",
    importLine: 'import { Card, CardHeader, CardFooter } from "@/components/ui/card";',
    minimalCode: '<Card variant="elevated">\n  <CardHeader title="Başlık" description="Açıklama" />\n  <p>İçerik</p>\n</Card>' },

  { id: "table",      label: "Table",      group: "Data Display",
    keywords: ["tablo", "liste", "veri", "satır", "sıralama", "filtre"],
    href: "/showcase/table",
    importLine: 'import { Table } from "@/components/ui/table";',
    minimalCode: '<Table columns={columns} data={data} sortable hoverable />' },

  { id: "stat-card",  label: "Stat Card",  group: "Data Display",
    keywords: ["istatistik", "metrik", "dashboard", "trend", "artış", "azalış"],
    href: "/showcase/stat-card",
    importLine: 'import { StatCard } from "@/components/ui/stat-card";',
    minimalCode: '<StatCard title="Gelir" value="₺48.295" trend="up" change="+12%" />' },

  { id: "list",       label: "List",       group: "Data Display",
    keywords: ["liste", "madde", "öğe", "sıralı"],
    href: "/showcase/list",
    importLine: 'import { List, ListItem } from "@/components/ui/list";',
    minimalCode: '<List><ListItem leading={<Avatar name="A" />}>Öğe</ListItem></List>' },

  { id: "accordion",  label: "Accordion",  group: "Data Display",
    keywords: ["akordiyon", "genişlet", "daralt", "faq", "sss"],
    href: "/showcase/accordion",
    importLine: 'import { Accordion, AccordionItem } from "@/components/ui/accordion";',
    minimalCode: '<Accordion>\n  <AccordionItem title="Soru?">Cevap.</AccordionItem>\n</Accordion>' },

  { id: "tabs",       label: "Tabs",       group: "Data Display",
    keywords: ["sekme", "tab", "geçiş", "sayfa içi navigasyon"],
    href: "/showcase/tabs",
    importLine: 'import { Tabs } from "@/components/ui/tabs";',
    minimalCode: '<Tabs items={[{ label: "Sekme 1", content: <p>...</p> }]} />' },

  { id: "breadcrumb", label: "Breadcrumb", group: "Data Display",
    keywords: ["ekmek kırıntısı", "yol izi", "navigasyon", "hiyerarşi"],
    href: "/showcase/breadcrumb",
    importLine: 'import { Breadcrumb } from "@/components/ui/breadcrumb";',
    minimalCode: '<Breadcrumb items={[{ label: "Ana Sayfa", href: "/" }, { label: "Sayfa" }]} />' },

  { id: "pagination", label: "Pagination", group: "Data Display",
    keywords: ["sayfalama", "önceki sonraki", "sayfa numarası"],
    href: "/showcase/pagination",
    importLine: 'import { Pagination } from "@/components/ui/pagination";',
    minimalCode: '<Pagination total={100} pageSize={10} page={1} onChange={setPage} />' },

  { id: "progress",   label: "Progress Bar", group: "Data Display",
    keywords: ["ilerleme", "yükleme çubuğu", "yüzde", "tamamlanma"],
    href: "/showcase/progress",
    importLine: 'import { ProgressBar } from "@/components/ui/progress";',
    minimalCode: '<ProgressBar value={72} color="primary" label="72% Tamamlandı" />' },

  /* ── Interactive ── */
  { id: "combobox",        label: "Combobox",        group: "Interactive",
    keywords: ["arama seçim", "autocomplete", "çoklu seçim", "dropdown arama"],
    href: "/showcase/combobox",
    importLine: 'import { Combobox } from "@/components/ui/combobox";',
    minimalCode: '<Combobox options={options} placeholder="Ara veya seç..." />' },

  { id: "date-picker",     label: "Date Picker",     group: "Interactive",
    keywords: ["tarih seçici", "takvim", "tarih aralığı", "datepicker"],
    href: "/showcase/date-picker",
    importLine: 'import { DatePicker } from "@/components/ui/date-picker";',
    minimalCode: '<DatePicker placeholder="Tarih seçin" onChange={setDate} />' },

  { id: "slider",          label: "Slider",          group: "Interactive",
    keywords: ["kaydırıcı", "aralık", "değer seçim", "range"],
    href: "/showcase/slider",
    importLine: 'import { Slider } from "@/components/ui/slider";',
    minimalCode: '<Slider min={0} max={100} defaultValue={50} onChange={setValue} />' },

  { id: "file-upload",     label: "File Upload",     group: "Interactive",
    keywords: ["dosya yükle", "drag drop", "sürükle bırak", "resim yükle"],
    href: "/showcase/file-upload",
    importLine: 'import { FileUpload } from "@/components/ui/file-upload";',
    minimalCode: '<FileUpload accept="image/*" multiple onUpload={handleFiles} />' },

  { id: "tag-input",       label: "Tag Input",       group: "Interactive",
    keywords: ["etiket girişi", "chip girişi", "çoklu değer", "tag"],
    href: "/showcase/tag-input",
    importLine: 'import { TagInput } from "@/components/ui/tag-input";',
    minimalCode: '<TagInput placeholder="Etiket ekle..." onChange={setTags} />' },

  { id: "popover",         label: "Popover",         group: "Interactive",
    keywords: ["pop", "floating", "bağlam menüsü", "tooltip benzeri etkileşimli"],
    href: "/showcase/popover",
    importLine: 'import { Popover } from "@/components/ui/popover";',
    minimalCode: '<Popover trigger={<Button>Aç</Button>}><p>İçerik</p></Popover>' },

  { id: "context-menu",    label: "Context Menu",    group: "Interactive",
    keywords: ["sağ tık", "bağlam menüsü", "context", "aksiyon menüsü"],
    href: "/showcase/context-menu",
    importLine: 'import { ContextMenu } from "@/components/ui/context-menu";',
    minimalCode: '<ContextMenu items={menuItems}><div>Sağ tıkla</div></ContextMenu>' },

  { id: "command-palette",label: "Command Palette", group: "Interactive",
    keywords: ["komut paleti", "hızlı arama", "cmd k", "spotlight"],
    href: "/showcase/command-palette",
    importLine: 'import { CommandPalette, useCommandPalette } from "@/components/ui/command-palette";',
    minimalCode: 'const { open, setOpen } = useCommandPalette();\n<CommandPalette open={open} onClose={() => setOpen(false)} items={items} />' },

  /* ── Animation ── */
  { id: "animated-counter",label: "Animated Counter",group: "Animation",
    keywords: ["sayaç animasyon", "rakam artış", "dashboard sayı"],
    href: "/showcase/animated-counter",
    importLine: 'import { AnimatedCounter } from "@/components/ui/animated-counter";',
    minimalCode: '<AnimatedCounter from={0} to={1284} duration={1.5} />' },

  { id: "number-flow",    label: "Number Flow",    group: "Animation",
    keywords: ["rakam akışı", "hane animasyonu", "rolling digit"],
    href: "/showcase/number-flow",
    importLine: 'import { NumberFlow } from "@/components/ui/number-flow";',
    minimalCode: '<NumberFlow value={price} />' },

  { id: "reveal",         label: "Reveal / FadeIn",group: "Animation",
    keywords: ["scroll animasyon", "fade in", "görünür olunca", "intersection"],
    href: "/showcase/reveal",
    importLine: 'import { Reveal } from "@/components/ui/reveal";',
    minimalCode: '<Reveal direction="up" delay={0.1}><p>İçerik</p></Reveal>' },

  { id: "marquee",        label: "Marquee",        group: "Animation",
    keywords: ["kayan yazı", "sonsuz scroll", "logo wall", "testimonial şerit"],
    href: "/showcase/marquee",
    importLine: 'import { Marquee } from "@/components/ui/marquee";',
    minimalCode: '<Marquee speed={30} pauseOnHover>...</Marquee>' },

  { id: "magnetic-button",label: "Magnetic Button",group: "Animation",
    keywords: ["manyetik", "cursor efekt", "hover çekim"],
    href: "/showcase/magnetic-button",
    importLine: 'import { MagneticButton } from "@/components/ui/magnetic-button";',
    minimalCode: '<MagneticButton>Hover Et</MagneticButton>' },

  { id: "shimmer-text",   label: "Shimmer Text",   group: "Animation",
    keywords: ["parıltı metin", "gradient sweep", "başlık animasyon"],
    href: "/showcase/shimmer-text",
    importLine: 'import { ShimmerText } from "@/components/ui/shimmer-text";',
    minimalCode: '<ShimmerText>Parıltılı Başlık</ShimmerText>' },

  { id: "typewriter",     label: "Typewriter",     group: "Animation",
    keywords: ["yazı makinesi", "karakter karakter", "cursor", "typing effect"],
    href: "/showcase/typewriter",
    importLine: 'import { Typewriter } from "@/components/ui/typewriter";',
    minimalCode: '<Typewriter words={["Merhaba!", "Nasılsın?"]} loop />' },

  { id: "confetti-button",label: "Confetti Button",group: "Animation",
    keywords: ["konfeti", "kutlama", "tıkla konfeti", "parti"],
    href: "/showcase/confetti-button",
    importLine: 'import { ConfettiButton } from "@/components/ui/confetti-button";',
    minimalCode: '<ConfettiButton>🎉 Kutla!</ConfettiButton>' },

  /* ── Charts ── */
  { id: "sparkline",      label: "Sparkline",      group: "Charts",
    keywords: ["mini grafik", "trend çizgi", "sparkline", "küçük grafik"],
    href: "/showcase/sparkline",
    importLine: 'import { Sparkline } from "@/components/ui/sparkline";',
    minimalCode: '<Sparkline data={[10, 20, 15, 30, 25]} color="primary" />' },

  { id: "mini-bar-chart", label: "Mini Bar Chart", group: "Charts",
    keywords: ["küçük sütun grafik", "bar chart mini", "stat card grafik"],
    href: "/showcase/mini-bar-chart",
    importLine: 'import { MiniBarChart } from "@/components/ui/mini-bar-chart";',
    minimalCode: '<MiniBarChart data={[10, 40, 25, 60, 35]} />' },

  { id: "donut-chart",    label: "Donut Chart",    group: "Charts",
    keywords: ["halka grafik", "pasta grafik", "dağılım", "yüzde grafik"],
    href: "/showcase/donut-chart",
    importLine: 'import { DonutChart } from "@/components/ui/donut-chart";',
    minimalCode: '<DonutChart segments={[{ label: "A", value: 40, color: "primary" }]} />' },

  { id: "heat-map",       label: "Heat Map",       group: "Charts",
    keywords: ["ısı haritası", "takvim grafik", "github contribution", "yoğunluk harita"],
    href: "/showcase/heat-map",
    importLine: 'import { HeatMap } from "@/components/ui/heat-map";',
    minimalCode: '<HeatMap data={heatmapData} year={2026} />' },

  { id: "area-chart",     label: "Area Chart",     group: "Charts",
    keywords: ["alan grafik", "çizgi grafik", "trend", "zaman serisi"],
    href: "/showcase/area-chart",
    importLine: 'import { AreaChart } from "@/components/ui/area-chart";',
    minimalCode: '<AreaChart data={data} xKey="date" yKey="value" />' },

  { id: "gauge-chart",    label: "Gauge Chart",    group: "Charts",
    keywords: ["gösterge", "yarım daire", "performans", "ibre"],
    href: "/showcase/gauge-chart",
    importLine: 'import { GaugeChart } from "@/components/ui/gauge-chart";',
    minimalCode: '<GaugeChart value={72} min={0} max={100} />' },

  /* ── Data Table ── */
  { id: "data-table",     label: "Data Table",     group: "Data Table",
    keywords: ["gelişmiş tablo", "satır seçim", "export", "filtre", "inline edit", "enterprise"],
    href: "/showcase/data-table",
    importLine: 'import { DataTable } from "@/components/ui/data-table";',
    minimalCode: '<DataTable columns={columns} data={data} selectable filterable exportable />' },

  /* ── Templates ── */
  { id: "tpl-dashboard",  label: "Dashboard",              group: "Templates",
    keywords: ["yönetim paneli", "admin", "analitik", "grafik dashboard"],
    href: "/showcase/templates/dashboard" },

  { id: "tpl-landing",    label: "Landing — Genel",        group: "Templates",
    keywords: ["genel landing", "basit landing page"],
    href: "/showcase/templates/landing" },

  { id: "tpl-landing-saas",     label: "Landing — SaaS",       group: "Templates",
    keywords: ["saas landing", "uygulama tanıtım", "yazılım ürün", "pricing faq"],
    href: "/showcase/templates/landing-saas" },

  { id: "tpl-landing-startup",  label: "Landing — Startup",    group: "Templates",
    keywords: ["startup launch", "ürün lansmanı", "waitlist", "erken erişim"],
    href: "/showcase/templates/landing-startup" },

  { id: "tpl-landing-portfolio",label: "Landing — Portfolyo",  group: "Templates",
    keywords: ["kişisel site", "freelancer", "cv", "projeler", "portfolio"],
    href: "/showcase/templates/landing-portfolio" },

  { id: "tpl-landing-ecommerce",label: "Landing — E-Ticaret",  group: "Templates",
    keywords: ["e-ticaret", "mağaza", "ürün satış", "alışveriş", "shop"],
    href: "/showcase/templates/landing-ecommerce" },

  { id: "tpl-landing-agency",   label: "Landing — Ajans",      group: "Templates",
    keywords: ["ajans", "kreatif stüdyo", "hizmetler", "dijital ajans"],
    href: "/showcase/templates/landing-agency" },

  { id: "tpl-landing-blog",     label: "Landing — Blog/Medya", group: "Templates",
    keywords: ["blog", "makale", "içerik", "medya", "yayın", "bülten"],
    href: "/showcase/templates/landing-blog" },

  { id: "tpl-landing-app",      label: "Landing — Mobil App",  group: "Templates",
    keywords: ["mobil uygulama", "app store", "google play", "indirme sayfası"],
    href: "/showcase/templates/landing-app" },

  { id: "tpl-landing-event",    label: "Landing — Etkinlik",   group: "Templates",
    keywords: ["etkinlik", "konferans", "bilet", "program", "konuşmacı"],
    href: "/showcase/templates/landing-event" },

  { id: "tpl-auth",      label: "Auth Sayfaları",        group: "Templates",
    keywords: ["giriş kayıt sayfası", "auth template"],
    href: "/showcase/templates/auth" },

  { id: "tpl-settings",  label: "Settings",              group: "Templates",
    keywords: ["ayarlar sayfası", "profil düzenle", "tercihler"],
    href: "/showcase/templates/settings" },

  { id: "tpl-pricing",   label: "Pricing Page",          group: "Templates",
    keywords: ["fiyatlandırma sayfası", "plan seçim", "abonelik"],
    href: "/showcase/templates/pricing" },

  { id: "tpl-blog",      label: "Blog Şablonu",          group: "Templates",
    keywords: ["blog şablonu", "makale listesi", "kategori filtre"],
    href: "/showcase/templates/blog" },

  { id: "tpl-profile",   label: "Kullanıcı Profili",     group: "Templates",
    keywords: ["profil sayfası", "kullanıcı detay", "sosyal profil"],
    href: "/showcase/templates/profile" },

  { id: "tpl-inbox",     label: "Inbox / Mesajlaşma",    group: "Templates",
    keywords: ["inbox", "chat", "mesajlaşma", "konuşma"],
    href: "/showcase/templates/inbox" },

  { id: "tpl-kanban",    label: "Kanban Board",          group: "Templates",
    keywords: ["kanban", "görev board", "proje yönetimi", "kart sütun"],
    href: "/showcase/templates/kanban" },

  { id: "tpl-analytics", label: "Analytics V2",          group: "Templates",
    keywords: ["analitik", "grafik dashboard", "metrik", "veri görselleştirme"],
    href: "/showcase/templates/analytics" },

  /* ── Navigation (Faz 21.1) ── */
  { id: "stepper",      label: "Stepper",         group: "Layout",
    keywords: ["adım göstergesi", "wizard", "çok adımlı form", "step indicator", "progress steps"],
    href: "/showcase/stepper",
    importLine: 'import { Stepper } from "@/components/ui/stepper";',
    minimalCode: '<Stepper steps={[{ label: "Adım 1" }, { label: "Adım 2" }]} currentStep={0} />' },

  { id: "back-to-top",  label: "Back to Top",     group: "Layout",
    keywords: ["yukarı çık", "scroll top", "back to top", "sayfa başı butonu"],
    href: "/showcase/back-to-top",
    importLine: 'import { BackToTop } from "@/components/ui/back-to-top";',
    minimalCode: '<BackToTop threshold={300} />' },

  { id: "bottom-nav",   label: "Bottom Navigation", group: "Layout",
    keywords: ["alt navigasyon", "mobil tab bar", "bottom tab", "app nav"],
    href: "/showcase/bottom-nav",
    importLine: 'import { BottomNav } from "@/components/ui/bottom-nav";',
    minimalCode: '<BottomNav items={[{ label: "Ana", icon: <HomeIcon />, active: true }]} />' },

  /* ── Content (Faz 21.2) ── */
  { id: "timeline",      label: "Timeline",         group: "Data Display",
    keywords: ["zaman çizelgesi", "kronoloji", "olaylar", "tarihçe", "adımlar"],
    href: "/showcase/timeline",
    importLine: 'import { Timeline } from "@/components/ui/timeline";',
    minimalCode: '<Timeline items={[{ title: "Başladı", date: "2024", variant: "success" }]} />' },

  { id: "pricing-table", label: "Pricing Table",    group: "Data Display",
    keywords: ["fiyat tablosu", "plan karşılaştırma", "özellik tablosu", "saas fiyatlandırma"],
    href: "/showcase/pricing-table",
    importLine: 'import { PricingTable } from "@/components/ui/pricing-table";',
    minimalCode: '<PricingTable plans={plans} features={features} />' },

  { id: "faq-list",      label: "FAQ List",         group: "Data Display",
    keywords: ["sss", "sıkça sorulan sorular", "accordion faq", "arama sss", "kategori filtre"],
    href: "/showcase/faq-list",
    importLine: 'import { FAQList } from "@/components/ui/faq-list";',
    minimalCode: '<FAQList items={faqItems} searchable filterable />' },

  { id: "feature-grid",  label: "Feature Grid",     group: "Data Display",
    keywords: ["özellik listesi", "feature section", "landing page özellikler", "icon grid"],
    href: "/showcase/feature-grid",
    importLine: 'import { FeatureGrid } from "@/components/ui/feature-grid";',
    minimalCode: '<FeatureGrid features={features} columns={3} variant="card" />' },

  { id: "logo-wall",     label: "Logo Wall",        group: "Data Display",
    keywords: ["logo duvarı", "marka listesi", "partner logoları", "müşteri logoları", "marquee logo"],
    href: "/showcase/logo-wall",
    importLine: 'import { LogoWall } from "@/components/ui/logo-wall";',
    minimalCode: '<LogoWall logos={logos} marquee grayscale title="Güvenilen Markalar" />' },

  /* ── Form (Faz 21.3) ── */
  { id: "multi-step-form", label: "Multi-step Form",  group: "Interactive",
    keywords: ["çok adımlı form", "wizard form", "step form", "kayıt adımları", "onboarding"],
    href: "/showcase/multi-step-form",
    importLine: 'import { MultiStepForm } from "@/components/ui/multi-step-form";',
    minimalCode: '<MultiStepForm steps={steps} onComplete={handleComplete} />' },

  { id: "rating-input",   label: "Rating Input",     group: "Interactive",
    keywords: ["yıldız puan", "derecelendirme", "star rating", "yarım yıldız", "review"],
    href: "/showcase/rating-input",
    importLine: 'import { RatingInput } from "@/components/ui/rating-input";',
    minimalCode: '<RatingInput value={rating} onChange={setRating} allowHalf />' },

  { id: "phone-input",    label: "Phone Input",      group: "Interactive",
    keywords: ["telefon girişi", "ülke kodu", "uluslararası telefon", "flag select"],
    href: "/showcase/phone-input",
    importLine: 'import { PhoneInput } from "@/components/ui/phone-input";',
    minimalCode: '<PhoneInput label="Telefon" defaultCountry="TR" onChange={setPhone} />' },

  { id: "color-picker",   label: "Color Picker",     group: "Interactive",
    keywords: ["renk seçici", "hex renk", "renk paleti", "color swatch", "opacity"],
    href: "/showcase/color-picker",
    importLine: 'import { ColorPicker } from "@/components/ui/color-picker";',
    minimalCode: '<ColorPicker value={color} onChange={setColor} showOpacity />' },

  /* ── System ── */
  { id: "theme-switcher",label: "Theme Switcher",group: "Sistem",
    keywords: ["tema değiştir", "renk şeması", "dark mode", "font", "radius"],
    href: "/showcase/theme-switcher",
    importLine: 'import { ThemeSwitcher } from "@/components/ui/theme-switcher";',
    minimalCode: '<ThemeSwitcher />' },

  { id: "accessibility",  label: "A11Y Audit",   group: "Sistem",
    keywords: ["erişilebilirlik", "a11y", "wcag", "klavye navigasyon", "screen reader"],
    href: "/showcase/accessibility" },
];

/* ─── Recent storage key ─────────────────────────────────────── */
const RECENT_KEY = "showcase-recent-items";

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"); }
  catch { return []; }
}
function saveRecent(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RECENT_KEY, JSON.stringify(ids));
}

/* ─── Copy helper ────────────────────────────────────────────── */
async function copyToClipboard(text: string) {
  try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
}

/* ─── Component ──────────────────────────────────────────────── */

export function ShowcaseSearch() {
  const router   = useRouter();
  const pathname = usePathname();
  const { open, setOpen } = useCommandPalette();
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Load recent from localStorage on mount
  useEffect(() => { setRecentIds(loadRecent()); }, []);

  const handleRecentChange = useCallback((ids: string[]) => {
    setRecentIds(ids);
    saveRecent(ids);
  }, []);

  // Track page visits as "recent"
  useEffect(() => {
    const entry = ENTRIES.find((e) => e.href === pathname);
    if (!entry) return;
    setRecentIds((prev) => {
      const next = [entry.id, ...prev.filter((id) => id !== entry.id)].slice(0, 8);
      saveRecent(next);
      return next;
    });
  }, [pathname]);

  // Build CommandItem list
  const items: CommandItem[] = ENTRIES.map((entry) => ({
    id:       entry.id,
    label:    entry.label,
    group:    entry.group,
    keywords: entry.keywords,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    onSelect: () => router.push(entry.href),
  }));

  // Add "Hızlı Kopyala" items for entries with minimalCode
  const copyItems: CommandItem[] = ENTRIES
    .filter((e) => e.minimalCode)
    .map((entry) => ({
      id:       `copy-${entry.id}`,
      label:    `Kopyala: ${entry.label}`,
      group:    "Hızlı Kopyala",
      keywords: [...(entry.keywords ?? []), "kopyala", "snippet", "code"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
          <rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      ),
      shortcut: "⌘C",
      onSelect: () => {
        const text = entry.importLine
          ? `${entry.importLine}\n\n${entry.minimalCode}`
          : entry.minimalCode!;
        copyToClipboard(text);
      },
    }));

  const allItems = [...items, ...copyItems];

  return (
    <>
      {/* ⌘K hint button in sidebar (rendered by ShowcaseSidebar separately) */}
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={allItems}
        placeholder="Bileşen ara... (⌘K)"
        recentIds={recentIds}
        onRecentChange={handleRecentChange}
      />
    </>
  );
}
