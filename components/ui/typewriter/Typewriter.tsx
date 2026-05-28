"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface TypewriterProps {
  /** Single string or array of strings to cycle through */
  text: string | string[];
  /** ms per character when typing (default 60) */
  typeSpeed?: number;
  /** ms per character when deleting (default 30) */
  deleteSpeed?: number;
  /** Pause after fully typed before deleting in ms (default 1500) */
  pauseAfterType?: number;
  /** Pause after fully deleted before next string in ms (default 400) */
  pauseAfterDelete?: number;
  /** Loop indefinitely (default true) — false stops after one pass */
  loop?: boolean;
  /** Show blinking cursor (default true) */
  cursor?: boolean;
  /** Custom cursor character (default "|") */
  cursorChar?: string;
  className?: string;
  cursorClassName?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Typewriter({
  text,
  typeSpeed = 60,
  deleteSpeed = 30,
  pauseAfterType = 1500,
  pauseAfterDelete = 400,
  loop = true,
  cursor = true,
  cursorChar = "|",
  className,
  cursorClassName,
}: TypewriterProps) {
  const texts = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "pause-delete">("typing");
  const [textIdx, setTextIdx] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Inject blink keyframe once — avoids inline <style> SSR mismatch
  useEffect(() => {
    const styleId = "tw-blink-keyframes";
    if (document.getElementById(styleId)) return;
    const el = document.createElement("style");
    el.id = styleId;
    el.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
    `;
    document.head.appendChild(el);
  }, []);

  useEffect(() => {
    if (reduced) {
      setDisplayed(texts[texts.length - 1]);
      return;
    }

    const current = texts[textIdx];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        timerRef.current = setTimeout(() => setPhase("pausing"), pauseAfterType);
      }
    } else if (phase === "pausing") {
      if (texts.length === 1 && !loop) return; // done
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deleteSpeed);
      } else {
        timerRef.current = setTimeout(() => setPhase("pause-delete"), pauseAfterDelete);
      }
    } else if (phase === "pause-delete") {
      const nextIdx = (textIdx + 1) % texts.length;
      if (nextIdx === 0 && !loop) return;
      setTextIdx(nextIdx);
      setPhase("typing");
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, phase, textIdx, reduced]);

  return (
    <span className={cn("inline", className)}>
      {displayed}
      {cursor && (
        <span
          className={cn(
            "inline-block w-[2px] ml-[1px] align-middle",
            "animate-[blink_1s_step-end_infinite]",
            cursorClassName
          )}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
