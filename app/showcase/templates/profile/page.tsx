"use client";
import { ProfileTemplate } from "@/components/ui/templates/profile";

export default function ProfileTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Profil Şablonu</h1>
        <p className="text-sm text-foreground-muted">Kullanıcı profil sayfası — cover, bio, istatistikler ve gönderiler/projeler/beğeniler tab'ları.</p>
      </div>
      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <ProfileTemplate />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { ProfileTemplate } from "@/components/ui/templates/profile";
export default function Page() { return <ProfileTemplate />; }`}
        </pre>
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bileşenler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Cover image — gradient renk blok, ring ile büyük Avatar</li>
          <li>Bio section — isim, unvan, yer, follower/following/post sayıları</li>
          <li>Takip Et / Mesaj butonları (toggle state)</li>
          <li>Tab navigasyon — Gönderiler / Projeler / Beğeniler (useState)</li>
          <li>İçerik grid — Badge, Avatar ile zengin kartlar</li>
        </ul>
      </section>
    </div>
  );
}
