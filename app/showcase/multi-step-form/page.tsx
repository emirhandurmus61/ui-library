"use client";

import { useState } from "react";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Input } from "@/components/ui/input";

/* ─── Step content components ────────────────────────────────── */

function PersonalInfoStep({
  name,
  email,
  onNameChange,
  onEmailChange,
}: {
  name: string;
  email: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Input
        label="Ad Soyad"
        placeholder="Emirhan Durmuş"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Input
        label="E-posta"
        type="email"
        placeholder="emirhan@example.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
    </div>
  );
}

function AccountInfoStep({
  password,
  confirm,
  onPasswordChange,
  onConfirmChange,
}: {
  password: string;
  confirm: string;
  onPasswordChange: (v: string) => void;
  onConfirmChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Input
        label="Şifre"
        type="text"
        placeholder="En az 8 karakter"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <Input
        label="Şifre Tekrar"
        type="text"
        placeholder="Şifreyi tekrar girin"
        value={confirm}
        onChange={(e) => onConfirmChange(e.target.value)}
      />
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
      <div className="size-14 rounded-full bg-success-subtle text-success flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-7"
          aria-hidden="true"
        >
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground">Kayıt Tamamlandı!</h3>
      <p className="text-sm text-foreground-muted max-w-xs">
        Hesabınız başarıyla oluşturuldu. E-posta adresinize bir doğrulama bağlantısı gönderdik.
      </p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function MultiStepFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const steps = [
    {
      title: "Kişisel Bilgiler",
      description: "Adınızı ve e-posta adresinizi girin",
      content: (
        <PersonalInfoStep
          name={name}
          email={email}
          onNameChange={setName}
          onEmailChange={setEmail}
        />
      ),
      validate: () => {
        if (!name.trim()) return "Ad soyad boş bırakılamaz.";
        if (!email.trim()) return "E-posta boş bırakılamaz.";
        return null;
      },
    },
    {
      title: "Hesap Bilgileri",
      description: "Hesabınız için bir şifre belirleyin",
      content: (
        <AccountInfoStep
          password={password}
          confirm={confirm}
          onPasswordChange={setPassword}
          onConfirmChange={setConfirm}
        />
      ),
      validate: () => {
        if (!password.trim()) return "Şifre boş bırakılamaz.";
        if (!confirm.trim()) return "Şifre tekrarı boş bırakılamaz.";
        if (password !== confirm) return "Şifreler eşleşmiyor.";
        return null;
      },
    },
    {
      title: "Tamamlandı",
      description: "Kayıt işleminiz başarıyla tamamlandı",
      content: <SuccessStep />,
    },
  ];

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Multi-step Form</h1>
        <p className="text-sm text-foreground-muted">
          Adım adım form akışı. Adım göstergesi · validasyon · geçiş animasyonu
        </p>
      </div>

      <ShowcaseSection
        title="3 Adımlı Kayıt Formu"
        description="Kişisel bilgiler → Hesap bilgileri → Tamamlandı"
      >
        <div className="max-w-md mx-auto">
          <MultiStepForm
            steps={steps}
            showStepIndicator
            onComplete={() => {
              // Reset form after completion demo
              setTimeout(() => {
                setName("");
                setEmail("");
                setPassword("");
                setConfirm("");
              }, 1500);
            }}
          />
        </div>
      </ShowcaseSection>
    </div>
  );
}
