"use client";

import { Popover, PopoverTrigger, PopoverContent, usePopoverClose } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

function UserCard() {
  const close = usePopoverClose();
  return (
    <div className="p-4 w-64">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center text-primary font-bold">E</div>
        <div>
          <p className="text-sm font-semibold text-foreground">Emirhan Durmuş</p>
          <p className="text-xs text-foreground-muted">emirhan@myapp.io</p>
        </div>
      </div>
      <div className="space-y-1">
        {["Profil", "Ayarlar", "Abonelik"].map((item) => (
          <button key={item} onClick={close}
            className="w-full text-left px-3 py-1.5 text-sm text-foreground-muted hover:text-foreground hover:bg-background-muted rounded-[var(--radius-sm)] transition-colors">
            {item}
          </button>
        ))}
        <div className="border-t border-border my-1" />
        <button onClick={close}
          className="w-full text-left px-3 py-1.5 text-sm text-danger hover:bg-danger-subtle rounded-[var(--radius-sm)] transition-colors">
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

export default function PopoverShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Popover</h1>
        <p className="text-sm text-foreground-muted">
          Etkileşimli floating panel · 4 yön · 3 hizalama · click / hover trigger · portal · ok desteği
        </p>
      </div>

      <ShowcaseSection
        title="Temel — 4 Yön"
        description="side prop ile açılma yönü belirlenir."
        previewClassName="grid grid-cols-2 sm:grid-cols-4 gap-4 place-items-center py-10"
        code={`<Popover>
  <PopoverTrigger>
    <Button variant="outline">Aşağı</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom">
    <div className="p-3">Popover içeriği</div>
  </PopoverContent>
</Popover>`}
      >
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger>
              <Button variant="outline" size="sm">{side}</Button>
            </PopoverTrigger>
            <PopoverContent side={side}>
              <div className="p-3 text-sm text-foreground">
                <p className="font-medium mb-1">side="{side}"</p>
                <p className="text-foreground-muted text-xs">Bu popover {side} yönünde açılıyor.</p>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </ShowcaseSection>

      <ShowcaseSection
        title="Kullanıcı Menüsü"
        description="usePopoverClose hook'u ile içerideki butonlar popover'ı kapatabilir."
        previewClassName="flex justify-center py-6"
        code={`<Popover>
  <PopoverTrigger>
    <Button variant="outline">Hesap</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="end">
    <UserCard />
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Hesabım</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end">
            <UserCard />
          </PopoverContent>
        </Popover>
      </ShowcaseSection>

      <ShowcaseSection
        title="Hover Trigger"
        description="trigger='hover' ile fare üzerine gelindiğinde açılır."
        previewClassName="flex justify-center py-6"
        code={`<Popover>
  <PopoverTrigger trigger="hover">
    <Button variant="secondary">Üzerine Gelin</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    <div className="p-3 text-sm">Hover ile açıldı!</div>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger trigger="hover">
            <Button variant="secondary">Üzerine Gelin</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <div className="p-3 text-sm text-foreground">
              <p className="font-medium">Hover Popover</p>
              <p className="text-xs text-foreground-muted mt-1">Fare uzaklaşınca kapanır.</p>
            </div>
          </PopoverContent>
        </Popover>
      </ShowcaseSection>

      <ShowcaseSection
        title="Hizalama (align)"
        description="start / center / end ile yatay hizalama."
        previewClassName="flex items-center justify-around py-8"
        code={`<Popover>
  <PopoverTrigger><Button variant="outline" size="sm">Start</Button></PopoverTrigger>
  <PopoverContent side="bottom" align="start">
    <div className="p-3 text-sm">align="start"</div>
  </PopoverContent>
</Popover>`}
      >
        {(["start", "center", "end"] as const).map((align) => (
          <Popover key={align}>
            <PopoverTrigger>
              <Button variant="outline" size="sm">{align}</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align={align}>
              <div className="p-3 text-sm text-foreground">
                <p className="font-medium font-mono text-xs">align="{align}"</p>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </ShowcaseSection>
    </div>
  );
}
