import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Accordion, type AccordionItemData } from "@/components/ui/accordion";`;

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

export default function AccordionShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Accordion / Collapse</h1>
        <p className="text-foreground-muted">
          tekli/çoklu açılma · bordered · flush · disabled · a11y (aria-expanded, aria-controls)
        </p>
      </div>

      <ShowcaseSection
        title="Default (Tekli Açılma)"
        description="Bir anda yalnızca bir madde açık kalır."
        importLine={IMPORT}
        code={`<Accordion items={faqItems.slice(0, 4)} />`}
      >
        <Accordion items={faqItems.slice(0, 4)} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Çoklu Açılma (multiple)"
        description="multiple prop ile birden fazla madde aynı anda açık olabilir."
        importLine={IMPORT}
        code={`<Accordion items={faqItems.slice(0, 4)} multiple defaultOpen={["1", "3"]} />`}
      >
        <Accordion items={faqItems.slice(0, 4)} multiple defaultOpen={["1", "3"]} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Flush Variant"
        description="Dış kenarlık olmadan, düz liste görünümü."
        importLine={IMPORT}
        code={`<Accordion items={faqItems.slice(0, 4)} variant="flush" />`}
      >
        <Accordion items={faqItems.slice(0, 4)} variant="flush" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled Madde"
        description="disabled:true olan maddeler etkileşime kapalıdır."
        importLine={IMPORT}
        code={`<Accordion items={faqItems} />`}
      >
        <Accordion items={faqItems} />
      </ShowcaseSection>
    </div>
  );
}
