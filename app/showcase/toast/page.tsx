"use client";

import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

export default function ToastShowcase() {
  const { toast, dismissAll } = useToast();

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Toast / Notification</h1>
        <p className="text-foreground-muted">
          success · error · warning · info · default · action butonu · otomatik kapanma · stack
        </p>
      </div>

      <Section title="Variantlar">
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
      </Section>

      <Section title="Sadece Başlık">
        <Button variant="outline" onClick={() => toast({ title: "Kopyalandı!", variant: "success" })}>
          Sadece başlık
        </Button>
        <Button variant="outline" onClick={() => toast({ description: "Değişiklikler kaydedildi." })}>
          Sadece açıklama
        </Button>
      </Section>

      <Section title="Action Butonu">
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
      </Section>

      <Section title="Uzun Süre">
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
      </Section>

      <Section title="Çoklu Toast">
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
      </Section>
    </div>
  );
}
