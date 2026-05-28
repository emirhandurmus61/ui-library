"use client";

import { LogoWall } from "@/components/ui/logo-wall";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Logo data ───────────────────────────────────────────────── */

const logos = [
  {
    name: "Vercel",
    logo: (
      <span className="text-lg font-black tracking-tight text-foreground">
        ▲ Vercel
      </span>
    ),
  },
  {
    name: "GitHub",
    logo: (
      <span className="text-lg font-bold tracking-tight text-foreground">
        GitHub
      </span>
    ),
  },
  {
    name: "Stripe",
    logo: (
      <span className="text-lg font-extrabold tracking-tight text-[#635bff]">
        Stripe
      </span>
    ),
  },
  {
    name: "Figma",
    logo: (
      <span className="text-lg font-black tracking-tight text-[#f24e1e]">
        Figma
      </span>
    ),
  },
  {
    name: "Notion",
    logo: (
      <span className="text-lg font-bold tracking-tight text-foreground">
        Notion
      </span>
    ),
  },
  {
    name: "Linear",
    logo: (
      <span className="text-lg font-bold tracking-tight text-[#5e6ad2]">
        Linear
      </span>
    ),
  },
  {
    name: "Supabase",
    logo: (
      <span className="text-lg font-extrabold tracking-tight text-[#3ecf8e]">
        Supabase
      </span>
    ),
  },
  {
    name: "PlanetScale",
    logo: (
      <span className="text-lg font-bold tracking-tight text-foreground">
        PlanetScale
      </span>
    ),
  },
  {
    name: "Resend",
    logo: (
      <span className="text-lg font-black tracking-tight text-foreground">
        Resend
      </span>
    ),
  },
  {
    name: "Cloudflare",
    logo: (
      <span className="text-lg font-bold tracking-tight text-[#f6821f]">
        Cloudflare
      </span>
    ),
  },
  {
    name: "Railway",
    logo: (
      <span className="text-lg font-black tracking-tight text-foreground">
        Railway
      </span>
    ),
  },
  {
    name: "Fly.io",
    logo: (
      <span className="text-lg font-bold tracking-tight text-[#8b5cf6]">
        Fly.io
      </span>
    ),
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function LogoWallPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Logo Wall</h1>
        <p className="text-sm text-foreground-muted">
          Marka ve partner logo duvarı. Grid · Marquee modu · grayscale hover efekti
        </p>
      </div>

      <ShowcaseSection title="Grid Modu">
        <LogoWall
          logos={logos}
          marquee={false}
          grayscale
          title="Güvenilen Markalar"
        />
      </ShowcaseSection>

      <ShowcaseSection title="Marquee Modu">
        <LogoWall
          logos={logos}
          marquee={true}
          grayscale
        />
      </ShowcaseSection>

      <ShowcaseSection title="Renkli (grayscale=false)">
        <LogoWall
          logos={logos}
          marquee={false}
          grayscale={false}
          title="Entegrasyonlarımız"
        />
      </ShowcaseSection>
    </div>
  );
}
