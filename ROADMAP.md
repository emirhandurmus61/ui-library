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
- [ ] **Footer** — en az 2 farklı tasarım
  - [ ] Minimal (copyright + linkler)
  - [ ] Multi-column (sitemap tarzı)
- [ ] **Container** — max-width wrapper, padding yönetimi
- [ ] **Grid** — responsive grid sistemi
- [ ] **Stack** — vertical/horizontal flex helper

---

## Faz 3 — Auth Bileşenleri `[ ]`

Projelerde en çok tekrarlanan ekranlar.

- [ ] **Login Form** — en az 2 tasarım
  - [ ] Card ortada
  - [ ] Split screen (görsel + form)
- [ ] **Register Form**
- [ ] **Forgot Password Form**
- [ ] **OTP / Verification Input**

---

## Faz 4 — Feedback & Overlay Bileşenleri `[ ]`

Kullanıcıya geri bildirim veren katmanlar.

- [ ] **Modal / Dialog** — backdrop, escape ile kapanma, animasyon
- [ ] **Drawer / Sheet** — left/right/bottom slide
- [ ] **Toast / Notification** — success, error, warning, info
- [ ] **Alert** — inline uyarı kutusu
- [ ] **Skeleton** — loading placeholder
- [ ] **Empty State** — icon + başlık + CTA

---

## Faz 5 — Data Display Bileşenleri `[ ]`

İçerik göstermeye yönelik yapılar.

- [ ] **Card** — birkaç varyant (basic, bordered, elevated, interactive)
- [ ] **Table** — sortable headers, responsive (yatay scroll)
- [ ] **Stat Card** — dashboard istatistik kartı
- [ ] **List / List Item**
- [ ] **Accordion / Collapse**
- [ ] **Tabs**
- [ ] **Breadcrumb**
- [ ] **Pagination**
- [ ] **Progress Bar**

---

## Faz 6 — Showcase Sistemi `[ ]`

Kütüphaneyi gezinebilir ve kopyalanabilir hale getiren arayüz.

- [ ] Showcase ana layout (sidebar navigasyon + içerik alanı)
- [ ] Her bileşen için showcase sayfası
- [ ] "Kodu Kopyala" butonu (clipboard API)
- [ ] Variant seçici (props'ları canlı değiştirme)
- [ ] Dark/Light mode toggle showcase içinde

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
| 2 | Layout | Başlanmadı |
| 3 | Auth | Başlanmadı |
| 4 | Feedback & Overlay | Başlanmadı |
| 5 | Data Display | Başlanmadı |
| 6 | Showcase | Başlanmadı |
| 7 | Sayfa Şablonları | Başlanmadı |

---

*Son güncelleme: 2026-05-27*
