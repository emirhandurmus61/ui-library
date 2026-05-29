"use client";

import { useState } from "react";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { NotificationCenter, type Notification } from "@/components/ui/notification-center";

const INITIAL: Notification[] = [
  { id: "1", type: "social",  title: "Ayşe Kaya sizi takip etmeye başladı",        timestamp: "2 dk",    read: false },
  { id: "2", type: "success", title: "Ödeme başarıyla işlendi",                    message: "₺2.499 tutarındaki Pro aboneliğiniz onaylandı.", timestamp: "15 dk",   read: false, action: { label: "Makbuzu Gör", onClick: () => {} } },
  { id: "3", type: "warning", title: "Disk alanı %85 dolu",                        message: "Depolama alanınız dolmak üzere. Planı yükseltin.", timestamp: "1 sa",    read: false },
  { id: "4", type: "info",    title: "v2.4.0 güncelleme mevcut",                   message: "Yeni bileşenler ve performans iyileştirmeleri eklendi.", timestamp: "3 sa",    read: true  },
  { id: "5", type: "social",  title: "Mehmet Demir yorumunuzu beğendi",            timestamp: "5 sa",    read: true  },
  { id: "6", type: "error",   title: "Webhook isteği başarısız",                   message: "api.example.com adresine bağlanılamadı (timeout).", timestamp: "1 gün",   read: true  },
  { id: "7", type: "system",  title: "Bakım tamamlandı",                           message: "Sistem bakımı başarıyla tamamlandı.", timestamp: "2 gün",   read: true  },
];

export default function NotificationCenterShowcase() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL);

  const markRead = (id: string) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const dismiss = (id: string) =>
    setNotifications(prev => prev.filter(n => n.id !== id));

  const clearAll = () => setNotifications([]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Notification Center</h1>
        <p className="text-foreground-muted">
          Çan ikonuna tıklanınca açılan bildirim paneli. Okundu/okunmadı, filtre ve dismiss desteği.
        </p>
      </div>

      <ShowcaseSection
        title="Interaktif Bildirim Merkezi"
        description="Bell ikonuna tıklayın. Okunmamış bildirimlere tıklayarak okundu işaretleyin, × ile silin."
        importLine={`import { NotificationCenter } from "@/components/ui/notification-center";`}
        code={`const [notifications, setNotifications] = useState(initialNotifications);

<NotificationCenter
  notifications={notifications}
  onMarkRead={(id) => markRead(id)}
  onMarkAllRead={markAllRead}
  onDismiss={(id) => dismiss(id)}
  onClearAll={clearAll}
/>`}
      >
        <div className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] border border-border bg-surface">
          <p className="text-sm text-foreground-muted">Sağdaki çan ikonuna tıklayın →</p>
          <NotificationCenter
            notifications={notifications}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
            onDismiss={dismiss}
            onClearAll={clearAll}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Boş Durum"
        description="Tüm bildirimler silinince boş state görünür."
        importLine={`import { NotificationCenter } from "@/components/ui/notification-center";`}
        code={`<NotificationCenter notifications={[]} />`}
      >
        <div className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] border border-border bg-surface">
          <p className="text-sm text-foreground-muted">Bildirim yok →</p>
          <NotificationCenter notifications={[]} />
        </div>
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Notification Tipi</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>{["Alan","Tip","Açıklama"].map(h=><th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["id","string","Benzersiz kimlik"],
                ["type",'"info"|"success"|"warning"|"error"|"social"|"system"',"Bildirim tipi"],
                ["title","string","Başlık (zorunlu)"],
                ["message","string","Alt açıklama"],
                ["timestamp","string","Zaman etiketi"],
                ["read","boolean","Okundu durumu"],
                ["action","{ label, onClick }","Bildirim aksiyonu"],
              ].map(([p,t,d])=>(
                <tr key={p} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 text-foreground-muted">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
