import { StatCard } from "@/components/ui/stat-card";

function UsersIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function DollarIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
function TrendingIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}
function AlertTriangleIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StatCardShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Stat Card</h1>
        <p className="text-foreground-muted">
          trend (up/down/neutral) · 5 ikon rengi · dashboard istatistik kartı
        </p>
      </div>

      <Section title="Dashboard Örneği">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Toplam Kullanıcı"
            value="12,485"
            icon={<UsersIcon />}
            iconColor="primary"
            trend={{ value: "+12%", direction: "up", label: "geçen aya göre" }}
          />
          <StatCard
            title="Aylık Gelir"
            value="₺84.350"
            icon={<DollarIcon />}
            iconColor="success"
            trend={{ value: "+8.2%", direction: "up", label: "geçen aya göre" }}
          />
          <StatCard
            title="Dönüşüm Oranı"
            value="%3.6"
            icon={<TrendingIcon />}
            iconColor="info"
            trend={{ value: "-0.4%", direction: "down", label: "geçen haftaya göre" }}
          />
          <StatCard
            title="Açık Ticket"
            value="24"
            icon={<AlertTriangleIcon />}
            iconColor="warning"
            trend={{ value: "±0", direction: "neutral", label: "değişim yok" }}
          />
        </div>
      </Section>

      <Section title="İkon Renkleri">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {(["primary", "success", "danger", "warning", "info"] as const).map((color) => (
            <StatCard
              key={color}
              title={color}
              value="1,234"
              icon={<UsersIcon />}
              iconColor={color}
            />
          ))}
        </div>
      </Section>

      <Section title="Açıklama ile (trend olmadan)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Toplam Sipariş"
            value="3,248"
            description="Tüm zamanların toplamı"
          />
          <StatCard
            title="Ortalama Sipariş Değeri"
            value="₺260"
            icon={<DollarIcon />}
            iconColor="success"
            description="Son 30 günlük ortalama"
          />
        </div>
      </Section>
    </div>
  );
}
