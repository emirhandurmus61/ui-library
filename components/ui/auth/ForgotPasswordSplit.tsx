"use client";

import { cn } from "@/lib/utils";
import { ForgotPasswordCard, type ForgotPasswordCardProps } from "./ForgotPasswordCard";

export interface ForgotPasswordSplitProps extends ForgotPasswordCardProps {
  panelClassName?: string;
  panelContent?: React.ReactNode;
  panelTitle?: string;
  panelSubtitle?: string;
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="2em" height="2em">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function DefaultPanel({
  title = "Hesabınız güvende",
  subtitle = "Şifrenizi unuttuysanız endişelenmeyin. Güvenli sıfırlama sürecimiz sizi korur.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const tips = [
    "Sıfırlama bağlantısı 15 dakika geçerlidir",
    "Bağlantıyı yalnızca siz kullanabilirsiniz",
    "Tarayıcınızda oturum güvenli tutulur",
  ];

  return (
    <div className="flex flex-col justify-between h-full p-10 text-white">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-white/20 text-sm font-bold">U</span>
        <span className="font-semibold text-lg">UI Library</span>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex size-20 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm">
          <LockIcon />
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight mb-3">{title}</h2>
          <p className="text-white/70 text-base leading-relaxed">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex shrink-0 size-7 items-center justify-center rounded-full bg-white/15 text-white">
                <ShieldCheckIcon />
              </span>
              <p className="text-sm text-white/80">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-white/40">© 2026 UI Library. Tüm hakları saklıdır.</p>
    </div>
  );
}

export function ForgotPasswordSplit({
  panelClassName,
  panelContent,
  panelTitle,
  panelSubtitle,
  ...cardProps
}: ForgotPasswordSplitProps) {
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
        <ForgotPasswordCard {...cardProps} className="w-full" />
      </div>
    </div>
  );
}
