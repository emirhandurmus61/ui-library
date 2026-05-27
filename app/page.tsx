import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-xl">
        <div className="inline-flex items-center gap-2 bg-primary-subtle text-primary text-sm font-medium px-3 py-1 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Geliştirme aşamasında
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          UI Library
        </h1>

        <p className="text-foreground-muted text-lg mb-8">
          Next.js · React · Tailwind CSS v4 ile hazırlanmış
          kişisel bileşen kütüphanesi.
        </p>

        <Link
          href="/showcase"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Showcase'e Git
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
