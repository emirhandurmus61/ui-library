import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type DiffLineType = "added" | "removed" | "unchanged" | "hunk";

export interface DiffLine {
  type: DiffLineType;
  content: string;
  oldLineNo?: number;
  newLineNo?: number;
}

export interface DiffFile {
  filename: string;
  language?: string;
  lines: DiffLine[];
  additions?: number;
  deletions?: number;
}

export type DiffViewMode = "unified" | "split";
export type DiffVariant = "default" | "minimal" | "dark";

export interface DiffViewerProps {
  files: DiffFile[];
  mode?: DiffViewMode;
  variant?: DiffVariant;
  showLineNumbers?: boolean;
  collapsible?: boolean;
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */

const lineStyles: Record<DiffLineType, { row: string; gutter: string; prefix: string }> = {
  added:     { row: "bg-emerald-50 dark:bg-emerald-950/30",   gutter: "bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",   prefix: "+" },
  removed:   { row: "bg-red-50 dark:bg-red-950/30",           gutter: "bg-red-100/80 dark:bg-red-900/30 text-red-700 dark:text-red-400",                   prefix: "-" },
  unchanged: { row: "",                                        gutter: "text-foreground-subtle",                                                            prefix: " " },
  hunk:      { row: "bg-blue-50/50 dark:bg-blue-950/20",      gutter: "bg-blue-100/50 dark:bg-blue-900/20 text-blue-500",                                  prefix: " " },
};

const darkLineStyles: Record<DiffLineType, { row: string; gutter: string }> = {
  added:     { row: "bg-emerald-950/40",  gutter: "bg-emerald-900/30 text-emerald-400" },
  removed:   { row: "bg-red-950/40",      gutter: "bg-red-900/30 text-red-400" },
  unchanged: { row: "",                   gutter: "text-white/20" },
  hunk:      { row: "bg-blue-950/30",     gutter: "bg-blue-900/20 text-blue-400" },
};

/* ─── Stat pill ──────────────────────────────────────────────── */

function StatPill({ additions, deletions }: { additions?: number; deletions?: number }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-mono">
      {additions !== undefined && additions > 0 && (
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+{additions}</span>
      )}
      {deletions !== undefined && deletions > 0 && (
        <span className="text-red-600 dark:text-red-400 font-semibold">-{deletions}</span>
      )}
      {/* Visual bar */}
      {(additions || deletions) && (
        <div className="flex gap-px">
          {Array.from({ length: 5 }, (_, i) => {
            const total = (additions ?? 0) + (deletions ?? 0);
            const addRatio = total ? ((additions ?? 0) / total) : 0;
            const filled = i < 5;
            const isAdd = i < Math.round(addRatio * 5);
            return (
              <span key={i} className={cn("w-2.5 h-2.5 rounded-sm", filled ? (isAdd ? "bg-emerald-500" : "bg-red-500") : "bg-border")} />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Unified view ───────────────────────────────────────────── */

function UnifiedView({ file, showLineNumbers, variant }: { file: DiffFile; showLineNumbers: boolean; variant: DiffVariant }) {
  const isDark = variant === "dark";
  let oldNo = 0;
  let newNo = 0;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-mono border-collapse">
        <tbody>
          {file.lines.map((line, i) => {
            if (line.type !== "hunk" && line.type !== "added") oldNo++;
            if (line.type !== "hunk" && line.type !== "removed") newNo++;

            const s = isDark ? darkLineStyles[line.type] : lineStyles[line.type];
            return (
              <tr key={i} className={s.row}>
                {showLineNumbers && (
                  <>
                    <td className={cn("px-3 py-0.5 text-right w-10 select-none border-r border-border/30", s.gutter)}>
                      {line.type !== "added" && line.type !== "hunk" ? oldNo : ""}
                    </td>
                    <td className={cn("px-3 py-0.5 text-right w-10 select-none border-r border-border/30", s.gutter)}>
                      {line.type !== "removed" && line.type !== "hunk" ? newNo : ""}
                    </td>
                  </>
                )}
                <td className={cn("px-2 py-0.5 w-4 select-none font-bold", s.gutter)}>
                  {lineStyles[line.type].prefix}
                </td>
                <td className={cn("px-2 py-0.5 whitespace-pre", isDark ? "text-white/80" : "text-foreground")}>
                  {line.content}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── File header ─────────────────────────────────────────────── */

function FileHeader({ file, variant }: { file: DiffFile; variant: DiffVariant }) {
  const isDark = variant === "dark";
  return (
    <div className={cn(
      "flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border/50 text-xs",
      isDark ? "bg-white/5" : "bg-background-muted/80"
    )}>
      <div className="flex items-center gap-2 min-w-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 shrink-0 text-foreground-muted" aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        </svg>
        <span className={cn("font-mono font-medium truncate", isDark ? "text-white/70" : "text-foreground-muted")}>
          {file.filename}
        </span>
      </div>
      <StatPill additions={file.additions} deletions={file.deletions} />
    </div>
  );
}

/* ─── DiffViewer ─────────────────────────────────────────────── */

export function DiffViewer({
  files,
  mode = "unified",
  variant = "default",
  showLineNumbers = true,
  className,
}: DiffViewerProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("space-y-4", className)}>
      {files.map((file, i) => (
        <div
          key={i}
          className={cn(
            "rounded-[var(--radius-xl)] border overflow-hidden text-sm",
            isDark ? "border-white/10 bg-[#0d1117]" : "border-border bg-surface"
          )}
        >
          <FileHeader file={file} variant={variant} />
          <UnifiedView file={file} showLineNumbers={showLineNumbers} variant={variant} />
        </div>
      ))}
    </div>
  );
}
