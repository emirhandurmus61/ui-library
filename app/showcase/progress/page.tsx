import { Progress } from "@/components/ui/progress";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Progress } from "@/components/ui/progress";`;

export default function ProgressShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Progress Bar</h1>
        <p className="text-sm text-foreground-muted">
          5 renk · 4 boyut · label · değer gösterimi · striped · animated · a11y (role=progressbar)
        </p>
      </div>

      <ShowcaseSection
        title="Renkler"
        description="primary, success, danger, warning ve info renk seçenekleri."
        importLine={IMPORT}
        code={`<Progress value={70} color="primary" label="Primary" showValue />
<Progress value={85} color="success" label="Success" showValue />
<Progress value={45} color="danger"  label="Danger"  showValue />
<Progress value={60} color="warning" label="Warning" showValue />
<Progress value={55} color="info"    label="Info"    showValue />`}
      >
        <div className="space-y-4">
          <Progress value={70} color="primary" label="Primary" showValue />
          <Progress value={85} color="success" label="Success" showValue />
          <Progress value={45} color="danger"  label="Danger"  showValue />
          <Progress value={60} color="warning" label="Warning" showValue />
          <Progress value={55} color="info"    label="Info"    showValue />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyutlar"
        description="xs, sm, md ve lg yükseklik seçenekleri."
        importLine={IMPORT}
        code={`<Progress value={60} size="xs" color="primary" label="xs" />
<Progress value={60} size="sm" color="primary" label="sm" />
<Progress value={60} size="md" color="primary" label="md" />
<Progress value={60} size="lg" color="primary" label="lg" />`}
      >
        <div className="space-y-4">
          <Progress value={60} size="xs" color="primary" label="xs" />
          <Progress value={60} size="sm" color="primary" label="sm" />
          <Progress value={60} size="md" color="primary" label="md" />
          <Progress value={60} size="lg" color="primary" label="lg" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Striped"
        description="striped prop ile çizgili desen eklenir."
        importLine={IMPORT}
        code={`<Progress value={75} color="primary" label="Yükleniyor..." showValue striped />
<Progress value={50} color="success" striped />`}
      >
        <div className="space-y-4">
          <Progress value={75} color="primary" label="Yükleniyor..." showValue striped />
          <Progress value={50} color="success" striped />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Animasyonlu (indeterminate tarzı)"
        description="animated prop ile dolum animasyonu sürekli oynatılır."
        importLine={IMPORT}
        code={`<Progress value={65} color="info" label="Senkronize ediliyor" animated />`}
      >
        <Progress value={65} color="info" label="Senkronize ediliyor" animated />
      </ShowcaseSection>

      <ShowcaseSection
        title="Çeşitli Değerler"
        description="0-100 aralığında farklı değerler ve tamamlandığında success rengi."
        importLine={IMPORT}
        code={`{[10, 25, 50, 75, 90, 100].map((v) => (
  <Progress key={v} value={v} showValue color={v === 100 ? "success" : "primary"} />
))}`}
      >
        <div className="space-y-4">
          {[10, 25, 50, 75, 90, 100].map((v) => (
            <Progress key={v} value={v} showValue color={v === 100 ? "success" : "primary"} />
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
