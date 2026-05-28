"use client";

import {
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface CountryCode {
  code: string;
  flag: string;
  name: string;
  abbr: string;
}

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  className?: string;
}

/* ─── Country data ───────────────────────────────────────────── */

const COUNTRIES: CountryCode[] = [
  { code: "+90",  flag: "🇹🇷", name: "Türkiye",        abbr: "TR" },
  { code: "+1",   flag: "🇺🇸", name: "United States",  abbr: "US" },
  { code: "+44",  flag: "🇬🇧", name: "United Kingdom", abbr: "GB" },
  { code: "+49",  flag: "🇩🇪", name: "Germany",        abbr: "DE" },
  { code: "+33",  flag: "🇫🇷", name: "France",         abbr: "FR" },
  { code: "+971", flag: "🇦🇪", name: "UAE",            abbr: "AE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia",   abbr: "SA" },
  { code: "+81",  flag: "🇯🇵", name: "Japan",          abbr: "JP" },
  { code: "+86",  flag: "🇨🇳", name: "China",          abbr: "CN" },
  { code: "+7",   flag: "🇷🇺", name: "Russia",         abbr: "RU" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands",    abbr: "NL" },
  { code: "+39",  flag: "🇮🇹", name: "Italy",          abbr: "IT" },
  { code: "+34",  flag: "🇪🇸", name: "Spain",          abbr: "ES" },
  { code: "+1",   flag: "🇨🇦", name: "Canada",         abbr: "CA" },
  { code: "+61",  flag: "🇦🇺", name: "Australia",      abbr: "AU" },
];

/* ─── Helpers ────────────────────────────────────────────────── */

function formatPhoneNumber(digits: string): string {
  // Remove all non-digits
  const clean = digits.replace(/\D/g, "");

  if (clean.length === 0) return "";

  // Basic grouping: groups of 3-3-4 (international style)
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
  if (clean.length <= 10)
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 10)} ${clean.slice(10, 14)}`;
}

function parseValue(
  full: string,
  countries: CountryCode[]
): { country: CountryCode; number: string } {
  // Try to match country code prefix
  for (const c of countries.slice().sort((a, b) => b.code.length - a.code.length)) {
    if (full.startsWith(c.code + " ") || full.startsWith(c.code)) {
      const rest = full.slice(c.code.length).trim();
      return { country: c, number: rest };
    }
  }
  const defaultCountry = countries[0];
  return { country: defaultCountry, number: full };
}

/* ─── Component ──────────────────────────────────────────────── */

export function PhoneInput({
  value,
  onChange,
  defaultCountry = "TR",
  label,
  placeholder = "555 123 4567",
  disabled = false,
  errorText,
  className,
}: PhoneInputProps) {
  const id = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const initialCountry = useMemo(
    () => COUNTRIES.find((c) => c.abbr === defaultCountry) ?? COUNTRIES[0],
    [defaultCountry]
  );

  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(() => {
    if (value) {
      const parsed = parseValue(value, COUNTRIES);
      return parsed.country;
    }
    return initialCountry;
  });

  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    if (value) {
      const parsed = parseValue(value, COUNTRIES);
      return parsed.number;
    }
    return "";
  });

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Sync from controlled value
  useEffect(() => {
    if (value !== undefined) {
      const parsed = parseValue(value, COUNTRIES);
      setSelectedCountry(parsed.country);
      setPhoneNumber(parsed.number);
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  // Focus search on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredCountries = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.abbr.toLowerCase().includes(q) ||
        c.code.includes(q)
    );
  }, [search]);

  const handleCountrySelect = useCallback(
    (country: CountryCode) => {
      setSelectedCountry(country);
      setIsOpen(false);
      setSearch("");
      const combined = `${country.code} ${phoneNumber}`.trim();
      onChange?.(combined);
    },
    [phoneNumber, onChange]
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const formatted = formatPhoneNumber(raw);
      setPhoneNumber(formatted);
      const combined = `${selectedCountry.code} ${formatted}`.trim();
      onChange?.(combined);
    },
    [selectedCountry, onChange]
  );

  const hasError = Boolean(errorText);

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label
          htmlFor={`${id}-phone`}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative flex items-center",
          "border rounded-[var(--radius-md)] bg-surface",
          "transition-colors duration-150",
          hasError
            ? "border-danger focus-within:ring-2 focus-within:ring-danger/20 focus-within:border-danger"
            : "border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed"
        )}
      >
        {/* Country selector */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={`Country: ${selectedCountry.name}`}
            onClick={() => setIsOpen((o) => !o)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 h-10 pl-3 pr-2",
              "text-sm font-medium text-foreground",
              "border-r border-border",
              "hover:bg-background-muted",
              "rounded-l-[var(--radius-md)]",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:bg-background-muted"
            )}
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="font-mono text-foreground-muted text-xs">
              {selectedCountry.code}
            </span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "size-3 text-foreground-subtle transition-transform duration-150",
                isOpen && "rotate-180"
              )}
              aria-hidden="true"
            >
              <polyline points="3,6 8,11 13,6" />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div
              role="listbox"
              aria-label="Select country"
              className={cn(
                "absolute z-20 top-full left-0 mt-1 w-64",
                "bg-surface border border-border rounded-[var(--radius-md)]",
                "shadow-lg overflow-hidden"
              )}
            >
              {/* Search */}
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-foreground-subtle"
                    aria-hidden="true"
                  >
                    <circle cx="6.5" cy="6.5" r="4" />
                    <line x1="10" y1="10" x2="14" y2="14" />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search country..."
                    className={cn(
                      "w-full h-8 pl-8 pr-3 text-sm",
                      "bg-background-muted border border-border rounded-[var(--radius-sm)]",
                      "text-foreground placeholder:text-foreground-subtle",
                      "focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary"
                    )}
                  />
                </div>
              </div>

              {/* Country list */}
              <div className="max-h-48 overflow-y-auto">
                {filteredCountries.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-foreground-muted text-center">
                    No countries found
                  </div>
                ) : (
                  filteredCountries.map((country) => {
                    const isSelected = country.abbr === selectedCountry.abbr;
                    return (
                      <button
                        key={`${country.abbr}-${country.code}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleCountrySelect(country)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2",
                          "text-sm text-left transition-colors duration-100",
                          isSelected
                            ? "bg-primary-subtle text-primary"
                            : "hover:bg-background-muted text-foreground"
                        )}
                      >
                        <span className="text-base shrink-0">{country.flag}</span>
                        <span className="flex-1 truncate">{country.name}</span>
                        <span className="font-mono text-xs text-foreground-muted shrink-0">
                          {country.code}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          id={`${id}-phone`}
          type="tel"
          inputMode="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={cn(
            "flex-1 h-10 px-3 text-sm",
            "bg-transparent text-foreground placeholder:text-foreground-subtle",
            "focus:outline-none",
            "min-w-0"
          )}
        />
      </div>

      {/* Error message */}
      {errorText && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm text-danger flex items-center gap-1.5"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-3.5 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0V5zm.75 7a.875.875 0 100-1.75A.875.875 0 008 12z"
            />
          </svg>
          {errorText}
        </p>
      )}
    </div>
  );
}
