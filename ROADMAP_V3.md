# UI Kütüphanesi — V3 Yol Haritası

Stack: Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · CVA

> V1: 38 bileşen · 5 şablon · tam dark mode · showcase sistemi  
> V2: Stil presetleri · etkileşimli bileşenler · animasyonlar · veri görselleştirme · 11 yeni şablon · tema sistemi  
> **V3 hedefi:** İçerik zenginliği ve kullanışlılık — her bileşen kategorik, çeşitli, %100 responsive ve gerçek projede kopyala-yapıştır ile çalışır.

---

## Temel İlke

Her showcase sayfası şu soruyu cevaplamalı:  
**"Hangi projeye, hangi bağlamda, hangi tasarımı kullanmalıyım?"**

Bunun için her bileşen sayfası:
- Proje türüne göre **kategorize** edilmiş varyantlar içerir (SaaS / E-ticaret / Blog / Yönetim Paneli / Portfolyo vb.)
- Her varyant için **ne zaman kullanılır** açıklaması taşır
- Tüm varyantlar **mobile-first, tam responsive** yazılır
- Kod örneği doğrudan kopyalanabilir, bağımlılık minimum

---

## Faz 16 — Kart (Card) İçerik Zenginleştirmesi `[TAMAMLANDI ✓]`

> Mevcut: basic / bordered / elevated / interactive / ghost + brutal/glass/gradient-border/noise/spotlight/flat presetleri.  
> Sorun: Tek bir "card" sayfası var, hangi tasarım hangi projeye uyuyor belli değil.  
> Hedef: Her kart tipi için gerçek dünya kullanım örnekleri, kategorilere ayrılmış.

### 16.1 Ürün & E-ticaret Kartları `[ ]`

- [ ] **ProductCard** — görsel + isim + fiyat + stok durumu + sepete ekle butonu · hover'da hızlı önizleme · "Yeni" / "İndirim" badge overlay · wishlist kalp ikonu · rating yıldızları
- [ ] **ProductCardCompact** — yatay layout (sol görsel + sağ metin) · liste görünümü için
- [ ] **ProductCardMinimal** — sadece görsel + isim + fiyat · grid yoğun layout'lar için
- [ ] **CartItemCard** — adet kontrolü (+/-) · kaldır butonu · varyant gösterimi (renk/beden)

### 16.2 Blog & İçerik Kartları `[ ]`

- [ ] **ArticleCard** — kapak görseli + kategori chip + başlık + özet + yazar avatar + tarih + okuma süresi
- [ ] **ArticleCardHorizontal** — yatay, geniş ekranda sol görsel / sağ metin; responsive'de dikey
- [ ] **ArticleCardMinimal** — görsel yok, sadece metin; haber akışı / liste için
- [ ] **FeaturedArticleCard** — tam genişlik hero tarzı; büyük görsel + metin overlay (gradient)

### 16.3 Kullanıcı & Profil Kartları `[ ]`

- [ ] **TeamMemberCard** — avatar + isim + unvan + sosyal ikonlar · flip animasyonu (isteğe bağlı)
- [ ] **TestimonialCard** — alıntı + yazar + şirket + yıldız rating · minimal ve bordered varyant
- [ ] **ReviewCard** — kullanıcı adı + tarih + yıldız + metin + "Faydalı mı?" aksiyonu
- [ ] **UserProfileCard** — cover + avatar + bio + follower sayıları + takip et butonu

### 16.4 Proje & Portfolio Kartları `[ ]`

- [ ] **ProjectCard** — thumbnail + başlık + teknoloji tag'leri + GitHub/Demo linkleri · hover'da overlay
- [ ] **CaseStudyCard** — büyük görsel + kategori + başlık + kısa açıklama; ajans/portfolyo için
- [ ] **RepositoryCard** — GitHub repo tarzı: isim + açıklama + dil rengi + yıldız + fork sayısı

### 16.5 SaaS & Yönetim Paneli Kartları `[ ]`

