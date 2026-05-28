"use client";

import {
  forwardRef,
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={cn("size-4 shrink-0 text-foreground-subtle transition-transform duration-150", open && "rotate-180")} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="size-4 shrink-0 text-foreground-subtle" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="size-3.5 shrink-0 text-primary" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="size-3.5 shrink-0" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="size-3.5 shrink-0" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface ComboboxOption {
  value:    string;
  label:    string;
  disabled?: boolean;
  icon?:    React.ReactNode;
  group?:   string;
}

export interface ComboboxProps {
  options:         ComboboxOption[];
  value?:          string | string[];
  defaultValue?:   string | string[];
  onChange?:       (value: string | string[]) => void;
  multiple?:       boolean;
  placeholder?:    string;
  searchPlaceholder?: string;
  label?:          string;
  helperText?:     string;
  errorText?:      string;
  successText?:    string;
  disabled?:       boolean;
  required?:       boolean;
  clearable?:      boolean;
  /** "Yeni oluştur" seçeneği — kullanıcı giriş yazdığında gösterilir */
  creatable?:      boolean;
  onCreateOption?: (inputValue: string) => void;
  size?:           "sm" | "md" | "lg";
  id?:             string;
  className?:      string;
}

/* ─── Dropdown portal ─────────────────────────────────────────── */

function DropdownPortal({
  anchorRef,
  open,
  children,
}: {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  open: boolean;
  children: React.ReactNode;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropUp = spaceBelow < 220 && spaceAbove > spaceBelow;

    setStyle({
      position: "fixed",
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      ...(dropUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });
  }, [open, anchorRef]);

  if (!mounted || !open) return null;
  return createPortal(<div style={style}>{children}</div>, document.body);
}

/* ─── Component ──────────────────────────────────────────────── */

const SIZE = {
  sm: "h-8  px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-11 px-4 text-base",
};

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      onChange,
      multiple = false,
      placeholder = "Seçiniz...",
      searchPlaceholder = "Ara...",
      label,
      helperText,
      errorText,
      successText,
      disabled = false,
      required = false,
      clearable = false,
      creatable = false,
      onCreateOption,
      size = "md",
      id: idProp,
      className,
    },
    ref
  ) => {
    const autoId    = useId();
    const id        = idProp ?? autoId;
    const anchorRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const normalize = useCallback(
      (v: string | string[] | undefined) =>
        multiple
          ? Array.isArray(v) ? v : v ? [v] : []
          : Array.isArray(v) ? v[0] ?? "" : v ?? "",
      [multiple]
    );

    const [internal, setInternal] = useState<string | string[]>(() =>
      normalize(defaultValue)
    );
    const [open,   setOpen]   = useState(false);
    const [search, setSearch] = useState("");

    const isControlled = valueProp !== undefined;
    const current      = isControlled ? normalize(valueProp) : internal;

    const isSelected = (val: string) =>
      multiple
        ? (current as string[]).includes(val)
        : current === val;

    const selectedLabels = (() => {
      if (multiple) {
        return (current as string[])
          .map((v) => options.find((o) => o.value === v)?.label ?? v)
          .join(", ");
      }
      return options.find((o) => o.value === (current as string))?.label ?? "";
    })();

    /* ── Close on outside click ───────────────────────────────── */
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
          setOpen(false);
          setSearch("");
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* ── Focus search on open ─────────────────────────────────── */
    useEffect(() => {
      if (open) setTimeout(() => searchRef.current?.focus(), 0);
    }, [open]);

    /* ── Keyboard ─────────────────────────────────────────────── */
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setSearch(""); }
      if ((e.key === "Enter" || e.key === " ") && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };

    /* ── Select ───────────────────────────────────────────────── */
    const handleSelect = (val: string) => {
      let next: string | string[];
      if (multiple) {
        const arr = current as string[];
        next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
      } else {
        next = val;
        setOpen(false);
        setSearch("");
      }
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    /* ── Clear ────────────────────────────────────────────────── */
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const next = multiple ? [] : "";
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    /* ── Filtered options ─────────────────────────────────────── */
    const filtered = search
      ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
      : options;

    /* ── Groups ───────────────────────────────────────────────── */
    const groups = Array.from(new Set(options.map((o) => o.group).filter(Boolean))) as string[];
    const hasGroups = groups.length > 0;

    /* ── Feedback ─────────────────────────────────────────────── */
    const feedbackText  = errorText ?? successText ?? helperText;
    const feedbackColor = errorText ? "text-danger" : successText ? "text-success" : "text-foreground-subtle";

    const triggerState =
      errorText   ? "border-danger focus:border-danger focus:ring-danger/20" :
      successText ? "border-success focus:border-success focus:ring-success/20" :
      open        ? "border-primary ring-2 ring-primary/20" : "";

    const hasValue = multiple ? (current as string[]).length > 0 : !!(current as string);

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)}>
        {/* Label */}
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground leading-none">
            {label}
            {required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        {/* Trigger */}
        <div ref={anchorRef} className="relative">
          <button
            type="button"
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-required={required}
            disabled={disabled}
            onClick={() => !disabled && setOpen((o) => !o)}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full flex items-center justify-between gap-2",
              "bg-surface text-foreground",
              "border border-border rounded-[var(--radius-md)]",
              "transition-colors duration-150 cursor-pointer select-none text-left",
              "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background-muted",
              SIZE[size],
              triggerState
            )}
          >
            <span className={cn("flex-1 truncate", !hasValue && "text-foreground-subtle")}>
              {hasValue ? selectedLabels : placeholder}
            </span>
            <span className="flex items-center gap-1 shrink-0">
              {clearable && hasValue && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Temizle"
                  onClick={handleClear}
                  onKeyDown={(e) => e.key === "Enter" && handleClear(e as unknown as React.MouseEvent)}
                  className="flex items-center justify-center rounded-full w-4 h-4 hover:bg-background-muted text-foreground-subtle hover:text-foreground transition-colors"
                >
                  <XIcon />
                </span>
              )}
              <ChevronIcon open={open} />
            </span>
          </button>

          {/* Dropdown portal */}
          <DropdownPortal anchorRef={anchorRef} open={open}>
            <div
              role="listbox"
              aria-multiselectable={multiple}
              className={cn(
                "bg-surface-overlay border border-border rounded-[var(--radius-md)]",
                "shadow-lg overflow-hidden",
                "animate-in fade-in-0 zoom-in-95 duration-100"
              )}
            >
              {/* Search */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                <SearchIcon />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-subtle outline-none"
                  onKeyDown={(e) => e.key === "Escape" && (setOpen(false), setSearch(""))}
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} className="text-foreground-subtle hover:text-foreground transition-colors">
                    <XIcon />
                  </button>
                )}
              </div>

              {/* Options */}
              <div className="p-1 max-h-56 overflow-y-auto">
                {hasGroups
                  ? groups.map((grp) => {
                      const grpOpts = filtered.filter((o) => o.group === grp);
                      if (!grpOpts.length) return null;
                      return (
                        <div key={grp}>
                          <p className="px-3 py-1.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">{grp}</p>
                          {grpOpts.map((opt) => <OptionItem key={opt.value} opt={opt} selected={isSelected(opt.value)} onSelect={handleSelect} />)}
                        </div>
                      );
                    })
                  : filtered.map((opt) => (
                      <OptionItem key={opt.value} opt={opt} selected={isSelected(opt.value)} onSelect={handleSelect} />
                    ))}

                {/* No results */}
                {filtered.length === 0 && !creatable && (
                  <p className="px-3 py-4 text-sm text-center text-foreground-subtle">Sonuç bulunamadı.</p>
                )}

                {/* Creatable */}
                {creatable && search && !filtered.find((o) => o.label.toLowerCase() === search.toLowerCase()) && (
                  <button
                    type="button"
                    onClick={() => { onCreateOption?.(search); setSearch(""); setOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary-subtle rounded-[var(--radius-sm)] transition-colors"
                  >
                    <PlusIcon />
                    <span>"{search}" oluştur</span>
                  </button>
                )}
              </div>

              {/* Multi footer */}
              {multiple && (current as string[]).length > 0 && (
                <div className="px-3 py-2 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-foreground-subtle">{(current as string[]).length} seçili</span>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-primary hover:underline"
                  >
                    Temizle
                  </button>
                </div>
              )}
            </div>
          </DropdownPortal>
        </div>

        {/* Feedback */}
        {feedbackText && (
          <p className={cn("text-xs leading-none", feedbackColor)}>{feedbackText}</p>
        )}
      </div>
    );
  }
);

Combobox.displayName = "Combobox";

/* ─── Option item ─────────────────────────────────────────────── */

function OptionItem({
  opt,
  selected,
  onSelect,
}: {
  opt: ComboboxOption;
  selected: boolean;
  onSelect: (val: string) => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={opt.disabled}
      onClick={() => !opt.disabled && onSelect(opt.value)}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-[var(--radius-sm)]",
        "transition-colors duration-100 text-left",
        selected ? "bg-primary-subtle text-primary font-medium" : "text-foreground hover:bg-background-muted",
        opt.disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      {opt.icon && <span className="size-4 shrink-0 flex items-center justify-center">{opt.icon}</span>}
      <span className="flex-1 truncate">{opt.label}</span>
      {selected && <CheckIcon />}
    </button>
  );
}
