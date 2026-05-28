"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function DatePickerShowcase() {
  const [single, setSingle] = useState<Date | null>(null);
  const [range,  setRange]  = useState<[Date | null, Date | null]>([null, null]);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Date Picker</h1>
        <p className="text-sm text-foreground-muted">
          Takvim popover · tek tarih + range · TR locale · min/max · clearable · portal
        </p>
      </div>

      <ShowcaseSection
        title="Tekli Tarih"
        description="Takvimden tek tarih seçimi. Bugün vurgulanır."
        previewClassName="max-w-sm"
        code={`const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  label="Tarih"
  placeholder="Tarih seçin"
  clearable
/>`}
      >
        <div className="max-w-sm w-full space-y-2">
          <DatePicker
            value={single}
            onChange={setSingle}
            label="Tarih"
            placeholder="Tarih seçin"
            clearable
          />
          {single && (
            <p className="text-xs text-foreground-muted">
              Seçili: {single.toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tarih Aralığı (Range)"
        description="İki tıklamayla başlangıç–bitiş seçimi. İlk tıklama başlangıç, ikinci bitiş."
        previewClassName="max-w-sm"
        code={`const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

<DatePicker
  range
  rangeValue={range}
  onRangeChange={setRange}
  label="Tarih Aralığı"
  placeholder="Tarih aralığı seçin"
  clearable
/>`}
      >
        <div className="max-w-sm w-full space-y-2">
          <DatePicker
            range
            rangeValue={range}
            onRangeChange={setRange}
            label="Tarih Aralığı"
            placeholder="Tarih aralığı seçin"
            clearable
          />
          {range[0] && range[1] && (
            <p className="text-xs text-foreground-muted">
              {Math.ceil((range[1].getTime() - range[0].getTime()) / (1000 * 60 * 60 * 24))} gün seçili
            </p>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Min / Max Tarih"
        description="Seçilebilir tarih aralığı kısıtlanmış. Bu ay ve 2 ay sonrasına kadar."
        previewClassName="max-w-sm"
        code={`<DatePicker
  label="Randevu"
  minDate={new Date()}
  maxDate={maxDate}
  placeholder="Uygun tarih seçin"
/>`}
      >
        <DatePicker
          label="Randevu"
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Uygun tarih seçin"
          clearable
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyutlar"
        previewClassName="flex flex-col gap-3 max-w-sm"
        code={`<DatePicker size="sm" placeholder="Small" />
<DatePicker size="md" placeholder="Medium" />
<DatePicker size="lg" placeholder="Large" />`}
      >
        <DatePicker size="sm" placeholder="Small (sm)" />
        <DatePicker size="md" placeholder="Medium (md)" />
        <DatePicker size="lg" placeholder="Large (lg)" />
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        previewClassName="flex flex-col gap-3 max-w-sm"
        code={`<DatePicker errorText="Tarih seçimi zorunludur." />
<DatePicker successText="Tarih onaylandı." defaultValue={new Date()} />
<DatePicker disabled placeholder="Devre dışı" />`}
      >
        <DatePicker label="Hata" errorText="Tarih seçimi zorunludur." />
        <DatePicker label="Başarı" successText="Tarih onaylandı." defaultValue={new Date()} />
        <DatePicker label="Disabled" disabled placeholder="Devre dışı" />
      </ShowcaseSection>
    </div>
  );
}