- [ ] **PricingCard** — plan adı + fiyat + özellik listesi (tick/cross) + CTA; öne çıkan (featured) varyant
- [ ] **IntegrationCard** — logo + isim + açıklama + bağla/bağlı durumu · durum badge
- [ ] **NotificationCard** — ikon + başlık + açıklama + zaman damgası + okundu/okunmadı durumu
- [ ] **TaskCard** — Kanban için: başlık + öncelik rengi + atanan avatar + son tarih + tag

### 16.6 İstatistik & Metrik Kartları `[ ]`

- [ ] **MetricCard** — büyük sayı + etiket + trend (↑↓) + sparkline · 4 renk varyantı
- [ ] **GoalCard** — hedef + ilerleme çubuğu + yüzde + kalan süre
- [ ] **ComparisonCard** — 2 metriği yan yana karşılaştırır; önceki dönem vs şimdiki

**Showcase sayfası yapısı:**  
Her kategori altında grid preview → kodu gör → "Ne zaman kullan?" açıklaması

---

## Faz 17 — Buton (Button) İçerik Zenginleştirmesi `[TAMAMLANDI ✓]`

> Mevcut: 6 variant + 6 stil preset (brutal/neon/glass/gradient/soft/retro).  
> Sorun: Varyantlar tek sayfada liste halinde, proje bağlamı yok.  
> Hedef: Kullanım senaryosuna göre organize edilmiş, tüm kombinasyonlar görünür.

### 17.1 Kullanım Senaryosuna Göre Gruplar `[ ]`

- [ ] **Form Aksiyonları** — Kaydet / İptal / Sil / Onay çiftleri; loading + disabled durumları
- [ ] **CTA (Call-to-Action) Butonları** — Hero butonları: büyük + ikon + gradient; landing page için
- [ ] **Sosyal Giriş Butonları** — Google / GitHub / Apple tarzı; logo + metin; outlined varyant
- [ ] **Icon-only Butonlar** — toolbar, aksiyon sütunları için; tooltip ile birlikte
- [ ] **Floating Action Button (FAB)** — sağ alt sabit konum; +ekle, mesaj, yukarı çık varyantları
- [ ] **Split Button** — ana aksiyon + dropdown ok; açılır seçenek listesi

### 17.2 Boyut & Yoğunluk Örnekleri `[ ]`

- [ ] Mobil dokunma hedeflerine uygun minimum 44px yükseklik dokümantasyonu
- [ ] Tam genişlik (full-width) → responsive kırılma (mobilde full, masaüstünde auto)
- [ ] Buton grubu (ButtonGroup) — yan yana, bitişik, ilk/son radius

### 17.3 Durum Kombinasyonları Showcase `[ ]`

- [ ] Her variant için: default · hover · focus · active · loading · disabled durumları yan yana
- [ ] Dark/light mode karşılaştırmalı grid

---

## Faz 18 — Landing Page Şablonları (Kategorik) `[TAMAMLANDI ✓]`

> Mevcut: 1 genel landing page şablonu.  
> Hedef: Proje türüne göre ayrı, farklı görsel dile sahip 8 landing page.  
> Tümü full responsive: mobile-first, tablet kırılma, desktop layout.

### 18.1 SaaS / Uygulama Landing `[ ]`

- [ ] **SaaSLanding** — navbar + hero (başlık + sub + 2 CTA + mockup görsel) + logo wall + feature grid (icon+text 3-col) + how-it-works (numaralı adımlar) + pricing (3 plan) + FAQ + CTA banner + footer
  - Responsive: hero'da görsel alta kayar · feature grid 1-col mobilde · pricing dikey scroll

### 18.2 Startup / Ürün Lansmanı `[ ]`

- [ ] **StartupLanding** — bold tam ekran hero + gradient arka plan + büyük başlık + waitlist/email formu + özellik kartları (3-grid) + testimonial şerit (marquee) + erken erişim CTA + minimal footer
  - Responsive: büyük başlık font-size clamp ile scale · form full-width mobilde

### 18.3 Portfolyo / Freelancer `[ ]`

- [ ] **PortfolioLanding** — personal hero (isim + unvan + kısa bio + CTA) + seçilmiş projeler grid + beceri/teknoloji listesi + deneyim timeline + iletişim formu + footer
  - Responsive: proje grid 2-col tablet, 1-col mobil · timeline dikey

