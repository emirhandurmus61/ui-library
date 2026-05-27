"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function AlertShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Alert</h1>
        <p className="text-foreground-muted">
          info · success · warning · error · default · dismissible · action
        </p>
      </div>

      <Section title="Variantlar">
        <Alert variant="info" title="Bilgi" description="Sisteme yeni güncelleme geldi. Sayfayı yenileyin." />
        <Alert variant="success" title="Başarılı" description="Profiliniz başarıyla güncellendi." />
        <Alert variant="warning" title="Uyarı" description="Hesabınızın süresi 3 gün içinde dolacak." />
        <Alert variant="error" title="Hata" description="Bağlantı sağlanamadı. İnternet bağlantınızı kontrol edin." />
        <Alert variant="default" title="Not" description="Bu alan geçici olarak devre dışı bırakılmıştır." />
      </Section>

      <Section title="Sadece Açıklama (Başlıksız)">
        <Alert variant="info" description="Bu sayfadaki içerikler her gün güncellenmektedir." />
        <Alert variant="warning" description="Kaydedilmemiş değişiklikleriniz var." />
      </Section>

      <Section title="Dismissible (Kapatılabilir)">
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
      </Section>

      <Section title="Action ile">
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
      </Section>

      <Section title="İkon Olmadan">
        <Alert
          variant="info"
          title="Sistem Bakımı"
          description="23:00 - 01:00 saatleri arasında kısa süreli kesinti yaşanabilir."
          icon={false}
        />
      </Section>
    </div>
  );
}
