"use client";

import { useState } from "react";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Modal } from "@/components/ui/modal";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/magnetic-button";

/* ─── Audit table ────────────────────────────────────────────── */

const AUDIT = [
  { component: "Modal",           checks: ["role=dialog + aria-modal", "aria-labelledby / describedby", "Focus trap", "Escape key", "Focus return ✓ yeni"], status: "pass" },
  { component: "Drawer",          checks: ["role=dialog + aria-modal", "aria-labelledby / describedby ✓ yeni", "Focus trap", "Escape key", "Focus return ✓ yeni"], status: "pass" },
  { component: "Toast",           checks: ["role=status + aria-live=polite", "role=region + aria-label ✓ yeni", "Dismiss button aria-label"], status: "pass" },
  { component: "Alert",           checks: ["role=alert", "aria-live=assertive (implicit)"], status: "pass" },
  { component: "Input",           checks: ["label + htmlFor", "useId unique ID", "aria-describedby ✓ yeni", "aria-invalid ✓ yeni", "required aria-hidden *"], status: "pass" },
  { component: "AnimatedCounter", checks: ["aria-live=polite", "aria-label", "prefers-reduced-motion"], status: "pass" },
  { component: "Reveal",          checks: ["prefers-reduced-motion", "IntersectionObserver devre dışı"], status: "pass" },
  { component: "Marquee",         checks: ["prefers-reduced-motion", "aria-hidden klonu"], status: "pass" },
  { component: "MagneticButton",  checks: ["prefers-reduced-motion transform fix ✓ yeni", "disabled state"], status: "pass" },
  { component: "Global CSS",      checks: ["@media prefers-reduced-motion tüm animasyonlar ✓ yeni"], status: "pass" },
] as const;

/* ─── Page ───────────────────────────────────────────────────── */

