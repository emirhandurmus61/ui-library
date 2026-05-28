"use client";

import { FAQList } from "@/components/ui/faq-list";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Full FAQ data ───────────────────────────────────────────── */

const fullFAQItems = [
  {
    question: "Ürünü ücretsiz deneyebilir miyim?",
    answer:
      "Evet, 14 günlük ücretsiz deneme süremiz mevcuttur. Kredi kartı bilgisi gerekmez. Deneme süresince tüm Pro plan özelliklerine erişebilirsiniz.",
    category: "Genel",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Visa, Mastercard, American Express gibi tüm büyük kredi kartlarını kabul ediyoruz. Ayrıca banka havalesi ve kurumsal fatura seçenekleri de mevcuttur.",
    category: "Fiyatlandırma",
  },
  {
    question: "Aboneliğimi istediğim zaman iptal edebilir miyim?",
    answer:
      "Evet, aboneliğinizi herhangi bir zamanda iptal edebilirsiniz. İptal işleminden sonra mevcut fatura döneminin sonuna kadar hizmetlere erişiminiz devam eder. Ek ücret alınmaz.",
    category: "Fiyatlandırma",
  },
  {
    question: "Verilerimi nasıl yedekliyorsunuz?",
    answer:
      "Verileriniz günlük olarak otomatik yedeklenir ve farklı coğrafi bölgelerdeki veri merkezlerinde şifreli biçimde saklanır. Son 30 güne ait yedeklere erişebilir ve istediğiniz noktaya geri dönebilirsiniz.",
    category: "Teknik",
  },
  {
    question: "API erişimi için rate limit var mı?",
    answer:
      "Ücretsiz planda dakikada 60 istek, Pro planda dakikada 1.000 istek, Kurumsal planda ise ihtiyacınıza özel özelleştirilebilir limit uygulanmaktadır. Tüm limitler API dokümantasyonumuzda detaylı olarak açıklanmıştır.",
    category: "Teknik",
  },
  {
    question: "Hesabımı başka bir kullanıcıya devredebilir miyim?",
    answer:
      "Evet, hesap sahibi değişikliği için destek ekibimize ulaşmanız yeterlidir. Devir işlemi sırasında verileriniz korunur ve herhangi bir kesinti yaşanmaz.",
    category: "Hesap",
  },
  {
    question: "Takım planında kullanıcı sayısını sonradan artırabilir miyim?",
    answer:
      "Kesinlikle. Ayarlar > Ekip sayfasından istediğiniz zaman yeni üye ekleyebilirsiniz. Ek kullanıcı başına ücret, kalan fatura günü oranında hesaplanarak bir sonraki faturanıza yansıtılır.",
    category: "Hesap",
  },
  {
    question: "GDPR ve KVKK uyumluluğu hakkında bilgi verir misiniz?",
    answer:
      "Platformumuz GDPR ve KVKK gerekliliklerini tam olarak karşılamaktadır. Veri işleme sözleşmesi (DPA), AB Standart Sözleşme Maddeleri ve veri saklama politikamız hakkında detaylı bilgiye gizlilik sayfamızdan ulaşabilirsiniz.",
    category: "Teknik",
  },
];

/* ─── Simple FAQ data ─────────────────────────────────────────── */

const simpleFAQItems = [
  {
    question: "Kurulum ne kadar sürer?",
    answer:
      "Ortalama kurulum süresi 5 dakikadır. Kılavuzumuzu izleyerek uygulamanızı hızlıca entegre edebilirsiniz.",
  },
  {
    question: "Destek kanallarınız nelerdir?",
    answer:
      "E-posta, canlı sohbet ve telefon desteği sunuyoruz. Pro ve Kurumsal planlar öncelikli destek hattına erişim içerir.",
  },
  {
    question: "Mobil uygulama mevcut mu?",
    answer:
      "iOS ve Android için yerel mobil uygulamalarımız App Store ve Google Play'den indirilebilir.",
  },
  {
    question: "Farklı para birimlerinde ödeme yapabilir miyim?",
    answer:
      "TRY, USD ve EUR para birimleriyle ödeme kabul ediyoruz. Para birimi seçimini ödeme sayfasında yapabilirsiniz.",
  },
];

/* ─── Multiple open FAQ data ──────────────────────────────────── */

const multipleFAQItems = [
  {
    question: "Entegrasyon desteği nasıl çalışır?",
    answer:
      "Slack, Jira, GitHub ve 50'den fazla araçla yerleşik entegrasyonumuz bulunmaktadır. REST API ve webhook desteği sayesinde özel entegrasyonlar da geliştirebilirsiniz.",
  },
  {
    question: "Verileri başka platforma taşıyabilir miyim?",
    answer:
      "Evet, tüm verilerinizi CSV, JSON veya XML formatında dışa aktarabilirsiniz. Platform bağımlılığı yaratmadan verilerinize sahip olursunuz.",
  },
  {
    question: "SLA garantisi nedir?",
    answer:
      "Kurumsal planda %99,9 uptime SLA sunuyoruz. Hizmet kesintisi durumunda hizmet kredisi politikamız kapsamında telafi edilirsiniz.",
  },
  {
    question: "İki faktörlü kimlik doğrulama destekleniyor mu?",
    answer:
      "Evet, TOTP uygulamaları (Google Authenticator, Authy vb.) ve SMS tabanlı iki faktörlü doğrulama desteklenmektedir. Kurumsal planda SSO (SAML 2.0, OIDC) da mevcuttur.",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function FAQListPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">FAQ List</h1>
        <p className="text-sm text-foreground-muted">
          Accordion tabanlı SSS listesi. Arama · kategori filtresi · schema markup
        </p>
      </div>

      <ShowcaseSection title="Tam Özellikli">
        <FAQList
          items={fullFAQItems}
          searchable
          filterable
          allowMultiple
        />
      </ShowcaseSection>

      <ShowcaseSection title="Basit">
        <FAQList items={simpleFAQItems} />
      </ShowcaseSection>

      <ShowcaseSection title="Çoklu Açık">
        <FAQList items={multipleFAQItems} allowMultiple />
      </ShowcaseSection>
    </div>
  );
}
