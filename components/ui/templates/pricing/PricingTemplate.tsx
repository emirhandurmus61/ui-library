"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────── */

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Bireysel kullanım ve küçük projeler için mükemmel",
    badge: null,
    buttonLabel: "Başla",
    buttonVariant: "outline" as const,
    features: [
      "5 proje",
      "1 GB depolama",
      "Temel analitik",
      "E-posta desteği",
      "API erişimi",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Büyüyen ekipler ve profesyoneller için ideal",
    badge: "Popüler",
    buttonLabel: "Pro'ya Geç",
    buttonVariant: "primary" as const,
    features: [
      "Sınırsız proje",
      "50 GB depolama",
      "Gelişmiş analitik",
      "Öncelikli destek",
      "API erişimi",
      "Özel domain",
      "Takım üyeleri (10)",
      "Sürüm geçmişi",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Büyük organizasyonlar için özelleştirilebilir çözümler",
    badge: null,
    buttonLabel: "İletişime Geç",
    buttonVariant: "outline" as const,
    features: [
      "Sınırsız proje",
      "Sınırsız depolama",
      "Özel analitik",
      "7/24 destek",
      "Gelişmiş API",
      "Özel domain",
      "Sınırsız takım üyesi",
      "SSO entegrasyonu",
      "SLA garantisi",
      "Özel entegrasyonlar",
      "Denetim günlükleri",
      "Fatura özelleştirme",
    ],
  },
];

const FAQS = [
  {
    q: "Ücretsiz plan kredi kartı gerektiriyor mu?",
    a: "Hayır, Starter planı tamamen ücretsizdir ve kredi kartı bilgisi gerektirmez. Hemen başlayabilirsiniz.",
  },
  {
    q: "Yıllık plana geçişte ne kazanırım?",
    a: "Yıllık planla %20 tasarruf edersiniz. Ayrıca yıllık abonelere öncelikli destek ve özel özellikler sunulmaktadır.",
  },
  {
    q: "Planımı istediğim zaman değiştirebilir miyim?",
    a: "Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklikler anında geçerli olur.",
  },
  {
    q: "Veri güvenliği nasıl sağlanıyor?",
    a: "Tüm veriler AES-256 şifreleme ile korunmaktadır. ISO 27001 sertifikalı altyapı kullanıyoruz.",
  },
  {
    q: "Enterprise plan için özel fiyatlandırma alabilir miyim?",
    a: "Evet, ekip büyüklüğünüze ve ihtiyaçlarınıza göre özel fiyatlandırma sunabiliyoruz. Satış ekibimizle iletişime geçin.",
  },
];

/* ─── CheckIcon ──────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-success" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ─── PricingTemplate ────────────────────────────────────────── */
export function PricingTemplate() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-background min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-base font-bold text-foreground">Nexus</span>
            <div className="hidden md:flex items-center gap-6 text-sm text-foreground-muted">
              <a href="#" className="hover:text-foreground transition-colors">Özellikler</a>
              <a href="#" className="hover:text-foreground transition-colors">Fiyatlandırma</a>
              <a href="#" className="hover:text-foreground transition-colors">Blog</a>
              <a href="#" className="hover:text-foreground transition-colors">Hakkında</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">Giriş Yap</Button>
            <Button variant="primary" size="sm">Ücretsiz Başla</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-10 text-center px-6">
        <Badge variant="primary" size="sm" className="mb-4">Fiyatlandırma</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Ekibiniz için doğru plan
        </h1>
        <p className="text-foreground-muted text-base max-w-md mx-auto mb-8">
          Başlamak için ihtiyacınız olan her şey mevcut. İhtiyaçlarınız büyüdükçe planınızı yükseltin.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-background-muted rounded-[var(--radius-xl)] p-1">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              "px-4 py-1.5 rounded-[var(--radius-lg)] text-sm font-medium transition-all",
              !yearly ? "bg-surface text-foreground shadow-sm" : "text-foreground-muted hover:text-foreground"
            )}
          >
            Aylık
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              "px-4 py-1.5 rounded-[var(--radius-lg)] text-sm font-medium transition-all flex items-center gap-2",
              yearly ? "bg-surface text-foreground shadow-sm" : "text-foreground-muted hover:text-foreground"
            )}
          >
            Yıllık
            <span className="text-xs text-success font-semibold">%20 indirim</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
            const isPro = plan.id === "pro";
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-[var(--radius-xl)] border p-6 flex flex-col",
                  isPro
                    ? "border-primary bg-primary-subtle ring-1 ring-primary/30"
                    : "border-border bg-surface"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" size="sm">{plan.badge}</Badge>
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="text-lg font-bold text-foreground mb-1">{plan.name}</h2>
                  <p className="text-xs text-foreground-muted">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {price === null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">Özel</span>
                    </div>
                  ) : price === 0 ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">Ücretsiz</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">{price}₺</span>
                      <span className="text-sm text-foreground-muted">/ay</span>
                    </div>
                  )}
                  {yearly && price !== null && price > 0 && (
                    <p className="text-xs text-foreground-muted mt-1">yıllık ödeme</p>
                  )}
                </div>

                <Button variant={plan.buttonVariant} size="md" className="w-full mb-6">
                  {plan.buttonLabel}
                </Button>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground-muted">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">Sıkça Sorulan Sorular</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-border rounded-[var(--radius-lg)] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-foreground hover:bg-background-muted transition-colors"
              >
                <span>{faq.q}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn("size-4 shrink-0 transition-transform duration-200", openFaq === i && "rotate-180")}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-foreground-muted border-t border-border pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary-subtle border-t border-border py-14 px-6 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Bugün başlayın</h2>
        <p className="text-foreground-muted text-sm mb-6 max-w-sm mx-auto">
          14 gün ücretsiz deneyin. Kredi kartı gerekmez.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="lg">Ücretsiz Deneyin</Button>
          <Button variant="outline" size="lg">Demo İsteyin</Button>
        </div>
      </section>
    </div>
  );
}
