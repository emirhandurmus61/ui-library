"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { DiffViewer, type DiffFile } from "@/components/ui/diff-viewer";

const AUTH_DIFF: DiffFile = {
  filename: "src/lib/auth.ts",
  language: "typescript",
  additions: 12,
  deletions: 5,
  lines: [
    { type: "hunk",      content: "@@ -1,8 +1,15 @@" },
    { type: "unchanged", content: 'import { NextResponse } from "next/server";' },
    { type: "unchanged", content: 'import { getServerSession } from "next-auth";' },
    { type: "removed",   content: 'import { authOptions } from "./authOptions";' },
    { type: "added",     content: 'import { authOptions } from "@/lib/auth/options";' },
    { type: "added",     content: 'import { rateLimit } from "@/lib/rate-limit";' },
    { type: "unchanged", content: "" },
    { type: "unchanged", content: "export async function requireAuth(req: Request) {" },
    { type: "removed",   content: "  const session = await getServerSession(authOptions);" },
    { type: "removed",   content: "  if (!session) throw new Error('Unauthorized');" },
    { type: "added",     content: "  const limited = await rateLimit(req);" },
    { type: "added",     content: "  if (!limited.success) {" },
    { type: "added",     content: "    return NextResponse.json({ error: 'Rate limited' }, { status: 429 });" },
    { type: "added",     content: "  }" },
    { type: "added",     content: "  const session = await getServerSession(authOptions);" },
    { type: "added",     content: "  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });" },
    { type: "unchanged", content: "  return session;" },
    { type: "unchanged", content: "}" },
  ],
};

const CONFIG_DIFF: DiffFile = {
  filename: "tailwind.config.ts",
  additions: 8,
  deletions: 3,
  lines: [
    { type: "hunk",      content: "@@ -10,12 +10,17 @@" },
    { type: "unchanged", content: "  theme: {" },
    { type: "unchanged", content: "    extend: {" },
    { type: "removed",   content: "      colors: {" },
    { type: "removed",   content: "        primary: '#6366f1'," },
    { type: "removed",   content: "      }," },
    { type: "added",     content: "      colors: {" },
    { type: "added",     content: "        primary: {" },
    { type: "added",     content: "          DEFAULT: 'hsl(var(--primary))'," },
    { type: "added",     content: "          foreground: 'hsl(var(--primary-foreground))'," },
    { type: "added",     content: "        }," },
    { type: "added",     content: "      }," },
    { type: "added",     content: "      borderRadius: {" },
    { type: "added",     content: "        md: 'var(--radius-md)'," },
    { type: "added",     content: "      }," },
    { type: "unchanged", content: "    }," },
    { type: "unchanged", content: "  }," },
  ],
};

const PKG_DIFF: DiffFile = {
  filename: "package.json",
  additions: 3,
  deletions: 1,
  lines: [
    { type: "hunk",      content: "@@ -12,7 +12,9 @@" },
    { type: "unchanged", content: '  "dependencies": {' },
    { type: "unchanged", content: '    "next": "15.2.0",' },
    { type: "removed",   content: '    "react": "18.3.1",' },
    { type: "added",     content: '    "react": "19.0.0",' },
    { type: "added",     content: '    "react-dom": "19.0.0",' },
    { type: "added",     content: '    "class-variance-authority": "^0.7.1",' },
    { type: "unchanged", content: '    "clsx": "^2.1.1"' },
    { type: "unchanged", content: "  }" },
  ],
};

export default function DiffViewerShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Diff Viewer</h1>
        <p className="text-foreground-muted">
          Kod değişikliklerini +/- ile gösteren panel. GitHub/GitLab stili. 3 varyant.
        </p>
      </div>

      <ShowcaseSection
        title="Default — Tek Dosya"
        description="Satır numaraları, ekleme/silme renkleri, dosya header'ında istatistik."
        importLine={`import { DiffViewer } from "@/components/ui/diff-viewer";`}
        code={`<DiffViewer files={[authDiff]} variant="default" />`}
      >
        <DiffViewer files={[AUTH_DIFF]} variant="default" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Çoklu Dosya"
        description="Birden fazla değiştirilmiş dosya aynı anda gösterilir."
        importLine={`import { DiffViewer } from "@/components/ui/diff-viewer";`}
        code={`<DiffViewer files={[configDiff, pkgDiff]} />`}
      >
        <DiffViewer files={[CONFIG_DIFF, PKG_DIFF]} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Dark Varyant"
        description="Her zaman koyu tema. GitHub dark / terminal benzeri görünüm."
        importLine={`import { DiffViewer } from "@/components/ui/diff-viewer";`}
        code={`<DiffViewer files={files} variant="dark" />`}
        previewClassName="bg-[#010409] rounded-[var(--radius-xl)]"
      >
        <DiffViewer files={[AUTH_DIFF, PKG_DIFF]} variant="dark" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Minimal — Satır Numarasız"
        description="showLineNumbers={false} ile daha sade görünüm."
        importLine={`import { DiffViewer } from "@/components/ui/diff-viewer";`}
        code={`<DiffViewer files={[pkgDiff]} showLineNumbers={false} />`}
      >
        <DiffViewer files={[PKG_DIFF]} showLineNumbers={false} />
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
                ["files","DiffFile[]","—","Diff dosya listesi (zorunlu)"],
                ["variant",'"default" | "minimal" | "dark"','"default"',"Renk teması"],
                ["showLineNumbers","boolean","true","Satır numaralarını göster"],
                ["className","string","—","Ek CSS sınıfı"],
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
