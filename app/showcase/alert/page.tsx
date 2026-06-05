"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Alert } from "@/components/ui/alert";`;

/* ─── Helpers ────────────────────────────────────────────────── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ─── Showcase ───────────────────────────────────────────────── */

export default function AlertShowcase() {
  const [step, setStep] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [plan, setPlan] = useState<"free" | "pro">("free");

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Alert</h1>
        <p className="text-foreground-muted text-sm">
          info · success · warning · error · default · dismissible · action
        </p>
      </div>

      {/* ── TEMEL ── */}
      <ShowcaseSection
        title="Variantlar"
        description="Beş semantik variant: info, success, warning, error, default."
        importLine={IMPORT}
        code={`<Alert variant="info"    title="Bilgi"    description="Sisteme yeni güncelleme geldi. Sayfayı yenileyin." />
<Alert variant="success" title="Başarılı" description="Profiliniz başarıyla güncellendi." />
<Alert variant="warning" title="Uyarı"   description="Hesabınızın süresi 3 gün içinde dolacak." />
<Alert variant="error"   title="Hata"    description="Bağlantı sağlanamadı. İnternet bağlantınızı kontrol edin." />
<Alert variant="default" title="Not"     description="Bu alan geçici olarak devre dışı bırakılmıştır." />`}
      >
        <div className="space-y-3">
          <Alert variant="info"    title="Bilgi"    description="Sisteme yeni güncelleme geldi. Sayfayı yenileyin." />
          <Alert variant="success" title="Başarılı" description="Profiliniz başarıyla güncellendi." />
          <Alert variant="warning" title="Uyarı"    description="Hesabınızın süresi 3 gün içinde dolacak." />
          <Alert variant="error"   title="Hata"     description="Bağlantı sağlanamadı. İnternet bağlantınızı kontrol edin." />
          <Alert variant="default" title="Not"      description="Bu alan geçici olarak devre dışı bırakılmıştır." />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sadece Açıklama (Başlıksız)"
        description="title prop olmadan yalnızca description gösterilir — daha kompakt bir görünüm."
        importLine={IMPORT}
        code={`<Alert variant="info"    description="Bu sayfadaki içerikler her gün güncellenmektedir." />
<Alert variant="warning" description="Kaydedilmemiş değişiklikleriniz var." />
<Alert variant="success" description="Tüm testler başarıyla geçti." />
<Alert variant="error"   description="Oturum süresi doldu. Tekrar giriş yapın." />`}
      >
        <div className="space-y-3">
          <Alert variant="info"    description="Bu sayfadaki içerikler her gün güncellenmektedir." />
          <Alert variant="warning" description="Kaydedilmemiş değişiklikleriniz var." />
          <Alert variant="success" description="Tüm testler başarıyla geçti." />
          <Alert variant="error"   description="Oturum süresi doldu. Tekrar giriş yapın." />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dismissible (Kapatılabilir)"
        description="dismissible prop ile sağ üste × butonu eklenir. Kapatıldıktan sonra unmount olur."
        importLine={IMPORT}
        code={`<Alert
  variant="info"
  title="Yeni Özellik"
  description="Artık karanlık mod destekleniyor. Sağ üstteki ikondan değiştirebilirsiniz."
  dismissible
/>
<Alert
  variant="warning"
  title="Taslak Kaydedildi"
  description="Son taslak otomatik kaydedildi."
  dismissible
/>
<Alert
  variant="success"
  title="Abonelik Aktif"
  description="Pro planı başarıyla etkinleştirildi."
  dismissible
/>
<Alert
  variant="error"
  title="Senkronizasyon Başarısız"
  description="Veriler sunucuyla eşleştirilemedi."
  dismissible
/>`}
      >
        <div className="space-y-3">
          <Alert variant="info"    title="Yeni Özellik"          description="Artık karanlık mod destekleniyor. Sağ üstteki ikondan değiştirebilirsiniz." dismissible />
          <Alert variant="warning" title="Taslak Kaydedildi"     description="Son taslak otomatik kaydedildi. Devam etmek için tıklayın." dismissible />
          <Alert variant="success" title="Abonelik Aktif"        description="Pro planı başarıyla etkinleştirildi. Hoş geldiniz!" dismissible />
          <Alert variant="error"   title="Senkronizasyon Başarısız" description="Veriler sunucuyla eşleştirilemedi. Lütfen bağlantınızı kontrol edin." dismissible />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Action ile"
        description="action prop ile alert içine buton veya link yerleştirilebilir."
        importLine={IMPORT}
        code={`<Alert
  variant="warning"
  title="Ödeme Yöntemi Güncellenmedi"
  description="Aboneliğiniz yenilenmeden önce ödeme yönteminizi güncelleyin."
  action={<Button size="sm" variant="outline">Güncelle</Button>}
/>
<Alert
  variant="error"
  title="Dosya Yüklenemedi"
  description="Maksimum dosya boyutu aşıldı (5 MB)."
  dismissible
  action={<Button size="sm" variant="danger-outline">Tekrar Dene</Button>}
/>
<Alert
  variant="info"
  title="Güvenlik Taraması"
  description="Hesabınızda bekleyen güvenlik önerileri var."
  action={<Button size="sm" variant="outline">Görüntüle</Button>}
/>`}
      >
        <div className="space-y-3">
          <Alert
            variant="warning"
            title="Ödeme Yöntemi Güncellenmedi"
            description="Aboneliğiniz yenilenmeden önce ödeme yönteminizi güncelleyin."
            action={<Button size="sm" variant="outline">Güncelle</Button>}
          />
          <Alert
            variant="error"
            title="Dosya Yüklenemedi"
            description="Maksimum dosya boyutu aşıldı (5 MB). Lütfen daha küçük bir dosya seçin."
            dismissible
            action={<Button size="sm" variant="danger-outline">Tekrar Dene</Button>}
          />
          <Alert
            variant="info"
            title="Güvenlik Taraması"
            description="Hesabınızda bekleyen güvenlik önerileri var. İncelemenizi öneririz."
            action={<Button size="sm" variant="outline">Görüntüle</Button>}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="İkon Olmadan"
        description="icon={false} ile sol ikon gizlenir — daha sade bir metin-odaklı stil."
        importLine={IMPORT}
        code={`<Alert
  variant="info"
  title="Sistem Bakımı"
  description="23:00 - 01:00 saatleri arasında kısa süreli kesinti yaşanabilir."
  icon={false}
/>
<Alert
  variant="warning"
  title="Beta Sürüm"
  description="Bu özellik henüz geliştirme aşamasındadır."
  icon={false}
/>`}
      >
        <div className="space-y-3">
          <Alert variant="info"    title="Sistem Bakımı" description="23:00 - 01:00 saatleri arasında kısa süreli kesinti yaşanabilir." icon={false} />
          <Alert variant="warning" title="Beta Sürüm"    description="Bu özellik henüz geliştirme aşamasındadır. Karşılaştığınız sorunları bildirin." icon={false} />
        </div>
      </ShowcaseSection>

      {/* ── TASARIM KATEGORİLERİ ── */}
      <SectionDivider label="Gerçek Kullanım Senaryoları" />

      {/* FORM VALİDASYON */}
      <ShowcaseSection
        title="Form Validasyon Hataları"
        description="Form gönderimleri sonrasında çıkan hata ve başarı alertleri. Birden fazla hata birlikte gösterilebilir."
        importLine={IMPORT}
        code={`<Alert
  variant="error"
  title="Formu Gönderilemedi"
  description={
    <ul className="mt-1 list-disc list-inside space-y-0.5 text-sm">
      <li>E-posta adresi geçersiz.</li>
      <li>Şifre en az 8 karakter olmalı.</li>
      <li>Ad alanı boş bırakılamaz.</li>
    </ul>
  }
/>
<Alert
  variant="success"
  title="Hesap Oluşturuldu"
  description="E-posta adresinize doğrulama bağlantısı gönderildi."
  action={<Button size="sm" variant="outline">E-postayı Aç</Button>}
/>`}
      >
        <div className="space-y-3">
          <Alert
            variant="error"
            title="Form Gönderilemedi — 3 hata var"
            description={
              <ul className="mt-1 list-disc list-inside space-y-0.5">
                <li>E-posta adresi geçersiz bir format içeriyor.</li>
                <li>Şifre en az 8 karakter ve 1 büyük harf içermeli.</li>
                <li>Ad alanı boş bırakılamaz.</li>
              </ul>
            }
          />
          <Alert
            variant="success"
            title="Hesap Oluşturuldu"
            description="E-posta adresinize doğrulama bağlantısı gönderildi. Gelen kutunuzu kontrol edin."
            action={<Button size="sm" variant="outline">E-postayı Aç</Button>}
          />
        </div>
      </ShowcaseSection>

      {/* DOSYA YÜKLEME */}
      <ShowcaseSection
        title="Dosya Yükleme Durumları"
        description="Upload işleminin farklı aşamalarında gösterilen alertler."
        importLine={IMPORT}
        code={`// Yükleniyor
<Alert variant="info" title="Dosya Yükleniyor" description="rapor-q4.pdf — %68 tamamlandı" />

// Tamamlandı
<Alert variant="success" title="Yükleme Tamamlandı" description="rapor-q4.pdf başarıyla yüklendi."
  dismissible action={<Button size="sm" variant="outline">Görüntüle</Button>} />

// Hata
<Alert variant="error" title="Yükleme Başarısız" description="Dosya boyutu 10 MB sınırını aşıyor."
  action={<Button size="sm" variant="danger-outline">Tekrar Dene</Button>} />`}
      >
        <div className="space-y-3">
          {!uploadDone ? (
            <>
              <Alert variant="info"    title="Dosya Yükleniyor"      description="rapor-q4.pdf — sunucuya aktarılıyor..." />
              <Alert
                variant="warning"
                title="Büyük Dosya Algılandı"
                description="rapor-q4.pdf (8.4 MB) — yükleme yavaş sürebilir."
                action={<Button size="sm" variant="outline" onClick={() => setUploadDone(true)}>Yine de Yükle</Button>}
              />
            </>
          ) : (
            <Alert
              variant="success"
              title="Yükleme Tamamlandı"
              description="rapor-q4.pdf başarıyla yüklendi ve işlemeye hazır."
              dismissible
              action={<Button size="sm" variant="outline">Görüntüle</Button>}
            />
          )}
          <Alert
            variant="error"
            title="Yükleme Başarısız"
            description="logo.png — Dosya boyutu 10 MB sınırını aşıyor (şu an: 14.2 MB)."
            action={<Button size="sm" variant="danger-outline">Tekrar Dene</Button>}
          />
        </div>
      </ShowcaseSection>

      {/* SİSTEM BİLDİRİMLERİ */}
      <ShowcaseSection
        title="Sistem ve Platform Bildirimleri"
        description="Uygulama genelinde gösterilen sistem durumu, bakım ve güncelleme alertleri."
        importLine={IMPORT}
        code={`<Alert
  variant="warning"
  title="Planlı Bakım"
  description="12 Haziran 02:00-04:00 arasında hizmet kısa süreliğine durdurulacak."
  dismissible
/>
<Alert
  variant="info"
  title="Yeni Sürüm Mevcut"
  description="v2.4.0 yayınlandı — Yeni özellikler ve hata düzeltmeleri içerir."
  action={<Button size="sm" variant="outline">Güncelle</Button>}
/>
<Alert
  variant="success"
  title="Tüm Sistemler Aktif"
  description="API, veritabanı ve CDN normal hızda çalışıyor."
  icon={false}
/>`}
      >
        <div className="space-y-3">
          <Alert variant="warning" title="Planlı Bakım" description="12 Haziran 02:00–04:00 arasında hizmet kısa süreliğine durdurulacak. Lütfen çalışmalarınızı kaydedin." dismissible />
          <Alert variant="info"    title="Yeni Sürüm Mevcut — v2.4.0" description="Karanlık mod geliştirmeleri, hızlanma ve 12 hata düzeltmesi içerir." action={<Button size="sm" variant="outline">Sürüm Notları</Button>} />
          <Alert variant="success" title="Tüm Sistemler Aktif" description="API, veritabanı ve CDN normal hızda çalışıyor. Son kontrol: az önce." icon={false} />
          <Alert variant="error"   title="API Kesintisi Tespit Edildi" description="Ödeme servisi geçici olarak yanıt veremiyor. Ekibimiz sorunu inceliyor." action={<Button size="sm" variant="danger-outline">Durum Sayfası</Button>} />
        </div>
      </ShowcaseSection>

      {/* GÜVENLİK */}
      <ShowcaseSection
        title="Güvenlik ve Hesap Uyarıları"
        description="Kullanıcı hesabına ait kritik güvenlik bildirimleri — yüksek dikkat gerektiren durumlarda error/warning tercih edin."
        importLine={IMPORT}
        code={`<Alert
  variant="error"
  title="Şüpheli Giriş Tespit Edildi"
  description="İstanbul dışından bir cihaz hesabınıza erişmeye çalıştı."
  action={
    <div className="flex gap-2">
      <Button size="sm" variant="danger-outline">Engelledim, Devam Et</Button>
      <Button size="sm" variant="outline">Ben Değildim</Button>
    </div>
  }
/>`}
      >
        <div className="space-y-3">
          <Alert
            variant="error"
            title="Şüpheli Giriş Tespit Edildi"
            description="İstanbul, TR dışından bilinmeyen bir cihaz (macOS, Chrome) hesabınıza erişmeye çalıştı — 5 dk önce."
            action={
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="danger-outline">Bu Bendim</Button>
                <Button size="sm" variant="outline">Bu Ben Değildim</Button>
              </div>
            }
          />
          <Alert
            variant="warning"
            title="İki Adımlı Doğrulama Kapalı"
            description="Hesabınız ek koruma olmadan erişime açık. 2FA kurmanızı şiddetle tavsiye ederiz."
            action={<Button size="sm" variant="outline">2FA Kur</Button>}
          />
          <Alert
            variant="info"
            title="Parola Son Kullanma Tarihi"
            description="Parolanız 14 gün içinde sona erecek. Önceden değiştirmenizi öneririz."
            dismissible
            action={<Button size="sm" variant="outline">Parolayı Güncelle</Button>}
          />
          <Alert
            variant="success"
            title="Parola Başarıyla Değiştirildi"
            description="Tüm aktif oturumlar sonlandırıldı. Yeni parolanızla giriş yapın."
            dismissible
          />
        </div>
      </ShowcaseSection>

      {/* ABONELIK / PLAN */}
      <ShowcaseSection
        title="Abonelik ve Plan Alertleri"
        description="Kullanıcının planı veya kota durumuna göre dinamik alert. Plan seçerek değişimi görebilirsiniz."
        importLine={IMPORT}
        code={`// Ücretsiz plandaki kullanıcı
<Alert
  variant="warning"
  title="Depolama Alanı Dolmak Üzere"
  description="4.8 GB / 5 GB kullanıldı (%96). Ücretsiz planın sınırına yaklaştınız."
  action={<Button size="sm" variant="outline">Pro'ya Geç</Button>}
/>

// Pro plandaki kullanıcı
<Alert
  variant="success"
  title="Pro Plan Aktif"
  description="Sınırsız depolama, öncelikli destek ve tüm özellikler açık."
/>`}
      >
        <div className="space-y-3">
          <div className="flex gap-2 mb-1">
            <button
              onClick={() => setPlan("free")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${plan === "free" ? "bg-primary text-white border-primary" : "border-border text-foreground-muted hover:text-foreground"}`}
            >
              Free Plan
            </button>
            <button
              onClick={() => setPlan("pro")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${plan === "pro" ? "bg-primary text-white border-primary" : "border-border text-foreground-muted hover:text-foreground"}`}
            >
              Pro Plan
            </button>
          </div>

          {plan === "free" ? (
            <>
              <Alert
                variant="warning"
                title="Depolama Alanı Dolmak Üzere"
                description="4.8 GB / 5 GB kullanıldı (%96). Ücretsiz planın sınırına yaklaştınız."
                action={<Button size="sm" variant="outline">Pro&apos;ya Geç</Button>}
              />
              <Alert
                variant="info"
                title="API Çağrı Limitine Yaklaştınız"
                description="Bu ay 980 / 1.000 API çağrısı yaptınız. Limit aşımında servis duracak."
                action={<Button size="sm" variant="outline">Limiti Artır</Button>}
              />
            </>
          ) : (
            <>
              <Alert
                variant="success"
                title="Pro Plan Aktif"
                description="Sınırsız depolama, öncelikli destek ve tüm özellikler açık. Bir sonraki fatura: 5 Temmuz 2026."
                dismissible
              />
              <Alert
                variant="info"
                title="Team Plan&apos;a Yükseltin"
                description="5+ kişilik ekibiniz için birleşik faturalama ve yönetici paneli sunuyoruz."
                action={<Button size="sm" variant="outline">Detayları Gör</Button>}
                dismissible
              />
            </>
          )}
        </div>
      </ShowcaseSection>

      {/* ÇEREZ / GDPR */}
      <ShowcaseSection
        title="Çerez ve GDPR Bildirimi"
        description="Yasal zorunluluk gerektiren kullanıcı onay alertleri. Kullanıcı kararına göre kaybolur."
        importLine={IMPORT}
        code={`<Alert
  variant="default"
  title="Çerez Politikamız"
  description="Deneyiminizi kişiselleştirmek için çerez kullanıyoruz. Kabul ederek devam edebilirsiniz."
  icon={false}
  action={
    <div className="flex gap-2">
      <Button size="sm">Kabul Et</Button>
      <Button size="sm" variant="outline">Reddet</Button>
    </div>
  }
/>`}
      >
        {!cookieAccepted ? (
          <Alert
            variant="default"
            title="Çerez Politikamız"
            description="Deneyiminizi kişiselleştirmek ve site analitiği için çerezler kullanıyoruz. Kullanım koşullarımızı kabul ederek devam edebilirsiniz."
            icon={false}
            action={
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => setCookieAccepted(true)}>Kabul Et</Button>
                <Button size="sm" variant="outline">Sadece Zorunlular</Button>
                <Button size="sm" variant="ghost">Reddet</Button>
              </div>
            }
          />
        ) : (
          <Alert
            variant="success"
            title="Tercihler Kaydedildi"
            description="Çerez tercihleriniz kaydedildi. Ayarlar bölümünden istediğiniz zaman değiştirebilirsiniz."
            dismissible
          />
        )}
      </ShowcaseSection>

      {/* ADIM ADIM AKIŞ */}
      <ShowcaseSection
        title="Çok Adımlı Akış Alertleri"
        description="Wizard veya onboarding akışlarında her adıma özel bağlamsal alert. 'Sonraki Adım' ile deneyebilirsiniz."
        importLine={IMPORT}
        code={`// Adım 1
<Alert variant="info" title="Adım 1/3: Profil Bilgileri" description="Ad, soyad ve e-posta adresinizi girin." />
// Adım 2
<Alert variant="warning" title="Adım 2/3: Ödeme" description="Kredi kartı bilgileriniz SSL ile şifrelenerek saklanır." />
// Adım 3
<Alert variant="success" title="Adım 3/3: Tamamlandı" description="Hesabınız aktif! Kontrol paneline yönlendiriliyorsunuz." />`}
      >
        <div className="space-y-3">
          {step === 0 && (
            <Alert
              variant="info"
              title="Adım 1 / 3 — Profil Bilgileri"
              description="Ad, soyad ve iletişim bilgilerinizi girerek ilk adımı tamamlayın."
              action={<Button size="sm" variant="outline" onClick={() => setStep(1)}>Sonraki Adım →</Button>}
            />
          )}
          {step === 1 && (
            <Alert
              variant="warning"
              title="Adım 2 / 3 — Ödeme Yöntemi"
              description="Kredi kartı bilgileriniz 256-bit SSL ile şifrelenerek güvenli şekilde saklanır."
              action={<Button size="sm" variant="outline" onClick={() => setStep(2)}>Sonraki Adım →</Button>}
            />
          )}
          {step === 2 && (
            <Alert
              variant="success"
              title="Adım 3 / 3 — Kurulum Tamamlandı!"
              description="Hesabınız aktif! Kontrol panelinize yönlendiriliyorsunuz. Hoş geldiniz!"
              action={<Button size="sm" variant="outline" onClick={() => setStep(0)}>Yeniden Başlat</Button>}
            />
          )}
        </div>
      </ShowcaseSection>

      {/* ── GÖRSEL KATEGORİLER ── */}
      <SectionDivider label="Görsel Stiller ve Kombinasyonlar" />

      {/* BANNER ALERT */}
      <ShowcaseSection
        title="Banner Alert (Tam Genişlik)"
        description="Sayfa üstüne yapışık tam genişlik banner uyarısı. className ile border-radius sıfırlanır ve genişlik ayarlanır."
        importLine={IMPORT}
        code={`// Sayfa başına tam genişlik banner
<Alert
  variant="warning"
  title="Bakım Modu"
  description="Platform şu an bakım modundadır. Verileriniz güvende."
  className="rounded-none border-x-0 border-t-0"
  dismissible
/>`}
      >
        <div className="space-y-3">
          <Alert
            variant="warning"
            title="Planlı Bakım — Bu Gece 02:00"
            description="Platform kısa süreliğine çevrimdışı olacak. Verileriniz güvende, çalışmanızı kaydedin."
            className="rounded-none border-x-0 border-t-0 -mx-6"
            dismissible
          />
          <Alert
            variant="info"
            title="Yeni Özellik Duyurusu"
            description="Yapay zeka destekli kod asistanı artık tüm kullanıcılara açık! Deneyebilirsiniz."
            className="rounded-none border-x-0 border-t-0 -mx-6"
            dismissible
            action={<Button size="sm" variant="outline">Deneyin</Button>}
          />
        </div>
      </ShowcaseSection>

      {/* KOMPAKT / İNLINE */}
      <ShowcaseSection
        title="Kompakt ve İnline Kullanım"
        description="Form alanlarının hemen altında veya dar alanlarda kompakt alert. className ile padding küçültülür."
        importLine={IMPORT}
        code={`// Form field altı — kompakt
<Alert
  variant="error"
  description="Bu e-posta adresi zaten kayıtlı."
  className="py-2 text-xs"
/>

// Kart içi bilgi notu
<Alert
  variant="info"
  description="Bu alan herkese açık görünür."
  className="py-2"
  icon={false}
/>`}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">E-posta</label>
            <input
              type="email"
              defaultValue="ali@ornek.com"
              className="w-full px-3 py-2 text-sm border border-danger/50 rounded-[var(--radius-md)] bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-danger/30"
            />
            <div className="mt-1.5">
              <Alert variant="error" description="Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin." className="py-2" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Kullanıcı Adı</label>
            <input
              type="text"
              defaultValue="ali_yilmaz"
              className="w-full px-3 py-2 text-sm border border-border rounded-[var(--radius-md)] bg-surface text-foreground focus:outline-none"
            />
            <div className="mt-1.5">
              <Alert variant="info" description="Kullanıcı adı herkese açık görünür ve değiştirilemez." className="py-2" icon={false} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Yeni Parola</label>
            <input
              type="password"
              defaultValue="pass"
              className="w-full px-3 py-2 text-sm border border-warning/50 rounded-[var(--radius-md)] bg-surface text-foreground focus:outline-none"
            />
            <div className="mt-1.5">
              <Alert variant="warning" description="Parola çok zayıf. En az 8 karakter ve sembol kullanın." className="py-2" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* MARKDOWN / RİCH CONTENT */}
      <ShowcaseSection
        title="Zengin İçerik (Rich Description)"
        description="description prop ReactNode kabul eder — liste, link, kalın metin gibi elemanlar yerleştirilebilir."
        importLine={IMPORT}
        code={`<Alert
  variant="info"
  title="API Değişiklik Notları"
  description={
    <div className="space-y-1 mt-1">
      <p>v3.0 ile aşağıdaki endpoint&apos;ler değişti:</p>
      <ul className="list-disc list-inside space-y-0.5 text-xs">
        <li><code>/api/users</code> → <code>/api/v3/users</code></li>
        <li><code>/api/posts</code> → <code>/api/v3/content</code></li>
      </ul>
      <p className="text-xs">
        <a href="#" className="underline text-info hover:opacity-80">Migrasyon rehberini</a> inceleyin.
      </p>
    </div>
  }
/>`}
      >
        <div className="space-y-3">
          <Alert
            variant="info"
            title="API Değişiklik Notları — v3.0"
            description={
              <div className="space-y-1.5 mt-1">
                <p>v3.0 ile aşağıdaki endpoint&apos;ler değişti:</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs font-mono">
                  <li><span className="line-through opacity-60">/api/users</span> → <span className="text-info">/api/v3/users</span></li>
                  <li><span className="line-through opacity-60">/api/posts</span> → <span className="text-info">/api/v3/content</span></li>
                  <li><span className="line-through opacity-60">/api/auth/login</span> → <span className="text-info">/api/v3/auth/session</span></li>
                </ul>
                <p className="text-xs text-foreground-muted">
                  Eski endpoint&apos;ler 90 gün boyunca çalışmaya devam edecek.{" "}
                  <a href="#" className="underline text-info hover:opacity-80">Migrasyon rehberini</a> inceleyin.
                </p>
              </div>
            }
          />
          <Alert
            variant="warning"
            title="Veri Silme Onayı"
            description={
              <div className="mt-1 space-y-2">
                <p>Aşağıdaki veriler <strong>kalıcı olarak</strong> silinecek ve geri alınamaz:</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs">
                  <li>342 proje dosyası</li>
                  <li>Tüm yorumlar ve etiketler</li>
                  <li>Paylaşım bağlantıları ve izinler</li>
                </ul>
              </div>
            }
            action={
              <div className="flex gap-2">
                <Button size="sm" variant="danger-outline">Evet, Sil</Button>
                <Button size="sm" variant="outline">Vazgeç</Button>
              </div>
            }
          />
          <Alert
            variant="success"
            title="Dışa Aktarma Hazır"
            description={
              <div className="mt-1 space-y-1">
                <p>Raporunuz oluşturuldu. İndirme bağlantısı 24 saat geçerlidir.</p>
                <div className="flex items-center gap-2 mt-1.5 p-2 bg-background/60 rounded-[var(--radius-sm)] border border-border text-xs font-mono">
                  <span className="truncate text-foreground-muted">rapor_haziran_2026.xlsx</span>
                  <span className="shrink-0 text-foreground-subtle">2.4 MB</span>
                </div>
              </div>
            }
            action={<Button size="sm" variant="outline">İndir</Button>}
          />
        </div>
      </ShowcaseSection>

      {/* YIĞILMIŞ / STACKLİ */}
      <ShowcaseSection
        title="Yığılmış Bildirim Grubu"
        description="Birden fazla alert'in aynı anda gösterilmesi gerektiğinde — her biri bağımsız kapatılabilir."
        importLine={IMPORT}
        code={`<div className="space-y-2">
  <Alert variant="error"   title="Veritabanı Bağlantısı" description="..." dismissible />
  <Alert variant="warning" title="Yüksek CPU Kullanımı"  description="..." dismissible />
  <Alert variant="info"    title="Önbellek Temizlendi"   description="..." dismissible />
</div>`}
      >
        <div className="space-y-2">
          <Alert variant="error"   title="Veritabanı Bağlantısı Kesildi" description="production-db-01 sunucusuna bağlanılamıyor. DBA ekibi bilgilendirildi." dismissible />
          <Alert variant="warning" title="Yüksek CPU Kullanımı" description="Web-02 sunucusu %94 CPU kullanıyor. Otomatik ölçeklendirme devreye girdi." dismissible />
          <Alert variant="info"    title="Önbellek Temizlendi" description="CDN önbelleği başarıyla temizlendi. Değişiklikler 5 dk içinde yayılacak." dismissible />
          <Alert variant="success" title="Yedekleme Tamamlandı" description="Günlük yedekleme başarıyla tamamlandı — boyut: 4.2 GB." dismissible />
        </div>
      </ShowcaseSection>

      {/* ── ERIŞILEBILIRLIK ── */}
      <SectionDivider label="Erişilebilirlik ve API" />

      <ShowcaseSection
        title="Özel İkon"
        description="icon prop ile özel SVG veya emoji kullanılabilir. icon={false} ile ikon tamamen gizlenir."
        importLine={IMPORT}
        code={`// Özel SVG ikon
<Alert
  variant="info"
  title="Klavye Kısayolu"
  description="Ctrl+K ile komut paletini açabilirsiniz."
  icon={<span className="text-base">⌨️</span>}
/>

// Emoji ikon
<Alert
  variant="success"
  title="Hedef Tamamlandı"
  description="Bu haftaki hedefi %100 tamamladınız!"
  icon={<span className="text-base">🎯</span>}
/>

// İkon yok
<Alert
  variant="default"
  description="Gizlilik politikamız güncellendi."
  icon={false}
/>`}
      >
        <div className="space-y-3">
          <Alert variant="info"    title="Klavye Kısayolu"      description="Ctrl+K ile komut paletini açabilirsiniz." icon={<span className="text-base leading-none mt-0.5">⌨️</span>} />
          <Alert variant="success" title="Hedef Tamamlandı"     description="Bu haftaki hedefi %100 tamamladınız! Mükemmel iş!" icon={<span className="text-base leading-none mt-0.5">🎯</span>} />
          <Alert variant="warning" title="Deneme Süresi Bitiyor" description="Ücretsiz denemenizin bitmesine 3 gün kaldı." icon={<span className="text-base leading-none mt-0.5">⏰</span>} />
          <Alert variant="default" description="Gizlilik politikamız güncellendi. Devam ederek kabul etmiş olursunuz." icon={false} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="onDismiss Callback"
        description="dismissible + onDismiss ile kapatma eventi yakalanır — analitik veya state güncelleme için kullanışlı."
        importLine={IMPORT}
        code={`<Alert
  variant="info"
  title="Anket"
  description="Deneyiminizi değerlendirmek ister misiniz?"
  dismissible
  onDismiss={() => {
    analytics.track("alert_dismissed", { variant: "info", id: "survey" });
  }}
  action={<Button size="sm" variant="outline">Ankete Katıl</Button>}
/>`}
      >
        <Alert
          variant="info"
          title="Deneyiminizi Değerlendirin"
          description="Platformumuzu kullanmaya başlayalı 30 gün oldu. Kısa bir ankete katılmak ister misiniz?"
          dismissible
          onDismiss={() => console.log("alert dismissed → analytics.track()")}
          action={<Button size="sm" variant="outline">Ankete Katıl</Button>}
        />
      </ShowcaseSection>
    </div>
  );
}
