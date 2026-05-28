"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────── */

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 opacity-20" aria-hidden="true">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const PROJECTS = [
  {
    title: "E-Ticaret Platformu",
    desc: "Next.js ve Stripe ile geliştirilmiş tam kapsamlı alışveriş deneyimi. Gerçek zamanlı stok takibi ve ödeme entegrasyonu içerir.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    gradientFrom: "from-violet-500",
    gradientTo: "to-indigo-600",
  },
  {
    title: "AI Görev Yöneticisi",
    desc: "Yapay zeka destekli görev önceliklendirme. Kullanıcının alışkanlıklarına göre otomatik planlama yapar.",
    tags: ["React", "Python", "OpenAI", "FastAPI"],
    gradientFrom: "from-emerald-400",
    gradientTo: "to-cyan-600",
  },
  {
    title: "Sosyal Analitik Paneli",
    desc: "Birden fazla sosyal medya platformunu tek panelde takip eden analitik aracı. Gerçek zamanlı veriler.",
    tags: ["Vue.js", "Node.js", "Redis", "Chart.js"],
    gradientFrom: "from-rose-400",
    gradientTo: "to-pink-600",
  },
];

const SKILLS = [
  {
    group: "Frontend",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Framer Motion"],
  },
  {
    group: "Backend",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    group: "Araçlar",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    items: ["Git", "Docker", "Figma", "AWS", "Vercel", "GitHub Actions"],
  },
];

const EXPERIENCES = [
  {
    company: "TechCorp Istanbul",
    role: "Senior Frontend Developer",
    date: "2024 – Günümüz",
    desc: "React ve Next.js kullanarak büyük ölçekli SaaS ürünleri geliştirdim. Performans optimizasyonlarıyla Lighthouse skorunu 60'tan 98'e çıkardım.",
  },
  {
    company: "StartupX",
    role: "Full Stack Developer",
    date: "2022 – 2024",
    desc: "Sıfırdan MVP geliştirdim. Node.js backend ve React frontend ile 50.000+ kullanıcıya ulaşan ürün oluşturdum.",
  },
  {
    company: "DigitalAgency",
    role: "Frontend Developer",
    date: "2020 – 2022",
    desc: "Kurumsal müşteriler için responsive web uygulamaları geliştirdim. A/B testleri ile dönüşüm oranını %35 artırdım.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Ahmet, projemizin en kritik aşamasında ekibimize katıldı ve teknik borcumuzu hızla temizledi. Kalitesi ve hızı inanılmaz.",
    author: "Zeynep Arslan",
    role: "CTO, StartupX",
  },
  {
    quote: "Sadece kod yazmıyor, ürün düşüncesiyle yaklaşıyor. Hem teknik hem de kullanıcı deneyimi konusunda değerli geri bildirimler aldık.",
    author: "Murat Demir",
    role: "Kurucu, ProductLab",
  },
];

