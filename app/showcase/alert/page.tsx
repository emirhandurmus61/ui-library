import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Alert } from "@/components/ui/alert";`;

export default function AlertShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Alert</h1>
        <p className="text-foreground-muted">
          info · success · warning · error · default · dismissible · action
        </p>
      </div>

      <ShowcaseSection
        title="Variantlar"
        description="Beş semantik variant: info, success, warning, error, default."
        importLine={IMPORT}
        code={`<Alert variant="info" title="Bilgi" description="Sisteme yeni güncelleme geldi. Sayfayı yenileyin." />
<Alert variant="success" title="Başarılı" description="Profiliniz başarıyla güncellendi." />
<Alert variant="warning" title="Uyarı" description="Hesabınızın süresi 3 gün içinde dolacak." />
<Alert variant="error" title="Hata" description="Bağlantı sağlanamadı. İnternet bağlantınızı kontrol edin." />
<Alert variant="default" title="Not" description="Bu alan geçici olarak devre dışı bırakılmıştır." />`}
      >
        <div className="space-y-3">
          <Alert variant="info" title="Bilgi" description="Sisteme yeni güncelleme geldi. Sayfayı yenileyin." />
          <Alert variant="success" title="Başarılı" description="Profiliniz başarıyla güncellendi." />
          <Alert variant="warning" title="Uyarı" description="Hesabınızın süresi 3 gün içinde dolacak." />
          <Alert variant="error" title="Hata" description="Bağlantı sağlanamadı. İnternet bağlantınızı kontrol edin." />
          <Alert variant="default" title="Not" description="Bu alan geçici olarak devre dışı bırakılmıştır." />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sadece Açıklama (Başlıksız)"
        description="title prop olmadan yalnızca description gösterilir."
        importLine={IMPORT}
        code={`<Alert variant="info" description="Bu sayfadaki içerikler her gün güncellenmektedir." />
<Alert variant="warning" description="Kaydedilmemiş değişiklikleriniz var." />`}
      >
        <div className="space-y-3">
          <Alert variant="info" description="Bu sayfadaki içerikler her gün güncellenmektedir." />
          <Alert variant="warning" description="Kaydedilmemiş değişiklikleriniz var." />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dismissible (Kapatılabilir)"
        description="dismissible prop ile sağ üste kapatma butonu eklenir."
        importLine={IMPORT}
        code={`<Alert
  variant="info"
  title="Yeni Özellik"
  description="Artık karanlık mod destekleniyor."
  dismissible
/>
<Alert
  variant="warning"
  title="Taslak Kaydedildi"
  description="Son taslak otomatik kaydedildi."
  dismissible
/>`}
      >
        <div className="space-y-3">
          <Alert
            variant="info"
            title="Yeni Özellik"
            description="Artık karanlık mod destekleniyor. Sağ üstteki ikondan değiştirebilirsiniz."
            dismissible
          />
          <Alert
            variant="warning"
            title="Taslak Kaydedildi"
            description="Son taslak otomatik kaydedildi. Devam etmek için tıklayın."
            dismissible
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Action ile"
        description="action prop ile alert içine buton veya bağlantı yerleştirilebilir."
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
  description="Maksimum dosya boyutu aşıldı."
  dismissible
  action={<Button size="sm" variant="danger-outline">Tekrar Dene</Button>}
/>`}
      >
        <div className="space-y-3">
          <Alert
            variant="warning"
            title="Ödeme Yöntemi Güncellenmedi"
            description="Aboneliğiniz yenilenmeden önce ödeme yönteminizi güncelleyin."
            action={
              <Button size="sm" variant="outline">
                Güncelle
              </Button>
            }
          />
          <Alert
            variant="error"
            title="Dosya Yüklenemedi"
            description="Maksimum dosya boyutu aşıldı. Lütfen daha küçük bir dosya seçin."
            dismissible
            action={
              <Button size="sm" variant="danger-outline">
                Tekrar Dene
              </Button>
            }
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="İkon Olmadan"
        description="icon={false} ile sol ikon gizlenir."
        importLine={IMPORT}
        code={`<Alert
  variant="info"
  title="Sistem Bakımı"
  description="23:00 - 01:00 saatleri arasında kısa süreli kesinti yaşanabilir."
  icon={false}
/>`}
      >
        <Alert
          variant="info"
          title="Sistem Bakımı"
          description="23:00 - 01:00 saatleri arasında kısa süreli kesinti yaşanabilir."
          icon={false}
        />
      </ShowcaseSection>
    </div>
  );
}
