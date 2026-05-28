"use client";

import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  );
}

export default function CardShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Card</h1>
        <p className="text-foreground-muted text-sm">
          5 variant · 4 padding · 6 stylePreset · CardHeader · CardFooter
        </p>
      </div>

      {/* ── Variantlar ─────────────────────────────────────────── */}
      <Section title="Variantlar">
        <Card variant="basic">
          <p className="text-sm font-semibold text-foreground mb-1">Basic</p>
          <p className="text-sm text-foreground-muted">Standart border, arka plan yok.</p>
        </Card>
        <Card variant="bordered">
          <p className="text-sm font-semibold text-foreground mb-1">Bordered</p>
          <p className="text-sm text-foreground-muted">Kalın border ile güçlü çerçeve.</p>
        </Card>
        <Card variant="elevated">
          <p className="text-sm font-semibold text-foreground mb-1">Elevated</p>
          <p className="text-sm text-foreground-muted">Gölge ile yükseltilmiş görünüm.</p>
        </Card>
        <Card variant="interactive">
          <p className="text-sm font-semibold text-foreground mb-1">Interactive</p>
          <p className="text-sm text-foreground-muted">Hover'da hafifçe yükselir.</p>
        </Card>
        <Card variant="ghost">
          <p className="text-sm font-semibold text-foreground mb-1">Ghost</p>
          <p className="text-sm text-foreground-muted">Subtle arka plan, border yok.</p>
        </Card>
      </Section>

      {/* ── Stil Presetleri ────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
          Stil Presetleri
        </h2>
        <p className="text-sm text-foreground-muted mb-6 -mt-2">
          <code className="text-xs bg-background-muted px-1.5 py-0.5 rounded font-mono">stylePreset</code> prop'u
          ile variant üstüne farklı estetik katmanlar uygulanır.
        </p>

        <div className="space-y-8">

          {/* brutal */}
          <ShowcaseSection
            title="brutal"
            description="Kalın siyah border + sağ-alt offset shadow. Brutalist web estetiği."
            previewClassName="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2"
            code={`<Card stylePreset="brutal">
  <CardHeader title="Brutal Card" description="Hard edges, bold shadow." />
  <p className="text-sm text-foreground-muted">İçerik alanı.</p>
</Card>`}
          >
            <Card stylePreset="brutal">
              <CardHeader title="Brutal Card" description="Hard edges, bold shadow." />
              <p className="text-sm text-foreground-muted">Sert köşeler, güçlü gölge. Hover'da büyük card'larda daha iyi görünür.</p>
            </Card>
            <Card stylePreset="brutal" variant="elevated">
              <CardHeader title="Brutal Elevated" action={<Badge stylePreset="brutal" size="sm">New</Badge>} />
              <p className="text-sm text-foreground-muted">Elevated variant ile birlikte kullanım.</p>
              <CardFooter>
                <Button stylePreset="brutal" size="sm">Action</Button>
              </CardFooter>
            </Card>
          </ShowcaseSection>

          {/* glass */}
          <ShowcaseSection
            title="glass"
            description="Backdrop blur + yarı-saydam cam efekti. Gradient arka planlar üstünde kullanın."
            previewClassName="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 px-6 rounded-[var(--radius-xl)] bg-gradient-to-br from-violet-500 via-primary to-blue-600"
            code={`<Card stylePreset="glass">
  <CardHeader title="Glass Card" description="Backdrop blur effect." />
  <p className="text-sm text-white/70">Cam efektli kart.</p>
</Card>`}
          >
            <Card stylePreset="glass">
              <CardHeader
                title={<span className="text-white">Glass Card</span>}
                description={<span className="text-white/70">Backdrop blur + yarı saydamlık</span>}
              />
              <p className="text-sm text-white/60">Gradient arka plan üstünde mükemmel görünür.</p>
            </Card>
            <Card stylePreset="glass">
              <CardHeader
                title={<span className="text-white">Stat Card</span>}
                action={<Badge variant="success">+12%</Badge>}
              />
              <p className="text-3xl font-bold text-white">₺48.295</p>
              <p className="text-sm text-white/60 mt-1">Bu ay toplam gelir</p>
            </Card>
          </ShowcaseSection>

          {/* gradient-border */}
          <ShowcaseSection
            title="gradient-border"
            description="Primary→violet→pink gradient çerçeve. pseudo-element tekniği ile border yok ama gradient var."
            previewClassName="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2"
            code={`<Card stylePreset="gradient-border">
  <CardHeader title="Gradient Border" description="Renkli çerçeve." />
  <p className="text-sm text-foreground-muted">İçerik alanı.</p>
</Card>`}
          >
            <Card stylePreset="gradient-border">
              <CardHeader title="Gradient Border" description="Çok renkli çerçeve efekti." />
              <p className="text-sm text-foreground-muted">İçerik arka planı temiz kalır, yalnızca border renklidir.</p>
            </Card>
            <Card stylePreset="gradient-border">
              <CardHeader
                title="Pro Plan"
                action={<Badge variant="primary">Popüler</Badge>}
                description="En çok tercih edilen"
              />
              <p className="text-2xl font-bold text-foreground mt-2">₺299<span className="text-sm font-normal text-foreground-muted">/ay</span></p>
              <CardFooter>
                <Button stylePreset="gradient" className="w-full">Başla</Button>
              </CardFooter>
            </Card>
          </ShowcaseSection>

          {/* flat */}
          <ShowcaseSection
            title="flat"
            description="Border yok, shadow yok. Arka plan renk farkıyla ayrışır. Notion / Linear tarzı."
            previewClassName="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2"
            code={`<Card stylePreset="flat">
  <p className="text-sm font-medium text-foreground">Flat Card</p>
  <p className="text-sm text-foreground-muted">Minimal görünüm.</p>
</Card>`}
          >
            {["Görev 1", "Görev 2", "Görev 3"].map((t, i) => (
              <Card key={t} stylePreset="flat" padding="sm">
                <p className="text-xs text-foreground-subtle font-mono mb-1">#{i + 1}</p>
                <p className="text-sm font-medium text-foreground">{t}</p>
                <p className="text-xs text-foreground-muted mt-0.5">Düz zemin, temiz tasarım.</p>
              </Card>
            ))}
          </ShowcaseSection>

          {/* glow */}
          <ShowcaseSection
            title="glow"
            description="Hover'da primary renkte glow ring belirir + kart hafifçe yükselir."
            previewClassName="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2"
            code={`<Card stylePreset="glow" variant="interactive">
  <CardHeader title="Glow Card" />
</Card>`}
          >
            {["Analitik", "Kullanıcılar", "Gelir"].map((t) => (
              <Card key={t} stylePreset="glow" variant="basic" className="cursor-pointer">
                <p className="text-sm font-semibold text-foreground mb-1">{t}</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {t === "Analitik" ? "1.284" : t === "Kullanıcılar" ? "847" : "₺12.4K"}
                </p>
                <p className="text-xs text-foreground-muted mt-1">Üzerine gelin →</p>
              </Card>
            ))}
          </ShowcaseSection>

        </div>
      </div>

      {/* ── CardHeader & CardFooter ────────────────────────────── */}
      <Section title="CardHeader & CardFooter">
        <Card variant="elevated" className="col-span-full sm:col-span-2">
          <CardHeader
            title="Proje Başlığı"
            description="Başlık, açıklama ve aksiyon slotu."
            action={<Badge variant="success">Aktif</Badge>}
          />
          <p className="text-sm text-foreground-muted">
            Kart içeriği burada. İstediğiniz her türlü içeriği yerleştirebilirsiniz.
          </p>
          <CardFooter>
            <Button variant="outline" size="sm">İptal</Button>
            <Button size="sm">Kaydet</Button>
          </CardFooter>
        </Card>
        <Card variant="basic">
          <CardHeader title="Basit Kart" description="Başlık ve açıklama." />
          <p className="text-sm text-foreground-muted">Kısa bir içerik metni.</p>
        </Card>
      </Section>

      {/* ── Padding ────────────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
          Padding Varyantları
        </h2>
        <div className="flex flex-wrap gap-4">
          {(["none", "sm", "md", "lg"] as const).map((p) => (
            <Card key={p} variant="bordered" padding={p} className="w-36">
              <p className="text-xs text-foreground-muted font-mono">padding="{p}"</p>
              <div className="mt-2 h-8 rounded bg-background-muted" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
