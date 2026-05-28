"use client";

import { BackToTop } from "@/components/ui/back-to-top";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function BackToTopPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Back to Top</h1>
        <p className="text-sm text-foreground-muted">
          Scroll sonrası yukarı çıkma butonu. Eşik değerine göre görünür/gizlenir.
        </p>
      </div>

      <ShowcaseSection
        title="Açıklama"
        description="Bu bileşen fixed konumlandırma kullanır ve pencere kaydırıldığında görünür hale gelir."
      >
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-5 space-y-3 text-sm text-foreground-muted">
          <p>
            <span className="font-semibold text-foreground">BackToTop</span> bileşeni,
            kullanıcı sayfayı belirli bir mesafe (varsayılan: 300px) kaydırdığında
            sağ alt köşede beliren bir butondur.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><span className="font-mono text-xs text-foreground">threshold</span> — Butonun belireceği scroll mesafesi (px). Varsayılan: 300</li>
            <li><span className="font-mono text-xs text-foreground">smooth</span> — Yumuşak kaydırma. Varsayılan: true</li>
            <li><span className="font-mono text-xs text-foreground">className</span> — Ek stil sınıfları</li>
          </ul>
          <p className="text-xs text-foreground-subtle">
            Bu sayfa yeterince uzunsa, aşağı kaydırınca sağ altta butonu görebilirsiniz.
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Kaydırılabilir Alan Demo"
        description="Aşağıdaki alanda kaydırın — threshold=100px'e ulaşınca buton belirir"
      >
        <div className="relative h-64 overflow-y-auto rounded-[var(--radius-md)] border border-border bg-background-subtle p-4">
          {/* Scroll content */}
          <div className="space-y-4 pb-4">
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i} className="text-sm text-foreground-muted">
                Satır {i + 1} — Aşağı kaydırmaya devam edin, butonun belirdiğini göreceksiniz.
              </p>
            ))}
          </div>

          {/* ScrollToTop note: BackToTop listens to window scroll, not div scroll.
              For the demo we show a static visual of the button. */}
          <div
            className="sticky bottom-2 right-2 ml-auto w-fit"
            aria-label="Önizleme: Back to Top butonu"
          >
            <div className="size-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center opacity-80">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <polyline points="18,15 12,9 6,15" />
              </svg>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Statik Önizleme"
        description="Butonun görsel tasarımı"
      >
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="size-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary-hover transition-colors cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <polyline points="18,15 12,9 6,15" />
              </svg>
            </div>
            <span className="text-xs text-foreground-muted">Varsayılan</span>
          </div>

          <div className="text-sm text-foreground-muted">
            <p className="font-mono text-xs bg-background-muted rounded px-3 py-2 text-foreground">
              {`<BackToTop threshold={300} smooth />`}
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Actual component mounted — visible when page is scrolled */}
      <BackToTop threshold={300} />
    </div>
  );
}
