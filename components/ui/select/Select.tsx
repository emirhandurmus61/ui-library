"use client";

import {
  forwardRef,
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Trigger variants ───────────────────────────────────────── */

const triggerVariants = cva(
  [
    "w-full flex items-center justify-between gap-2",
    "bg-surface text-foreground",
    "border border-border rounded-[var(--radius-md)]",
    "transition-colors duration-150 cursor-pointer select-none",
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background-muted",
  ],
  {
    variants: {
      size: {
        sm: "h-8  px-3 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
      state: {
        default: "",
        error:   "border-danger focus:border-danger focus:ring-danger/20",
        success: "border-success focus:border-success focus:ring-success/20",
        open:    "border-primary ring-2 ring-primary/20",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps extends VariantProps<typeof triggerVariants> {
  options?: SelectOption[];
  groups?: SelectGroup[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  /** Dropdown'ı portal yerine relative pozisyonla göster (varsayılan: true) */
  searchable?: boolean;
}

/* ─── Chevron icon ───────────────────────────────────────────── */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "size-4 shrink-0 text-foreground-subtle transition-transform duration-200",
        open && "rotate-180"
      )}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-foreground-subtle shrink-0" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 shrink-0" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options = [],
      groups = [],
      value: valueProp,
      defaultValue,
      onChange,
      placeholder = "Seçiniz...",
      label,
      helperText,
      errorText,
      successText,
      disabled = false,
      required = false,
      id: idProp,
      className,
      size,
      state,
      searchable = false,
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const listboxId = `${id}-listbox`;

    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    // Tüm opsiyonları düz liste olarak al
    const allOptions: SelectOption[] = groups.length
      ? groups.flatMap((g) => g.options)
      : options;

    const selectedOption = allOptions.find((o) => o.value === currentValue);

    const resolvedState = errorText
      ? "error"
      : successText
      ? "success"
      : open
      ? "open"
      : state;

    const feedbackText = errorText ?? successText ?? helperText;
    const feedbackColor = errorText
      ? "text-danger"
      : successText
      ? "text-success"
      : "text-foreground-subtle";

    // Arama filtresi
    const filterOptions = (opts: SelectOption[]) =>
      search
        ? opts.filter((o) =>
            o.label.toLowerCase().includes(search.toLowerCase())
          )
        : opts;

    // Dışarı tıklayınca kapat
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
          setSearch("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Açılınca arama inputuna odaklan
    useEffect(() => {
      if (open && searchable) {
        setTimeout(() => searchRef.current?.focus(), 0);
      }
    }, [open, searchable]);

    // Escape ile kapat
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setSearch(""); }
    };

    const handleSelect = (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      setOpen(false);
      setSearch("");
    };

    const renderOptions = (opts: SelectOption[]) =>
      filterOptions(opts).map((option) => (
        <button
          key={option.value}
          type="button"
          role="option"
          aria-selected={currentValue === option.value}
          disabled={option.disabled}
          onClick={() => !option.disabled && handleSelect(option.value)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-[var(--radius-sm)]",
            "transition-colors duration-100 text-left",
            currentValue === option.value
              ? "bg-primary-subtle text-primary font-medium"
              : "text-foreground hover:bg-background-muted",
            option.disabled && "opacity-40 cursor-not-allowed"
          )}
        >
          {option.icon && (
            <span className="size-4 shrink-0 flex items-center justify-center">
              {option.icon}
            </span>
          )}
          <span className="flex-1 truncate">{option.label}</span>
          {currentValue === option.value && <CheckIcon />}
        </button>
      ));

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground leading-none"
          >
            {label}
            {required && (
              <span className="text-danger ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {/* Trigger container */}
        <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
          <button
            type="button"
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-required={required}
            disabled={disabled}
            onClick={() => !disabled && setOpen((o) => !o)}
            className={triggerVariants({ size, state: resolvedState })}
          >
            <span className={cn("truncate", !selectedOption && "text-foreground-subtle")}>
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronIcon open={open} />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              id={listboxId}
              role="listbox"
              className={cn(
                "absolute z-50 w-full mt-1",
                "bg-surface-overlay border border-border rounded-[var(--radius-md)]",
                "shadow-lg overflow-hidden",
                "animate-in fade-in-0 zoom-in-95 duration-100"
              )}
            >
              {/* Arama */}
              {searchable && (
                <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                  <SearchIcon />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Ara..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-subtle outline-none"
                  />
                </div>
              )}

              <div className="p-1 max-h-56 overflow-y-auto">
                {/* Gruplu */}
                {groups.length > 0
                  ? groups.map((group) => {
                      const filtered = filterOptions(group.options);
                      if (!filtered.length) return null;
                      return (
                        <div key={group.label}>
                          <p className="px-3 py-1.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                            {group.label}
                          </p>
                          {renderOptions(group.options)}
                        </div>
                      );
                    })
                  : renderOptions(options)}

                {/* Sonuç yok */}
                {allOptions.length > 0 &&
                  filterOptions(allOptions).length === 0 && (
                    <p className="px-3 py-4 text-sm text-center text-foreground-subtle">
                      Sonuç bulunamadı.
                    </p>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Feedback */}
        {feedbackText && (
          <p className={cn("text-xs leading-none", feedbackColor)}>
            {feedbackText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
