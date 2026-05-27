import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/skeleton";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function SkeletonShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Skeleton</h1>
        <p className="text-foreground-muted">
          default · text · heading · circle · rounded · SkeletonText · SkeletonCard
        </p>
      </div>

      <Section title="Temel Şekiller">
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
      </Section>

      <Section title="SkeletonText">
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
      </Section>

      <Section title="SkeletonCard">
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
      </Section>

      <Section title="Liste Skeleton">
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
      </Section>

      <Section title="Tablo Skeleton">
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-background-muted border-b border-border">
            {["Ad", "E-posta", "Rol", "Durum"].map((h) => (
              <Skeleton key={h} variant="text" width="70%" className="h-3.5" />
            ))}
          </div>
          {/* Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3.5 border-b border-border last:border-b-0">
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="rounded" width={60} height={22} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
