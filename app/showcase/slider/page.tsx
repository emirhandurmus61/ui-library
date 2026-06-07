"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Section başlığı yardımcısı ────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-subtle mt-2 mb-6 flex items-center gap-3">
      <span className="flex-1 h-px bg-border" />
      {children}
      <span className="flex-1 h-px bg-border" />
    </h2>
  );
}

/* ─── Ses kontrolü ikonu ─────────────────────────────────────── */
function VolumeIcon({ value }: { value: number }) {
  if (value === 0) return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-foreground-muted shrink-0">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );
  if (value < 50) return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-foreground-muted shrink-0">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-foreground-muted shrink-0">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}

export default function SliderShowcase() {
  /* ── Temel ── */
  const [volume,  setVolume]  = useState(62);
  const [opacity, setOpacity] = useState(75);

  /* ── Range ── */
  const [range,   setRange]   = useState<[number, number]>([20, 80]);
  const [price,   setPrice]   = useState<[number, number]>([100, 500]);
  const [age,     setAge]     = useState<[number, number]>([25, 45]);
  const [temp,    setTemp]    = useState<[number, number]>([18, 26]);

  /* ── Pratik ── */
  const [brightness, setBrightness] = useState(70);
  const [bass,    setBass]    = useState(40);
  const [treble,  setTreble]  = useState(60);
  const [mid,     setMid]     = useState(50);
  const [zoom,    setZoom]    = useState(100);
  const [rating,  setRating]  = useState(3);
  const [budget,  setBudget]  = useState<[number, number]>([2000, 8000]);
  const [speed,   setSpeed]   = useState(1);

  /* ── Stil ── */
  const [colorVal, setColorVal] = useState(68);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Slider / Range</h1>
        <p className="text-sm text-foreground-muted">
          Tekli · çift handle · step · marks · renkler · boyutlar · klavye · pratik kullanım senaryoları
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          BÖLÜM 1 — TEMEL
      ══════════════════════════════════════════════════════════════ */}
      <SectionTitle>Temel</SectionTitle>

      {/* Tekli */}
      <ShowcaseSection
        title="Tekli Slider"
        description="Sürükle veya ok tuşlarıyla değer ayarla. showValue ile anlık değer gösterilir."
        code={`const [value, setValue] = useState(62);
<Slider value={value} onChange={(v) => setValue(v as number)} label="Ses Seviyesi" showValue />`}
      >
        <div className="px-2 w-full">
          <Slider value={volume} onChange={(v) => setVolume(v as number)} label="Ses Seviyesi" showValue />
        </div>
      </ShowcaseSection>

      {/* Opacity */}
      <ShowcaseSection
        title="Opaklık Kontrolü"
        description="formatValue ile özel birim gösterimi. 0–100 → %."
        code={`<Slider
  value={opacity}
  onChange={(v) => setOpacity(v as number)}
  label="Opaklık"
  formatValue={(v) => v + "%"}
  showValue
/>`}
      >
        <div className="px-2 w-full space-y-4">
          <Slider
            value={opacity}
            onChange={(v) => setOpacity(v as number)}
            label="Opaklık"
            formatValue={(v) => v + "%"}
            showValue
          />
          {/* Canlı önizleme */}
          <div
            className="h-16 rounded-[var(--radius-xl)] bg-primary flex items-center justify-center transition-opacity duration-150"
            style={{ opacity: opacity / 100 }}
          >
            <span className="text-primary-foreground text-sm font-semibold">Önizleme</span>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════
          BÖLÜM 2 — RANGE (İKİ HANDLE)
      ══════════════════════════════════════════════════════════════ */}
      <SectionTitle>Range — İki Handle</SectionTitle>

      {/* Basit range */}
      <ShowcaseSection
        title="Aralık Seçimi"
        description="range prop ile iki handle. Min ve max bağımsız sürüklenir."
        code={`const [range, setRange] = useState<[number, number]>([20, 80]);
<Slider range value={range} onChange={(v) => setRange(v as [number, number])} label="Aralık" showValue />`}
      >
        <div className="px-2 w-full">
          <Slider range value={range} onChange={(v) => setRange(v as [number, number])} label="Aralık Seçimi" showValue />
        </div>
      </ShowcaseSection>

      {/* Fiyat filtresi */}
      <ShowcaseSection
        title="Fiyat Filtresi — Marks ile"
        description="marks prop ile sabit referans noktaları. E-ticaret filtre bileşeni için idealdir."
        code={`<Slider
  range
  value={price}
  onChange={(v) => setPrice(v as [number, number])}
  min={0} max={1000} step={50}
  label="Fiyat Aralığı"
  formatValue={(v) => "₺" + v}
  marks={[
    { value: 0,    label: "₺0" },
    { value: 500,  label: "₺500" },
    { value: 1000, label: "₺1K" },
  ]}
/>`}
      >
        <div className="px-2 w-full pb-4">
          <Slider
            range
            value={price}
            onChange={(v) => setPrice(v as [number, number])}
            min={0}
            max={1000}
            step={50}
            label="Fiyat Aralığı"
            formatValue={(v) => `₺${v}`}
            marks={[
              { value: 0,    label: "₺0" },
              { value: 250,  label: "₺250" },
              { value: 500,  label: "₺500" },
              { value: 750,  label: "₺750" },
              { value: 1000, label: "₺1K" },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* Yaş aralığı */}
      <ShowcaseSection
        title="Yaş Aralığı Filtresi"
        description="Kullanıcı profili hedefleme veya anket segmentasyonu için."
        code={`<Slider
  range
  value={age}
  onChange={(v) => setAge(v as [number, number])}
  min={18} max={65} step={1}
  label="Yaş Aralığı"
  formatValue={(v) => v + " yaş"}
  marks={[{ value: 18, label: "18" }, { value: 40, label: "40" }, { value: 65, label: "65" }]}
/>`}
      >
        <div className="px-2 w-full pb-4">
          <Slider
            range
            value={age}
            onChange={(v) => setAge(v as [number, number])}
            min={18}
            max={65}
            step={1}
            label="Yaş Aralığı"
            formatValue={(v) => v + " yaş"}
            marks={[
              { value: 18, label: "18" },
              { value: 30, label: "30" },
              { value: 45, label: "45" },
              { value: 65, label: "65" },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* Sıcaklık */}
      <ShowcaseSection
        title="Termostat — Sıcaklık Aralığı"
        description="Gece/gündüz sıcaklık aralığı ayarı. color=info ile mavi ton."
        code={`<Slider
  range
  value={temp}
  onChange={(v) => setTemp(v as [number, number])}
  min={10} max={35} step={0.5}
  color="info"
  label="Sıcaklık Aralığı"
  formatValue={(v) => v + "°C"}
/>`}
      >
        <div className="px-2 w-full">
          <Slider
            range
            value={temp}
            onChange={(v) => setTemp(v as [number, number])}
            min={10}
            max={35}
            step={0.5}
            color="info"
            label="Sıcaklık Aralığı"
            formatValue={(v) => v + "°C"}
          />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════
          BÖLÜM 3 — PRATİK KULLANIM SENARYOLARI
      ══════════════════════════════════════════════════════════════ */}
      <SectionTitle>Pratik Senaryolar</SectionTitle>

      {/* Ses kontrolü — ikon entegrasyonu */}
      <ShowcaseSection
        title="Ses Kontrolü — İkon Entegrasyonu"
        description="Değere göre dinamik ikon değişimi. Medya oynatıcı arayüzü için."
        code={`const [volume, setVolume] = useState(62);
<div className="flex items-center gap-3">
  <VolumeIcon value={volume} />
  <Slider value={volume} onChange={(v) => setVolume(v as number)} />
  <span className="text-sm w-8 text-right">{volume}</span>
</div>`}
      >
        <div className="px-2 w-full space-y-1">
          <p className="text-xs text-foreground-muted mb-3">Ses</p>
          <div className="flex items-center gap-3">
            <VolumeIcon value={volume} />
            <Slider value={volume} onChange={(v) => setVolume(v as number)} label="" showValue={false} />
            <span className="text-sm font-mono text-foreground-muted w-8 text-right shrink-0">{volume}</span>
          </div>
        </div>
      </ShowcaseSection>

      {/* Ekolayzer */}
      <ShowcaseSection
        title="Ses Ekolayzer"
        description="Üç bant ekolayzer. Birden fazla slider bağımsız çalışır."
        code={`<Slider value={bass}   onChange={(v) => setBass(v as number)}   label="Bass"   color="primary" />
<Slider value={mid}    onChange={(v) => setMid(v as number)}    label="Mid"    color="success" />
<Slider value={treble} onChange={(v) => setTreble(v as number)} label="Treble" color="warning" />`}
      >
        <div className="px-2 w-full space-y-5">
          {[
            { label: "Bass",   value: bass,   set: setBass,   color: "primary" as const },
            { label: "Mid",    value: mid,    set: setMid,    color: "success" as const },
            { label: "Treble", value: treble, set: setTreble, color: "warning" as const },
          ].map(({ label, value, set, color }) => (
            <Slider
              key={label}
              value={value}
              onChange={(v) => set(v as number)}
              label={label}
              color={color}
              showValue
              formatValue={(v) => (v - 50 >= 0 ? "+" : "") + (v - 50)}
            />
          ))}
        </div>
      </ShowcaseSection>

      {/* Parlaklık */}
      <ShowcaseSection
        title="Ekran Parlaklığı"
        description="Canlı arka plan önizlemesi. Değer arttıkça panel aydınlanır."
        code={`<Slider
  value={brightness}
  onChange={(v) => setBrightness(v as number)}
  label="Parlaklık"
  formatValue={(v) => v + "%"}
/>`}
      >
        <div className="px-2 w-full space-y-4">
          <Slider
            value={brightness}
            onChange={(v) => setBrightness(v as number)}
            label="Parlaklık"
            formatValue={(v) => v + "%"}
            showValue
          />
          <div
            className="h-20 rounded-[var(--radius-xl)] border border-border flex items-center justify-center transition-all duration-150"
            style={{ background: `hsl(0 0% ${brightness}%)` }}
          >
            <span
              className="text-sm font-semibold transition-colors duration-150"
              style={{ color: brightness > 50 ? "#0f0f10" : "#f8f9fa" }}
            >
              {brightness}%
            </span>
          </div>
        </div>
      </ShowcaseSection>

      {/* Oynatma hızı */}
      <ShowcaseSection
        title="Video Oynatma Hızı"
        description="step=0.25 ile sabit adımlar. Marks ile yaygın hız değerleri."
        code={`<Slider
  value={speed}
  onChange={(v) => setSpeed(v as number)}
  min={0.25} max={2} step={0.25}
  label="Oynatma Hızı"
  formatValue={(v) => v + "×"}
  marks={[
    { value: 0.5, label: "0.5×" },
    { value: 1,   label: "1×" },
    { value: 1.5, label: "1.5×" },
    { value: 2,   label: "2×" },
  ]}
/>`}
      >
        <div className="px-2 w-full pb-5">
          <Slider
            value={speed}
            onChange={(v) => setSpeed(v as number)}
            min={0.25}
            max={2}
            step={0.25}
            label="Oynatma Hızı"
            formatValue={(v) => v + "×"}
            showValue
            marks={[
              { value: 0.25, label: "0.25×" },
              { value: 0.5,  label: "0.5×" },
              { value: 1,    label: "1×" },
              { value: 1.5,  label: "1.5×" },
              { value: 2,    label: "2×" },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* Zoom */}
      <ShowcaseSection
        title="Zoom Kontrolü"
        description="min=25, max=400, step=25. Harita veya canvas uygulamaları için."
        code={`<Slider
  value={zoom}
  onChange={(v) => setZoom(v as number)}
  min={25} max={400} step={25}
  label="Zoom"
  formatValue={(v) => v + "%"}
  marks={[{ value: 100, label: "100%" }, { value: 200, label: "200%" }]}
/>`}
      >
        <div className="px-2 w-full pb-5">
          <Slider
            value={zoom}
            onChange={(v) => setZoom(v as number)}
            min={25}
            max={400}
            step={25}
            label="Zoom"
            formatValue={(v) => v + "%"}
            showValue
            marks={[
              { value: 25,  label: "25%" },
              { value: 100, label: "100%" },
              { value: 200, label: "200%" },
              { value: 400, label: "400%" },
            ]}
          />
        </div>
      </ShowcaseSection>

      {/* Puan / Rating */}
      <ShowcaseSection
        title="Yıldız Puanı — Adım Slider"
        description="step=1, min=1, max=5. Kullanıcı değerlendirme arayüzü."
        code={`<Slider
  value={rating}
  onChange={(v) => setRating(v as number)}
  min={1} max={5} step={1}
  label="Puanınız"
  formatValue={(v) => "★".repeat(v) + "☆".repeat(5 - v)}
  marks={[1,2,3,4,5].map(v => ({ value: v, label: String(v) }))}
/>`}
      >
        <div className="px-2 w-full pb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Puanınız</span>
            <span className="text-lg tracking-wide">
              {"★".repeat(rating)}{"☆".repeat(5 - rating)}
            </span>
          </div>
          <Slider
            value={rating}
            onChange={(v) => setRating(v as number)}
            min={1}
            max={5}
            step={1}
            color="warning"
            showValue={false}
            marks={[1, 2, 3, 4, 5].map(v => ({ value: v, label: String(v) }))}
          />
        </div>
      </ShowcaseSection>

      {/* Bütçe — büyük aralık */}
      <ShowcaseSection
        title="Bütçe Planlayıcı"
        description="Büyük aralıkta range slider. step=500 ile rahat hareket."
        code={`<Slider
  range
  value={budget}
  onChange={(v) => setBudget(v as [number, number])}
  min={0} max={20000} step={500}
  label="Aylık Bütçe"
  formatValue={(v) => "₺" + v.toLocaleString()}
  color="success"
/>`}
      >
        <div className="px-2 w-full">
          <Slider
            range
            value={budget}
            onChange={(v) => setBudget(v as [number, number])}
            min={0}
            max={20000}
            step={500}
            label="Aylık Bütçe"
            formatValue={(v) => "₺" + v.toLocaleString("tr-TR")}
            color="success"
            showValue
          />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════
          BÖLÜM 4 — RENKLER
      ══════════════════════════════════════════════════════════════ */}
      <SectionTitle>Renk Varyasyonları</SectionTitle>

      <ShowcaseSection
        title="5 Renk Teması"
        description="color prop: primary · success · danger · warning · info"
        code={`<Slider color="primary" value={68} label="Primary" showValue />
<Slider color="success" value={68} label="Success" showValue />
<Slider color="danger"  value={68} label="Danger"  showValue />
<Slider color="warning" value={68} label="Warning" showValue />
<Slider color="info"    value={68} label="Info"    showValue />`}
      >
        <div className="px-2 w-full space-y-5">
          {(["primary", "success", "danger", "warning", "info"] as const).map((c) => (
            <Slider
              key={c}
              color={c}
              value={colorVal}
              onChange={(v) => setColorVal(v as number)}
              label={c.charAt(0).toUpperCase() + c.slice(1)}
              showValue
            />
          ))}
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════
          BÖLÜM 5 — BOYUTLAR
      ══════════════════════════════════════════════════════════════ */}
      <SectionTitle>Boyut Varyasyonları</SectionTitle>

      <ShowcaseSection
        title="3 Boyut"
        description="size prop: sm · md · lg. Track kalınlığı ve thumb boyutu birlikte değişir."
        code={`<Slider size="sm" defaultValue={50} label="Small (sm)"  showValue />
<Slider size="md" defaultValue={50} label="Medium (md)" showValue />
<Slider size="lg" defaultValue={50} label="Large (lg)"  showValue />`}
      >
        <div className="px-2 w-full space-y-6">
          <Slider size="sm" defaultValue={50} label="Small (sm)"  showValue />
          <Slider size="md" defaultValue={50} label="Medium (md)" showValue />
          <Slider size="lg" defaultValue={50} label="Large (lg)"  showValue />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════
          BÖLÜM 6 — DURUM & MARKS
      ══════════════════════════════════════════════════════════════ */}
      <SectionTitle>Durum & Marks</SectionTitle>

      {/* Disabled */}
      <ShowcaseSection
        title="Disabled"
        description="disabled prop ile etkileşim tamamen kilitlenir. Opaklık düşer."
        code={`<Slider disabled defaultValue={40} label="Devre Dışı" showValue />`}
      >
        <div className="px-2 w-full">
          <Slider disabled defaultValue={40} label="Devre Dışı" showValue />
        </div>
      </ShowcaseSection>

      {/* Step ile Marks */}
      <ShowcaseSection
        title="Adım (step) + Marks"
        description="marks ile görsel referans çizgileri. step ile tutturma aralığı."
        code={`<Slider
  defaultValue={3}
  min={1} max={5} step={1}
  marks={[1,2,3,4,5].map(v => ({ value: v, label: String(v) }))}
  label="Öncelik"
  formatValue={(v) => ["Çok Düşük","Düşük","Orta","Yüksek","Kritik"][v-1]}
/>`}
      >
        <div className="px-2 w-full pb-5">
          <Slider
            defaultValue={3}
            min={1}
            max={5}
            step={1}
            label="Öncelik Seviyesi"
            showValue
            formatValue={(v) => (["Çok Düşük", "Düşük", "Orta", "Yüksek", "Kritik"] as const)[v - 1]}
            marks={[1, 2, 3, 4, 5].map(v => ({
              value: v,
              label: (["ÇD", "D", "O", "Y", "K"] as const)[v - 1],
            }))}
          />
        </div>
      </ShowcaseSection>

      {/* Marks — süre */}
      <ShowcaseSection
        title="Süre Seçici — Marks"
        description="Toplantı veya zamanlayıcı süresi. Sabit adım noktaları."
        code={`<Slider
  defaultValue={30}
  min={5} max={120} step={5}
  label="Süre"
  formatValue={(v) => v + " dk"}
  marks={[5,15,30,60,90,120].map(v => ({ value: v, label: v + "dk" }))}
/>`}
      >
        <div className="px-2 w-full pb-5">
          <Slider
            defaultValue={30}
            min={5}
            max={120}
            step={5}
            label="Toplantı Süresi"
            showValue
            formatValue={(v) => v + " dk"}
            marks={[5, 15, 30, 60, 90, 120].map(v => ({ value: v, label: v + "dk" }))}
          />
        </div>
      </ShowcaseSection>
    </div>
  );
}
