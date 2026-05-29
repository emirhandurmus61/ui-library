"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Modal } from "@/components/ui/modal";`;

export default function ModalShowcase() {
  const [basic, setBasic] = useState(false);
  const [withFooter, setWithFooter] = useState(false);
  const [sizeSm, setSizeSm] = useState(false);
  const [sizeLg, setSizeLg] = useState(false);
  const [size2xl, setSize2xl] = useState(false);
  const [noBackdropClose, setNoBackdropClose] = useState(false);
  const [noCloseBtn, setNoCloseBtn] = useState(false);
  const [longContent, setLongContent] = useState(false);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Modal / Dialog</h1>
        <p className="text-foreground-muted">
          backdrop · escape ile kapanma · animasyon · scroll kilit · a11y (role=dialog, aria-modal)
        </p>
      </div>

      <ShowcaseSection
        title="Temel Kullanım"
        description="open/onClose ile kontrol edilen basit modal; backdrop veya ESC ile kapanır."
        importLine={IMPORT}
        code={`<Button onClick={() => setOpen(true)}>Modal Aç</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Basit Modal"
  description="Backdrop'a tıklayarak veya ESC tuşuyla kapatabilirsiniz."
>
  <p className="text-sm text-foreground-muted py-2">Modal içeriği burada görünür.</p>
</Modal>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => setBasic(true)}>Modal Aç</Button>
          <Modal
            open={basic}
            onClose={() => setBasic(false)}
            title="Basit Modal"
            description="Bu bir örnek modal penceresidir. Backdrop'a tıklayarak veya ESC tuşuyla kapatabilirsiniz."
          >
            <p className="text-sm text-foreground-muted py-2">
              Modal içeriği burada görünür. İstediğiniz her türlü içeriği buraya yerleştirebilirsiniz.
            </p>
          </Modal>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Footer ile"
        description="footer prop ile modal altına aksiyon butonları eklenir."
        importLine={IMPORT}
        code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Değişiklikleri Kaydet"
  description="Yaptığınız değişiklikleri kaydetmek istiyor musunuz?"
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>İptal</Button>
      <Button onClick={() => setOpen(false)}>Kaydet</Button>
    </>
  }
>
  <p className="text-sm text-foreground-muted py-2">Bu işlem geri alınamaz.</p>
</Modal>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => setWithFooter(true)}>Footer'lı Modal</Button>
          <Modal
            open={withFooter}
            onClose={() => setWithFooter(false)}
            title="Değişiklikleri Kaydet"
            description="Yaptığınız değişiklikleri kaydetmek istiyor musunuz?"
            footer={
              <>
                <Button variant="outline" onClick={() => setWithFooter(false)}>İptal</Button>
                <Button onClick={() => setWithFooter(false)}>Kaydet</Button>
              </>
            }
          >
            <p className="text-sm text-foreground-muted py-2">
              Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
            </p>
          </Modal>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyutlar"
        description="sm, md (varsayılan), lg ve 2xl genişlik seçenekleri."
        importLine={IMPORT}
        code={`<Modal open={open} onClose={() => setOpen(false)} title="Küçük Modal" size="sm">...</Modal>
<Modal open={open} onClose={() => setOpen(false)} title="Büyük Modal"  size="lg">...</Modal>
<Modal open={open} onClose={() => setOpen(false)} title="Çok Büyük"   size="2xl">...</Modal>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm" variant="outline" onClick={() => setSizeSm(true)}>sm</Button>
          <Button size="sm" variant="outline" onClick={() => setWithFooter(true)}>md (varsayılan)</Button>
          <Button size="sm" variant="outline" onClick={() => setSizeLg(true)}>lg</Button>
          <Button size="sm" variant="outline" onClick={() => setSize2xl(true)}>2xl</Button>

          <Modal open={sizeSm} onClose={() => setSizeSm(false)} title="Küçük Modal" size="sm">
            <p className="text-sm text-foreground-muted py-2">sm boyutlu modal örneği.</p>
          </Modal>
          <Modal open={sizeLg} onClose={() => setSizeLg(false)} title="Büyük Modal" size="lg">
            <p className="text-sm text-foreground-muted py-2">lg boyutlu modal örneği.</p>
          </Modal>
          <Modal open={size2xl} onClose={() => setSize2xl(false)} title="Çok Büyük Modal" size="2xl">
            <p className="text-sm text-foreground-muted py-2">2xl boyutlu modal örneği.</p>
          </Modal>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Davranış Seçenekleri"
        description="closeOnBackdropClick ve hideCloseButton prop'ları ile kapanma davranışı özelleştirilebilir."
        importLine={IMPORT}
        code={`// Backdrop tıklamasına kapatmaz
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Backdrop'a Tıklayınca Kapanmaz"
  closeOnBackdropClick={false}
  footer={<Button onClick={() => setOpen(false)}>Tamam</Button>}
/>

// X butonu gizli
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="X Butonu Yok"
  hideCloseButton
  footer={<Button onClick={() => setOpen(false)}>Kapat</Button>}
/>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="outline" onClick={() => setNoBackdropClose(true)}>
            Backdrop'tan kapanmaz
          </Button>
          <Button variant="outline" onClick={() => setNoCloseBtn(true)}>
            Kapatma butonsuz
          </Button>

          <Modal
            open={noBackdropClose}
            onClose={() => setNoBackdropClose(false)}
            title="Backdrop'a Tıklayınca Kapanmaz"
            description="Sadece ESC tuşu veya butona basarak kapatabilirsiniz."
            closeOnBackdropClick={false}
            footer={<Button onClick={() => setNoBackdropClose(false)}>Tamam</Button>}
          />

          <Modal
            open={noCloseBtn}
            onClose={() => setNoCloseBtn(false)}
            title="X Butonu Yok"
            description="Kapatma butonu gizlenmiş. Footer'daki buton ile kapatılır."
            hideCloseButton
            footer={<Button onClick={() => setNoCloseBtn(false)}>Kapat</Button>}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Uzun İçerik (Scroll)"
        description="İçerik modal yüksekliğini aşarsa body kısmi kaydırılır."
        importLine={IMPORT}
        code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Kullanım Koşulları"
  description="Lütfen aşağıdaki koşulları okuyun."
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Reddet</Button>
      <Button onClick={() => setOpen(false)}>Kabul Et</Button>
    </>
  }
>
  <div className="space-y-4 py-2 text-sm text-foreground-muted">
    {/* uzun içerik */}
  </div>
</Modal>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="secondary" onClick={() => setLongContent(true)}>
            Uzun İçerikli Modal
          </Button>
          <Modal
            open={longContent}
            onClose={() => setLongContent(false)}
            title="Kullanım Koşulları"
            description="Lütfen aşağıdaki koşulları okuyun."
            footer={
              <>
                <Button variant="outline" onClick={() => setLongContent(false)}>Reddet</Button>
                <Button onClick={() => setLongContent(false)}>Kabul Et</Button>
              </>
            }
          >
            <div className="space-y-4 py-2 text-sm text-foreground-muted">
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </Modal>
        </div>
      </ShowcaseSection>
    </div>
  );
}
