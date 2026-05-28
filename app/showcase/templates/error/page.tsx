"use client";

import { ErrorPageTemplate } from "@/components/ui/templates/error-page";

export default function ErrorTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">404 / Error Sayfası Şablonu</h1>
        <p className="text-sm text-foreground-muted">
          404 Not Found · 500 Server Error · 403 Forbidden — 3 farklı hata durumu.
        </p>
      </div>

      <ErrorPageTemplate />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`// app/not-found.tsx  (404)
export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center px-6">
        <span className="text-[120px] font-black text-foreground/5">404</span>
        {/* ... */}
      </div>
    </div>
  );
}

// app/error.tsx  (500)
"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen grid place-items-center">
      <Button onClick={reset}>Tekrar Dene</Button>
    </div>
  );
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Özellikler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Büyük sayı arka plan dekorasyonu üstüne emoji overlay</li>
          <li>Her hata türü için renk kodlu Badge</li>
          <li>Durum odaklı CTA butonları (Geri Dön, Tekrar Dene, Giriş Yap…)</li>
          <li>Destek bağlantısı + hata ID (500 için)</li>
          <li>Responsive layout, mobilde tek sütun</li>
        </ul>
      </section>
    </div>
  );
}