### 18.4 E-ticaret / Marka `[ ]`

- [ ] **EcommerceLanding** — tam ekran görsel hero + kategoriler (horizontal scroll mobilde) + öne çıkan ürünler grid + "Nasıl çalışır" adımları + kullanıcı yorumları (carousel) + bülten formu
  - Responsive: ürün grid 2-col mobil · kategoriler horizontal scroll

### 18.5 Ajans / Kreatif Stüdyo `[ ]`

- [ ] **AgencyLanding** — büyük tipografi odaklı hero + hizmetler (hover reveal kartlar) + seçilmiş işler masonry grid + ekip bölümü + müşteri logoları + iletişim CTA
  - Responsive: masonry tek sütun mobilde · büyük tipografi scale

### 18.6 Blog / Yayın / Medya `[ ]`

- [ ] **BlogLanding** — featured post hero (tam genişlik görsel + overlay) + son yazılar grid + kategoriler yatay filtre + bülten formu + popüler etiketler + sidebar (masaüstü) / alt (mobil)
  - Responsive: sidebar alta taşınır · yazı grid 1-col mobil

### 18.7 Mobil Uygulama Tanıtım `[ ]`

- [ ] **AppLanding** — phone mockup + özellikler (her özellikte mockup değişir — scroll magic) + indirme butonları (App Store / Google Play) + rating/review + ekran görüntüleri (horizontal scroll) + CTA
  - Responsive: mockup küçülür/kaybolur · özellikler dikey liste

### 18.8 Etkinlik / Konferans `[ ]`

- [ ] **EventLanding** — geri sayım timer + etkinlik detayları (tarih/yer/saat) + konuşmacı kartları + program/ajanda accordion + bilet/kayıt CTA + sponsor logoları
  - Responsive: program accordion tam genişlik · konuşmacı grid 2-col mobil

**Her şablonun showcase sayfasında:**
- Masaüstü tam önizleme (iframe veya scroll preview)
- Tablet (768px) ve mobil (375px) önizleme
- "Bu şablon için ne gerekir" bileşen listesi
- Kopyalanabilir tam kod

---

## Faz 19 — Showcase Navigasyon & UX İyileştirmesi `[TAMAMLANDI ✓]`

> İçerik arttıkça navigasyon zorluklaşıyor.  
> Hedef: Siteyi %100 kullanışlı yapmak — ne nerede, hızla bulunabilmeli.

### 19.1 Kategorili Sidebar `[ ]`

- [ ] Sidebar mevcut düz liste yerine **collapsible kategoriler** ile organize edilir:
  ```
  ▾ Primitives        (Button, Input, Checkbox...)
  ▾ Layout            (Navbar, Sidebar, Footer...)
  ▾ Data Display      (Card, Table, List...)
  ▾ Feedback          (Modal, Toast, Alert...)
  ▾ Interactive       (Combobox, DatePicker...)
  ▾ Animation         (Marquee, TypeWriter...)
  ▾ Charts            (Sparkline, DonutChart...)
  ▾ Templates         (Landing, Dashboard...)
  ▾ Auth              (Login, Register...)
  ```
- [ ] Her kategori ayrı renk/ikon ile ayırt edilir
- [ ] Kategori başlığına tıklayınca tüm alt bileşenler açılır/kapanır
- [ ] Aktif kategori otomatik açık kalır

### 19.2 Gelişmiş Arama `[ ]`

- [ ] Mevcut sidebar araması yerine **Command Palette** entegrasyonu (⌘K)
- [ ] Bileşen adı + kategori + kullanım etiketi ile arama (örn. "e-ticaret" yazınca ProductCard çıkar)
- [ ] Son görüntülenen bileşenler (recent) listesi
- [ ] "Hızlı Kopyala" aksiyonu: arama sonucundan direkt en minimal kod snippet kopyalanabilir

### 19.3 Bileşen Detay Sayfası Standardı `[ ]`

Her bileşen sayfası aynı yapıyı takip eder:

