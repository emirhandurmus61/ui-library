"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Pagination } from "@/components/ui/pagination";`;

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

      <ShowcaseSection
        title="Temel"
        description="Temel sayfalama; önceki/sonraki ve sayfa numaraları."
        importLine={IMPORT}
        code={`<Pagination page={page} totalPages={10} onPageChange={setPage} />`}
      >
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page1} / 10</p>
          <Pagination page={page1} totalPages={10} onPageChange={setPage1} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Ortada (Ellipsis)"
        description="Çok sayfalı içeriklerde orta sayfalar … ile kısaltılır."
        importLine={IMPORT}
        code={`<Pagination page={page} totalPages={20} onPageChange={setPage} siblings={1} />`}
      >
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page2} / 20</p>
          <Pagination page={page2} totalPages={20} onPageChange={setPage2} siblings={1} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="First / Last Butonları"
        description="showFirstLast prop ile ilk ve son sayfa butonları eklenir."
        importLine={IMPORT}
        code={`<Pagination page={page} totalPages={15} onPageChange={setPage} showFirstLast />`}
      >
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page3} / 15</p>
          <Pagination page={page3} totalPages={15} onPageChange={setPage3} showFirstLast />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Küçük Boyut (sm)"
        description='size="sm" ile kompakt boyutta gösterim.'
        importLine={IMPORT}
        code={`<Pagination page={page} totalPages={8} onPageChange={setPage} size="sm" />`}
      >
        <div className="space-y-2">
          <p className="text-xs text-foreground-muted">Sayfa: {page4} / 8</p>
          <Pagination page={page4} totalPages={8} onPageChange={setPage4} size="sm" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Az Sayfa (collapse yok)"
        description="Toplam sayfa sayısı azken ellipsis gösterilmez."
        importLine={IMPORT}
        code={`<Pagination page={2} totalPages={5} onPageChange={() => {}} />`}
      >
        <Pagination page={2} totalPages={5} onPageChange={() => {}} />
      </ShowcaseSection>
    </div>
  );
}
