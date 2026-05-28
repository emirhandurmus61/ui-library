"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Progress } from "@/components/ui/progress";
import { Table, type TableColumn } from "@/components/ui/table";

/* ─── Icons ──────────────────────────────────────────────────── */

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ConversionIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

interface OrderRow {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  status: "completed" | "pending" | "cancelled";
  date: string;
}

/* ─── Sidebar ────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { icon: <HomeIcon />,    label: "Genel Bakış",  active: true },
  { icon: <ChartIcon />,   label: "Analitik",     active: false },
  { icon: <PackageIcon />, label: "Siparişler",   active: false },
  { icon: <UsersIcon />,   label: "Müşteriler",   active: false },
  { icon: <SettingsIcon />,label: "Ayarlar",      active: false },
];

function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 h-full bg-surface border-r border-border">
      {/* Logo */}
      <div className="h-14 px-5 flex items-center border-b border-border shrink-0">
        <span className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-[var(--radius-lg)] bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">D</span>
          <span className="font-semibold text-sm text-foreground">Dashboard</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-150",
              item.active
                ? "bg-primary-subtle text-primary"
                : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
            )}
          >
            <span className={cn("size-4 flex items-center justify-center", item.active ? "text-primary" : "text-foreground-subtle")}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-[var(--radius-md)] hover:bg-background-muted transition-colors cursor-pointer">
          <Avatar size="sm" name="Emirhan D." />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">Emirhan D.</p>
            <p className="text-xs text-foreground-subtle truncate">emirhan@myapp.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── Main component ─────────────────────────────────────────── */

const ORDERS: OrderRow[] = [
  { id: "#1042", customer: "Ayşe Kaya",     email: "ayse@mail.com",   product: "Pro Plan",    amount: "₺299",  status: "completed",  date: "28 May" },
  { id: "#1041", customer: "Mehmet Yılmaz", email: "mehmet@mail.com", product: "Starter",     amount: "₺99",   status: "pending",    date: "27 May" },
  { id: "#1040", customer: "Fatma Demir",   email: "fatma@mail.com",  product: "Enterprise",  amount: "₺899",  status: "completed",  date: "26 May" },
  { id: "#1039", customer: "Ali Çelik",     email: "ali@mail.com",    product: "Pro Plan",    amount: "₺299",  status: "cancelled",  date: "25 May" },
  { id: "#1038", customer: "Zeynep Arslan", email: "zeynep@mail.com", product: "Starter",     amount: "₺99",   status: "completed",  date: "24 May" },
];

const statusBadge: Record<OrderRow["status"], { variant: "success" | "warning" | "danger"; label: string }> = {
  completed: { variant: "success", label: "Tamamlandı" },
  pending:   { variant: "warning", label: "Bekliyor" },
  cancelled: { variant: "danger",  label: "İptal" },
};

const ORDER_COLS: TableColumn<OrderRow>[] = [
  { key: "id",       header: "Sipariş",   accessor: (r) => <span className="font-mono text-xs font-semibold text-foreground">{r.id}</span> },
  { key: "customer", header: "Müşteri",   accessor: (r) => (
    <div className="flex items-center gap-2">
      <Avatar size="xs" name={r.customer} />
      <div>
        <p className="text-xs font-medium text-foreground">{r.customer}</p>
        <p className="text-xs text-foreground-subtle">{r.email}</p>
      </div>
    </div>
  )},
  { key: "product",  header: "Ürün",      accessor: (r) => <span className="text-sm text-foreground-muted">{r.product}</span> },
  { key: "amount",   header: "Tutar",     accessor: (r) => <span className="text-sm font-semibold text-foreground">{r.amount}</span> },
  { key: "status",   header: "Durum",     accessor: (r) => <Badge variant={statusBadge[r.status].variant} size="sm">{statusBadge[r.status].label}</Badge> },
  { key: "date",     header: "Tarih",     accessor: (r) => <span className="text-xs text-foreground-subtle">{r.date}</span> },
];

const PROJECTS = [
  { name: "Web App Redesign",    progress: 78, color: "primary" as const,  team: 4 },
  { name: "Mobile v2.0",        progress: 45, color: "info" as const,     team: 6 },
  { name: "API Entegrasyonu",   progress: 92, color: "success" as const,  team: 2 },
  { name: "Marketing Sitesi",   progress: 33, color: "warning" as const,  team: 3 },
];

export function DashboardTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 px-4 lg:px-6 flex items-center justify-between border-b border-border bg-surface/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-[var(--radius-md)] hover:bg-background-muted text-foreground-muted"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Menüyü aç"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
              </svg>
            </button>
            <h1 className="text-sm font-semibold text-foreground">Genel Bakış</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-[var(--radius-md)] hover:bg-background-muted text-foreground-muted transition-colors">
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-danger" />
            </button>
            <Avatar size="sm" name="Emirhan D." />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-foreground">Genel Bakış</h2>
              <p className="text-sm text-foreground-muted mt-0.5">28 Mayıs 2026 · Pazartesi</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" leftIcon={<DownloadIcon />}>Rapor Al</Button>
              <Button size="sm" leftIcon={<PlusIcon />}>Yeni Sipariş</Button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Toplam Gelir"
              value="₺48.295"
              description="Bu ay"
              trend={{ value: "+12.5%", direction: "up", label: "geçen aya göre" }}
              icon={<RevenueIcon />}
              iconColor="success"
            />
            <StatCard
              title="Aktif Kullanıcı"
              value="2.847"
              description="Şu an online"
              trend={{ value: "+8.2%", direction: "up", label: "geçen haftaya göre" }}
              icon={<UsersIcon />}
              iconColor="primary"
            />
            <StatCard
              title="Toplam Sipariş"
              value="1.204"
              description="Bu ay"
              trend={{ value: "-3.1%", direction: "down", label: "geçen aya göre" }}
              icon={<OrdersIcon />}
              iconColor="warning"
            />
            <StatCard
              title="Dönüşüm Oranı"
              value="%4.72"
              description="Son 30 gün"
              trend={{ value: "+0.4%", direction: "up", label: "geçen aya göre" }}
              icon={<ConversionIcon />}
              iconColor="info"
            />
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Orders table */}
            <div className="xl:col-span-2">
              <Card variant="elevated" padding="none">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Son Siparişler</h3>
                    <p className="text-xs text-foreground-muted mt-0.5">Son 5 işlem</p>
                  </div>
                  <Button variant="ghost" size="sm">Tümünü Gör</Button>
                </div>
                <Table
                  columns={ORDER_COLS}
                  data={ORDERS}
                  keyExtractor={(r) => r.id}
                  hoverable
                />
              </Card>
            </div>

            {/* Projects */}
            <div>
              <Card variant="elevated">
                <CardHeader title="Aktif Projeler" description="4 devam eden proje" />
                <div className="space-y-4">
                  {PROJECTS.map((p) => (
                    <div key={p.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{p.name}</span>
                        <span className="text-xs text-foreground-muted">{p.progress}%</span>
                      </div>
                      <Progress value={p.progress} size="sm" color={p.color} />
                      <p className="text-xs text-foreground-subtle mt-1">{p.team} kişi</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
