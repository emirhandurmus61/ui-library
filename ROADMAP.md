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
- [ ] **Input** — text, email, password, number · label · error state · helper text
- [ ] **Textarea** — resizable, auto-grow seçeneği
- [ ] **Select** — custom dropdown, native fallback
- [ ] **Checkbox** — indeterminate state dahil
- [ ] **Radio** — Radio Group
- [ ] **Toggle / Switch**
- [ ] **Badge** — variant ve size
- [ ] **Avatar** — image + fallback initials
- [ ] **Spinner / Loader** — birkaç farklı animasyon
- [ ] **Divider / Separator**
- [ ] **Tooltip**

---

## Faz 2 — Layout Bileşenleri `[ ]`

Sayfanın iskeletini oluşturan yapılar.

- [ ] **Navbar** — en az 3 farklı tasarım
  - [ ] Minimal (logo + linkler)
  - [ ] Full (logo + nav + CTA + avatar dropdown)
  - [ ] Sticky + blur backdrop
- [ ] **Sidebar** — en az 2 farklı tasarım
  - [ ] Collapsible icon sidebar
  - [ ] Full-width sidebar with sections
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
| 1 | Primitive Bileşenler | Başlanmadı |
| 2 | Layout | Başlanmadı |
| 3 | Auth | Başlanmadı |
| 4 | Feedback & Overlay | Başlanmadı |
| 5 | Data Display | Başlanmadı |
| 6 | Showcase | Başlanmadı |
| 7 | Sayfa Şablonları | Başlanmadı |

---

*Son güncelleme: 2026-05-27*
