import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/skeleton";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/skeleton";`;

export default function SkeletonShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Skeleton</h1>
        <p className="text-sm text-foreground-muted">
          default · text · heading · circle · rounded · SkeletonText · SkeletonCard
        </p>
      </div>

      <ShowcaseSection
        title="Temel Şekiller"
        description="default, circle, rounded, text ve heading variant'ları."
        importLine={IMPORT}
        code={`<Skeleton width={120} height={40} />
<Skeleton variant="circle"  width={40}  height={40} />
<Skeleton variant="rounded" width={80}  height={32} />
<Skeleton variant="text"    width={160} />
<Skeleton variant="heading" width={200} />`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-2">
            <p className="text-xs text-foreground-subtle">default</p>
            <Skeleton width={120} height={40} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-foreground-subtle">circle</p>
            <Skeleton variant="circle" width={40} height={40} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-foreground-subtle">rounded</p>
            <Skeleton variant="rounded" width={80} height={32} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-foreground-subtle">text</p>
            <Skeleton variant="text" width={160} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-foreground-subtle">heading</p>
            <Skeleton variant="heading" width={200} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="SkeletonText"
        description="Çok satırlı metin placeholder'ı; lines ve lastLineWidth ile özelleştirilir."
        importLine={IMPORT}
        code={`<SkeletonText />
<SkeletonText lines={5} lastLineWidth="40%" />`}
      >
        <div className="max-w-sm space-y-6">
          <div>
            <p className="text-xs text-foreground-subtle mb-3">3 satır (varsayılan)</p>
            <SkeletonText />
          </div>
          <div>
            <p className="text-xs text-foreground-subtle mb-3">5 satır, son satır %40</p>
            <SkeletonText lines={5} lastLineWidth="40%" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="SkeletonCard"
        description="Avatar ve metin satırlarından oluşan kart iskelet bileşeni."
        importLine={IMPORT}
        code={`<SkeletonCard />
<SkeletonCard showAvatar={false} lines={4} />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-foreground-subtle mb-3">Avatar ile (varsayılan)</p>
            <SkeletonCard />
          </div>
          <div>
            <p className="text-xs text-foreground-subtle mb-3">Avatar olmadan</p>
            <SkeletonCard showAvatar={false} lines={4} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Liste Skeleton"
        description="Avatar + metin + badge kombinasyonuyla liste yükleme durumu."
        importLine={IMPORT}
        code={`<div className="flex items-center gap-3">
  <Skeleton variant="circle" width={36} height={36} className="shrink-0" />
  <div className="flex-1 space-y-1.5">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="30%" className="h-3" />
  </div>
  <Skeleton variant="rounded" width={56} height={22} />
</div>`}
      >
        <div className="space-y-3 border border-border rounded-[var(--radius-xl)] p-4 bg-surface">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circle" width={36} height={36} className="shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton variant="text" width={`${60 + (i * 7) % 30}%`} />
                <Skeleton variant="text" width={`${30 + (i * 5) % 20}%`} className="h-3" />
              </div>
              <Skeleton variant="rounded" width={56} height={22} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tablo Skeleton"
        description="Tablo başlık ve satır yerlerini dolduran yükleme iskelet yapısı."
        importLine={IMPORT}
        code={`<div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
  {/* Header */}
  <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-background-muted border-b border-border">
    <Skeleton variant="text" width="70%" className="h-3.5" />
    {/* ... */}
  </div>
  {/* Rows */}
  <div className="grid grid-cols-4 gap-4 px-4 py-3.5">
    <Skeleton variant="text" width="80%" />
    {/* ... */}
  </div>
</div>`}
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-background-muted border-b border-border">
            {["Ad", "E-posta", "Rol", "Durum"].map((h) => (
              <Skeleton key={h} variant="text" width="70%" className="h-3.5" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3.5 border-b border-border last:border-b-0">
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="rounded" width={60} height={22} />
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
