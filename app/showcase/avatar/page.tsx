import { Avatar, AvatarGroup } from "@/components/ui/avatar";

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="flex flex-wrap items-end gap-4">{children}</div>
    </section>
  );
}

export default function AvatarShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Avatar</h1>
        <p className="text-foreground-muted">
          6 size · görsel / initials / fallback · status dot · AvatarGroup
        </p>
      </div>

      {/* Görsel */}
      <Section title="Görsel (src)">
        <Avatar size="xs"  src="https://i.pravatar.cc/80?img=1"  name="Ali Veli" />
        <Avatar size="sm"  src="https://i.pravatar.cc/80?img=2"  name="Ayşe Kaya" />
        <Avatar size="md"  src="https://i.pravatar.cc/80?img=3"  name="Mehmet Yıldız" />
        <Avatar size="lg"  src="https://i.pravatar.cc/80?img=4"  name="Fatma Şahin" />
        <Avatar size="xl"  src="https://i.pravatar.cc/80?img=5"  name="Hüseyin Demir" />
        <Avatar size="2xl" src="https://i.pravatar.cc/80?img=6"  name="Zeynep Arslan" />
      </Section>

      {/* Initials (src yok) */}
      <Section title="Initials (isimden otomatik renk)">
        <Avatar size="xs"  name="Ali Veli" />
        <Avatar size="sm"  name="Emirhan Durmuş" />
        <Avatar size="md"  name="Ayşe Kaya" />
        <Avatar size="lg"  name="Mehmet Yıldız" />
        <Avatar size="xl"  name="Fatma Şahin" />
        <Avatar size="2xl" name="Hüseyin Demir" />
      </Section>

      {/* Fallback ikonlar */}
      <Section title="Fallback (src yok, isim yok)">
        <Avatar size="sm" />
        <Avatar size="md" />
        <Avatar size="lg" fallbackIcon={<UserIcon />} />
        <Avatar size="xl" fallbackIcon={<BotIcon />} />
      </Section>

      {/* Hatalı src → initials'a düşer */}
      <Section title="Bozuk src → Initials Fallback">
        <Avatar size="md" src="https://hata.invalid/img.jpg" name="Emirhan Durmuş" />
        <Avatar size="lg" src="https://hata.invalid/img.jpg" name="Ayşe Kaya" />
      </Section>

      {/* Status */}
      <Section title="Status Dot">
        <div className="flex flex-col items-center gap-1">
          <Avatar size="md" name="Ali Veli" status="online" />
          <span className="text-xs text-foreground-muted">online</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Avatar size="md" name="Ayşe Kaya" status="busy" />
          <span className="text-xs text-foreground-muted">busy</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Avatar size="md" name="Mehmet Yıldız" status="away" />
          <span className="text-xs text-foreground-muted">away</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Avatar size="md" name="Fatma Şahin" status="offline" />
          <span className="text-xs text-foreground-muted">offline</span>
        </div>
        <Avatar size="lg" src="https://i.pravatar.cc/80?img=7" name="Hüseyin" status="online" />
        <Avatar size="xl" src="https://i.pravatar.cc/80?img=8" name="Zeynep" status="busy" />
      </Section>

      {/* AvatarGroup */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
          AvatarGroup
        </h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-foreground-muted">sm · max 4</p>
            <AvatarGroup
              size="sm"
              max={4}
              avatars={[
                { name: "Emirhan Durmuş" },
                { name: "Ayşe Kaya" },
                { name: "Mehmet Yıldız" },
                { name: "Fatma Şahin" },
                { name: "Hüseyin Demir" },
                { name: "Zeynep Arslan" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-foreground-muted">md · max 5 · görsel</p>
            <AvatarGroup
              size="md"
              max={5}
              avatars={[
                { src: "https://i.pravatar.cc/80?img=1", name: "Ali" },
                { src: "https://i.pravatar.cc/80?img=2", name: "Ayşe" },
                { src: "https://i.pravatar.cc/80?img=3", name: "Mehmet" },
                { src: "https://i.pravatar.cc/80?img=4", name: "Fatma" },
                { src: "https://i.pravatar.cc/80?img=5", name: "Hüseyin" },
                { name: "Zeynep Arslan" },
                { name: "Emre Çelik" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-foreground-muted">lg · max 3</p>
            <AvatarGroup
              size="lg"
              max={3}
              avatars={[
                { name: "Emirhan Durmuş" },
                { name: "Ayşe Kaya" },
                { name: "Mehmet Yıldız" },
                { name: "Fatma Şahin" },
                { name: "Hüseyin Demir" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Avatar, AvatarGroup } from "@/components/ui/avatar";

// Görsel
<Avatar src="/user.jpg" name="Ali Veli" size="lg" />

// Initials (src yoksa otomatik)
<Avatar name="Emirhan Durmuş" size="md" />

// Status dot
<Avatar name="Ayşe" status="online" />

// AvatarGroup (max'ı aşanlar +N olarak gösterilir)
<AvatarGroup
  size="md"
  max={4}
  avatars={[
    { name: "Ali Veli" },
    { src: "/user.jpg", name: "Ayşe" },
  ]}
/>`}
        </pre>
      </section>
    </div>
  );
}
