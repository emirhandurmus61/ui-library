"use client";

import { ShimmerText } from "@/components/ui/shimmer-text";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function ShimmerTextShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Shimmer Text</h1>
        <p className="text-sm text-foreground-muted">
          Gradient sweep animasyonu · renk özelleştirilebilir · speed · shimmerWidth · prefers-reduced-motion
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="Varsayılan preset: foreground rengi üzerinden primary shimmer."
        code={`<ShimmerText className="text-3xl font-bold">
  Merhaba, Dünya!
</ShimmerText>`}
      >
        <ShimmerText className="text-3xl font-bold">
          Merhaba, Dünya!
        </ShimmerText>
      </ShowcaseSection>

      <ShowcaseSection
        title="Başlıklarda Kullanım"
        description="Landing page hero başlıklarında dikkat çekici efekt."
        code={`<h1 className="text-4xl font-bold">
  <ShimmerText speed={3}>Ürününüzü</ShimmerText> Hızlandırın
</h1>`}
      >
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-foreground">
            <ShimmerText speed={3}>Ürününüzü</ShimmerText> Hızlandırın
          </h2>
          <h2 className="text-3xl font-bold text-foreground">
            Ekibinizle{" "}
            <ShimmerText speed={2.5} shimmerWidth={40}>
              Daha İyi
            </ShimmerText>{" "}
            Çalışın
          </h2>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Renkler"
        description="shimmerColor ve baseColor prop'ları ile tamamen özelleştirilebilir."
        code={`<ShimmerText
  baseColor="#f43f5e"
  shimmerColor="rgba(251,207,232,0.9)"
  speed={2}
>
  Özel Renk
</ShimmerText>`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <ShimmerText baseColor="#f43f5e" shimmerColor="rgba(251,207,232,0.9)" speed={2} className="text-2xl font-bold">
            Rose Shimmer
          </ShimmerText>
          <ShimmerText baseColor="#8b5cf6" shimmerColor="rgba(221,214,254,0.9)" speed={1.8} className="text-2xl font-bold">
            Violet Shimmer
          </ShimmerText>
          <ShimmerText baseColor="#0ea5e9" shimmerColor="rgba(186,230,253,0.9)" speed={2.2} className="text-2xl font-bold">
            Sky Shimmer
          </ShimmerText>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Speed & Width"
        code={`<ShimmerText speed={1} shimmerWidth={20}>Hızlı dar</ShimmerText>
<ShimmerText speed={5} shimmerWidth={50}>Yavaş geniş</ShimmerText>`}
      >
        <div className="space-y-3">
          <div>
            <p className="text-xs text-foreground-muted mb-1 font-mono">speed=1, shimmerWidth=15</p>
            <ShimmerText speed={1} shimmerWidth={15} className="text-xl font-semibold">Hızlı ve dar shimmer geçişi</ShimmerText>
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-1 font-mono">speed=5, shimmerWidth=55</p>
            <ShimmerText speed={5} shimmerWidth={55} className="text-xl font-semibold">Yavaş ve geniş shimmer geçişi</ShimmerText>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