```
1. Başlık + kısa açıklama + kullanım etiketleri (chip'ler)
2. Temel kullanım — en basit örnek
3. Varyantlar — tüm variant/preset'ler grid'de
4. Boyutlar — size kombinasyonları
5. Durumlar — disabled / loading / error / success
6. Gerçek Dünya Örnekleri — "SaaS'ta nasıl kullanılır" / "E-ticarette nasıl kullanılır"
7. Erişilebilirlik notları
8. Props tablosu (name / type / default / description)
```

- [ ] Bu standart tüm mevcut bileşen sayfalarına uygulanır (en çok kullanılan 10 bileşen öncelikli)

### 19.4 Responsive Önizleme Modu `[ ]`

- [ ] Showcase preview alanında **viewport toggle**: masaüstü (100%) · tablet (768px) · mobil (375px)
- [ ] Toggle butonları preview container'ın üstünde sabit durur
- [ ] Seçilen boyut tarayıcı localStorage'da hatırlanır

### 19.5 Kopyalama Deneyimi İyileştirmesi `[ ]`

- [ ] Her showcase bölümünde **"Sadece JSX kopyala"** + **"Props dahil kopyala"** iki seçenek
- [ ] Kopyalama sonrası "Kopyalandı!" toast bildirimi (mevcut varsa kontrol et)
- [ ] Her bileşen için `import` satırı otomatik dahil edilir kopyalanan koda

---

## Faz 20 — Responsive Kalite Güvencesi `[TAMAMLANDI ✓]`

> Mevcut bileşenler responsive olmaya çalışıyor ama sistematik test edilmedi.  
> Hedef: Her bileşen 3 kırılma noktasında garanti edilmiş davranış.

### 20.1 Responsive Standartlar `[ ]`

Tüm bileşenler için geçerli kurallar:

- [ ] **Dokunma hedefleri** — interaktif her element min. 44×44px (WCAG 2.5.5)
- [ ] **Yatay scroll yok** — hiçbir bileşen viewport dışına taşmaz
- [ ] **Metin küçülmez okunaksız hale** — font-size min. 14px (body), 12px (caption)
- [ ] **Görsel hiyerarşi korunur** — mobilde de önemli bilgi önce gelir

### 20.2 Bileşen Bazlı Responsive Kontrol Listesi `[ ]`

Öncelikli bileşenler (en çok kullanılan):

- [ ] **Navbar** — hamburger menü tam işlevsel · dropdown mobilde bottom sheet'e dönüşür
- [ ] **Card grid'leri** — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` standart kırılma
- [ ] **Table** — mobilde yatay scroll veya card görünümüne geçiş
- [ ] **Modal / Drawer** — mobilde Modal bottom sheet gibi davranır (opsiyonel)
- [ ] **Form layout'ları** — iki sütunlu formlar mobilde tek sütuna düşer
- [ ] **Sidebar + içerik layout'u** — sidebar mobilde overlay drawer olur

### 20.3 Responsive Showcase Testleri `[ ]`

- [ ] Her bileşen sayfasında "Responsive Preview" bölümü eklenir (Faz 19.4 ile entegre)
- [ ] Kritik kırılma noktaları 375px / 768px / 1024px / 1280px olarak belgelenir

---

## Faz 21 — Ek Bileşen Kategorileri `[TAMAMLANDI ✓]`

> V1+V2 sonrası hâlâ eksik olan yüksek kullanım frekanslı bileşenler.

### 21.1 Navigation Bileşenleri `[ ]`

- [ ] **Mega Menu** — Navbar dropdown yerine geniş panel; kategoriler + öne çıkan içerik + görsel
- [ ] **Step Indicator / Stepper** — çok adımlı form/wizard için; yatay (masaüstü) + dikey (mobil)
- [ ] **Back to Top Button** — scroll ile görünür/gizlenir; smooth scroll
- [ ] **Bottom Navigation Bar** — mobil uygulama tarzı alt navigasyon; 4-5 ikon + label

### 21.2 İçerik Bileşenleri `[ ]`

