import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Avatar, AvatarGroup } from "@/components/ui/avatar";`;

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

export default function AvatarShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Avatar</h1>
        <p className="text-sm text-foreground-muted">
          6 size · görsel / initials / fallback · status dot · AvatarGroup
        </p>
      </div>

      <ShowcaseSection
        title="Görsel (src)"
        description="src prop verildiğinde resim yüklenir; yüklenemezse initials'a düşer."
        importLine={IMPORT}
        code={`<Avatar size="xs"  src="https://i.pravatar.cc/80?img=1" name="Ali Veli" />
<Avatar size="sm"  src="https://i.pravatar.cc/80?img=2" name="Ayşe Kaya" />
<Avatar size="md"  src="https://i.pravatar.cc/80?img=3" name="Mehmet Yıldız" />
<Avatar size="lg"  src="https://i.pravatar.cc/80?img=4" name="Fatma Şahin" />
<Avatar size="xl"  src="https://i.pravatar.cc/80?img=5" name="Hüseyin Demir" />
<Avatar size="2xl" src="https://i.pravatar.cc/80?img=6" name="Zeynep Arslan" />`}
        previewClassName="flex flex-wrap items-end gap-4"
      >
        <Avatar size="xs"  src="https://i.pravatar.cc/80?img=1"  name="Ali Veli" />
        <Avatar size="sm"  src="https://i.pravatar.cc/80?img=2"  name="Ayşe Kaya" />
        <Avatar size="md"  src="https://i.pravatar.cc/80?img=3"  name="Mehmet Yıldız" />
        <Avatar size="lg"  src="https://i.pravatar.cc/80?img=4"  name="Fatma Şahin" />
        <Avatar size="xl"  src="https://i.pravatar.cc/80?img=5"  name="Hüseyin Demir" />
        <Avatar size="2xl" src="https://i.pravatar.cc/80?img=6"  name="Zeynep Arslan" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Initials (isimden otomatik renk)"
        description="src yoksa name'den initials ve deterministik arka plan rengi üretilir."
        importLine={IMPORT}
        code={`<Avatar size="xs"  name="Ali Veli" />
<Avatar size="sm"  name="Emirhan Durmuş" />
<Avatar size="md"  name="Ayşe Kaya" />
<Avatar size="lg"  name="Mehmet Yıldız" />
<Avatar size="xl"  name="Fatma Şahin" />
<Avatar size="2xl" name="Hüseyin Demir" />`}
        previewClassName="flex flex-wrap items-end gap-4"
      >
        <Avatar size="xs"  name="Ali Veli" />
        <Avatar size="sm"  name="Emirhan Durmuş" />
        <Avatar size="md"  name="Ayşe Kaya" />
        <Avatar size="lg"  name="Mehmet Yıldız" />
        <Avatar size="xl"  name="Fatma Şahin" />
        <Avatar size="2xl" name="Hüseyin Demir" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Fallback (src yok, isim yok)"
        description="Ne src ne name verilmezse varsayılan ikon veya özel fallbackIcon gösterilir."
        importLine={IMPORT}
        code={`<Avatar size="sm" />
<Avatar size="md" />
<Avatar size="lg" fallbackIcon={<UserIcon />} />
<Avatar size="xl" fallbackIcon={<BotIcon />} />`}
        previewClassName="flex flex-wrap items-end gap-4"
      >
        <Avatar size="sm" />
        <Avatar size="md" />
        <Avatar size="lg" fallbackIcon={<UserIcon />} />
        <Avatar size="xl" fallbackIcon={<BotIcon />} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Bozuk src → Initials Fallback"
        description="Geçersiz src verildiğinde bileşen otomatik olarak initials'a döner."
        importLine={IMPORT}
        code={`<Avatar size="md" src="https://hata.invalid/img.jpg" name="Emirhan Durmuş" />
<Avatar size="lg" src="https://hata.invalid/img.jpg" name="Ayşe Kaya" />`}
        previewClassName="flex flex-wrap items-end gap-4"
      >
        <Avatar size="md" src="https://hata.invalid/img.jpg" name="Emirhan Durmuş" />
        <Avatar size="lg" src="https://hata.invalid/img.jpg" name="Ayşe Kaya" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Status Dot"
        description="status prop ile online/busy/away/offline göstergesi eklenir."
        importLine={IMPORT}
        code={`<Avatar size="md" name="Ali Veli" status="online" />
<Avatar size="md" name="Ayşe Kaya" status="busy" />
<Avatar size="md" name="Mehmet Yıldız" status="away" />
<Avatar size="md" name="Fatma Şahin" status="offline" />`}
        previewClassName="flex flex-wrap items-end gap-4"
      >
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
      </ShowcaseSection>

      <ShowcaseSection
        title="AvatarGroup"
        description="max prop ile aşılan avatarlar +N olarak gruplanır."
        importLine={IMPORT}
        code={`<AvatarGroup
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
/>`}
      >
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
      </ShowcaseSection>
    </div>
  );
}
