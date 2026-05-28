"use client";

import { ConfettiButton } from "@/components/ui/confetti-button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function ConfettiButtonShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Confetti Button</h1>
        <p className="text-sm text-foreground-muted">
          Tıklamada canvas confetti patlaması · özelleştirilebilir renk/parçacık · prefers-reduced-motion
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="Butona tıklayın!"
        code={`<ConfettiButton className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
  Kutla! 🎉
</ConfettiButton>`}
      >
        <div className="flex justify-center py-4">
          <ConfettiButton className="px-6 py-3 rounded-[var(--radius-xl)] bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-90 transition-opacity">
            Kutla! 🎉
          </ConfettiButton>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Renkler"
        description="Marka renklerine göre confetti renkleri ayarlanabilir."
        code={`<ConfettiButton
  colors={["#f43f5e", "#ec4899", "#a855f7"]}
  count={100}
>
  Rose & Purple
</ConfettiButton>`}
      >
        <div className="flex flex-wrap gap-4 justify-center py-4">
          <ConfettiButton
            colors={["#f43f5e", "#ec4899", "#a855f7"]}
            count={100}
            className="px-5 py-2.5 rounded-[var(--radius-lg)] bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold text-sm"
          >
            Rose & Purple 💜
          </ConfettiButton>
          <ConfettiButton
            colors={["#22c55e", "#10b981", "#06b6d4"]}
            count={80}
            className="px-5 py-2.5 rounded-[var(--radius-lg)] bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold text-sm"
          >
            Green & Cyan 🌊
          </ConfettiButton>
          <ConfettiButton
            colors={["#f59e0b", "#f97316", "#ef4444"]}
            count={120}
            className="px-5 py-2.5 rounded-[var(--radius-lg)] bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold text-sm"
          >
            Fire 🔥
          </ConfettiButton>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Parçacık Sayısı"
        code={`<ConfettiButton count={20}>Az</ConfettiButton>
<ConfettiButton count={150}>Çok</ConfettiButton>`}
      >
        <div className="flex gap-4 justify-center py-4">
          <ConfettiButton
            count={20}
            className="px-5 py-2.5 rounded-[var(--radius-lg)] border-2 border-border text-foreground font-medium text-sm hover:bg-background-muted"
          >
            Az Parçacık (20)
          </ConfettiButton>
          <ConfettiButton
            count={150}
            className="px-5 py-2.5 rounded-[var(--radius-lg)] border-2 border-primary text-primary font-medium text-sm hover:bg-primary-subtle"
          >
            Çok Parçacık (150)
          </ConfettiButton>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Başarı Onayı"
        description="Form submit veya ödeme sonrasında kullanım örneği."
        code={`<ConfettiButton onClick={handleSubmit}>
  Siparişi Tamamla ✓
</ConfettiButton>`}
      >
        <div className="flex justify-center py-4">
          <ConfettiButton
            count={120}
            className="px-8 py-4 rounded-[var(--radius-xl)] bg-success text-white font-semibold text-base shadow-lg hover:opacity-90 transition-opacity"
            onClick={() => {}}
          >
            Siparişi Tamamla ✓
          </ConfettiButton>
        </div>
      </ShowcaseSection>
    </div>
  );
}
