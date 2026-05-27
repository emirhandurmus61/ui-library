# UI Kütüphanesi Yol Haritası

Stack: Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript

---

## Faz 0 — Proje Altyapısı `[TAMAMLANDI ✓]`

Temel kurulum ve klasör yapısı. Hiçbir bileşen yazılmadan önce bu adım tamamlanmalı.

- [x] Klasör yapısını oluştur (`components/`, `app/showcase/`, `lib/`)
- [x] Tailwind v4 tema değişkenlerini tanımla (renkler, font, spacing, radius)
- [x] Global CSS token sistemi kur (`globals.css` — CSS custom properties)
- [x] Dark mode altyapısı kur (`next-themes`, class-based)
- [x] Temel `cn()` utility fonksiyonu ekle (`clsx` + `tailwind-merge`)
- [x] Font kurulumu (Geist Sans + Geist Mono — Google Fonts)
- [x] Showcase ana sayfası iskeleti (`app/showcase/page.tsx`)

---

## Faz 1 — Temel (Primitive) Bileşenler `[ ]`

Her şeyin üzerine inşa edildiği atomlar.

- [x] **Button** — variant: primary / secondary / outline / ghost / danger / danger-outline / link · size: xs→xl + icon · loading state · leftIcon / rightIcon
- [x] **Input** — text / email / password / number / date / tel / url · label · error / success / helper text · leftIcon / rightIcon · size: sm/md/lg · PasswordInput (göster/gizle)
- [x] **Textarea** — auto-grow (maxRows ile sınırlı) · karakter sayacı · error / success / helper text · disabled / readOnly
- [x] **Select** — custom dropdown · arama (searchable) · gruplu seçenekler · icon · error / success state · 3 size · controlled/uncontrolled
- [x] **Checkbox** — 3 size · indeterminate · description · error state · CheckboxGroup (dikey/yatay)
- [x] **Radio** — 3 size · description · error state · yatay · kart görünümü (card) · RadioGroup controlled/uncontrolled
- [x] **Toggle / Switch** — 3 size · 4 renk (primary/success/danger/warning) · labelPosition · description · controlled/uncontrolled · form uyumlu
- [x] **Badge** — 8 variant · 3 size · dot (status, animate-pulse) · leftIcon / rightIcon
- [x] **Avatar** — 6 size · görsel / initials (deterministik renk) / fallback ikon · status dot · AvatarGroup (+N taşma)
- [x] **Spinner / Loader** — 5 variant (circle/ring/dots/bars/pulse) · 5 size · 7 renk · a11y (role=status, sr-only)
- [ ] **Divider / Separator**
- [x] **Tooltip** — 4 yön (top/bottom/left/right) · 5 variant · delay · ok işareti · a11y (role=tooltip, aria-describedby)

---

## Faz 2 — Layout Bileşenleri `[ ]`

Sayfanın iskeletini oluşturan yapılar.

