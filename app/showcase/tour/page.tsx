"use client";

import { useState } from "react";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Tour, type TourStep } from "@/components/ui/tour";

const STEPS: TourStep[] = [
  { target: "#tour-search",  title: "Arama", content: "Bileşenleri hızlıca bulmak için arama kutusunu kullanın. ⌘K kısayolu ile de açabilirsiniz.", placement: "bottom" },
  { target: "#tour-nav",     title: "Navigasyon", content: "Kategorilere tıklayarak bileşen gruplarına göz atın. Aktif kategori otomatik açılır.", placement: "right" },
  { target: "#tour-preview", title: "Önizleme", content: "Her bileşenin canlı önizlemesini burada görün. 'Kodu Gör' ile kaynak koda ulaşın.", placement: "top" },
  { target: "#tour-done",    title: "Hazırsınız! 🎉", content: "Kütüphaneyi keşfetmeye hazırsınız. Herhangi bir sorunuz olursa dokümantasyona göz atın.", placement: "bottom" },
];

const ONBOARDING: TourStep[] = [
  { target: "body", title: "Hoş Geldiniz!", content: "Bu kısa tur sizi uygulamada yönlendirecek. İstediğiniz zaman 'Esc' ile çıkabilirsiniz.", placement: "center" },
  { target: "#ob-profile", title: "Profilinizi Tamamlayın", content: "Avatar yükleyerek ve bio ekleyerek profilinizi kişiselleştirin.", placement: "bottom" },
  { target: "#ob-settings", title: "Ayarlar", content: "Bildirim tercihleri, tema ve dil seçeneklerini burada bulabilirsiniz.", placement: "left" },
];

export default function TourShowcase() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tour / Onboarding</h1>
        <p className="text-foreground-muted">
          Adım adım kullanıcı yönlendirme. SVG spotlight cutout, tooltip yerleşimi ve ilerleme göstergesi.
        </p>
      </div>

      <ShowcaseSection
        title="Spotlight Tour"
        description="Hedef elementi spotlight ile vurgular, tooltip konumunu otomatik hesaplar."
        importLine={`import { Tour } from "@/components/ui/tour";`}
        code={`const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Turu Başlat</button>

<Tour
  steps={steps}
  isOpen={open}
  onClose={() => setOpen(false)}
  onComplete={() => console.log("Tur tamamlandı!")}
/>`}
      >
        <div className="space-y-4 p-4">
          {/* Demo elements with IDs for targeting */}
          <div id="tour-search" className="flex items-center gap-2 px-3 h-9 rounded-[var(--radius-lg)] border border-border bg-background-muted w-64">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-foreground-muted" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span className="text-sm text-foreground-subtle">Ara...</span>
            <kbd className="ml-auto text-[10px] font-mono bg-background border border-border px-1 rounded">⌘K</kbd>
          </div>
          <div id="tour-nav" className="flex flex-col gap-1 w-48 p-3 rounded-[var(--radius-xl)] border border-border bg-surface">
            {["Primitives", "Layout", "Feedback", "Animation"].map(cat => (
              <div key={cat} className="text-xs py-1.5 px-2 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted cursor-pointer">{cat}</div>
            ))}
          </div>
          <div id="tour-preview" className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 text-sm text-foreground-muted">
            Bileşen önizlemesi buraya gelir
          </div>
          <div id="tour-done">
            <button
              onClick={() => setOpen1(true)}
              className="px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Turu Başlat
            </button>
          </div>
        </div>
        <Tour steps={STEPS} isOpen={open1} onClose={() => setOpen1(false)} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Onboarding (Center Modal)"
        description="placement='center' ile hedef element olmadan ortada görünen modal tour."
        importLine={`import { Tour } from "@/components/ui/tour";`}
        code={`<Tour
  steps={[
    { target: "body", placement: "center", title: "Hoş Geldiniz!", content: "..." },
    { target: "#profile", placement: "bottom", title: "Profil", content: "..." },
  ]}
  isOpen={open}
  onClose={() => setOpen(false)}
/>`}
      >
        <div className="space-y-3 p-4">
          <div id="ob-profile" className="flex items-center gap-3 p-3 rounded-[var(--radius-xl)] border border-border bg-surface">
            <div className="size-10 rounded-full bg-background-muted" />
            <div className="h-4 w-24 rounded bg-background-muted" />
          </div>
          <div id="ob-settings" className="p-3 rounded-[var(--radius-xl)] border border-border bg-surface">
            <div className="h-3 w-16 rounded bg-background-muted mb-2" />
            <div className="h-3 w-32 rounded bg-background-muted" />
          </div>
          <button
            onClick={() => setOpen2(true)}
            className="px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Onboarding Başlat
          </button>
        </div>
        <Tour steps={ONBOARDING} isOpen={open2} onClose={() => setOpen2(false)} />
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">TourStep Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>{["Prop","Tip","Açıklama"].map(h=><th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["target","string","CSS selector veya 'body' (center için)"],
                ["title","string","Tooltip başlığı"],
                ["content","string","Açıklama metni"],
                ["placement",'"top"|"bottom"|"left"|"right"|"center"',"Tooltip konumu"],
              ].map(([p,t,d])=>(
                <tr key={p} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 text-foreground-muted">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
