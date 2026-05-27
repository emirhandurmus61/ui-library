"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

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

export default function PaginationShowcase() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(3);
  const [page4, setPage4] = useState(1);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Pagination</h1>
        <p className="text-foreground-muted">
          ellipsis · first/last butonları · sm/md boyut · a11y (nav, aria-label, aria-current)
        </p>
      </div>

      <Section title="Temel">
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page1} / 10</p>
          <Pagination page={page1} totalPages={10} onPageChange={setPage1} />
        </div>
      </Section>

      <Section title="Ortada (Ellipsis)">
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page2} / 20</p>
          <Pagination page={page2} totalPages={20} onPageChange={setPage2} siblings={1} />
        </div>
      </Section>

      <Section title="First / Last Butonları">
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page3} / 15</p>
          <Pagination page={page3} totalPages={15} onPageChange={setPage3} showFirstLast />
        </div>
      </Section>

      <Section title="Küçük Boyut (sm)">
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page4} / 8</p>
          <Pagination page={page4} totalPages={8} onPageChange={setPage4} size="sm" />
        </div>
      </Section>

      <Section title="Az Sayfa (collapse yok)">
        <Pagination page={2} totalPages={5} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
