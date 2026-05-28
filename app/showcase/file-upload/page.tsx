"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function FileUploadShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">File Upload</h1>
        <p className="text-sm text-foreground-muted">
          Drag & drop · click to browse · resim önizleme · dosya boyutu / tip validasyonu · multiple
        </p>
      </div>

      <ShowcaseSection
        title="Tekli Dosya"
        description="Sürükle-bırak veya tıkla. Resimler önizleme gösterir."
        code={`<FileUpload
  label="Dosya Yükle"
  onChange={(files) => console.log(files)}
/>`}
      >
        <FileUpload label="Dosya Yükle" onChange={(f) => console.log(f)} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Çoklu Dosya"
        description="Birden fazla dosya yüklenebilir. MaxFiles ile sınırlandırılmış."
        code={`<FileUpload
  multiple
  maxFiles={5}
  label="Dosyalar"
  helperText="En fazla 5 dosya seçebilirsiniz."
/>`}
      >
        <FileUpload
          multiple
          maxFiles={5}
          label="Dosyalar"
          helperText="En fazla 5 dosya seçebilirsiniz."
          onChange={(f) => console.log(f)}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Resim Yükleme"
        description="accept ile dosya tipi kısıtı. maxSize ile boyut kısıtı."
        code={`<FileUpload
  multiple
  accept="image/*"
  maxSize={2 * 1024 * 1024}
  maxFiles={4}
  label="Fotoğraflar"
  helperText="JPG, PNG, GIF · Maks. 2MB · En fazla 4 dosya"
/>`}
      >
        <FileUpload
          multiple
          accept="image/*"
          maxSize={2 * 1024 * 1024}
          maxFiles={4}
          label="Fotoğraflar"
          helperText="JPG, PNG, GIF · Maks. 2MB · En fazla 4 dosya"
          onChange={(f) => console.log(f)}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Error State"
        code={`<FileUpload errorText="Dosya yükleme zorunludur." />`}
      >
        <FileUpload label="Zorunlu Alan" errorText="Dosya yükleme zorunludur." />
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        code={`<FileUpload disabled label="Devre Dışı" />`}
      >
        <FileUpload disabled label="Devre Dışı" helperText="Bu alan şu an kullanılamaz." />
      </ShowcaseSection>
    </div>
  );
}
