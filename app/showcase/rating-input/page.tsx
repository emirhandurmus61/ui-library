"use client";

import { useState } from "react";
import { RatingInput } from "@/components/ui/rating-input";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function RatingInputPage() {
  const [interactive, setInteractive] = useState(3);
  const [halfValue, setHalfValue] = useState(3.5);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Rating Input</h1>
        <p className="text-sm text-foreground-muted">
          Yıldız derecelendirme. Tam ve yarım yıldız · okunur mod · boyut varyantları
        </p>
      </div>

      <ShowcaseSection title="Boyutlar" description="sm / md / lg — readOnly, rating=4">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground-muted w-8">sm</span>
            <RatingInput value={4} readOnly size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground-muted w-8">md</span>
            <RatingInput value={4} readOnly size="md" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground-muted w-8">lg</span>
            <RatingInput value={4} readOnly size="lg" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Etkileşimli"
        description="Yıldıza tıklayarak değeri değiştirin"
      >
        <div className="space-y-3">
          <RatingInput
            value={interactive}
            onChange={setInteractive}
            size="lg"
            label="Deneyiminizi puanlayın"
            showValue
          />
          <p className="text-sm text-foreground-muted">
            Seçilen değer:{" "}
            <span className="font-semibold text-foreground">{interactive} / 5</span>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Yarım Yıldız"
        description="allowHalf ile 0.5'lik artışlar"
      >
        <div className="space-y-3">
          <RatingInput
            value={halfValue}
            onChange={setHalfValue}
            allowHalf
            size="lg"
            showValue
          />
          <p className="text-sm text-foreground-muted">
            Seçilen değer:{" "}
            <span className="font-semibold text-foreground">{halfValue} / 5</span>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Okunur Mod" description="readOnly — farklı değerler">
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <div key={rating} className="flex items-center gap-4">
              <RatingInput value={rating} readOnly size="md" />
              <span className="text-sm text-foreground-muted">{rating} yıldız</span>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <RatingInput value={3.5} readOnly allowHalf size="md" />
            <span className="text-sm text-foreground-muted">3.5 yıldız (yarım)</span>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
