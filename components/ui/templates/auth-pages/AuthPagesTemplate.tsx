"use client";

import { useState } from "react";
import { LoginCard, LoginSplit } from "@/components/ui/auth";
import { RegisterCard } from "@/components/ui/auth";
import { ForgotPasswordCard } from "@/components/ui/auth";
import { OTPInput } from "@/components/ui/otp";

/* ─── Tabs ───────────────────────────────────────────────────── */

type Tab = "login" | "register" | "forgot" | "otp";

const TABS: { id: Tab; label: string }[] = [
  { id: "login",    label: "Login" },
  { id: "register", label: "Register" },
  { id: "forgot",   label: "Forgot Password" },
  { id: "otp",      label: "OTP Verify" },
];

/* ─── OTP page ───────────────────────────────────────────────── */

function OTPPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleVerify() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setVerified(true);
  }

  return (
    <div className="flex items-center justify-center min-h-[420px] p-8 bg-background-muted rounded-[var(--radius-xl)] border border-border">
      <div className="w-full max-w-sm text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-primary-subtle flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7 text-primary" aria-hidden="true">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">E-postanızı doğrulayın</h2>
          <p className="text-sm text-foreground-muted mt-1">
            <span className="font-medium text-foreground">e***@mail.com</span> adresine 6 haneli kod gönderdik.
          </p>
        </div>
        {verified ? (
          <div className="rounded-[var(--radius-lg)] bg-success-subtle border border-success/20 p-4">
            <p className="text-sm font-semibold text-success">✓ Hesabınız doğrulandı!</p>
          </div>
        ) : (
          <>
            <OTPInput length={6} value={code} onChange={setCode} />
            <button
              onClick={handleVerify}
              disabled={code.length < 6 || loading}
              className="w-full h-10 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 hover:bg-primary-hover transition-colors"
            >
              {loading ? "Doğrulanıyor…" : "Doğrula"}
            </button>
            <p className="text-xs text-foreground-subtle">
              Kod gelmedi mi?{" "}
              <button className="text-primary hover:underline font-medium">Tekrar Gönder</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function AuthPagesTemplate() {
  const [activeTab, setActiveTab] = useState<Tab>("login");

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-background-muted rounded-[var(--radius-lg)] w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={[
              "px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-150",
              activeTab === t.id
                ? "bg-surface shadow-sm text-foreground"
                : "text-foreground-muted hover:text-foreground",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      {activeTab === "login" && (
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <LoginCard
            logoText="MyApp"
            title="Tekrar hoş geldiniz"
            subtitle="Hesabınıza giriş yapın"
            onSubmit={async (d) => {
              await new Promise((r) => setTimeout(r, 1200));
              alert(`Giriş: ${d.email}`);
            }}
            onGoogleLogin={() => alert("Google")}
            onGithubLogin={() => alert("GitHub")}
            forgotPasswordHref="#"
            registerHref="#"
          />
        </div>
      )}

      {activeTab === "register" && (
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <RegisterCard
            logoText="MyApp"
            onSubmit={async (d) => {
              await new Promise((r) => setTimeout(r, 1200));
              alert(`Kayıt: ${d.email}`);
            }}
            loginHref="#"
          />
        </div>
      )}

      {activeTab === "forgot" && (
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <ForgotPasswordCard
            onSubmit={async (d) => {
              await new Promise((r) => setTimeout(r, 1200));
              alert(`Link: ${d.email}`);
            }}
            loginHref="#"
          />
        </div>
      )}

      {activeTab === "otp" && <OTPPage />}

      {/* Split variant preview */}
      {activeTab === "login" && (
        <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden h-[560px]">
          <LoginSplit
            logoText="MyApp"
            panelTitle="Projelerinizi güçlendirin"
            panelSubtitle="Binlerce ekip bu araçla daha hızlı ürün çıkarıyor."
            panelTestimonial={{ text: "Geliştirme süremizi %40 azalttık.", author: "Emirhan D.", role: "Kurucu" }}
            onSubmit={async (d) => {
              await new Promise((r) => setTimeout(r, 1200));
              alert(`Giriş: ${d.email}`);
            }}
            onGoogleLogin={() => alert("Google")}
            onGithubLogin={() => alert("GitHub")}
          />
        </div>
      )}
    </div>
  );
}
