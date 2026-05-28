"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function TypewriterShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Typewriter</h1>
        <p className="text-sm text-foreground-muted">
          Karakter karakter yazar · çoklu string döngüsü · delete animasyonu · cursor · typeSpeed / deleteSpeed
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="Tek bir metin yazılır, sonra silinir ve tekrar başlar."
        code={`<Typewriter text="Merhaba, ben bir typewriter efektiyim." />`}
      >
        <p className="text-lg text-foreground">
          <Typewriter text="Merhaba, ben bir typewriter efektiyim." typeSpeed={55} />
        </p>
      </ShowcaseSection>

      <ShowcaseSection
        title="Çoklu String"
        description="Array verilen metinler sırayla yazılır ve silinir."
        code={`<Typewriter
  text={["Tasarımcılar", "Geliştiriciler", "Girişimciler", "Herkes"]}
  typeSpeed={70}
  deleteSpeed={40}
  pauseAfterType={1200}
/>`}
      >
        <div className="text-2xl font-semibold text-foreground">
          <span className="text-foreground-muted">Mükemmel </span>
          <span className="text-primary">
            <Typewriter
              text={["Tasarımcılar için", "Geliştiriciler için", "Girişimciler için", "Herkes için"]}
              typeSpeed={70}
              deleteSpeed={40}
              pauseAfterType={1200}
            />
          </span>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Hız Seçenekleri"
        code={`<Typewriter text="Yavaş yazı..." typeSpeed={120} deleteSpeed={60} />
<Typewriter text="Hızlı yazı..." typeSpeed={25} deleteSpeed={15} />`}
      >
        <div className="space-y-3">
          <div className="p-3 rounded-[var(--radius-lg)] bg-background-muted">
            <span className="text-xs text-foreground-muted font-mono">typeSpeed=120 </span>
            <p className="text-foreground mt-1"><Typewriter text="Yavaş yazı... her karakter belirgin şekilde görünür." typeSpeed={120} deleteSpeed={60} /></p>
          </div>
          <div className="p-3 rounded-[var(--radius-lg)] bg-background-muted">
            <span className="text-xs text-foreground-muted font-mono">typeSpeed=20 </span>
            <p className="text-foreground mt-1"><Typewriter text="Hızlı yazı... sanki gerçekten yazıyor gibi!" typeSpeed={20} deleteSpeed={12} /></p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Hero Başlığı"
        description="Landing page hero alanında çarpıcı efekt."
        code={`<h1>
  <Typewriter
    text={["Daha Hızlı Üret", "Daha İyi Tasarla", "Daha Kolay Yayınla"]}
    cursor
    cursorChar="_"
    typeSpeed={65}
  />
</h1>`}
      >
        <div className="py-4 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            <Typewriter
              text={["Daha Hızlı Üret", "Daha İyi Tasarla", "Daha Kolay Yayınla"]}
              cursor
              cursorChar="_"
              typeSpeed={65}
              deleteSpeed={35}
              pauseAfterType={1400}
            />
          </h2>
          <p className="text-sm text-foreground-muted mt-2">Sınırları zorlayan bir UI kütüphanesi.</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
