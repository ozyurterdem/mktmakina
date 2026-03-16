export const languages = {
  tr: 'Türkçe',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'tr';

export const translations = {
  tr: {
    // Nav
    'nav.home': 'Anasayfa',
    'nav.about': 'Kurumsal',
    'nav.products': 'Ürünler',
    'nav.machines': 'Makina Parkımız',
    'nav.references': 'Referanslar',
    'nav.certificates': 'Belgeler',
    'nav.news': 'Haberler',
    'nav.contact': 'İletişim',
    'nav.quote': 'Teklif Al',
    'nav.hr': 'İnsan Kaynakları',

    // Hero
    'hero.title': 'Havacılık Hassasiyetinde Üretim',
    'hero.subtitle': 'Havacılık ve otomotiv sanayii için yüksek kaliteli hassas işleme parçalar ve plastik enjeksiyon çözümleri.',
    'hero.cta': 'İletişime Geçin',
    'hero.explore': 'Ürünlerimiz',

    // Stats
    'stats.since': 'Yılından Beri',
    'stats.certification': 'AS9100 Sertifikalı',
    'stats.axis': '5 Eksen CNC',
    'stats.references': 'Güçlü Referanslar',

    // Products
    'products.title': 'Ürünlerimiz',
    'products.subtitle': 'Havacılık ve otomotiv sanayii için hassas mühendislik çözümleri',
    'products.apparatus': 'Aparatlar',
    'products.fixtures': 'Fikstür',
    'products.molds': 'Kalıplar',
    'products.applications': 'Uygulamalar',
    'products.gauges': 'Kalite Kontrol Mastarları',
    'products.injection': 'Plastik Enjeksiyon',
    'products.detail': 'Detay',

    // About
    'about.title': 'Hakkımızda',
    'about.text': 'MKT Makina, 2007 yılından bu yana havacılık ve otomotiv sanayii için yüksek kaliteli hassas işleme parçalar ve plastik enjeksiyon parçalar üretmektedir. AS9100 sertifikasına sahip şirketimiz, kalite yönetim sistemini havacılık ve otomotiv sanayi gerekliliklerine uygun olarak yapılandırmıştır.',
    'about.more': 'Devamı',

    // Machines
    'machines.title': 'Makina Parkımız',
    'machines.subtitle': 'İleri teknoloji üretim altyapımız',

    // References
    'references.title': 'Referanslar',
    'references.subtitle': 'Güvenilir iş ortaklarımız',
    'references.all': 'Tümünü Görüntüle',

    // CTA
    'cta.title': 'Projeniz İçin Bize Ulaşın',
    'cta.subtitle': 'Havacılık ve otomotiv sektöründe hassas çözümler için bizimle iletişime geçin.',
    'cta.button': 'İletişim Formu',
    'cta.call': 'Bizi Arayın',

    // Footer
    'footer.corporate': 'Kurumsal',
    'footer.quicklinks': 'Hızlı Bağlantılar',
    'footer.contact': 'İletişim',
    'footer.address': 'Hanlıköy Mah. Akgün Cad. No:1 Arifiye / Sakarya',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.follow': 'Bizi Takip Edin',

    // Contact
    'contact.title': 'İletişim',
    'contact.form.name': 'Ad Soyad',
    'contact.form.email': 'E-posta',
    'contact.form.phone': 'Telefon',
    'contact.form.subject': 'Konu',
    'contact.form.message': 'Mesaj',
    'contact.form.send': 'Gönder',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.machines': 'Machine Park',
    'nav.references': 'References',
    'nav.certificates': 'Certificates',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    'nav.hr': 'Careers',

    // Hero
    'hero.title': 'Aviation-Grade Precision Manufacturing',
    'hero.subtitle': 'High quality precision machined parts and plastic injection solutions for aviation and automotive industry.',
    'hero.cta': 'Contact Us',
    'hero.explore': 'Our Products',

    // Stats
    'stats.since': 'Since',
    'stats.certification': 'AS9100 Certified',
    'stats.axis': '5-Axis CNC',
    'stats.references': 'Strong References',

    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'Precision engineering solutions for aviation and automotive industry',
    'products.apparatus': 'Apparatus',
    'products.fixtures': 'Fixtures',
    'products.molds': 'Molds',
    'products.applications': 'Applications',
    'products.gauges': 'Quality Control Gauges',
    'products.injection': 'Plastic Injection',
    'products.detail': 'Detail',

    // About
    'about.title': 'About Us',
    'about.text': 'MKT Makina has been manufacturing high quality precision machined parts and plastic injection parts for aviation and automotive industry since 2007. Certified to AS9100, our quality management system has been structured according to the requirements of aviation and automotive industry.',
    'about.more': 'Read More',

    // Machines
    'machines.title': 'Machine Park',
    'machines.subtitle': 'Advanced technology production infrastructure',

    // References
    'references.title': 'References',
    'references.subtitle': 'Our trusted partners',
    'references.all': 'View All',

    // CTA
    'cta.title': 'Get in Touch for Your Project',
    'cta.subtitle': 'Contact us for precision solutions in aviation and automotive industry.',
    'cta.button': 'Contact Form',
    'cta.call': 'Call Us',

    // Footer
    'footer.corporate': 'Corporate',
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.address': 'Hanlıköy Mah. Akgün Cad. No:1 Arifiye / Sakarya, Turkey',
    'footer.rights': 'All rights reserved.',
    'footer.follow': 'Follow Us',

    // Contact
    'contact.title': 'Contact',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send',
  },
} as const;

export function t(lang: Lang, key: string): string {
  return (translations[lang] as Record<string, string>)[key] || key;
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
