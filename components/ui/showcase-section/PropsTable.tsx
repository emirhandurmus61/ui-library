"use client";

import { cn } from "@/lib/utils";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface PropsTableProps {
  props: PropRow[];
  title?: string;
  className?: string;
}

export function PropsTable({ props, title = "Props", className }: PropsTableProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">
        {title}
      </h2>

      <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-foreground-muted uppercase tracking-wider w-40">
                  Prop
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-foreground-muted uppercase tracking-wider w-40">
                  Tip
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-foreground-muted uppercase tracking-wider w-28">
                  Varsayılan
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                  Açıklama
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((row, i) => (
                <tr
                  key={row.name}
                  className={cn(
                    "border-b border-border last:border-0",
                    i % 2 === 0 ? "bg-background" : "bg-surface/40"
                  )}
                >
                  <td className="px-4 py-3 align-top">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {row.name}
                    </span>
                    {row.required && (
                      <span className="ml-1.5 text-[10px] font-medium text-danger uppercase tracking-wide">
                        *
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-xs text-primary bg-primary-subtle px-1.5 py-0.5 rounded-[var(--radius-sm)]">
                      {row.type}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {row.default ? (
                      <code className="font-mono text-xs text-foreground-muted bg-background-muted px-1.5 py-0.5 rounded-[var(--radius-sm)]">
                        {row.default}
                      </code>
                    ) : (
                      <span className="text-xs text-foreground-subtle">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-foreground-muted leading-relaxed">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
