"use client";

import { useId, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-8 text-foreground-subtle" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-foreground-muted shrink-0" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-success shrink-0" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ─── Helpers ────────────────────────────────────────────────── */

function formatBytes(bytes: number) {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(file: File) {
  return file.type.startsWith("image/");
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface FileUploadFile {
  file:     File;
  id:       string;
  preview?: string;
  error?:   string;
}

export interface FileUploadProps {
  accept?:        string;
  multiple?:      boolean;
  maxSize?:       number;         // bytes
  maxFiles?:      number;
  label?:         string;
  helperText?:    string;
  errorText?:     string;
  disabled?:      boolean;
  onChange?:      (files: File[]) => void;
  className?:     string;
  id?:            string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  label,
  helperText,
  errorText: errorTextProp,
  disabled = false,
  onChange,
  className,
  id: idProp,
}: FileUploadProps) {
  const autoId   = useId();
  const id       = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  const [files,    setFiles]    = useState<FileUploadFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const processFiles = useCallback(
    (incoming: File[]) => {
      setGlobalError(null);
      const accepted: FileUploadFile[] = [];

      if (maxFiles && files.length + incoming.length > maxFiles) {
        setGlobalError(`En fazla ${maxFiles} dosya yükleyebilirsiniz.`);
        return;
      }

      for (const file of incoming) {
        let error: string | undefined;
        if (maxSize && file.size > maxSize) {
          error = `Dosya çok büyük (max ${formatBytes(maxSize)})`;
        }
        const preview = isImage(file) ? URL.createObjectURL(file) : undefined;
        accepted.push({ file, id: `${Date.now()}-${Math.random()}`, preview, error });
      }

      const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1);
      setFiles(next);
      onChange?.(next.filter((f) => !f.error).map((f) => f.file));
    },
    [files, maxFiles, maxSize, multiple, onChange]
  );

  const removeFile = (id: string) => {
    const next = files.filter((f) => f.id !== id);
    setFiles(next);
    onChange?.(next.filter((f) => !f.error).map((f) => f.file));
  };

  /* ── Drop handlers ────────────────────────────────────────── */

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const dropped = Array.from(e.dataTransfer.files);
    processFiles(dropped);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    processFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const errorText = errorTextProp ?? globalError;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Dosya yükle"
        onDragOver={(e) => { e.preventDefault(); !disabled && setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !disabled && inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3",
          "border-2 border-dashed rounded-[var(--radius-xl)]",
          "p-8 text-center cursor-pointer",
          "transition-colors duration-150",
          dragging
            ? "border-primary bg-primary-subtle/40"
            : "border-border hover:border-border-strong hover:bg-background-muted/50",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          errorText && "border-danger bg-danger-subtle/20"
        )}
      >
        <UploadIcon />
        <div>
          <p className="text-sm font-medium text-foreground">
            {dragging ? "Bırakın" : "Dosyaları sürükleyin veya"}
            {!dragging && (
              <span className="text-primary ml-1 hover:underline">
                seçmek için tıklayın
              </span>
            )}
          </p>
          {(accept || maxSize) && (
            <p className="text-xs text-foreground-subtle mt-1">
              {accept && <span>{accept}</span>}
              {accept && maxSize && <span> · </span>}
              {maxSize && <span>Maks. {formatBytes(maxSize)}</span>}
              {maxFiles && <span> · En fazla {maxFiles} dosya</span>}
            </p>
          )}
        </div>

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onInputChange}
          className="sr-only"
          aria-hidden="true"
        />
      </div>

      {/* Error / helper */}
      {(errorText || helperText) && (
        <p className={cn("text-xs mt-1.5 leading-none", errorText ? "text-danger" : "text-foreground-subtle")}>
          {errorText ?? helperText}
        </p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f) => (
            <li key={f.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-[var(--radius-lg)]",
                "border bg-surface",
                f.error ? "border-danger/30 bg-danger-subtle/20" : "border-border"
              )}
            >
              {/* Preview / icon */}
              {f.preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.preview} alt={f.file.name} className="w-10 h-10 rounded-[var(--radius-md)] object-cover shrink-0" />
              ) : (
                <FileIcon />
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{f.file.name}</p>
                <p className="text-xs text-foreground-subtle">{formatBytes(f.file.size)}</p>
                {f.error && <p className="text-xs text-danger mt-0.5">{f.error}</p>}
              </div>

              {!f.error && <CheckCircleIcon />}

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                className="w-6 h-6 flex items-center justify-center rounded-full text-foreground-subtle hover:text-foreground hover:bg-background-muted transition-colors shrink-0"
                aria-label={`${f.file.name} kaldır`}
              >
                <XIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
