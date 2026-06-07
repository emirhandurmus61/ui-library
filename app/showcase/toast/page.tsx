"use client";

import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { useToast } from "@/components/ui/toast";`;

export default function ToastShowcase() {
  const { toast, dismissAll } = useToast();

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Toast / Notification</h1>
        <p className="text-sm text-foreground-muted">
          success · error · warning · info · default · action butonu · otomatik kapanma · stack
        </p>
      </div>

      <ShowcaseSection
        title="Variantlar"
        description="success, error, warning, info ve default semantik variant'ları."
        importLine={IMPORT}
        code={`const { toast } = useToast();

toast({ title: "Başarılı!", description: "İşlem tamamlandı.", variant: "success" });
toast({ title: "Hata!",    description: "Bir şeyler ters gitti.", variant: "error" });
toast({ title: "Uyarı",    description: "Bu işlem geri alınamaz.", variant: "warning" });
toast({ title: "Bilgi",    description: "Yeni güncelleme mevcut.", variant: "info" });
toast({ title: "Bildirim", description: "Yeni mesajınız var." });`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => toast({ title: "Başarılı!", description: "İşlem başarıyla tamamlandı.", variant: "success" })}
          >
            Success
          </Button>
          <Button
            variant="danger"
            onClick={() => toast({ title: "Hata!", description: "Bir şeyler ters gitti. Lütfen tekrar deneyin.", variant: "error" })}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast({ title: "Uyarı", description: "Bu işlem geri alınamaz.", variant: "warning" })}
          >
            Warning
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast({ title: "Bilgi", description: "Yeni bir güncelleme mevcut.", variant: "info" })}
          >
            Info
          </Button>
          <Button
            variant="ghost"
            onClick={() => toast({ title: "Bildirim", description: "Yeni bir mesajınız var." })}
          >
            Default
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sadece Başlık"
        description="Yalnızca title veya yalnızca description ile kısa bildirimler."
        importLine={IMPORT}
        code={`toast({ title: "Kopyalandı!", variant: "success" });
toast({ description: "Değişiklikler kaydedildi." });`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => toast({ title: "Kopyalandı!", variant: "success" })}>
            Sadece başlık
          </Button>
          <Button variant="outline" onClick={() => toast({ description: "Değişiklikler kaydedildi." })}>
            Sadece açıklama
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Action Butonu"
        description="action prop ile toast içine tıklanabilir aksiyon butonu eklenir."
        importLine={IMPORT}
        code={`toast({
  title: "E-posta gönderildi",
  description: "Mesajınız iletildi.",
  variant: "success",
  action: {
    label: "Geri Al",
    onClick: () => toast({ title: "Geri alındı", variant: "info" }),
  },
});`}
      >
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: "E-posta gönderildi",
              description: "Mesajınız iletildi.",
              variant: "success",
              action: {
                label: "Geri Al",
                onClick: () => toast({ title: "Geri alındı", variant: "info" }),
              },
            })
          }
        >
          Action ile Toast
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="Uzun Süre"
        description="duration prop ile otomatik kapanma süresi milisaniye cinsinden ayarlanır."
        importLine={IMPORT}
        code={`toast({
  title: "Kalıcı Bildirim",
  description: "Bu bildirim 10 saniye sonra kapanır.",
  variant: "info",
  duration: 10000,
});`}
      >
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Kalıcı Bildirim",
              description: "Bu bildirim 10 saniye sonra kapanır.",
              variant: "info",
              duration: 10000,
            })
          }
        >
          10 saniye
        </Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="Çoklu Toast"
        description="Aynı anda birden fazla toast gösterilir ve stack olarak sıralanır."
        importLine={IMPORT}
        code={`toast({ title: "1. Bildirim", variant: "success" });
setTimeout(() => toast({ title: "2. Bildirim", variant: "info" }), 300);
setTimeout(() => toast({ title: "3. Bildirim", variant: "warning" }), 600);`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => {
              toast({ title: "1. Bildirim", variant: "success" });
              setTimeout(() => toast({ title: "2. Bildirim", variant: "info" }), 300);
              setTimeout(() => toast({ title: "3. Bildirim", variant: "warning" }), 600);
            }}
          >
            3'lü Stack
          </Button>
          <Button variant="danger-outline" onClick={dismissAll}>
            Tümünü Kapat
          </Button>
        </div>
      </ShowcaseSection>
    </div>
  );
}
