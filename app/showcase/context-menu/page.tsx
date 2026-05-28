"use client";

import { ContextMenu, type ContextMenuItemDef } from "@/components/ui/context-menu";
import { ShowcaseSection } from "@/components/ui/showcase-section";

function CopyIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
}
function EditIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
}
function TrashIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
}
function ShareIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
}
function StarIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}

const FILE_ITEMS: ContextMenuItemDef[] = [
  { label: "Düzenle",    icon: <EditIcon />,  shortcut: "⌘E", onClick: () => alert("Düzenle") },
  { label: "Kopyala",   icon: <CopyIcon />,  shortcut: "⌘C", onClick: () => alert("Kopyala") },
  { label: "Paylaş",    icon: <ShareIcon />, onClick: () => alert("Paylaş"),
    children: [
      { label: "Bağlantı Kopyala", onClick: () => alert("Link") },
      { label: "E-posta ile Gönder", onClick: () => alert("Email") },
    ],
  },
  { label: "Favorilere Ekle", icon: <StarIcon />, onClick: () => alert("Favori") },
  { type: "divider" },
  { label: "Sil", icon: <TrashIcon />, danger: true, shortcut: "⌫", onClick: () => alert("Sil") },
];

const TEXT_ITEMS: ContextMenuItemDef[] = [
  { type: "label", label: "Metin İşlemleri" },
  { label: "Kalın",  shortcut: "⌘B", onClick: () => {} },
  { label: "İtalik", shortcut: "⌘I", onClick: () => {} },
  { label: "Altı Çizili", shortcut: "⌘U", onClick: () => {} },
  { type: "divider" },
  { label: "Kopyala",  shortcut: "⌘C", onClick: () => {} },
  { label: "Yapıştır", shortcut: "⌘V", onClick: () => {} },
  { type: "divider" },
  { label: "Tümünü Seç", shortcut: "⌘A", onClick: () => {} },
];

export default function ContextMenuShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Context Menu</h1>
        <p className="text-sm text-foreground-muted">
          Sağ tık ile açılır · iç içe alt menü · divider · label · shortcut · danger · keyboard nav
        </p>
      </div>

      <ShowcaseSection
        title="Dosya Kartı — Sağ Tık"
        description="Herhangi bir alana sağ tıklayın veya uzun basın."
        previewClassName=""
        code={`<ContextMenu items={FILE_ITEMS}>
  <div className="...">Sağ tıklayın</div>
</ContextMenu>`}
      >
        <ContextMenu items={FILE_ITEMS}>
          <div className="rounded-[var(--radius-xl)] border-2 border-dashed border-border p-10 text-center cursor-context-menu hover:bg-background-muted transition-colors">
            <p className="text-sm text-foreground-muted">
              Sağ tıklayın veya uzun basın
            </p>
            <p className="text-xs text-foreground-subtle mt-1">
              Dosya işlemleri menüsü açılır
            </p>
          </div>
        </ContextMenu>
      </ShowcaseSection>

      <ShowcaseSection
        title="Alt Menü (Nested)"
        description="Paylaş menüsünün üzerine gelin — alt menü açılır."
        previewClassName=""
        code={`const items = [
  { label: "Paylaş", children: [
    { label: "Bağlantı Kopyala", onClick: () => {} },
    { label: "E-posta ile Gönder", onClick: () => {} },
  ]},
  { type: "divider" },
  { label: "Sil", danger: true },
];`}
      >
        <ContextMenu items={FILE_ITEMS}>
          <div className="rounded-[var(--radius-xl)] bg-surface border border-border p-6 flex items-center gap-4 cursor-context-menu hover:bg-background-muted/50 transition-colors">
            <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-primary-subtle flex items-center justify-center text-primary text-xl font-bold">📄</div>
            <div>
              <p className="text-sm font-semibold text-foreground">proje-dosyasi.pdf</p>
              <p className="text-xs text-foreground-muted">2.4 MB · 3 gün önce</p>
            </div>
          </div>
        </ContextMenu>
      </ShowcaseSection>

      <ShowcaseSection
        title="Metin Editörü Menüsü"
        description="Label ve divider ile gruplandırılmış metin işlemleri."
        previewClassName=""
        code={`const items = [
  { type: "label", label: "Metin İşlemleri" },
  { label: "Kalın", shortcut: "⌘B" },
  { label: "İtalik", shortcut: "⌘I" },
  ...
];`}
      >
        <ContextMenu items={TEXT_ITEMS}>
          <div className="rounded-[var(--radius-xl)] border border-border p-5 cursor-context-menu hover:bg-background-muted/30 transition-colors min-h-[80px]">
            <p className="text-sm text-foreground leading-relaxed">
              Bu metin alanına sağ tıklayarak metin işlemleri menüsüne ulaşabilirsiniz.
              <strong> Kalın</strong>, <em>italik</em> gibi biçimlendirme seçenekleri içerir.
            </p>
          </div>
        </ContextMenu>
      </ShowcaseSection>
    </div>
  );
}
