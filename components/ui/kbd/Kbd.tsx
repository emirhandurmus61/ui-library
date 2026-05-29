import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type KbdVariant = "default" | "outline" | "ghost" | "dark" | "colored";
export type KbdSize = "xs" | "sm" | "md" | "lg";

export interface KbdProps {
  keys: string | string[];
  variant?: KbdVariant;
  size?: KbdSize;
  separator?: string;
  className?: string;
}

/* ─── Key symbols map ────────────────────────────────────────── */

const KEY_SYMBOLS: Record<string, string> = {
  cmd:     "⌘",
  command: "⌘",
  ctrl:    "⌃",
  control: "⌃",
  alt:     "⌥",
  option:  "⌥",
  shift:   "⇧",
  enter:   "↵",
  return:  "↵",
  escape:  "Esc",
  esc:     "Esc",
  delete:  "⌫",
  backspace:"⌫",
  tab:     "⇥",
  up:      "↑",
  down:    "↓",
  left:    "←",
  right:   "→",
  space:   "Space",
  win:     "⊞",
  windows: "⊞",
};

function resolveKey(key: string): string {
  return KEY_SYMBOLS[key.toLowerCase()] ?? key.toUpperCase();
}

/* ─── Variant styles ─────────────────────────────────────────── */

const variantStyles: Record<KbdVariant, string> = {
  default:  "bg-background-muted border border-border border-b-[2px] text-foreground shadow-sm",
  outline:  "bg-transparent border border-border text-foreground",
  ghost:    "bg-transparent text-foreground-muted",
  dark:     "bg-[#1e293b] border border-white/10 border-b-[2px] border-b-white/20 text-white shadow-sm",
  colored:  "bg-primary/10 border border-primary/20 text-primary",
};

const sizeStyles: Record<KbdSize, string> = {
  xs: "text-[10px] px-1 py-0 min-w-[16px] h-4 rounded",
  sm: "text-[11px] px-1.5 py-px min-w-[20px] h-5 rounded-[4px]",
  md: "text-xs px-2 py-0.5 min-w-[24px] h-6 rounded-[var(--radius-md)]",
  lg: "text-sm px-2.5 py-1 min-w-[28px] h-7 rounded-[var(--radius-md)]",
};

/* ─── Single key ─────────────────────────────────────────────── */

function Key({ k, variant, size }: { k: string; variant: KbdVariant; size: KbdSize }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center font-mono font-medium leading-none",
        variantStyles[variant],
        sizeStyles[size]
      )}
    >
      {resolveKey(k)}
    </kbd>
  );
}

/* ─── Kbd ────────────────────────────────────────────────────── */

export function Kbd({ keys, variant = "default", size = "sm", separator = "+", className }: KbdProps) {
  const keyArray = Array.isArray(keys) ? keys : [keys];

  if (keyArray.length === 1) {
    return (
      <span className={className}>
        <Key k={keyArray[0]} variant={variant} size={size} />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {keyArray.map((k, i) => (
        <span key={i} className="inline-flex items-center gap-0.5">
          <Key k={k} variant={variant} size={size} />
          {i < keyArray.length - 1 && (
            <span className="text-foreground-subtle text-[10px] font-normal mx-0.5">{separator}</span>
          )}
        </span>
      ))}
    </span>
  );
}

/* ─── KbdShortcut — label + keys combo ──────────────────────── */

export interface KbdShortcutProps {
  label: string;
  keys: string | string[];
  variant?: KbdVariant;
  size?: KbdSize;
  className?: string;
}

export function KbdShortcut({ label, keys, variant = "default", size = "sm", className }: KbdShortcutProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <span className="text-sm text-foreground-muted">{label}</span>
      <Kbd keys={keys} variant={variant} size={size} />
    </div>
  );
}

/* ─── KbdGroup — list of shortcuts ──────────────────────────── */

export interface KbdGroupProps {
  title?: string;
  shortcuts: { label: string; keys: string | string[] }[];
  variant?: KbdVariant;
  size?: KbdSize;
  className?: string;
}

export function KbdGroup({ title, shortcuts, variant = "default", size = "sm", className }: KbdGroupProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {title && <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle mb-2">{title}</p>}
      {shortcuts.map((s, i) => (
        <KbdShortcut key={i} label={s.label} keys={s.keys} variant={variant} size={size} />
      ))}
    </div>
  );
}
