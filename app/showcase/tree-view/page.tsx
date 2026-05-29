"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { TreeView, type TreeNode } from "@/components/ui/tree-view";

const FILE_TREE: TreeNode[] = [
  {
    id: "src", label: "src", defaultExpanded: true, children: [
      {
        id: "components", label: "components", defaultExpanded: true, children: [
          { id: "ui", label: "ui", children: [
            { id: "button", label: "button", children: [
              { id: "btn-tsx", label: "Button.tsx" },
              { id: "btn-ts", label: "index.ts" },
            ]},
            { id: "modal", label: "modal", children: [
              { id: "modal-tsx", label: "Modal.tsx" },
              { id: "modal-ts", label: "index.ts" },
            ]},
          ]},
          { id: "layout", label: "layout", children: [
            { id: "navbar-tsx", label: "Navbar.tsx" },
            { id: "footer-tsx", label: "Footer.tsx" },
          ]},
        ],
      },
      {
        id: "app", label: "app", children: [
          { id: "page", label: "page.tsx" },
          { id: "layout", label: "layout.tsx" },
          { id: "globals", label: "globals.css" },
        ],
      },
      { id: "lib", label: "lib", children: [
        { id: "utils", label: "utils.ts" },
        { id: "api", label: "api.ts" },
      ]},
    ],
  },
  { id: "public", label: "public", children: [
    { id: "favicon", label: "favicon.ico" },
    { id: "logo", label: "logo.svg" },
  ]},
  { id: "pkgjson", label: "package.json" },
  { id: "tsconfig", label: "tsconfig.json" },
  { id: "tailwind", label: "tailwind.config.ts" },
];

const NAV_TREE: TreeNode[] = [
  {
    id: "dashboard", label: "Dashboard", badge: 3, defaultExpanded: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-blue-500"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    children: [
      { id: "overview", label: "Genel Bakış", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
      { id: "analytics", label: "Analytics", badge: "Yeni", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
    ],
  },
  {
    id: "settings", label: "Ayarlar", defaultExpanded: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-slate-400"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 1.41 13.82"/></svg>,
    children: [
      { id: "profile", label: "Profil" },
      { id: "security", label: "Güvenlik" },
      { id: "billing", label: "Faturalama" },
      { id: "danger", label: "Hesabı Sil", disabled: true },
    ],
  },
];

const SIMPLE_TREE: TreeNode[] = [
  { id: "europe", label: "Avrupa", defaultExpanded: true, children: [
    { id: "tr", label: "Türkiye", children: [
      { id: "ist", label: "İstanbul", badge: "34" },
      { id: "ank", label: "Ankara", badge: "06" },
      { id: "izm", label: "İzmir", badge: "35" },
    ]},
    { id: "de", label: "Almanya", children: [
      { id: "ber", label: "Berlin" },
      { id: "mun", label: "Münih" },
    ]},
  ]},
  { id: "asia", label: "Asya", children: [
    { id: "jp", label: "Japonya", children: [
      { id: "tok", label: "Tokyo" },
      { id: "osa", label: "Osaka" },
    ]},
  ]},
];

export default function TreeViewShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tree View</h1>
        <p className="text-foreground-muted">
          Hiyerarşik veri görüntüleme. Dosya gezgini, navigasyon ve kategori ağaçları için.
        </p>
      </div>

      <ShowcaseSection
        title="Dosya Gezgini (files)"
        description="variant='files' ile otomatik dosya/klasör ikonları ve sarı folder rengi."
        importLine={`import { TreeView } from "@/components/ui/tree-view";`}
        code={`<TreeView nodes={fileTree} variant="files" />`}
      >
        <div className="max-w-xs">
          <TreeView nodes={FILE_TREE} variant="files" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel İkonlar + Badge (default)"
        description="Her node'a özel icon ve badge. Seçilebilir mod aktif."
        importLine={`import { TreeView } from "@/components/ui/tree-view";`}
        code={`<TreeView nodes={navTree} selectable />`}
      >
        <div className="max-w-xs">
          <TreeView nodes={NAV_TREE} selectable />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Bordered Varyant"
        description="Her satır bordered kart gibi görünür. Konum/kategori seçimi için ideal."
        importLine={`import { TreeView } from "@/components/ui/tree-view";`}
        code={`<TreeView nodes={tree} variant="bordered" selectable />`}
      >
        <div className="max-w-xs">
          <TreeView nodes={SIMPLE_TREE} variant="bordered" selectable />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Minimal Varyant"
        description="Sade, ikon yok. Metin ağırlıklı hiyerarşiler için."
        importLine={`import { TreeView } from "@/components/ui/tree-view";`}
        code={`<TreeView nodes={tree} variant="minimal" selectable multiSelect />`}
      >
        <div className="max-w-xs">
          <TreeView nodes={SIMPLE_TREE} variant="minimal" selectable multiSelect />
        </div>
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>{["Prop","Tip","Varsayılan","Açıklama"].map(h=><th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["nodes","TreeNode[]","—","Node listesi (zorunlu)"],
                ["variant",'"default" | "files" | "minimal" | "bordered"','"default"',"Görsel stil"],
                ["selectable","boolean","false","Node seçilebilir mi"],
                ["multiSelect","boolean","false","Çoklu seçim"],
                ["defaultSelected","string[]","[]","Başlangıç seçililer"],
                ["onSelect","(ids: string[]) => void","—","Seçim değiştiğinde callback"],
              ].map(([p,t,d,desc])=>(
                <tr key={p} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{d}</td>
                  <td className="px-4 py-3 text-foreground-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
