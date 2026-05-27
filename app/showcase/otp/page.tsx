"use client";

import { useState } from "react";
import { OTPInput, OTPCard } from "@/components/ui/otp";

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description && <p className="text-sm text-foreground-muted mt-0.5">{description}</p>}
    </div>
  );
}

function Demo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-foreground-subtle uppercase tracking-wider">{label}</p>
      <div className="inline-flex">{children}</div>
    </div>
  );
}

export default function OTPShowcase() {
  const [val6, setVal6] = useState("");
  const [val4, setVal4] = useState("");
  const [valAlpha, setValAlpha] = useState("");

  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">OTP / Verification Input</h1>
        <p className="text-sm text-foreground-muted">
          Tek hane inputları · 4/6 hane · numeric / alphanumeric · maskeleme · klavye navigasyonu · paste desteği
        </p>
      </div>

      {/* 1 — OTPInput temel kullanım */}
      <section className="flex flex-col gap-6">
        <SectionHeader
          title="1. OTP Input — Temel"
          description="Klavye ile ileri/geri geçiş, backspace, paste (Ctrl+V) ve otomatik ilerleme desteklenir."
        />
        <div className="p-8 bg-background-muted rounded-[var(--radius-xl)] border border-border flex flex-col gap-8">
          <Demo label="6 hane — numeric (varsayılan)">
            <OTPInput
              length={6}
              value={val6}
              onChange={setVal6}
              onComplete={(v) => alert(`Tamamlandı: ${v}`)}
              label="Doğrulama Kodu"
              helperText="E-posta adresinize gönderilen 6 haneli kodu girin."
            />
          </Demo>

          <Demo label="4 hane — numeric">
            <OTPInput
              length={4}
              value={val4}
              onChange={setVal4}
              onComplete={(v) => alert(`PIN: ${v}`)}
              label="PIN Kodu"
            />
          </Demo>

          <Demo label="6 hane — alphanumeric">
            <OTPInput
              length={6}
              value={valAlpha}
              onChange={setValAlpha}
              type="alphanumeric"
              label="Davet Kodu"
              helperText="Büyük harf ve rakamlardan oluşan 6 haneli davet kodunuzu girin."
            />
          </Demo>
        </div>
      </section>

      {/* 2 — Boyutlar */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="2. Boyutlar" description="sm / md / lg" />
        <div className="p-8 bg-background-muted rounded-[var(--radius-xl)] border border-border flex flex-col gap-8">
          <Demo label="sm">
            <OTPInput length={6} size="sm" label="Small" />
          </Demo>
          <Demo label="md (varsayılan)">
            <OTPInput length={6} size="md" label="Medium" />
          </Demo>
          <Demo label="lg">
            <OTPInput length={6} size="lg" label="Large" />
          </Demo>
        </div>
      </section>

      {/* 3 — Durumlar */}
      <section className="flex flex-col gap-6">
        <SectionHeader title="3. Durumlar" description="error · success · disabled · mask" />
        <div className="p-8 bg-background-muted rounded-[var(--radius-xl)] border border-border flex flex-col gap-8">
          <Demo label="Hata">
            <OTPInput length={6} value="12" label="Hata durumu" errorText="Girdiğiniz kod hatalı. Tekrar deneyin." />
          </Demo>
          <Demo label="Başarı">
            <OTPInput length={6} value="847291" label="Başarı durumu" successText="Kod doğrulandı!" />
          </Demo>
          <Demo label="Disabled">
            <OTPInput length={6} value="123456" label="Devre dışı" disabled />
          </Demo>
          <Demo label="Maskelenmiş (mask)">
            <OTPInput length={6} mask label="PIN (gizli)" helperText="Karakterler gizlenir." />
          </Demo>
        </div>
      </section>

      {/* 4 — OTPCard e-posta */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="4. OTP Card — E-posta doğrulama"
          description="Kodu tamamladığında veya 'Kodu Doğrula' butonuna basıldığında onVerify tetiklenir. 60s tekrar gönder cooldown'u vardır."
        />
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <OTPCard
            logoText="MyApp"
            mode="email"
            destination="e***@gmail.com"
            onVerify={async (code) => {
              await new Promise(r => setTimeout(r, 1200));
              if (code !== "123456") throw new Error("invalid");
              alert(`Doğrulandı: ${code}`);
            }}
            onResend={async () => { await new Promise(r => setTimeout(r, 800)); }}
            backHref="#"
          />
        </div>
        <p className="text-xs text-foreground-subtle text-center">
          Test için doğru kod: <span className="font-mono font-semibold text-foreground">123456</span>
        </p>
      </section>

      {/* 5 — OTPCard telefon */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="5. OTP Card — SMS doğrulama"
          description="mode=&quot;phone&quot; ile telefon doğrulama ikonu ve metni."
        />
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <OTPCard
            logoText="MyApp"
            title="Telefon doğrulama"
            mode="phone"
            destination="+90 5** *** **12"
            length={4}
            onVerify={async (code) => {
              await new Promise(r => setTimeout(r, 1200));
              if (code !== "4242") throw new Error("invalid");
              alert(`Doğrulandı: ${code}`);
            }}
            onResend={async () => { await new Promise(r => setTimeout(r, 800)); }}
            backHref="#"
          />
        </div>
        <p className="text-xs text-foreground-subtle text-center">
          Test için doğru kod: <span className="font-mono font-semibold text-foreground">4242</span>
        </p>
      </section>

      {/* Kullanım */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { OTPInput, OTPCard } from "@/components/ui/otp";

// Temel input
<OTPInput
  length={6}
  value={code}
  onChange={setCode}
  onComplete={(v) => verifyCode(v)}
  label="Doğrulama Kodu"
  helperText="E-posta adresinize gönderildi."
/>

// 4 haneli PIN, maskelenmiş
<OTPInput length={4} mask type="numeric" />

// Alphanumeric davet kodu
<OTPInput length={6} type="alphanumeric" />

// Hazır kart — e-posta doğrulama
<OTPCard
  mode="email"
  destination="e***@gmail.com"
  onVerify={async (code) => { await verifyCode(code); }}
  onResend={async () => { await resendCode(); }}
  backHref="/giris"
/>

// SMS — 4 hane
<OTPCard
  mode="phone"
  length={4}
  destination="+90 5** *** **12"
  onVerify={async (code) => { await verifySMS(code); }}
/>`}
        </pre>
      </section>
    </div>
  );
}
