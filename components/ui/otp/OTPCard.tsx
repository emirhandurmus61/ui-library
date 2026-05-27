"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { OTPInput } from "./OTPInput";
import { Button } from "@/components/ui/button";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="2em" height="2em">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="2em" height="2em">
      <rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>
    </svg>
  );
}

export interface OTPCardProps {
  logoText?: string;
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  /** "email" veya "phone" — ikon ve metni etkiler */
  mode?: "email" | "phone";
  /** Gösterilecek maskelenmiş adres: "e***@gmail.com" */
  destination?: string;
  length?: number;
  onVerify?: (code: string) => void | Promise<void>;
  onResend?: () => void | Promise<void>;
  onBack?: () => void;
  backHref?: string;
  className?: string;
}

export function OTPCard({
  logoText = "Brand",
  logo,
  title = "Doğrulama kodu",
  subtitle,
  mode = "email",
  destination,
  length = 6,
  onVerify,
  onResend,
  onBack,
  backHref = "#",
  className,
}: OTPCardProps) {
  const [code, setCode]       = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const defaultSubtitle = mode === "email"
    ? `Doğrulama kodunu${destination ? ` ${destination} adresine` : ""} e-posta olarak gönderdik.`
    : `Doğrulama kodunu${destination ? ` ${destination} numarasına` : ""} SMS olarak gönderdik.`;

  const handleVerify = async () => {
    if (code.length < length) { setError(`Lütfen ${length} haneli kodu girin.`); return; }
    setError("");
    setLoading(true);
    try { await onVerify?.(code); }
    catch { setError("Kod geçersiz veya süresi dolmuş. Tekrar deneyin."); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resendLoading) return;
    setResendLoading(true);
    setError("");
    try {
      await onResend?.();
      setCode("");
      setCooldown(60);
      const id = setInterval(() => {
        setCooldown((c) => { if (c <= 1) { clearInterval(id); return 0; } return c - 1; });
      }, 1000);
    } finally {
      setResendLoading(false);
    }
  };

  const Icon = mode === "email" ? MailIcon : PhoneIcon;

  return (
    <div className={cn(
      "w-full max-w-sm flex flex-col gap-6",
      "bg-surface border border-border rounded-[var(--radius-xl)] shadow-lg p-8",
      className
    )}>
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 text-center">
        {logo ?? (
          <span className="flex size-10 items-center justify-center rounded-[var(--radius-lg)] bg-primary text-primary-foreground text-base font-bold">
            {logoText[0]}
          </span>
        )}
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-foreground-muted mt-1 leading-relaxed">{subtitle ?? defaultSubtitle}</p>
        </div>
      </div>

      {/* OTP */}
      <OTPInput
        length={length}
        value={code}
        onChange={(v) => { setCode(v); if (error) setError(""); }}
        onComplete={handleVerify}
        errorText={error}
        size="md"
        type="numeric"
        className="items-center w-full"
        cellClassName="flex-1 max-w-[52px]"
      />

      {/* Doğrula butonu */}
      <Button
        type="button"
        className="w-full"
        loading={loading}
        disabled={code.length < length}
        onClick={handleVerify}
      >
        Kodu Doğrula
      </Button>

      {/* Tekrar gönder */}
      <div className="text-center">
        <p className="text-sm text-foreground-muted">
          Kod gelmedi mi?{" "}
          {cooldown > 0 ? (
            <span className="text-foreground-subtle">{cooldown}s sonra tekrar gönder</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-primary font-medium hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Gönderiliyor…" : "Tekrar gönder"}
            </button>
          )}
        </p>
      </div>

      {/* Geri dön */}
      {(onBack || backHref) && (
        <a
          href={onBack ? undefined : backHref}
          onClick={onBack ? (e) => { e.preventDefault(); onBack(); } : undefined}
          className="inline-flex items-center justify-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon />
          Geri dön
        </a>
      )}
    </div>
  );
}
