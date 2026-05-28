"use client";

import { useState } from "react";
import { NumberFlow } from "@/components/ui/number-flow";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function NumberFlowShowcase() {
  const [price, setPrice] = useState(29);
  const [score, setScore] = useState(8451);
  const [count, setCount] = useState(1);

  const plans = [
    { label: "Starter", price: 29 },
    { label: "Pro", price: 79 },
    { label: "Business", price: 199 },
  ];

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Number Flow</h1>
        <p className="text-sm text-foreground-muted">
          Her hane bağımsız scroll animasyonu · rolling digit effect · prefix/suffix
        </p>
      </div>

      <ShowcaseSection
        title="Fiyatlandırma Switcher"
        description="Plan değiştirince rakamlar yukarı/aşağı kayarak geçiş yapar."
        code={`const [price, setPrice] = useState(29);
<NumberFlow value={price} prefix="$" suffix="/ay" className="text-5xl font-bold" />`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="text-5xl font-bold text-foreground">
            <NumberFlow value={price} prefix="$" suffix="/ay" />
          </div>
          <div className="flex gap-2">
            {plans.map((p) => (
              <Button
                key={p.label}
                size="sm"
                variant={price === p.price ? "primary" : "outline"}
                onClick={() => setPrice(p.price)}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Oyun Skoru"
        description="Puan artınca rakamlar yuvarlanır."
        code={`<NumberFlow value={score} className="text-4xl font-bold font-mono" />`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold font-mono text-primary">
            <NumberFlow value={score} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setScore((s) => s + 100)}>+100</Button>
            <Button size="sm" variant="outline" onClick={() => setScore((s) => s + 2500)}>+2500</Button>
            <Button size="sm" variant="outline" onClick={() => setScore(0)}>Sıfırla</Button>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sepet Adedi"
        code={`<NumberFlow value={count} className="text-3xl font-semibold" />`}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border border-border rounded-[var(--radius-lg)] px-4 py-2">
            <button
              className="text-lg text-foreground-muted hover:text-foreground w-6 text-center"
              onClick={() => setCount((c) => Math.max(0, c - 1))}
            >−</button>
            <span className="text-xl font-bold w-8 text-center">
              <NumberFlow value={count} />
            </span>
            <button
              className="text-lg text-foreground-muted hover:text-foreground w-6 text-center"
              onClick={() => setCount((c) => c + 1)}
            >+</button>
          </div>
          <p className="text-sm text-foreground-muted">Sepet adedi</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
