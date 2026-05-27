import { Container, Grid, Col, Stack } from "@/components/ui/container";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono text-foreground-subtle mb-2">{children}</p>;
}

function Box({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-primary-subtle border border-primary/20 rounded-[var(--radius-md)] px-3 py-2 text-xs text-primary font-mono ${className ?? ""}`}>
      {children}
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && <p className="text-sm text-foreground-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function ContainerShowcase() {
  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Container / Grid / Stack</h1>
        <p className="text-foreground-muted">
          Layout yardımcı bileşenleri — max-width, responsive grid, flex stack
        </p>
      </div>

      {/* ── Container ── */}
      <Section title="Container" description="mx-auto ile ortalama + max-width kontrolü. Farklı size ve padding varyantları.">
        {[
          { size: "prose" as const, label: "size='prose' — max-w-prose (65ch)" },
          { size: "xs" as const,    label: "size='xs' — max-w-screen-sm (640px)" },
          { size: "sm" as const,    label: "size='sm' — max-w-screen-md (768px)" },
          { size: "md" as const,    label: "size='md' — max-w-screen-lg (1024px)" },
        ].map(({ size, label }) => (
          <div key={size}>
            <Label>{label}</Label>
            <Container size={size} className="bg-primary-subtle border border-primary/20 rounded-[var(--radius-md)] py-2">
              <p className="text-xs text-primary font-mono text-center">{label}</p>
            </Container>
          </div>
        ))}
      </Section>

      {/* ── Grid — cols ── */}
      <Section title="Grid — Sütun Sayısı" description="Responsive kırılma noktaları dahil — mobilde 1 sütun, büyük ekranda tam.">
        <div>
          <Label>cols=2</Label>
          <Grid cols={2} gap="sm">
            {[1, 2].map(n => <Box key={n}>col {n}</Box>)}
          </Grid>
        </div>
        <div>
          <Label>cols=3</Label>
          <Grid cols={3} gap="sm">
            {[1, 2, 3].map(n => <Box key={n}>col {n}</Box>)}
          </Grid>
        </div>
        <div>
          <Label>cols=4</Label>
          <Grid cols={4} gap="sm">
            {[1, 2, 3, 4].map(n => <Box key={n}>col {n}</Box>)}
          </Grid>
        </div>
      </Section>

      {/* ── Grid — Col span ── */}
      <Section title="Grid — Col Span (12 kolonlu)" description="Grid cols=12 ile Col span prop'ları ile esnek yerleşim.">
        <div>
          <Label>cols=12 · sidebar (span=3) + içerik (span=9)</Label>
          <Grid cols={12} gap="sm">
            <Col span={3}><Box>span-3 sidebar</Box></Col>
            <Col span={9}><Box>span-9 içerik</Box></Col>
          </Grid>
        </div>
        <div>
          <Label>cols=12 · eşit 3'lü (her biri span=4)</Label>
          <Grid cols={12} gap="sm">
            {[1, 2, 3].map(n => <Col key={n} span={4}><Box>span-4</Box></Col>)}
          </Grid>
        </div>
        <div>
          <Label>cols=12 · hero (span=8) + aside (span=4)</Label>
          <Grid cols={12} gap="sm">
            <Col span={8}><Box>span-8 hero</Box></Col>
            <Col span={4}><Box>span-4 aside</Box></Col>
          </Grid>
        </div>
        <div>
          <Label>cols=12 · col-span-full banner</Label>
          <Grid cols={12} gap="sm">
            <Col span="full"><Box>span-full banner</Box></Col>
            <Col span={6}><Box>span-6</Box></Col>
            <Col span={6}><Box>span-6</Box></Col>
          </Grid>
        </div>
      </Section>

      {/* ── Grid — gap ── */}
      <Section title="Grid — Gap">
        {(["xs", "sm", "md", "lg"] as const).map(gap => (
          <div key={gap}>
            <Label>gap='{gap}'</Label>
            <Grid cols={4} gap={gap}>
              {[1, 2, 3, 4].map(n => <Box key={n}>{n}</Box>)}
            </Grid>
          </div>
        ))}
      </Section>

      {/* ── Stack col ── */}
      <Section title="Stack — direction='col' (varsayılan)">
        <Label>gap='sm'</Label>
        <Stack gap="sm" className="max-w-xs">
          <Box>item 1</Box>
          <Box>item 2</Box>
          <Box>item 3</Box>
        </Stack>
      </Section>

      {/* ── Stack row ── */}
      <Section title="Stack — direction='row'">
        <Label>align='center' justify='between'</Label>
        <Stack direction="row" align="center" justify="between" className="border border-border rounded-[var(--radius-md)] p-3">
          <Box>Sol</Box>
          <Box>Orta</Box>
          <Box>Sağ</Box>
        </Stack>

        <Label>wrap=true gap='sm'</Label>
        <Stack direction="row" gap="sm" wrap={true}>
          {Array.from({ length: 8 }, (_, i) => <Box key={i}>item {i + 1}</Box>)}
        </Stack>
      </Section>

      {/* ── Stack divider ── */}
      <Section title="Stack — Divider">
        <Label>direction='row' · divider</Label>
        <Stack
          direction="row"
          gap="none"
          align="center"
          divider={<span className="w-px h-4 bg-border mx-3" />}
        >
          <span className="text-sm text-foreground-muted">Ana Sayfa</span>
          <span className="text-sm text-foreground-muted">Ürün</span>
          <span className="text-sm text-foreground-muted">Fiyat</span>
          <span className="text-sm text-foreground">Blog</span>
        </Stack>

        <Label>direction='col' · divider</Label>
        <Stack
          gap="none"
          divider={<div className="border-t border-border my-2" />}
          className="max-w-xs"
        >
          <Box>Bölüm 1</Box>
          <Box>Bölüm 2</Box>
          <Box>Bölüm 3</Box>
        </Stack>
      </Section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Container, Grid, Col, Stack } from "@/components/ui/container";

// Container — ortalama + max-width
<Container size="lg">
  <p>İçerik</p>
</Container>

// Grid — responsive sütunlar
<Grid cols={3} gap="md">
  <div>Kart 1</div>
  <div>Kart 2</div>
  <div>Kart 3</div>
</Grid>

// Grid — 12 kolonlu sistem
<Grid cols={12} gap="md">
  <Col span={3}>Sidebar</Col>
  <Col span={9}>İçerik</Col>
</Grid>

// Stack — dikey
<Stack gap="sm">
  <Button>Birincil</Button>
  <Button variant="outline">İkincil</Button>
</Stack>

// Stack — yatay + ayraç
<Stack
  direction="row"
  gap="none"
  divider={<span className="w-px h-4 bg-border mx-3" />}
>
  <a href="#">Ana Sayfa</a>
  <a href="#">Ürün</a>
</Stack>`}
        </pre>
      </section>
    </div>
  );
}