export default function AccessibilityShowcase() {
  const [modalOpen,  setModalOpen]  = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Erişilebilirlik & Kalite</h1>
        <p className="text-sm text-foreground-muted">
          WCAG 2.1 AA · Focus yönetimi · aria-live bölgeleri · prefers-reduced-motion · klavye navigasyonu
        </p>
      </div>

      {/* Audit table */}
      <ShowcaseSection
        title="A11Y Audit Tablosu"
        description="Kütüphanedeki tüm kritik bileşenlerin erişilebilirlik kontrolü."
      >
        <div className="rounded-[var(--radius-lg)] border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background-muted border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Bileşen</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Kontroller</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground-muted w-20">Durum</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT.map((row, i) => (
                <tr key={row.component} className={i % 2 === 1 ? "bg-background-subtle" : ""}>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap align-top">
                    {row.component}
                  </td>
                  <td className="px-4 py-3">
                    <ul className="space-y-0.5">
                      {row.checks.map((c) => (
                        <li key={c} className={`text-xs ${c.includes("✓") ? "text-success font-medium" : "text-foreground-muted"}`}>
                          {c.includes("✓") ? "✓ " : "• "}{c.replace(" ✓ yeni", "").replace(" ✓", "")}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-center align-top">
                    <Badge variant="success" size="sm">Geçti</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      {/* Focus return — Modal */}
      <ShowcaseSection
        title="Focus Return — Modal & Drawer"
        description="Modal/Drawer kapandığında focus trigger butona döner. Tab ile navigasyon yapın, ardından modal'ı açıp kapatın."
        code={`// Modal açılırken trigger'ı sakla, kapanırken geri ver
const prevFocusRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  if (open) {
    prevFocusRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
  } else {
    prevFocusRef.current?.focus();
    prevFocusRef.current = null;
  }
}, [open]);`}
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Modal Aç
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-background-muted border border-border text-foreground hover:bg-background-subtle transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Drawer Aç
          </button>
          <p className="text-xs text-foreground-muted self-center">
            Kapatıldığında focus bu butonlara döner.
          </p>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Focus Yönetimi Testi"
          description="Bu modal kapandığında focus 'Modal Aç' butonuna dönecek."
          footer={
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
            >
              Kapat (focus döner)
            </button>
          }
        >
          <p className="text-sm text-foreground-muted py-2">
            Tab ile bu modal içinde gezinin. Escape veya Kapat butonuna basın — focus otomatik olarak trigger butona döner.
          </p>
        </Modal>

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Drawer Focus Testi"
          description="Kapatıldığında focus Drawer Aç butonuna döner."
        >
          <p className="text-sm text-foreground-muted py-2">
            Tab ile gezinin, Escape ile kapatın.
          </p>
        </Drawer>
      </ShowcaseSection>

      {/* aria-describedby — Input */}
      <ShowcaseSection
        title="aria-describedby — Input"
        description="Hata/başarı/yardım metni input'a aria-describedby ile bağlanır. Screen reader hata mesajını okur."
        code={`// feedbackId otomatik üretilir, input'a bağlanır
<input
  id={id}
  aria-describedby={feedbackText ? feedbackId : undefined}
  aria-invalid={resolvedState === "error" ? true : undefined}
/>
<p id={feedbackId}>{feedbackText}</p>`}
      >
        <div className="space-y-4 max-w-sm">
          <Input
            label="E-posta"
            placeholder="ornek@mail.com"
            errorText="Geçerli bir e-posta adresi girin."
            state="error"
          />
          <Input
            label="Kullanıcı adı"
            placeholder="kullanici_adi"
            successText="Bu kullanıcı adı kullanılabilir."
            state="success"
          />
          <Input
            label="Şifre"
            type="password"
            placeholder="En az 8 karakter"
            helperText="Büyük harf, rakam ve özel karakter içermeli."
          />
        </div>
      </ShowcaseSection>

      {/* aria-live — Toast */}
      <ShowcaseSection
        title="aria-live — Toast"
        description="Toast container'ı role=region + aria-live=polite ile işaretlendi. Screen reader'lar bildirimleri otomatik okur."
        code={`<div
  role="region"
  aria-label="Bildirimler"
  aria-live="polite"
  aria-atomic="false"
>
  {toasts.map(...)}
</div>

// Her toast ayrıca role="status" aria-live="polite" taşır`}
      >
        <div className="flex flex-wrap gap-2">
          {(["default","success","error","warning","info"] as const).map((v) => (
            <button
              key={v}
              onClick={() => toast({
                variant: v,
                title: `${v.charAt(0).toUpperCase() + v.slice(1)} bildirimi`,
                description: "Screen reader bu metni okur.",
              })}
              className="px-3 py-1.5 text-xs font-medium rounded-[var(--radius-md)] bg-background-muted border border-border text-foreground hover:bg-background-subtle transition-colors capitalize"
            >
              {v}
            </button>
          ))}
        </div>
      </ShowcaseSection>

      {/* prefers-reduced-motion */}
      <ShowcaseSection
        title="prefers-reduced-motion"
        description="globals.css'e @media (prefers-reduced-motion: reduce) guard eklendi. JS bileşenler (MagneticButton, AnimatedCounter, Reveal, Marquee) kendi kontrollerini de yapar."
        code={`/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

// MagneticButton — reduced state
style={{
  transform: reduced ? undefined : \`translate(\${x}px, \${y}px)\`,
  transition: reduced ? undefined : "...",
}}`}
      >
        <div className="p-4 rounded-[var(--radius-lg)] bg-background-muted border border-border text-sm text-foreground-muted space-y-2">
          <p>İşletim sisteminizde <strong className="text-foreground">Hareketi Azalt</strong> ayarını açın:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>macOS: Sistem Tercihleri → Erişilebilirlik → Görüntü → Hareketi Azalt</li>
            <li>Windows: Ayarlar → Erişilebilirlik → Görsel Efektler → Animasyonları Kapat</li>
          </ul>
          <p className="text-xs">Aktif olduğunda tüm CSS geçişleri ve animasyonlar anında durur. MagneticButton manyetik hareketi devre dışı bırakır.</p>
          <div className="pt-1">
            <MagneticButton
              className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-primary text-primary-foreground"
            >
              Magnetic Button (reduced motion farkeder)
            </MagneticButton>
          </div>
        </div>
      </ShowcaseSection>

      {/* Keyboard nav */}
      <ShowcaseSection
        title="Klavye Navigasyonu"
        description="Kütüphanedeki tüm interaktif elementler klavye ile erişilebilir."
      >
        <div className="rounded-[var(--radius-lg)] border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background-muted border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Bileşen</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground-muted">Kısayollar</th>
              </tr>
            </thead>
            <tbody>
              {[
                { c: "Modal / Drawer",    k: "Escape → kapat · Tab → focus trap · Shift+Tab → ters sıra" },
                { c: "Select / Combobox", k: "↑↓ → seçenek · Enter → seç · Escape → kapat" },
                { c: "Accordion",         k: "Enter/Space → aç/kapat · Tab → sonraki" },
                { c: "Tabs",              k: "←→ → tab geçiş · Home/End → ilk/son" },
                { c: "Checkbox / Radio",  k: "Space → işaretle · Tab → odaklan" },
                { c: "Command Palette",   k: "⌘K / Ctrl+K → aç · ↑↓ → gezin · Enter → seç · Escape → kapat" },
                { c: "Date Picker",       k: "←→↑↓ → takvim · Enter → seç · Escape → kapat" },
                { c: "Slider",            k: "←→ → azalt/artır · Home/End → min/max" },
              ].map((row, i) => (
                <tr key={row.c} className={i % 2 === 1 ? "bg-background-subtle" : ""}>
                  <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{row.c}</td>
                  <td className="px-4 py-2.5 text-xs text-foreground-muted font-mono">{row.k}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}
