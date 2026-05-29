import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Tooltip } from "@/components/ui/tooltip";`;

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export default function TooltipShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Tooltip</h1>
        <p className="text-foreground-muted">
          4 yön · 5 variant · gecikme ayarı · ok işareti · a11y (role=tooltip, aria-describedby)
        </p>
      </div>

      <ShowcaseSection
        title="Placement (Yön)"
        description="top, bottom, left ve right yönleriyle tooltip konumlandırma."
        importLine={IMPORT}
        code={`<Tooltip content="Üstte görünür" placement="top">
  <Button variant="outline" size="sm">Top</Button>
</Tooltip>
<Tooltip content="Altta görünür" placement="bottom">
  <Button variant="outline" size="sm">Bottom</Button>
</Tooltip>
<Tooltip content="Solda görünür" placement="left">
  <Button variant="outline" size="sm">Left</Button>
</Tooltip>
<Tooltip content="Sağda görünür" placement="right">
  <Button variant="outline" size="sm">Right</Button>
</Tooltip>`}
        previewClassName="flex flex-wrap items-center gap-5"
      >
        <Tooltip content="Üstte görünür" placement="top">
          <Button variant="outline" size="sm">Top</Button>
        </Tooltip>
        <Tooltip content="Altta görünür" placement="bottom">
          <Button variant="outline" size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip content="Solda görünür" placement="left">
          <Button variant="outline" size="sm">Left</Button>
        </Tooltip>
        <Tooltip content="Sağda görünür" placement="right">
          <Button variant="outline" size="sm">Right</Button>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection
        title="Variants"
        description="default, dark, light, danger ve info görsel çeşitleri."
        importLine={IMPORT}
        code={`<Tooltip content="Default tooltip" variant="default">
  <Button variant="outline" size="sm">Default</Button>
</Tooltip>
<Tooltip content="Dark tooltip" variant="dark">
  <Button variant="outline" size="sm">Dark</Button>
</Tooltip>
<Tooltip content="Light tooltip — border ile" variant="light">
  <Button variant="outline" size="sm">Light</Button>
</Tooltip>
<Tooltip content="Tehlikeli işlem!" variant="danger">
  <Button variant="outline" size="sm">Danger</Button>
</Tooltip>
<Tooltip content="Bilgilendirme mesajı" variant="info">
  <Button variant="outline" size="sm">Info</Button>
</Tooltip>`}
        previewClassName="flex flex-wrap items-center gap-5"
      >
        <Tooltip content="Default tooltip" variant="default">
          <Button variant="outline" size="sm">Default</Button>
        </Tooltip>
        <Tooltip content="Dark tooltip" variant="dark">
          <Button variant="outline" size="sm">Dark</Button>
        </Tooltip>
        <Tooltip content="Light tooltip — border ile" variant="light">
          <Button variant="outline" size="sm">Light</Button>
        </Tooltip>
        <Tooltip content="Tehlikeli işlem!" variant="danger">
          <Button variant="outline" size="sm">Danger</Button>
        </Tooltip>
        <Tooltip content="Bilgilendirme mesajı" variant="info">
          <Button variant="outline" size="sm">Info</Button>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection
        title="Gecikme (Delay)"
        description="delay prop ile tooltip görünme gecikmesi milisaniye cinsinden ayarlanır."
        importLine={IMPORT}
        code={`<Tooltip content="Gecikme yok (0ms)" delay={0}>
  <Button variant="outline" size="sm">Anlık</Button>
</Tooltip>
<Tooltip content="150ms gecikme (varsayılan)" delay={150}>
  <Button variant="outline" size="sm">150ms</Button>
</Tooltip>
<Tooltip content="500ms gecikme" delay={500}>
  <Button variant="outline" size="sm">500ms</Button>
