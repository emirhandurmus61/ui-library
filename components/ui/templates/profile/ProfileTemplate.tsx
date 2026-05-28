"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────── */

const USER = {
  name: "Emirhan Durmuş",
  title: "Senior Frontend Engineer",
  location: "İstanbul, Türkiye",
  bio: "React, TypeScript ve UI sistemleri üzerine çalışıyorum. Açık kaynak projeler geliştirmeyi seviyorum.",
  followers: 2841,
  following: 312,
  posts: 47,
};

const POSTS = [
  { id: 1, title: "Tailwind CSS ile Design Token Sistemi", summary: "CSS değişkenleri ve utility classları birleştirerek tutarlı bir tasarım sistemi nasıl oluşturulur?", date: "12 May 2025", likes: 234 },
  { id: 2, title: "React 19 Server Components Rehberi", summary: "RSC mimarisi, client/server sınırları ve performans optimizasyonları hakkında kapsamlı bir inceleme.", date: "3 May 2025", likes: 189 },
  { id: 3, title: "TypeScript Generic Types Derinlemesine", summary: "Conditional types, infer keyword ve mapped types kullanarak gelişmiş tip sistemi tasarlama.", date: "24 Nis 2025", likes: 156 },
  { id: 4, title: "Next.js 16 ile Full-Stack Uygulama", summary: "Server Actions, streaming ve yeni routing sistemi ile modern bir full-stack uygulama geliştirme.", date: "15 Nis 2025", likes: 298 },
];

const PROJECTS = [
  {
    id: 1,
    name: "nexus-ui",
    desc: "React ve Tailwind CSS ile oluşturulmuş açık kaynak UI kütüphanesi. 50+ bileşen içeriyor.",
    tags: ["React", "TypeScript", "Tailwind"],
    stars: 1247,
  },
  {
    id: 2,
    name: "form-wizard",
    desc: "Çok adımlı form yönetimi için hafif ve özelleştirilebilir bir React kütüphanesi.",
    tags: ["React", "Zod", "React Hook Form"],
    stars: 384,
  },
  {
    id: 3,
    name: "theme-engine",
    desc: "CSS değişkenleri tabanlı dinamik tema motoru. SSR uyumlu, sıfır bağımlılık.",
    tags: ["TypeScript", "CSS"],
    stars: 216,
  },
];

const LIKES = [
  { id: 1, title: "Figma'dan Koda: Otomatik Token Aktarımı", author: "Zeynep Arslan", date: "9 May 2025" },
  { id: 2, title: "2025'te Performanslı Web Uygulamaları", author: "Mert Yıldız", date: "7 May 2025" },
  { id: 3, title: "CSS Container Queries ile Gerçek Responsiveness", author: "Ayşe Kaya", date: "1 May 2025" },
  { id: 4, title: "Mikro Frontend Mimarisi: Artıları ve Eksileri", author: "Burak Çelik", date: "26 Nis 2025" },
];

const TABS = ["Gönderiler", "Projeler", "Beğeniler"];

/* ─── StarIcon ───────────────────────────────────────────────── */
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-warning" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-danger" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ─── ProfileTemplate ────────────────────────────────────────── */
export function ProfileTemplate() {
  const [activeTab, setActiveTab] = useState("Gönderiler");
  const [following, setFollowing] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {/* Cover */}
      <div className="h-32 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 relative">
        <div className="absolute bottom-0 left-8 translate-y-1/2">
          <span className="ring-4 ring-background rounded-full block">
            <Avatar name={USER.name} size="2xl" />
          </span>
        </div>
      </div>

      {/* Bio Section */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="pt-14 pb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">{USER.name}</h1>
            <p className="text-sm text-foreground-muted mt-0.5">{USER.title}</p>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-foreground-muted">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {USER.location}
            </div>
            <p className="text-sm text-foreground-muted mt-2 max-w-sm">{USER.bio}</p>

            {/* Stats */}
            <div className="flex items-center gap-5 mt-3">
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{USER.followers.toLocaleString()}</p>
                <p className="text-xs text-foreground-muted">Takipçi</p>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{USER.following}</p>
                <p className="text-xs text-foreground-muted">Takip</p>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{USER.posts}</p>
                <p className="text-xs text-foreground-muted">Gönderi</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 shrink-0">
            <Button
              variant={following ? "outline" : "primary"}
              size="sm"
              onClick={() => setFollowing((f) => !f)}
            >
              {following ? "Takip Ediliyor" : "Takip Et"}
            </Button>
            <Button variant="outline" size="sm">Mesaj</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "Gönderiler" && (
            <div className="grid md:grid-cols-2 gap-4">
              {POSTS.map((post) => (
                <div key={post.id} className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 hover:border-border-strong transition-colors cursor-pointer">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{post.title}</h3>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-3 line-clamp-2">{post.summary}</p>
                  <div className="flex items-center justify-between text-xs text-foreground-muted">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><HeartIcon /> {post.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Projeler" && (
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 hover:border-border-strong transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-primary font-mono">{proj.name}</h3>
                    <span className="flex items-center gap-1 text-xs text-foreground-muted"><StarIcon /> {proj.stars}</span>
                  </div>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-3">{proj.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Beğeniler" && (
            <div className="grid md:grid-cols-2 gap-4">
              {LIKES.map((item) => (
                <div key={item.id} className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 hover:border-border-strong transition-colors cursor-pointer">
                  <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <Avatar name={item.author} size="xs" />
                    <span className="text-xs text-foreground-muted">{item.author}</span>
                    <span className="text-xs text-foreground-muted ml-auto">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
