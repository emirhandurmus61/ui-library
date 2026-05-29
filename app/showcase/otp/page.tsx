"use client";

import { useState } from "react";
import { OTPInput, OTPCard } from "@/components/ui/otp";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { OTPInput, OTPCard } from "@/components/ui/otp";`;

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

      <ShowcaseSection
        title="1. OTP Input — Temel"
        description="Klavye ile ileri/geri geçiş, backspace, paste (Ctrl+V) ve otomatik ilerleme desteklenir."
        importLine={IMPORT}
        code={`<OTPInput
  length={6}
  value={code}
  onChange={setCode}
  onComplete={(v) => verifyCode(v)}
  label="Doğrulama Kodu"
  helperText="E-posta adresinize gönderilen 6 haneli kodu girin."
/>
<OTPInput length={4} value={pin} onChange={setPin} label="PIN Kodu" />
<OTPInput length={6} type="alphanumeric" label="Davet Kodu" />`}
        previewClassName="bg-background-muted rounded-[var(--radius-xl)] border border-border"
      >
        <div className="p-8 flex flex-col gap-8">
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
      </ShowcaseSection>

      <ShowcaseSection
        title="2. Boyutlar"
        description="sm, md (varsayılan) ve lg boyut seçenekleri."
        importLine={IMPORT}
        code={`<OTPInput length={6} size="sm" label="Small" />
<OTPInput length={6} size="md" label="Medium" />
<OTPInput length={6} size="lg" label="Large" />`}
        previewClassName="bg-background-muted rounded-[var(--radius-xl)] border border-border"
      >
        <div className="p-8 flex flex-col gap-8">
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
      </ShowcaseSection>

      <ShowcaseSection
        title="3. Durumlar"
        description="error, success, disabled ve mask (gizleme) durumları."
        importLine={IMPORT}
        code={`<OTPInput length={6} value="12" label="Hata durumu" errorText="Girdiğiniz kod hatalı." />
<OTPInput length={6} value="847291" label="Başarı durumu" successText="Kod doğrulandı!" />
<OTPInput length={6} value="123456" label="Devre dışı" disabled />
<OTPInput length={6} mask label="PIN (gizli)" helperText="Karakterler gizlenir." />`}
        previewClassName="bg-background-muted rounded-[var(--radius-xl)] border border-border"
      >
        <div className="p-8 flex flex-col gap-8">
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
      </ShowcaseSection>

      <ShowcaseSection
        title="4. OTP Card — E-posta doğrulama"
        description="Kodu tamamladığında veya 'Kodu Doğrula' butonuna basıldığında onVerify tetiklenir. 60s tekrar gönder cooldown'u vardır."
        importLine={IMPORT}
        code={`<OTPCard
  logoText="MyApp"
  mode="email"
  destination="e***@gmail.com"
  onVerify={async (code) => {
    await verifyCode(code); // throws on error
  }}
  onResend={async () => { await resendCode(); }}
  backHref="/giris"
/>`}
        previewClassName="bg-background-muted rounded-[var(--radius-xl)] border border-border"
      >
        <div className="flex justify-center py-10">
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
        <p className="text-xs text-foreground-subtle text-center pb-4">
          Test için doğru kod: <span className="font-mono font-semibold text-foreground">123456</span>
        </p>
      </ShowcaseSection>

      <ShowcaseSection
        title="5. OTP Card — SMS doğrulama"
        description='mode="phone" ile telefon doğrulama ikonu ve metni gösterilir.'
        importLine={IMPORT}
        code={`<OTPCard
  logoText="MyApp"
  title="Telefon doğrulama"
  mode="phone"
  destination="+90 5** *** **12"
  length={4}
  onVerify={async (code) => { await verifySMS(code); }}
  onResend={async () => { await resendSMS(); }}
  backHref="/giris"
/>`}
        previewClassName="bg-background-muted rounded-[var(--radius-xl)] border border-border"
      >
        <div className="flex justify-center py-10">
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
        <p className="text-xs text-foreground-subtle text-center pb-4">
          Test için doğru kod: <span className="font-mono font-semibold text-foreground">4242</span>
        </p>
      </ShowcaseSection>
    </div>
  );
}
