"use client";

import { useState } from "react";
import { Stepper } from "@/components/ui/stepper";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const STEPS_BASIC = [
  { label: "Hesap Oluştur" },
  { label: "Kişisel Bilgiler" },
  { label: "Ödeme" },
  { label: "Tamamlandı" },
];

const STEPS_WITH_DESC = [
  { label: "Hesap Oluştur", description: "E-posta ve şifre girin" },
  { label: "Kişisel Bilgiler", description: "Ad, soyad ve telefon" },
  { label: "Ödeme", description: "Kart bilgilerini ekleyin" },
  { label: "Tamamlandı", description: "Sipariş onaylandı" },
];

export default function StepperPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Stepper / Adım Göstergesi
        </h1>
        <p className="text-sm text-foreground-muted">
          Çok adımlı form ve wizard akışları için. 3 varyant · yatay + dikey · mobil responsive
        </p>
      </div>

      <ShowcaseSection title="Yatay — Varsayılan">
        <Stepper
          steps={STEPS_BASIC}
          currentStep={1}
          orientation="horizontal"
          variant="default"
        />
      </ShowcaseSection>

      <ShowcaseSection title="Yatay — Numaralı">
        <Stepper
          steps={STEPS_BASIC}
          currentStep={1}
          orientation="horizontal"
          variant="numbered"
        />
      </ShowcaseSection>

      <ShowcaseSection title="Yatay — Nokta">
        <Stepper
          steps={STEPS_BASIC}
          currentStep={1}
          orientation="horizontal"
          variant="dots"
        />
      </ShowcaseSection>

      <ShowcaseSection title="Dikey">
        <Stepper
          steps={STEPS_WITH_DESC}
          currentStep={2}
          orientation="vertical"
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Etkileşimli Demo"
        description="İleri / Geri butonlarıyla adımları değiştirin"
      >
        <div className="space-y-6">
          <Stepper
            steps={STEPS_BASIC}
            currentStep={currentStep}
            orientation="horizontal"
            variant="numbered"
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-[var(--radius-md)] border border-border bg-transparent text-foreground hover:bg-background-muted disabled:opacity-40 disabled:pointer-events-none transition-colors duration-150"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <polyline points="10,3 5,8 10,13" />
              </svg>
              Geri
            </button>

            <span className="text-sm text-foreground-muted">
              Adım {currentStep + 1} / {STEPS_BASIC.length}
            </span>

            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.min(STEPS_BASIC.length - 1, s + 1))}
              disabled={currentStep === STEPS_BASIC.length - 1}
              className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40 disabled:pointer-events-none transition-colors duration-150"
            >
              İleri
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <polyline points="6,3 11,8 6,13" />
              </svg>
            </button>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