/* ─── Sections ───────────────────────────────────────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Hakkımda", "Projeler", "Beceriler", "İletişim"];

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm select-none">
            AK
          </span>
          <span className="font-semibold text-sm text-foreground hidden sm:block">Ahmet Kaya</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<DownloadIcon />}>
            CV İndir
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-md text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-foreground-muted hover:text-foreground transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {l}
            </a>
          ))}
          <Button variant="outline" size="sm" leftIcon={<DownloadIcon />} className="w-fit">
            CV İndir
          </Button>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="order-2 md:order-1">
          <p className="text-foreground-muted text-base mb-2">Merhaba, Ben</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Ahmet Kaya
            </span>
          </h1>

          <div className="mb-4">
            <Badge variant="secondary" size="lg">Full Stack Developer</Badge>
          </div>

          <p className="text-foreground-muted leading-relaxed mb-8 max-w-md">
            5 yıllık deneyimle modern web uygulamaları geliştiren, kullanıcı odaklı çözümler üreten bir yazılım geliştiriciyim. React, Next.js ve Node.js ekosistemlerinde uzmanım.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button stylePreset="gradient" size="lg" rightIcon={<ArrowRightIcon />}>
              Projelerimi Gör
            </Button>
            <Button variant="outline" size="lg">
              İletişime Geç
            </Button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <GitHubIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <LinkedInIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <TwitterIcon />
            </Button>
          </div>
        </div>

        {/* Right – avatar placeholder */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-violet-400 via-indigo-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30">
              <div className="w-52 h-52 md:w-68 md:h-68 rounded-full bg-background-subtle flex items-center justify-center overflow-hidden">
                <Avatar size="2xl" name="Ahmet Kaya" />
              </div>
            </div>
            {/* Status badge */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-2">
              <Badge variant="success" size="md" dot dotColor="success">
                Müsait
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="py-16 px-4 bg-background-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Portföy</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Seçilmiş Projeler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.title} variant="interactive" padding="none" className="group overflow-hidden">
              {/* Image placeholder */}
              <div className="relative aspect-video overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo}`} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <Button variant="ghost" size="icon-sm" stylePreset="glass" aria-label="GitHub">
                      <GitHubIcon />
                    </Button>
                    <Button variant="ghost" size="icon-sm" stylePreset="glass" aria-label="Demo">
                      <ExternalLinkIcon />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                <p className="text-sm text-foreground-muted mb-3 leading-relaxed line-clamp-2">{project.desc}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">{tag}</Badge>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button variant="ghost" size="xs" leftIcon={<GitHubIcon />}>GitHub</Button>
                  <Button variant="outline" size="xs" leftIcon={<ExternalLinkIcon />}>Demo</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Stack</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Teknolojiler</h2>
        </div>

        <div className="space-y-8">
          {SKILLS.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-transform hover:scale-105 cursor-default ${group.color}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="py-16 px-4 bg-background-subtle">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Kariyer</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Deneyim</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative pl-12 md:pl-16">
                {/* Circle dot */}
                <div className="absolute left-[13px] md:left-[21px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background ring-2 ring-primary/30" aria-hidden="true" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="outline" size="sm" className="w-fit shrink-0">{exp.date}</Badge>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Referanslar</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ne Diyorlar?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <Card key={t.author} variant="elevated" className="relative">
              <QuoteIcon />
              <p className="text-foreground-muted leading-relaxed mb-6 mt-2 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar size="sm" name={t.author} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-foreground-muted">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section className="py-16 px-4 bg-background-subtle">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">İletişim</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">İletişime Geç</h2>
          <p className="text-foreground-muted">Proje fikriniz mi var? Birlikte konuşalım.</p>
        </div>

        {submitted ? (
          <Card variant="elevated" className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-success-subtle flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-8 text-success" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Mesajınız İletildi!</h3>
            <p className="text-foreground-muted text-sm">En kısa sürede size dönüş yapacağım.</p>
          </Card>
        ) : (
          <Card variant="elevated">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="portfolio-name" className="block text-sm font-medium text-foreground mb-1.5">
                  Ad Soyad
                </label>
                <input
                  id="portfolio-name"
                  type="text"
                  required
                  placeholder="Ali Yılmaz"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  className="w-full h-10 px-3 text-sm rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-2 focus:outline-offset-2 focus:outline-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="portfolio-email" className="block text-sm font-medium text-foreground mb-1.5">
                  E-posta
                </label>
                <input
                  id="portfolio-email"
                  type="email"
                  required
                  placeholder="ali@ornek.com"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  className="w-full h-10 px-3 text-sm rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-2 focus:outline-offset-2 focus:outline-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="portfolio-message" className="block text-sm font-medium text-foreground mb-1.5">
                  Mesaj
                </label>
                <textarea
                  id="portfolio-message"
                  required
                  rows={5}
                  placeholder="Projeniz hakkında bilgi verin..."
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-foreground-subtle focus:outline-2 focus:outline-offset-2 focus:outline-primary transition-colors resize-none"
                />
              </div>
              <Button
                type="submit"
                stylePreset="gradient"
                size="lg"
                className="w-full"
                loading={loading}
                rightIcon={<ArrowRightIcon />}
              >
                Mesaj Gönder
              </Button>
            </form>
          </Card>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs select-none">
            AK
          </span>
          <span className="text-sm font-medium text-foreground">Ahmet Kaya</span>
        </div>

        <p className="text-xs text-foreground-subtle">© 2026 Ahmet Kaya. Tüm hakları saklıdır.</p>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="GitHub">
            <GitHubIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="LinkedIn">
            <LinkedInIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Twitter">
            <TwitterIcon />
          </Button>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function PortfolioLandingTemplate() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
