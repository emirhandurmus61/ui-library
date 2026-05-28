"use client";

import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function PhoneInputPage() {
  const [controlled, setControlled] = useState("");

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Phone Input</h1>
        <p className="text-sm text-foreground-muted">
          Uluslararası telefon girişi. Ülke kodu seçimi · otomatik format
        </p>
      </div>

      <ShowcaseSection title="Varsayılan" description="Türkiye ön seçili, etiket ile">
        <div className="max-w-sm">
          <PhoneInput
            label="Telefon Numarası"
            defaultCountry="TR"
            placeholder="555 123 4567"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Hata Durumu" description="errorText prop ile hata mesajı">
        <div className="max-w-sm">
          <PhoneInput
            label="Telefon Numarası"
            defaultCountry="TR"
            errorText="Geçerli bir telefon numarası girin"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Kontrollü"
        description="useState ile kontrollü bileşen — değer anlık gösterilir"
      >
        <div className="max-w-sm space-y-3">
          <PhoneInput
            label="Telefon Numarası"
            defaultCountry="TR"
            value={controlled}
            onChange={setControlled}
          />
          <p className="text-sm text-foreground-muted">
            Mevcut değer:{" "}
            <span className="font-mono text-foreground">
              {controlled || <span className="text-foreground-subtle">(boş)</span>}
            </span>
          </p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
