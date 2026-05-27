import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

const faqItems: AccordionItemData[] = [
  {
    id: "1",
    trigger: "Bu UI kütüphanesi ne için kullanılır?",
    content: "Bu kütüphane, Next.js ve React tabanlı projelerde hızla yüksek kaliteli arayüzler oluşturmak için tasarlanmış yeniden kullanılabilir bileşenlerden oluşmaktadır. Tailwind CSS v4 ile stillendirilmiştir.",
  },
  {
    id: "2",
    trigger: "Dark mode destekli mi?",
    content: "Evet, tüm bileşenler next-themes ile entegre edilmiş tam dark mode desteğine sahiptir. CSS custom property tabanlı token sistemi sayesinde renk geçişleri sorunsuz çalışır.",
  },
  {
    id: "3",
    trigger: "Bileşenler accessibility standartlarını karşılıyor mu?",
    content: "Bileşenler ARIA rolü, aria-expanded, aria-controls, aria-labelledby gibi standart erişilebilirlik attribute'larıyla donatılmıştır. Klavye navigasyonu ve ekran okuyucu uyumluluğuna önem verilmiştir.",
  },
  {
    id: "4",
    trigger: "TypeScript desteği var mı?",
    content: "Evet, tüm bileşenler TypeScript ile yazılmıştır ve kapsamlı tip tanımlarına sahiptir.",
  },
  {
    id: "5",
    trigger: "Bu madde devre dışı.",
    content: "Bu içerik görünmez.",
    disabled: true,
  },
];

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

export default function AccordionShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Accordion / Collapse</h1>
        <p className="text-foreground-muted">
          tekli/çoklu açılma · bordered · flush · disabled · a11y (aria-expanded, aria-controls)
        </p>
      </div>

      <Section title="Default (Tekli Açılma)">
        <Accordion items={faqItems.slice(0, 4)} />
      </Section>

      <Section title="Çoklu Açılma (multiple)">
        <Accordion items={faqItems.slice(0, 4)} multiple defaultOpen={["1", "3"]} />
      </Section>

      <Section title="Flush Variant">
        <Accordion items={faqItems.slice(0, 4)} variant="flush" />
      </Section>

      <Section title="Disabled Madde">
        <Accordion items={faqItems} />
      </Section>
    </div>
  );
}
