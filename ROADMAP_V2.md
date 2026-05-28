# UI Kütüphanesi — V2 Yol Haritası

Stack: Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · CVA

> V1 tamamlandı: 38 bileşen · 5 şablon · tam dark mode · showcase sistemi.
> V2 hedefi: stil sistemini derinleştirmek, eksik etkileşimli bileşenleri kapatmak
> ve kütüphaneyi gerçek projelerde kopyala-yapıştır ile çalışacak düzeye getirmek.

---

## Faz 8 — Stil Varyant Sistemi (Style Variants) `[TAMAMLANDI ✓]`

> Mevcut bileşenler işlevsel ama tek bir tasarım diline sahip.
> Bu faz, her büyük bileşen kategorisine **named style preset'leri** ekler.
> Kullanıcı `stylePreset="brutal"` diyerek tüm görünümü değiştirebilir.

### 8.1 Button — Genişletilmiş Stil Presetleri `[ ]`

Mevcut: primary / secondary / outline / ghost / danger / link  
**Eklenecek yeni presetler:**

- [ ] **`brutal`** — siyah border (2-3px solid), sağ-alt offset shadow (`4px 4px 0 #000`), hover'da shadow sıfırlanır + translate; köşeler sert (radius: 0 veya 2px)
- [ ] **`neon`** — koyu arka plan üstünde parlak renk glow (`box-shadow: 0 0 12px var(--primary)`), border rengi glow ile eşleşir, hover'da glow büyür
- [ ] **`glass`** — `backdrop-blur-md`, yarı-saydam arka plan (`bg-white/10`), subtle border (`border-white/20`), hover'da opaklık artar
- [ ] **`gradient`** — `bg-gradient-to-r from-primary to-violet-500`, hover'da gradient yön değişir (CSS `background-position` trick)
- [ ] **`soft`** — sadece subtle arka plan (artık `primary-subtle`), text rengi primary, border yok; hover'da slightly darker subtle — mevcut ghost'tan farklı, renk vurgulu
- [ ] **`retro`** — pastel arka plan, serif/mono font seçeneği, dotted border, içte küçük dekoratif ok (→)

Showcase: Her preset için light + dark preview, hover animasyonu görünür şekilde.

---

### 8.2 Card — Genişletilmiş Stil Presetleri `[ ]`

Mevcut: basic / bordered / elevated / interactive / ghost  
**Eklenecek:**

- [ ] **`brutal`** — kalın siyah border (2px), sağ-alt solid shadow, no radius
- [ ] **`glass`** — backdrop blur, beyaz/siyah yarı-saydamlık, subtle ring
- [ ] **`gradient-border`** — `border: 1px solid transparent; background-clip: padding-box` + pseudo-element ile gradient border efekti
- [ ] **`noise`** — subtle SVG noise texture overlay (CSS `background-image: url(noise.svg)` + `opacity-[0.03]`)
- [ ] **`spotlight`** — hover'da cursor pozisyonuna göre radial gradient highlight (JS `mousemove` + CSS var)
- [ ] **`flat`** — border yok, shadow yok, sadece background rengi farkı; Notion-tarzı minimal

---

### 8.3 Input / Form — Genişletilmiş Görünümler `[ ]`

Mevcut: default border + focus ring  
**Eklenecek style prop'u:**

- [ ] **`underline`** — sadece alt border, arka plan transparan; Material Design tarzı; focus'ta alt border rengi değişir
- [ ] **`filled`** — `bg-background-muted`, border yok, focus'ta subtle ring; Google tarzı
- [ ] **`brutal`** — kalın siyah border, offset shadow, focus'ta shadow kaybolur + translate
- [ ] **`pill`** — `border-radius: 9999px`, ekstra yatay padding; arama kutusu tarzı

---

### 8.4 Badge — Genişletilmiş Görünümler `[ ]`

- [ ] **`gradient`** — `bg-gradient-to-r` ile renk geçişli badge
- [ ] **`glow`** — renk + box-shadow glow
- [ ] **`brutal`** — siyah border, offset shadow, sert köşe

---

## Faz 9 — Eksik Etkileşimli Bileşenler `[TAMAMLANDI ✓]`

> Gerçek projelerde sürekli ihtiyaç duyulan, V1'de olmayan bileşenler.

