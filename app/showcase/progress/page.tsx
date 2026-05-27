import { Progress } from "@/components/ui/progress";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function ProgressShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Progress Bar</h1>
        <p className="text-foreground-muted">
          5 renk · 4 boyut · label · değer gösterimi · striped · animated · a11y (role=progressbar)
        </p>
      </div>

      <Section title="Renkler">
        <Progress value={70} color="primary" label="Primary" showValue />
        <Progress value={85} color="success" label="Success" showValue />
        <Progress value={45} color="danger"  label="Danger"  showValue />
        <Progress value={60} color="warning" label="Warning" showValue />
        <Progress value={55} color="info"    label="Info"    showValue />
      </Section>

      <Section title="Boyutlar">
        <Progress value={60} size="xs" color="primary" label="xs" />
        <Progress value={60} size="sm" color="primary" label="sm" />
        <Progress value={60} size="md" color="primary" label="md" />
        <Progress value={60} size="lg" color="primary" label="lg" />
      </Section>

      <Section title="Striped">
        <Progress value={75} color="primary" label="Yükleniyor..." showValue striped />
        <Progress value={50} color="success" striped />
      </Section>

      <Section title="Animasyonlu (indeterminate tarzı)">
        <Progress value={65} color="info" label="Senkronize ediliyor" animated />
      </Section>

      <Section title="Çeşitli Değerler">
        {[10, 25, 50, 75, 90, 100].map((v) => (
          <Progress key={v} value={v} showValue color={v === 100 ? "success" : "primary"} />
        ))}
      </Section>
    </div>
  );
}
