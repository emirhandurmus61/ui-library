"use client";

import { cn } from "@/lib/utils";
import { RegisterCard, type RegisterCardProps } from "./RegisterCard";

export interface RegisterSplitProps extends RegisterCardProps {
  panelClassName?: string;
  panelContent?: React.ReactNode;
  panelTitle?: string;
  panelSubtitle?: string;
}

function DefaultPanel({
  title = "Hemen başlayın",
  subtitle = "Dakikalar içinde kurulum yapın ve üretken olmaya başlayın.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const steps = [
    { n: "1", text: "Hesabınızı oluşturun" },
    { n: "2", text: "Projenizi kurun" },
    { n: "3", text: "Geliştirmeye başlayın" },
  ];

  const stats = [
    { value: "10K+", label: "Geliştirici" },
    { value: "50+",  label: "Bileşen" },
    { value: "%100", label: "Ücretsiz" },
    { value: "MIT",  label: "Lisans" },
  ];

  return (
    <div className="flex flex-col justify-between h-full p-10 text-white">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-white/20 text-sm font-bold">U</span>
        <span className="font-semibold text-lg">UI Library</span>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold leading-tight mb-3">{title}</h2>
          <p className="text-white/70 text-base leading-relaxed">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-3">
          {steps.map((step) => (
            <div key={step.n} className="flex items-center gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                {step.n}
              </span>
              <p className="text-sm font-medium text-white/90">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-[var(--radius-md)] px-4 py-3 backdrop-blur-sm">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-white/40">© 2026 UI Library. Tüm hakları saklıdır.</p>
    </div>
  );
}

export function RegisterSplit({
  panelClassName,
  panelContent,
  panelTitle,
  panelSubtitle,
  ...registerProps
}: RegisterSplitProps) {
  return (
    <div className="w-full h-full flex" style={{ minHeight: "inherit" }}>
      {/* Sol panel */}
      <div className={cn(
        "hidden lg:flex flex-col flex-1 min-w-0",
        "bg-gradient-to-br from-primary via-primary-hover to-primary-active",
        panelClassName
      )}>
        {panelContent ?? <DefaultPanel title={panelTitle} subtitle={panelSubtitle} />}
      </div>

      {/* Sağ panel */}
      <div className="flex flex-1 lg:flex-none lg:w-[420px] lg:shrink-0 items-center justify-center p-8 bg-background overflow-y-auto">
        <RegisterCard {...registerProps} className="w-full" />
      </div>
    </div>
  );
}
