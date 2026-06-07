import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { EmptyState } from "@/components/ui/empty-state";`;

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 text-foreground-subtle" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 text-foreground-subtle" aria-hidden="true">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 text-foreground-subtle" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

export default function EmptyStateShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Empty State</h1>
        <p className="text-sm text-foreground-muted">
          özel ikon · başlık + açıklama · CTA butonu · 3 boyut
        </p>
      </div>

      <ShowcaseSection
        title="Temel Kullanım"
        description="title ve description ile minimal boş durum gösterimi."
        importLine={IMPORT}
        code={`<EmptyState
  title="Henüz Veri Yok"
  description="Başlamak için yeni bir öğe ekleyin."
/>`}
      >
        <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
          <EmptyState
            title="Henüz Veri Yok"
            description="Başlamak için yeni bir öğe ekleyin."
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="CTA ile"
        description="action prop ile kullanıcıyı yönlendiren aksiyon butonu eklenir."
        importLine={IMPORT}
        code={`<EmptyState
  title="Proje Bulunamadı"
  description="Henüz hiç proje oluşturmadınız."
  action={<Button>Proje Oluştur</Button>}
/>`}
      >
        <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
          <EmptyState
            title="Proje Bulunamadı"
            description="Henüz hiç proje oluşturmadınız. İlk projenizi oluşturmak için aşağıdaki butona tıklayın."
            action={<Button>Proje Oluştur</Button>}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel İkon"
        description="icon prop ile bağlama uygun özel ikon kullanılır."
        importLine={IMPORT}
        code={`<EmptyState icon={<SearchIcon />} title="Sonuç Yok" description="Arama kriterlerinizi değiştirin." size="sm" />
<EmptyState icon={<InboxIcon />} title="Gelen Kutusu Boş" description="Yeni mesajınız yok." size="sm" />
<EmptyState icon={<FolderIcon />} title="Klasör Boş" description="Dosya yükleyin." size="sm" action={<Button size="sm" variant="outline">Yükle</Button>} />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
            <EmptyState
              icon={<SearchIcon />}
              title="Sonuç Yok"
              description="Arama kriterlerinizi değiştirin."
              size="sm"
            />
          </div>
          <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
            <EmptyState
              icon={<InboxIcon />}
              title="Gelen Kutusu Boş"
              description="Yeni mesajınız yok."
              size="sm"
            />
          </div>
          <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
            <EmptyState
              icon={<FolderIcon />}
              title="Klasör Boş"
              description="Dosya yükleyin."
              size="sm"
              action={<Button size="sm" variant="outline">Yükle</Button>}
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyutlar"
        description="sm, md ve lg boyut seçenekleriyle iç dolgu ve tipografi ölçeklenir."
        importLine={IMPORT}
        code={`<EmptyState title="Küçük" description="sm boyutu." size="sm" />
<EmptyState title="Orta"  description="md boyutu." size="md" />
<EmptyState title="Büyük" description="lg boyutu." size="lg" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
            <EmptyState title="Küçük" description="sm boyutu." size="sm" />
          </div>
          <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
            <EmptyState title="Orta" description="md boyutu." size="md" />
          </div>
          <div className="border border-border rounded-[var(--radius-xl)] bg-surface">
            <EmptyState title="Büyük" description="lg boyutu." size="lg" />
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
