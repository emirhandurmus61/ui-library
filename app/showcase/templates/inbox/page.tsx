"use client";
import { InboxTemplate } from "@/components/ui/templates/inbox";

export default function InboxTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Inbox Şablonu</h1>
        <p className="text-sm text-foreground-muted">3 sütunlu mesajlaşma arayüzü — konuşma listesi, mesaj balonları ve kişi detay paneli.</p>
      </div>
      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden">
        <InboxTemplate />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { InboxTemplate } from "@/components/ui/templates/inbox";
export default function Page() { return <InboxTemplate />; }`}
        </pre>
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bileşenler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Kolon 1: Konuşma listesi — Avatar, isim, önizleme, zaman, okunmamış badge</li>
          <li>Kolon 2: Mesaj balonları — gelen (sol/muted), giden (sağ/primary), fake input</li>
          <li>Kolon 3: Kişi detayı — Avatar, ortak projeler, paylaşılan dosyalar (xl+)</li>
          <li>useState ile seçili konuşma yönetimi</li>
        </ul>
      </section>
    </div>
  );
}
