"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { LogViewer, type LogEntry } from "@/components/ui/log-viewer";

const SERVER_LOGS: LogEntry[] = [
  { timestamp: "12:04:01.221", level: "info",    source: "server",  message: "HTTP sunucusu başlatıldı — port 3000" },
  { timestamp: "12:04:01.389", level: "info",    source: "db",      message: "PostgreSQL bağlantısı kuruldu (pool: 10)" },
  { timestamp: "12:04:02.104", level: "success", source: "auth",    message: "JWT anahtarları yüklendi" },
  { timestamp: "12:04:05.812", level: "info",    source: "router",  message: "GET /api/users 200 — 14ms" },
  { timestamp: "12:04:06.443", level: "info",    source: "router",  message: "POST /api/auth/login 200 — 89ms" },
  { timestamp: "12:04:07.001", level: "warn",    source: "db",      message: "Yavaş sorgu tespit edildi (412ms): SELECT * FROM orders WHERE..." },
  { timestamp: "12:04:08.334", level: "info",    source: "router",  message: "GET /api/products 200 — 22ms" },
  { timestamp: "12:04:09.118", level: "error",   source: "email",   message: "E-posta gönderilemedi: SMTP bağlantı zaman aşımı",    meta: "retry: 1/3" },
  { timestamp: "12:04:10.229", level: "debug",   source: "cache",   message: "Cache miss: user:profile:421" },
  { timestamp: "12:04:10.231", level: "debug",   source: "cache",   message: "Cache set: user:profile:421 — TTL 300s" },
  { timestamp: "12:04:11.005", level: "warn",    source: "rate",    message: "Rate limit uyarısı: IP 192.168.1.44 — 95/100 istek" },
  { timestamp: "12:04:11.442", level: "error",   source: "rate",    message: "Rate limit aşıldı: IP 192.168.1.44 — 429 döndürüldü",  meta: "blocked" },
  { timestamp: "12:04:12.001", level: "info",    source: "router",  message: "DELETE /api/sessions/abc123 204 — 5ms" },
  { timestamp: "12:04:13.331", level: "success", source: "cron",    message: "Günlük rapor görevi tamamlandı (1.2s)" },
  { timestamp: "12:04:14.887", level: "trace",   source: "middleware", message: "Request pipeline: cors → auth → body → handler" },
];

const BUILD_LOGS: LogEntry[] = [
  { timestamp: "00:00.000", level: "info",    message: "Next.js 15.2.0 build başlatıldı" },
  { timestamp: "00:00.112", level: "info",    message: "Tailwind CSS v4 derleniyor..." },
  { timestamp: "00:01.445", level: "success", message: "CSS derleme tamamlandı — 14.2kB (gzip: 3.8kB)" },
  { timestamp: "00:01.889", level: "info",    message: "TypeScript tip kontrolü başlatıldı" },
  { timestamp: "00:04.221", level: "success", message: "TypeScript — 0 hata, 0 uyarı" },
  { timestamp: "00:04.334", level: "info",    message: "Sayfa derleme: /showcase (124 bileşen)" },
  { timestamp: "00:08.112", level: "warn",    message: "Büyük chunk tespit edildi: showcase/page — 512kB. Code splitting önerilir." },
  { timestamp: "00:08.445", level: "info",    message: "Static sayfalar oluşturuluyor: 48/52" },
  { timestamp: "00:09.001", level: "success", message: "Build tamamlandı — Toplam 9.2s" },
  { timestamp: "00:09.002", level: "info",    message: "Output: .next/ — 24MB" },
];

export default function LogViewerShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Log Viewer</h1>
        <p className="text-foreground-muted">
          Terminal tarzı log akışı. Seviye filtresi, arama, timestamp, kaynak ve 3 tema.
        </p>
      </div>

      <ShowcaseSection
        title="Dark (Terminal)"
        description="Varsayılan dark tema. Seviye filtresi ve arama kutusu aktif."
        importLine={`import { LogViewer } from "@/components/ui/log-viewer";`}
        code={`<LogViewer entries={logs} variant="dark" />`}
      >
        <LogViewer entries={SERVER_LOGS} variant="dark" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Light Tema"
        description="Açık tema, hata ve uyarı satırları renkli arka plan alır."
        importLine={`import { LogViewer } from "@/components/ui/log-viewer";`}
        code={`<LogViewer entries={logs} variant="light" />`}
      >
        <LogViewer entries={SERVER_LOGS} variant="light" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Build Log — Satır Numaralı"
        description="showLineNumbers ile her satır numaralandırılır. CI/CD pipeline logları için."
        importLine={`import { LogViewer } from "@/components/ui/log-viewer";`}
        code={`<LogViewer entries={buildLogs} variant="dark" showLineNumbers maxHeight="280px" />`}
      >
        <LogViewer entries={BUILD_LOGS} variant="dark" showLineNumbers maxHeight="280px" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Compact — Timestamp ve Kaynak Gizli"
        description="showTimestamps={false} ile sade görünüm. Uygulama içi log paneli."
        importLine={`import { LogViewer } from "@/components/ui/log-viewer";`}
        code={`<LogViewer entries={logs} showTimestamps={false} maxHeight="240px" />`}
      >
        <LogViewer entries={SERVER_LOGS} showTimestamps={false} maxHeight="240px" />
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
                ["entries","LogEntry[]","—","Log listesi (zorunlu)"],
                ["variant",'"dark" | "light" | "minimal"','"dark"',"Renk teması"],
                ["maxHeight","string",'"400px"',"Scroll başlangıç yüksekliği"],
                ["autoScroll","boolean","true","Yeni log gelince en alta kaydır"],
                ["showTimestamps","boolean","true","Timestamp göster"],
                ["showLevels","boolean","true","Level badge göster"],
                ["showLineNumbers","boolean","false","Satır numarası göster"],
                ["searchable","boolean","true","Filtre bar göster"],
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
