"use client";

import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  );
}

export default function CardShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Card</h1>
        <p className="text-foreground-muted">
          basic · bordered · elevated · interactive · ghost · CardHeader · CardFooter
        </p>
      </div>

      <Section title="Variantlar">
        <Card variant="basic">
          <p className="text-sm font-semibold text-foreground mb-1">Basic</p>
          <p className="text-sm text-foreground-muted">Standart border, arka plan yok.</p>
        </Card>
        <Card variant="bordered">
          <p className="text-sm font-semibold text-foreground mb-1">Bordered</p>
          <p className="text-sm text-foreground-muted">Kalın border ile güçlü çerçeve.</p>
        </Card>
        <Card variant="elevated">
          <p className="text-sm font-semibold text-foreground mb-1">Elevated</p>
          <p className="text-sm text-foreground-muted">Gölge ile yükseltilmiş görünüm.</p>
        </Card>
        <Card variant="interactive">
          <p className="text-sm font-semibold text-foreground mb-1">Interactive</p>
          <p className="text-sm text-foreground-muted">Hover'da hafifçe yükselir.</p>
        </Card>
        <Card variant="ghost">
          <p className="text-sm font-semibold text-foreground mb-1">Ghost</p>
          <p className="text-sm text-foreground-muted">Subtle arka plan, border yok.</p>
        </Card>
      </Section>

      <Section title="CardHeader & CardFooter">
        <Card variant="elevated" className="col-span-full sm:col-span-2">
          <CardHeader
            title="Proje Başlığı"
            description="Bu kart başlık, açıklama ve aksiyon slotuna sahip."
            action={<Badge variant="success">Aktif</Badge>}
          />
          <p className="text-sm text-foreground-muted">
            Kart içeriği burada. İstediğiniz her türlü içeriği yerleştirebilirsiniz.
          </p>
          <CardFooter>
            <Button variant="outline" size="sm">İptal</Button>
            <Button size="sm">Kaydet</Button>
          </CardFooter>
        </Card>

        <Card variant="basic">
          <CardHeader title="Basit Kart" description="Başlık ve açıklama." />
          <p className="text-sm text-foreground-muted">
            Kısa bir içerik metni.
          </p>
        </Card>
      </Section>

      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
          Padding Varyantları
        </h2>
        <div className="flex flex-wrap gap-4">
          {(["none", "sm", "md", "lg"] as const).map((p) => (
            <Card key={p} variant="bordered" padding={p} className="w-36">
              <p className="text-xs text-foreground-muted font-mono">padding="{p}"</p>
              <div className="mt-2 h-8 rounded bg-background-muted" />
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
          Dashboard Kartı Örneği
        </h2>
        <Card variant="elevated">
          <CardHeader
            title="Haftalık Rapor"
            description="Son 7 günün özeti"
            action={
              <Button variant="ghost" size="sm">
                Tümünü Gör
              </Button>
            }
          />
          <div className="space-y-3">
            {["Toplam Kullanıcı", "Gelir", "Dönüşüm Oranı"].map((item, i) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground-muted">{item}</span>
                <span className="text-sm font-semibold text-foreground">
                  {["1,284", "₺48.350", "%3.6"][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