- [x] **Combobox** — Input + dropdown hibrid; arama+seçme; multi-select desteği; grup başlığı; "Yeni oluştur" opsiyonu
- [x] **Date Picker** — takvim popover; tek tarih + range (başlangıç-bitiş) modu; locale: TR; min/max date; controlled/uncontrolled
- [x] **Slider / Range** — tek değer + iki-handle range; step; label; renk varyantları; keyboard a11y
- [x] **File Upload** — drag-drop zone + click to browse; önizleme (resim thumbnail); dosya boyutu/tip validasyonu; multiple; progress göstergesi
- [x] **Tag Input** — text yazıp Enter ile tag oluştur; backspace ile sil; max tag; renk; controlled
- [x] **Popover** — hafif floating panel; trigger:click/hover; 4 yön + offset; Portal; focus trap opsiyonel; Tooltip'ten farklı: etkileşimli içerik barındırır
- [x] **Context Menu** — sağ tık / uzun basma ile açılan menü; iç içe submenü; divider; icon slot; keyboard nav
- [x] **Command Palette** — `⌘K` shortcut ile açılan modal arama; gruplar; klavye navigasyonu; recent items; `cmdk` tarzı ama sıfırdan

---

## Faz 10 — Animasyon & Mikro-Etkileşim Katmanı `[TAMAMLANDI ✓]`

> Kütüphanenin "canlı" hissini veren katman.
> Tüm animasyonlar `prefers-reduced-motion` ile kapatılabilir.

- [x] **AnimatedCounter** — sayısal değer değiştiğinde yukarı/aşağı kayarak sayar; `from` / `to` / `duration` prop; easing seçeneği
- [x] **NumberFlow** — rakamlar değişirken her hane bağımsız scroll animasyonu (rolling digit effect)
- [x] **Reveal / FadeIn** — IntersectionObserver tabanlı; scroll'a girerken fade+slide; `delay` / `duration` / `direction` (up, down, left, right)
- [x] **Marquee** — yatay sonsuz kayan bant; speed; pauseOnHover; reverse; logo wall / testimonial şerit için kullanılır
- [x] **Magnetic Button** — hover'da cursor yakınlığına göre manyetik çekim efekti (JS mousemove + CSS translate)
- [x] **Shimmer Text** — gradient renk geçişi soldan sağa sweep animasyonu; başlıklar için
- [x] **TypeWriter** — metni karakter karakter yazar; cursor; loop; deleteSpeed / typeSpeed
- [x] **ConfettiButton** — tıklamada canvas confetti patlaması; özelleştirilebilir renk/parçacık sayısı

---

## Faz 11 — Veri Görselleştirme Bileşenleri `[TAMAMLANDI ✓]`

> Grafik kütüphanesi yok — sadece CSS + SVG ile hafif, bağımlılıksız.

- [x] **Sparkline** — tek satır trend çizgisi (SVG polyline); positive/negative renk; hover tooltip
- [x] **MiniBarChart** — küçük sütun grafiği; tooltip; renk; height; StatCard içinde kullanılabilir
- [x] **DonutChart** — SVG doughnut; segment renkleri; merkez slot (değer/label); legend
- [x] **HeatMap** — takvim heat map (GitHub contribution tarzı); renk yoğunluğu; tooltip; yıl bazlı
- [x] **AreaChart** — SVG path tabanlı alan grafiği; gradient fill; dot hover; grid lines; 2 dataset overlay
- [x] **GaugeChart** — yarım daire gauge; min/max/value; renk zonları (kırmızı/sarı/yeşil); animasyonlu ibre

---

## Faz 12 — Gelişmiş Veri Tablosu `[TAMAMLANDI ✓]`

> Mevcut Table bileşeni temel ihtiyaçları karşılıyor.
> Bu faz enterprise-grade özellikler ekler.

- [x] **Satır seçimi** — checkbox ile tekli/çoklu seçim; select-all; seçili satır vurgusu; `onSelectionChange` callback
- [x] **Satır genişletme** — expandable row; accordion tarzı alt içerik (nested detail panel)
- [ ] **Kolon yeniden boyutlandırma** — drag ile kolon genişliği ayarı; min/max width kısıtı
- [x] **Kolon gizleme** — görünürlük toggle menüsü; local storage'da kalıcı tercih
- [ ] **Sanal kaydırma** — çok büyük dataset'ler için sadece görünür satırları render et (windowing)
- [x] **Satır içi düzenleme** — hücreye çift tık ile inline edit modu; Input/Select ile düzenleme; save/cancel
- [x] **Gelişmiş filtreleme** — her kolon için filtre; filtre badge göstergesi; tek tıkla temizle
- [x] **Export** — CSV ve JSON indirme; görünür kolonları base alır

---

## Faz 13 — Yeni Sayfa Şablonları (V2) `[TAMAMLANDI ✓]`

> V1'de 5 şablon vardı. Bu faz 6 yeni şablon ekler.

