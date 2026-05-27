import { List, ListItem } from "@/components/ui/list";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

function UserIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function FileIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
}
function ChevronRightIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>;
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

export default function ListShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">List / List Item</h1>
        <p className="text-foreground-muted">
          default · bordered · flush · ghost · leading/trailing slot · interactive · selected
        </p>
      </div>

      <Section title="Bordered (İkon + Trailing)">
        <List variant="bordered">
          <ListItem
            leading={<UserIcon />}
            title="Emirhan Durmuş"
            description="emirhan@example.com"
            trailing={<Badge variant="primary" size="sm">Admin</Badge>}
          />
          <ListItem
            leading={<UserIcon />}
            title="Ayşe Kaya"
            description="ayse@example.com"
            trailing={<Badge variant="secondary" size="sm">Editor</Badge>}
          />
          <ListItem
            leading={<UserIcon />}
            title="Mehmet Yılmaz"
            description="mehmet@example.com"
            trailing={<Badge variant="secondary" size="sm">Viewer</Badge>}
          />
        </List>
      </Section>

      <Section title="Avatar ile">
        <List variant="bordered">
          {["Zeynep Çelik", "Ali Öztürk", "Fatma Demir"].map((name, i) => (
            <ListItem
              key={name}
              leading={<Avatar name={name} size="sm" />}
              title={name}
              description={`${name.toLowerCase().replace(" ", ".")}@example.com`}
              trailing={<ChevronRightIcon />}
              interactive
            />
          ))}
        </List>
      </Section>

      <Section title="Interactive + Selected">
        <List variant="bordered">
          {["Genel Bakış", "Kullanıcılar", "Ayarlar", "Raporlar"].map((item, i) => (
            <ListItem
              key={item}
              leading={<FileIcon />}
              title={item}
              interactive
              selected={i === 1}
              trailing={i === 1 ? <Badge variant="primary" size="sm">3</Badge> : undefined}
            />
          ))}
        </List>
      </Section>

      <Section title="Flush (border yok)">
        <List variant="flush">
          {["Profil Güncelle", "Şifre Değiştir", "Bildirimler", "Gizlilik"].map((item) => (
            <ListItem
              key={item}
              title={item}
              interactive
              trailing={<ChevronRightIcon />}
            />
          ))}
        </List>
      </Section>

      <Section title="Boyutlar">
        <div className="space-y-4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size}>
              <p className="text-xs text-foreground-subtle mb-2">size="{size}"</p>
              <List variant="bordered">
                <ListItem size={size} title="Liste öğesi başlığı" description="Kısa açıklama metni." leading={<FileIcon />} />
              </List>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
