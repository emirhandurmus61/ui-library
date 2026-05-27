"use client";

import { cn } from "@/lib/utils";
import { LoginCard, type LoginCardProps } from "./LoginCard";

export interface LoginSplitProps extends LoginCardProps {
  panelClassName?: string;
  panelContent?: React.ReactNode;
  panelTitle?: string;
  panelSubtitle?: string;
  panelTestimonial?: { text: string; author: string; role: string };
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="size-3">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DefaultPanel({
  title = "Projelerinizi güçlendirin",
  subtitle = "Binlerce ekip UI Library ile daha hızlı ürün geliştiriyor.",
  testimonial,
}: {
  title?: string;
  subtitle?: string;
  testimonial?: { text: string; author: string; role: string };
}) {
  return (
    <div className="flex flex-col justify-between h-full p-10 text-white">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-white/20 text-sm font-bold">U</span>
        <span className="font-semibold text-lg">UI Library</span>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold leading-tight mb-3">{title}</h2>
          <p className="text-white/70 text-base leading-relaxed">{subtitle}</p>
        </div>
        <ul className="flex flex-col gap-2.5">
          {["Tam responsive bileşenler", "Dark mode hazır", "Copy-paste ile kullanım"].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-white/85">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                <CheckIcon />
              </span>
              {item}
            </li>
          ))}
        </ul>

        {testimonial && (
          <div className="bg-white/10 rounded-[var(--radius-lg)] p-5 backdrop-blur-sm">
            <p className="text-sm text-white/90 leading-relaxed italic mb-3">"{testimonial.text}"</p>
            <p className="text-sm font-semibold text-white">{testimonial.author}</p>
            <p className="text-xs text-white/60">{testimonial.role}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-white/40">© 2026 UI Library. Tüm hakları saklıdır.</p>
    </div>
  );
}

export function LoginSplit({
  panelClassName,
  panelContent,
  panelTitle,
  panelSubtitle,
  panelTestimonial,
  ...loginProps
}: LoginSplitProps) {
  return (
    <div className="w-full h-full flex" style={{ minHeight: "inherit" }}>
      {/* Sol panel */}
      <div className={cn(
        "hidden lg:flex flex-col flex-1 min-w-0",
        "bg-gradient-to-br from-primary via-primary-hover to-primary-active",
        panelClassName
      )}>
        {panelContent ?? (
          <DefaultPanel title={panelTitle} subtitle={panelSubtitle} testimonial={panelTestimonial} />
        )}
      </div>

      {/* Sağ panel */}
      <div className="flex flex-1 lg:flex-none lg:w-[420px] lg:shrink-0 items-center justify-center p-8 bg-background overflow-y-auto">
        <LoginCard {...loginProps} className="w-full" />
      </div>
    </div>
  );
}