- [ ] **Timeline** — dikey zaman çizelgesi; ikon + başlık + açıklama + tarih; sol/sağ/merkez varyant
- [ ] **Pricing Table** — feature karşılaştırma tablosu; sticky kolon başlıkları; mobilde yatay scroll
- [ ] **FAQ List** — accordion tabanlı; kategori filtresi; arama; schema markup uyumlu
- [ ] **Feature Grid** — ikon + başlık + açıklama; 2/3/4 sütun; hover efekti; landing page için
- [ ] **Logo Wall / Brand Grid** — müşteri/partner logoları; grayscale → renkli hover; Marquee varyantı
- [ ] **Comparison Table** — iki ürün/plan yan yana; mobilde toggle ile değiştir

### 21.3 Form Bileşenleri `[ ]`

- [ ] **Multi-step Form** — adım göstergesi + form alanları + validasyon + geçiş animasyonu
- [ ] **Color Picker** — swatches grid + hex input + opacity slider
- [ ] **Rating Input** — yıldız seçimi; yarım yıldız; boyut varyantları; okunur mod
- [ ] **Phone Input** — ülke kodu dropdown + numara input; uluslararası format

---

## Öncelik Sırası (Önerilen)

```
Faz 19.1 → Faz 16 → Faz 17 → Faz 18 → Faz 19.2-5 → Faz 20 → Faz 21
```

**Neden bu sıra?**
1. **Faz 19.1 (Kategorili Sidebar)** — önce navigasyonu düzelt, sonra içerik ekle; yoksa yeni içerik kaybolur
2. **Faz 16 (Card zenginleştirme)** — en çok kullanılan bileşen, hemen değer katar
3. **Faz 17 (Button zenginleştirme)** — aynı şekilde yüksek kullanım, hızlı tamamlanır
4. **Faz 18 (Landing şablonları)** — showcase'in "wow" faktörü, ziyaretçiye hemen değer gösterir
5. **Faz 19.2-5 (UX iyileştirmeleri)** — içerik dolunca navigasyon iyileştirmelerinin tam değeri görülür
6. **Faz 20 (Responsive QA)** — içerik eklenince sistematik responsive audit
7. **Faz 21 (Ek bileşenler)** — boşlukları kapat, kütüphane olgunlaşır

---

## İlerleme Özeti V3

| Faz | Konu | Durum |
|-----|------|-------|
| 16 | Card İçerik Zenginleştirmesi | ✓ Tamamlandı |
| 17 | Button İçerik Zenginleştirmesi | ✓ Tamamlandı |
| 18 | Landing Page Şablonları (Kategorik) | ✓ Tamamlandı |
| 19 | Showcase Navigasyon & UX | ✓ Tamamlandı |
| 20 | Responsive Kalite Güvencesi | ✓ Tamamlandı |
| 21 | Ek Bileşen Kategorileri | ✓ Tamamlandı |

---

## V1 + V2 Tamamlananlar (Referans)

| Faz | Konu | Durum |
|-----|------|-------|
| 0  | Altyapı                          | ✓ Tamamlandı |
| 1  | Primitive Bileşenler             | ✓ Tamamlandı |
| 2  | Layout                           | ✓ Tamamlandı |
| 3  | Auth                             | ✓ Tamamlandı |
| 4  | Feedback & Overlay               | ✓ Tamamlandı |
| 5  | Data Display                     | ✓ Tamamlandı |
| 6  | Showcase Sistemi                 | ✓ Tamamlandı |
| 7  | Sayfa Şablonları                 | ✓ Tamamlandı |
| 8  | Stil Varyant Sistemi             | ✓ Tamamlandı |
| 9  | Eksik Etkileşimli Bileşenler     | ✓ Tamamlandı |
| 10 | Animasyon & Mikro-Etkileşim      | ✓ Tamamlandı |
| 11 | Veri Görselleştirme              | ✓ Tamamlandı |
| 12 | Gelişmiş Veri Tablosu            | ✓ Tamamlandı |
| 13 | Yeni Sayfa Şablonları (V2)       | ✓ Tamamlandı |
| 14 | Tema & Token Sistemi             | ✓ Tamamlandı |
| 15 | Erişilebilirlik & Kalite         | ✓ Tamamlandı |

---

*Oluşturulma: 2026-05-28 (V3 Başlangıcı)*
