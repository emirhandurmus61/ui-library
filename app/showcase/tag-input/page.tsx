"use client";

import { useState } from "react";
import { TagInput } from "@/components/ui/tag-input";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function TagInputShowcase() {
  const [tags1, setTags1] = useState<string[]>(["react", "typescript"]);
  const [tags2, setTags2] = useState<string[]>([]);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Tag Input</h1>
        <p className="text-sm text-foreground-muted">
          Enter veya virgülle tag ekle · Backspace ile sil · maxTags · 6 renk · 3 boyut
        </p>
      </div>

      <ShowcaseSection
        title="Temel Kullanım"
        description="Enter veya virgülle yeni tag ekle. Backspace ile son tag silinir."
        previewClassName="max-w-sm"
        code={`const [tags, setTags] = useState(["react", "typescript"]);

<TagInput
  value={tags}
  onChange={setTags}
  label="Teknolojiler"
  placeholder="Tag ekle..."
/>`}
      >
        <div className="max-w-sm w-full space-y-2">
          <TagInput value={tags1} onChange={setTags1} label="Teknolojiler" placeholder="Tag ekle..." />
          <p className="text-xs text-foreground-muted">{tags1.length} etiket: {tags1.join(", ") || "—"}</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="MaxTags"
        description="En fazla 3 etiket eklenebilir. Limite ulaşınca input gizlenir."
        previewClassName="max-w-sm"
        code={`<TagInput maxTags={3} label="Max 3 Etiket" placeholder="Etiket ekle..." />`}
      >
        <TagInput
          maxTags={3}
          label="Max 3 Etiket"
          placeholder="Etiket ekle..."
          helperText="En fazla 3 etiket ekleyebilirsiniz."
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Renkler"
        previewClassName="flex flex-col gap-3 max-w-sm"
        code={`<TagInput tagColor="primary"   defaultValue={["primary"]} />
<TagInput tagColor="success"   defaultValue={["success"]} />
<TagInput tagColor="danger"    defaultValue={["danger"]} />
<TagInput tagColor="warning"   defaultValue={["warning"]} />
<TagInput tagColor="info"      defaultValue={["info"]} />
<TagInput tagColor="secondary" defaultValue={["secondary"]} />`}
      >
        {(["primary", "success", "danger", "warning", "info", "secondary"] as const).map((c) => (
          <TagInput key={c} tagColor={c} defaultValue={[c, "örnek"]} placeholder="Ekle..." />
        ))}
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyutlar"
        previewClassName="flex flex-col gap-3 max-w-sm"
        code={`<TagInput size="sm" defaultValue={["small"]} />
<TagInput size="md" defaultValue={["medium"]} />
<TagInput size="lg" defaultValue={["large"]} />`}
      >
        <TagInput size="sm" defaultValue={["small"]} label="Small" placeholder="Ekle..." />
        <TagInput size="md" defaultValue={["medium"]} label="Medium" placeholder="Ekle..." />
        <TagInput size="lg" defaultValue={["large"]} label="Large" placeholder="Ekle..." />
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        previewClassName="flex flex-col gap-3 max-w-sm"
        code={`<TagInput errorText="En az bir etiket gerekli." />
<TagInput successText="Etiketler kaydedildi." defaultValue={["onaylı"]} />
<TagInput disabled defaultValue={["disabled"]} />`}
      >
        <TagInput label="Hata" errorText="En az bir etiket gerekli." placeholder="Etiket ekle..." />
        <TagInput label="Başarı" successText="Etiketler kaydedildi." defaultValue={["onaylı"]} />
        <TagInput label="Disabled" disabled defaultValue={["değiştirilemez"]} />
      </ShowcaseSection>
    </div>
  );
}