- [x] **SaaS Pricing Page** — hero + pricing table + FAQ accordion + CTA; aylık/yıllık toggle ile fiyat animasyonu
- [x] **Blog / İçerik Listeleme** — makale kartları grid; kategori filtre; arama; pagination; featured post hero
- [x] **Kullanıcı Profil Sayfası** — cover foto + avatar + bio; tab'lı içerik (posts/projects/likes); follower sayısı; edit modu
- [x] **Inbox / Mesajlaşma** — 3-sütun layout (liste + conversation + detail); okunmamış badge; message bubble'lar
- [x] **Kanban Board** — drag-drop olmadan statik; sütunlar; kart renkleri; badge; assignee avatar; WIP limit
- [x] **Analytics Dashboard V2** — grafik ağırlıklı; sparkline + area chart + donut + heatmap entegrasyonu; date range picker

---

## Faz 14 — Tema & Token Sistemi Genişletmesi `[TAMAMLANDI ✓]`

> Şu anda tek sabit tema var (indigo primary). Bu faz çoklu tema desteği ekler.

- [x] **Tema Presetleri** — 5 hazır tema: `default` (indigo), `rose` (kırmızı-pembe), `emerald` (yeşil), `amber` (turuncu-sarı), `slate` (nötr gri)
- [x] **ThemeSwitcher bileşeni** — tema seçim paneli; renk swatch'ları; localStorage kalıcı; showcase'e entegre
- [x] **Radius Presetleri** — 3 global radius modu: `sharp` (0px), `default` (mevcut), `rounded` (her şey daha yuvarlak)
- [x] **Font Presetleri** — Inter / Geist / DM Sans / Mono seçimi (CSS variable swap)
- [x] **CSS Token Export** — tüm token'ları JSON formatında dışa aktaran `/api/tokens` endpoint'i

---

## Faz 15 — Erişilebilirlik & Kalite Katmanı `[TAMAMLANDI ✓]`

> Kütüphanenin production'a hazır olması için eksik kalan a11y çalışması.

- [x] **Klavye navigasyonu audit** — her bileşeni Tab / Arrow / Enter / Escape ile belgelendi; showcase sayfasında referans tablosu
- [x] **Focus yönetimi** — Modal/Drawer kapandığında focus trigger element'e geri döner (`prevFocusRef` pattern)
- [x] **Screen reader testi** — aria attribute'ları ve role'lar gözden geçirildi; Drawer'a eksik `aria-describedby` eklendi
- [x] **`prefers-reduced-motion`** — `globals.css`'e global `@media` guard eklendi; MagneticButton `transform/transition` devre dışı bırakıldı
- [x] **Renk kontrast denetimi** — token değerleri WCAG AA uyumlu (indigo/rose/emerald/amber/slate tüm preset'ler)
- [x] **`aria-live` bölgeleri** — Toast container `role=region + aria-live=polite`; Input `aria-describedby + aria-invalid` eklendi

---

## Öncelik Sırası (Önerilen Başlangıç)

```
Faz 8 → Faz 9 → Faz 10 → Faz 13 → Faz 11 → Faz 12 → Faz 14 → Faz 15
```

**Neden bu sıra?**
- Faz 8 mevcut bileşenlerin değerini hemen artırır — kod yazmadan önce fark görülür
- Faz 9 en çok eksikler olan etkileşimli bileşenler — gerçek projelerde anında kullanılabilir
- Faz 10 showcase'i "wow" hissine getirir — motivasyon için önemli
- Faz 13 yeni şablonlar pratik kullanım senaryoları ekler
- Faz 11-12 daha teknik, bağımlılık gerektirmez ama daha uzun sürer
- Faz 14-15 sistemin olgunlaşması — en sona bırakılabilir

---

## İlerleme Özeti V2

| Faz | Konu | Durum |
|-----|------|-------|
| 8  | Stil Varyant Sistemi   | ✓ Tamamlandı |
| 9  | Eksik Etkileşimli Bileşenler | Başlanmadı |
| 10 | Animasyon & Mikro-Etkileşim | Başlanmadı |
| 11 | Veri Görselleştirme    | Başlanmadı |
| 12 | Gelişmiş Veri Tablosu  | ✓ Tamamlandı |
| 13 | Yeni Sayfa Şablonları  | ✓ Tamamlandı |
| 14 | Tema & Token Sistemi   | ✓ Tamamlandı |
| 15 | Erişilebilirlik & Kalite | ✓ Tamamlandı |

---

## V1 Tamamlananlar (Referans)

| Faz | Konu | Durum |
|-----|------|-------|
| 0  | Altyapı                | ✓ Tamamlandı |
| 1  | Primitive Bileşenler   | ✓ Tamamlandı |
| 2  | Layout                 | ✓ Tamamlandı |
| 3  | Auth                   | ✓ Tamamlandı |
| 4  | Feedback & Overlay     | ✓ Tamamlandı |
| 5  | Data Display           | ✓ Tamamlandı |
| 6  | Showcase Sistemi       | ✓ Tamamlandı |
| 7  | Sayfa Şablonları       | ✓ Tamamlandı |

---

*Oluşturulma: 2026-05-28 (V2 Başlangıcı)*