</Tooltip>`}
        previewClassName="flex flex-wrap items-center gap-5"
      >
        <Tooltip content="Gecikme yok (0ms)" delay={0}>
          <Button variant="outline" size="sm">Anlık</Button>
        </Tooltip>
        <Tooltip content="150ms gecikme (varsayılan)" delay={150}>
          <Button variant="outline" size="sm">150ms</Button>
        </Tooltip>
        <Tooltip content="500ms gecikme" delay={500}>
          <Button variant="outline" size="sm">500ms</Button>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection
        title="Uzun İçerik"
        description="Uzun metin otomatik olarak max-w sınırına göre kaydırılır."
        importLine={IMPORT}
        code={`<Tooltip
  content="Bu tooltip daha uzun bir açıklama içeriyor."
  placement="bottom"
>
  <Button variant="outline" size="sm">Uzun metin</Button>
</Tooltip>
<Tooltip
  content="Çok daha dar bir tooltip max-w-[160px] ile."
  placement="top"
  maxWidth="max-w-[160px]"
>
  <Button variant="outline" size="sm">Dar tooltip</Button>
</Tooltip>`}
        previewClassName="flex flex-wrap items-center gap-5"
      >
        <Tooltip
          content="Bu tooltip daha uzun bir açıklama içeriyor. Birden fazla satıra yayılabilir ve max-w-xs ile sınırlandırılmıştır."
          placement="bottom"
        >
          <Button variant="outline" size="sm">Uzun metin</Button>
        </Tooltip>
        <Tooltip
          content="Çok daha dar bir tooltip max-w-[160px] ile."
          placement="top"
          maxWidth="max-w-[160px]"
        >
          <Button variant="outline" size="sm">Dar tooltip</Button>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        description="disabled prop ile tooltip tamamen devre dışı bırakılır."
        importLine={IMPORT}
        code={`<Tooltip content="Bu görünmez" disabled>
  <Button variant="outline" size="sm">Devre dışı tooltip</Button>
</Tooltip>`}
        previewClassName="flex flex-wrap items-center gap-5"
      >
        <Tooltip content="Bu görünmez" disabled>
          <Button variant="outline" size="sm">Devre dışı tooltip</Button>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection
        title="Örnek Kullanım"
        description="İkon araç çubuğu, bilgi ikonu ve avatar grubu ile gerçek kullanım örnekleri."
        importLine={IMPORT}
        code={`// İkon araç çubuğu
<Tooltip content="Düzenle" placement="bottom">
  <Button size="icon-sm" variant="ghost"><EditIcon /></Button>
</Tooltip>

// Bilgi ikonu
<Tooltip content="Her aktif kullanıcı için aylık ücret alınır." variant="light">
  <span className="cursor-help"><InfoIcon /></span>
</Tooltip>

// Avatar üzerinde isim
<Tooltip content={user.name} placement="bottom">
  <Avatar name={user.name} status={user.status} size="md" />
</Tooltip>`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1 border border-border rounded-[var(--radius-md)] p-1 w-fit bg-surface">
            <Tooltip content="Düzenle" placement="bottom">
              <Button size="icon-sm" variant="ghost"><EditIcon /></Button>
            </Tooltip>
            <Tooltip content="Kopyala" placement="bottom">
              <Button size="icon-sm" variant="ghost"><CopyIcon /></Button>
            </Tooltip>
            <Tooltip content="Sil" placement="bottom" variant="danger">
              <Button size="icon-sm" variant="ghost"><TrashIcon /></Button>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground">
            <span>Kullanıcı başına fiyat</span>
            <Tooltip
              content="Her aktif kullanıcı için aylık ücret alınır. Pasif kullanıcılar hesaba katılmaz."
              variant="light"
            >
              <span className="text-foreground-subtle cursor-help">
                <InfoIcon />
              </span>
            </Tooltip>
          </div>

          <div className="flex gap-2">
            {[
              { name: "Emirhan Durmuş", status: "online" as const },
              { name: "Ayşe Kaya", status: "busy" as const },
              { name: "Mehmet Yıldız", status: "away" as const },
            ].map((u) => (
              <Tooltip key={u.name} content={u.name} placement="bottom">
                <Avatar name={u.name} status={u.status} size="md" />
              </Tooltip>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
