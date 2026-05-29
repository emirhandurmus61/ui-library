"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { PrintButton } from "@/components/ui/print-button";

export default function PrintButtonShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Print Button</h1>
        <p className="text-foreground-muted">
          Tüm sayfa veya belirli bir elementi yazdıran buton. CSS stilleri iframe üzerinden aktarılır.
        </p>
      </div>

      <ShowcaseSection
        title="Varyantlar"
        description="default, minimal, icon, pill — 4 görsel stil."
        importLine={`import { PrintButton } from "@/components/ui/print-button";`}
        code={`<PrintButton variant="default" />
<PrintButton variant="minimal" />
<PrintButton variant="icon" />
<PrintButton variant="pill" />`}
      >
        <div className="flex flex-wrap items-center gap-4">
          {(["default","minimal","icon","pill"] as const).map(v => (
            <div key={v} className="flex flex-col items-center gap-1.5">
              <PrintButton variant={v} />
              <span className="text-[11px] text-foreground-subtle">{v}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyutlar"
        description="sm, md (varsayılan), lg."
        importLine={`import { PrintButton } from "@/components/ui/print-button";`}
        code={`<PrintButton size="sm" />
<PrintButton size="md" />
<PrintButton size="lg" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          {(["sm","md","lg"] as const).map(s => (
            <PrintButton key={s} size={s} label={`Yazdır (${s})`} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Belirli Element Yazdırma"
        description="targetSelector ile sadece seçili elementi yazdırır, geri kalan sayfa gösterilmez."
        importLine={`import { PrintButton } from "@/components/ui/print-button";`}
        code={`<div id="invoice">
  {/* Fatura içeriği */}
</div>

<PrintButton
  targetSelector="#invoice"
  title="Fatura #INV-2026-0042"
  label="Faturayı Yazdır"
/>`}
      >
        <div className="space-y-4">
          {/* Mock invoice */}
          <div id="print-invoice" className="rounded-[var(--radius-xl)] border border-border bg-surface p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold text-foreground">FATURA</p>
                <p className="text-sm text-foreground-muted">#INV-2026-0042</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">UI Library Ltd.</p>
                <p className="text-xs text-foreground-muted">28 May 2026</p>
              </div>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              {[
                { item: "Pro Plan (Yıllık)", qty: 1, price: "₺2.999" },
                { item: "Ek Kullanıcı (×3)", qty: 3, price: "₺900" },
                { item: "Öncelikli Destek",  qty: 1, price: "₺599" },
              ].map(row => (
                <div key={row.item} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{row.item}</span>
                  <span className="text-foreground-muted">{row.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground">
              <span>Toplam</span>
              <span>₺4.498</span>
            </div>
          </div>
          <PrintButton
            targetSelector="#print-invoice"
            title="Fatura #INV-2026-0042"
            label="Faturayı Yazdır"
            variant="default"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Toolbar Entegrasyonu"
        description="Belge araç çubuğunda paylaş + yazdır kombinasyonu."
        importLine={`import { PrintButton } from "@/components/ui/print-button";`}
        code={`<div className="flex items-center gap-2">
  <ShareButton variant="icon" />
  <PrintButton variant="icon" />
</div>`}
      >
        <div className="rounded-[var(--radius-xl)] border border-border bg-surface overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background-muted/50">
            <p className="text-sm font-medium text-foreground">Belge Başlığı</p>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors" aria-label="Düzenle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <PrintButton variant="icon" />
            </div>
          </div>
          <div className="p-6 text-sm text-foreground-muted leading-relaxed">
            Bu belge içeriği çıktıya hazır formatlanmıştır. Yazdır butonuna tıklayınca sadece bu alan yazdırılır.
          </div>
        </div>
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>{["Prop","Tip","Varsayılan","Açıklama"].map(h=><th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["targetSelector","string","—","Yazdırılacak elementin CSS selector'ü"],
                ["variant",'"default"|"minimal"|"icon"|"pill"','"default"',"Görsel stil"],
                ["size",'"sm"|"md"|"lg"','"md"',"Boyut"],
                ["label","string",'"Yazdır"',"Buton etiketi"],
                ["title","string","document.title","Yazdırma başlığı"],
                ["printStyles","string","—","Yazdırma ortamına inject edilecek CSS"],
                ["onBeforePrint","() => void","—","Yazdırma başlamadan önce"],
                ["onAfterPrint","() => void","—","Yazdırma sonrasında"],
              ].map(([p,t,d,desc])=>(
                <tr key={p} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{d}</td>
                  <td className="px-4 py-3 text-foreground-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
