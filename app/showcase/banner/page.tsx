"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Banner } from "@/components/ui/banner";

export default function BannerShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Banner</h1>
        <p className="text-sm text-foreground-muted">
          Sayfa içi veya fixed konumlu duyuru şeritleri. 7 varyant, aksiyonlu ve dismissible.
        </p>
      </div>

      {/* Variants */}
      <ShowcaseSection
        title="Varyantlar"
        description="info, success, warning, danger, neutral — tüm semantik durumlar."
        importLine={`import { Banner } from "@/components/ui/banner";`}
        code={`<Banner variant="info"    message="Yeni sürüm mevcut! v2.4.0 kullanıma hazır." />
<Banner variant="success" message="Ödemeniz başarıyla tamamlandı." />
<Banner variant="warning" message="Hesabınızın şifresi 3 gün içinde sona eriyor." />
<Banner variant="danger"  message="Servis kesintisi yaşanıyor, ekibimiz çalışıyor." />
<Banner variant="neutral" message="Bakım modu 02:00–04:00 saatleri arasında aktif olacak." />`}
      >
        <div className="space-y-2">
          <Banner variant="info"    message="Yeni sürüm mevcut! v2.4.0 kullanıma hazır." />
          <Banner variant="success" message="Ödemeniz başarıyla tamamlandı." />
          <Banner variant="warning" message="Hesabınızın şifresi 3 gün içinde sona eriyor." />
          <Banner variant="danger"  message="Servis kesintisi yaşanıyor, ekibimiz çalışıyor." />
          <Banner variant="neutral" message="Bakım modu 02:00–04:00 saatleri arasında aktif olacak." />
        </div>
      </ShowcaseSection>

      {/* Gradient & Dark */}
      <ShowcaseSection
        title="Gradient & Dark"
        description="Kampanya ve dark mode için özel stiller."
        importLine={`import { Banner } from "@/components/ui/banner";`}
        code={`<Banner variant="gradient" message="🎉 Black Friday başladı! Tüm planlarda %50 indirim." action={{ label: "Hemen Al", href: "#" }} />
<Banner variant="dark" title="Pro üyeliğe geç" message="Limitsiz erişim, öncelikli destek ve daha fazlası." action={{ label: "Yükselt", href: "#" }} />`}
      >
        <div className="space-y-2">
          <Banner variant="gradient" message="🎉 Black Friday başladı! Tüm planlarda %50 indirim." action={{ label: "Hemen Al", href: "#" }} />
          <Banner variant="dark" title="Pro üyeliğe geç" message="Limitsiz erişim, öncelikli destek ve daha fazlası." action={{ label: "Yükselt", href: "#" }} />
        </div>
      </ShowcaseSection>

      {/* With title */}
      <ShowcaseSection
        title="Başlıklı Banner"
        description="title prop ile iki satırlı banner."
        importLine={`import { Banner } from "@/components/ui/banner";`}
        code={`<Banner
  variant="warning"
  title="Bakım zamanlanıyor"
  message="18 Haziran 03:00–05:00 UTC arasında sistem bakımı yapılacak."
  action={{ label: "Ayrıntılar", href: "#" }}
/>`}
      >
        <Banner
          variant="warning"
          title="Bakım zamanlanıyor"
          message="18 Haziran 03:00–05:00 UTC arasında sistem bakımı yapılacak."
          action={{ label: "Ayrıntılar", href: "#" }}
        />
      </ShowcaseSection>

      {/* With action */}
      <ShowcaseSection
        title="Aksiyon Butonlu"
        description="action prop ile inline CTA button."
        importLine={`import { Banner } from "@/components/ui/banner";`}
        code={`<Banner variant="info" message="E-posta adresinizi doğrulamadınız." action={{ label: "Doğrula", href: "#" }} />
<Banner variant="success" message="Yedekleme tamamlandı." action={{ label: "Görüntüle", href: "#" }} dismissible={false} />`}
      >
        <div className="space-y-2">
          <Banner variant="info" message="E-posta adresinizi doğrulamadınız." action={{ label: "Doğrula", href: "#" }} />
          <Banner variant="success" message="Yedekleme tamamlandı." action={{ label: "Görüntüle", href: "#" }} dismissible={false} />
        </div>
      </ShowcaseSection>

      {/* Non-dismissible */}
      <ShowcaseSection
        title="Kapatılamaz Banner"
        description="dismissible={false} ile sabit, kapatma butonu olmayan banner."
        importLine={`import { Banner } from "@/components/ui/banner";`}
        code={`<Banner variant="danger" message="Kritik güvenlik güncellemesi gerekiyor." dismissible={false} />`}
      >
        <Banner variant="danger" message="Kritik güvenlik güncellemesi gerekiyor." dismissible={false} />
      </ShowcaseSection>

      {/* Props table */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>
                {["Prop", "Tip", "Varsayılan", "Açıklama"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["variant", '"info" | "success" | "warning" | "danger" | "neutral" | "gradient" | "dark"', '"info"', "Renk teması"],
                ["message", "ReactNode", "—", "Ana mesaj (zorunlu)"],
                ["title", "string", "—", "Kalın başlık satırı"],
                ["icon", "ReactNode", "otomatik", "Özel ikon override"],
                ["action", "{ label, href?, onClick? }", "—", "Sağ taraf CTA butonu"],
                ["dismissible", "boolean", "true", "Kapatma butonu göster"],
                ["position", '"inline" | "top" | "bottom"', '"inline"', "Sayfa konumu"],
                ["className", "string", "—", "Ek CSS sınıfı"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{prop}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{type}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{def}</td>
                  <td className="px-4 py-3 text-foreground-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
