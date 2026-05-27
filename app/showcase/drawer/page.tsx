"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  );
}

export default function DrawerShowcase() {
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [top, setTop] = useState(false);
  const [withFooter, setWithFooter] = useState(false);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Drawer / Sheet</h1>
        <p className="text-foreground-muted">
          left · right · bottom · top · slide animasyonu · backdrop · a11y
        </p>
      </div>

      <Section title="Yönler">
        <Button onClick={() => setRight(true)}>Sağdan</Button>
        <Button variant="outline" onClick={() => setLeft(true)}>Soldan</Button>
        <Button variant="outline" onClick={() => setBottom(true)}>Alttan</Button>
        <Button variant="outline" onClick={() => setTop(true)}>Üstten</Button>

        <Drawer open={right} onClose={() => setRight(false)} title="Sağ Drawer" description="Sağdan açılan panel." side="right">
          <p className="text-sm text-foreground-muted py-4">
            Drawer içeriği buraya gelir. Filtreler, form, ayarlar gibi yan paneller için idealdir.
          </p>
        </Drawer>

        <Drawer open={left} onClose={() => setLeft(false)} title="Sol Drawer" description="Soldan açılan panel." side="left">
          <p className="text-sm text-foreground-muted py-4">
            Sol panel içeriği. Navigasyon menüsü için kullanılabilir.
          </p>
        </Drawer>

        <Drawer open={bottom} onClose={() => setBottom(false)} title="Alt Sheet" description="Mobil için idealdir." side="bottom">
          <p className="text-sm text-foreground-muted py-4">
            Bottom sheet, mobil uygulamalarda aksiyonlar için sıkça kullanılır.
          </p>
        </Drawer>

        <Drawer open={top} onClose={() => setTop(false)} title="Üst Drawer" side="top">
          <p className="text-sm text-foreground-muted py-4">
            Üstten açılan panel. Bildirimler, arama gibi kullanım alanlarına uygundur.
          </p>
        </Drawer>
      </Section>

      <Section title="Footer ile">
        <Button variant="secondary" onClick={() => setWithFooter(true)}>
          Footer'lı Drawer
        </Button>
        <Drawer
          open={withFooter}
          onClose={() => setWithFooter(false)}
          title="Profil Düzenle"
          description="Bilgilerinizi güncelleyin."
          side="right"
          footer={
            <>
              <Button variant="outline" onClick={() => setWithFooter(false)}>İptal</Button>
              <Button onClick={() => setWithFooter(false)}>Kaydet</Button>
            </>
          }
        >
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Ad Soyad</label>
              <input
                className="w-full h-10 rounded-[var(--radius-md)] border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="Ad Soyad"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">E-posta</label>
              <input
                className="w-full h-10 rounded-[var(--radius-md)] border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="ornek@email.com"
              />
            </div>
          </div>
        </Drawer>
      </Section>
    </div>
  );
}