- [x] **Navbar** — 3 tasarım · tam responsive · mobil hamburger
  - [x] Minimal (logo + linkler + rightSlot)
  - [x] Full (logo + nav + CTA + avatar dropdown + kullanıcı menüsü)
  - [x] Sticky + blur backdrop (scroll'da tetiklenir)
- [x] **Sidebar** — 2 tasarım · bölümlü nav · badge · user footer
  - [x] SidebarFull — bölümlü, özelleştirilebilir genişlik, footer slot
  - [x] SidebarCollapsible — ok butonuyla icon moduna geçer, hover tooltip
- [x] **Footer** — 2 tasarım · sosyal ikonlar · badge · alt bant (muted/surface) · tam responsive
  - [x] FooterMinimal — tek satır, copyright + linkler + sosyal ikonlar
  - [x] FooterMultiColumn — sitemap tarzı, marka kolonu + link kolonları + alt bant
- [x] **Container** — 7 size (xs→prose) · 4 padding varyantı · mx-auto
- [x] **Grid** — 2-6 + 12 kolon · responsive kırılma · gap varyantları · Col span
- [x] **Stack** — direction (col/row/reverse) · gap · align · justify · wrap · divider

---

## Faz 3 — Auth Bileşenleri `[ ]`

Projelerde en çok tekrarlanan ekranlar.

- [x] **Login Form** — 2 tasarım · sosyal giriş (Google/GitHub) · validation · loading · beni hatırla
  - [x] LoginCard — ortalanmış kart, showSocials toggle
  - [x] LoginSplit — sol panel (testimonial + özellikler) + sağ form
- [x] **Register Form**
- [x] **Forgot Password Form**
- [x] **OTP / Verification Input**

---

## Faz 4 — Feedback & Overlay Bileşenleri `[TAMAMLANDI ✓]`

Kullanıcıya geri bildirim veren katmanlar.

- [x] **Modal / Dialog** — backdrop, escape ile kapanma, animasyon · 5 boyut · footer slot · scroll kilit · a11y
- [x] **Drawer / Sheet** — left/right/bottom/top slide · handle (bottom/top) · footer slot · a11y
- [x] **Toast / Notification** — success/error/warning/info/default · action butonu · otomatik kapanma · stack · ToastProvider + useToast hook
- [x] **Alert** — inline uyarı · 5 variant · dismissible · action slot · description prop · a11y (role=alert)
- [x] **Skeleton** — 5 variant · SkeletonText · SkeletonCard · a11y (aria-hidden)
- [x] **Empty State** — özel ikon · başlık + açıklama · CTA slot · 3 boyut

---

## Faz 5 — Data Display Bileşenleri `[TAMAMLANDI ✓]`

İçerik göstermeye yönelik yapılar.

- [x] **Card** — basic · bordered · elevated · interactive · ghost · CardHeader · CardFooter · padding varyantları
- [x] **Table** — sortable headers · striped · hoverable · bordered · compact · row click · responsive · boş durum
- [x] **Stat Card** — trend (up/down/neutral) · 5 ikon rengi · description slot
- [x] **List / List Item** — default · bordered · flush · ghost · leading/trailing · interactive · selected · 3 boyut
- [x] **Accordion / Collapse** — tekli/çoklu açılma · bordered · flush · disabled · a11y
- [x] **Tabs** — line · pill · boxed · ikon · badge · disabled · a11y (role=tab, aria-selected)
- [x] **Breadcrumb** — chevron · slash · özel separator · icon · maxItems collapse · a11y
- [x] **Pagination** — ellipsis · first/last · siblings · sm/md · a11y
- [x] **Progress Bar** — 5 renk · 4 boyut · label · değer · striped · animated

---

## Faz 6 — Showcase Sistemi `[TAMAMLANDI ✓]`

Kütüphaneyi gezinebilir ve kopyalanabilir hale getiren arayüz.

- [x] Showcase ana layout — client sidebar, aktif link vurgulama, sticky header
- [x] Her bileşen için showcase sayfası
- [x] **CodeBlock** — "Kopyala" butonu (clipboard API) · satır numaraları · macOS pencere dekorasyonu
- [x] **ShowcaseSection** — preview + "Kodu Gör" toggle, her bileşen sayfasında kullanılabilir
- [x] **ThemeToggle** — icon variant (cycle) + segmented variant · sidebar'a entegre
- [x] Bileşen arama — sidebar içi live filter
- [x] Mobil responsive — slide-in drawer menü

---

## Faz 7 — Hazır Sayfa Şablonları `[ ]`

Kopyala-yapıştır ile kullanılabilecek tam sayfa layoutları.

- [ ] Dashboard şablonu
- [ ] Landing page şablonu
- [ ] Auth sayfaları şablonu (login + register)
- [ ] Settings sayfası şablonu
- [ ] 404 / Error sayfası

---

## Bileşen Yazım Kuralları

Her bileşen şu yapıya uymalı:

```
components/
  button/
    Button.tsx        ← bileşen kodu
    Button.types.ts   ← TypeScript interface/type (gerekirse)
    index.ts          ← re-export
```

- Props her zaman TypeScript ile tanımlanır
- `cn()` utility ile class birleştirme yapılır
- Variant'lar `cva` (class-variance-authority) ile yönetilir
- Her bileşen `className` prop'u kabul eder (override için)
- Animasyonlar Tailwind transition utility'leri ile yapılır

---

## İlerleme Özeti

| Faz | Konu | Durum |
|-----|------|-------|
| 0 | Altyapı | ✓ Tamamlandı |
| 1 | Primitive Bileşenler | ✓ Tamamlandı |
| 2 | Layout | ✓ Tamamlandı |
| 3 | Auth | Başlanmadı |
| 4 | Feedback & Overlay | ✓ Tamamlandı |
| 5 | Data Display | ✓ Tamamlandı |
| 6 | Showcase Sistemi | ✓ Tamamlandı |
| 7 | Sayfa Şablonları | Başlanmadı |

---

*Son güncelleme: 2026-05-28 (Faz 6)*
