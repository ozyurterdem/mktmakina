export const languages = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  ar: 'العربية',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'tr';

export const translations = {
  tr: {
    // Nav
    'nav.home': 'Anasayfa',
    'nav.about': 'Kurumsal',
    'nav.products': 'Kabiliyetler',
    'nav.machines': 'Makina Parkuru',
    'nav.references': 'Referanslar',
    'nav.certificates': 'Belgeler',
    'nav.news': 'Haberler',
    'nav.contact': 'İletişim',
    'nav.quote': 'Teklif Al',
    'nav.hr': 'İnsan Kaynakları',

    // Şirket adı (dil bazlı suffix) + marka sloganı (İngilizce, tüm dillerde aynı)
    'company.name': 'MKT Makina',
    'company.suffix': 'A.Ş.',
    'company.full': 'MKT Makina A.Ş.',
    'company.tagline.l1': 'Precision, Traceability',
    'company.tagline.l2': 'Reliability, Innovation',

    // Hero
    'hero.title': 'Havacılık Hassasiyetinde Üretim',
    'hero.subtitle': 'Havacılık ve otomotiv sanayii için yüksek kaliteli hassas işleme parçalar ve plastik enjeksiyon çözümleri.',
    'hero.cta': 'İletişime Geçin',
    'hero.explore': 'Ürünlerimiz',
    'hero.slide1.subtitle': 'AS9100 SERTİFİKALI',
    'hero.slide2.subtitle': 'İLERİ TEKNOLOJİ',
    'hero.slide3.subtitle': 'ÇÖZÜM ORTAĞINIZ',
    'hero.slide2.desc': 'DMG MORI ve HAAS teknolojisi ile micron seviyesinde hassasiyet.',
    'hero.slide3.desc': 'Plastik enjeksiyon ve özel kalıp tasarımında güvenilir çözüm ortağınız.',

    // Stats
    'stats.since': 'Yılından Beri',
    'stats.certification': 'AS9100 Sertifikalı',
    'stats.axis': '5 Eksen CNC',
    'stats.references': 'Güçlü Referanslar',

    // Gallery
    'gallery.title': 'Üretim Galerisi',
    'gallery.subtitle': 'Tesisimizden üretim kareleri',

    // Products / Kabiliyetler
    'products.title': 'Kabiliyetler',
    'products.subtitle': 'Havacılık ve otomotiv sanayii için hassas mühendislik çözümleri',
    'products.assemblies': 'Montaj Grubu Parçalar',
    'products.fixtures': 'Fikstür',
    'products.apparatus': 'Aparatlar',
    'products.molds': 'Kalıplar',
    'products.gauges': 'Kalite Kontrol Mastarları',
    'products.injection': 'Plastik Enjeksiyon',
    'products.detail': 'Detay',

    // About
    'about.title': 'Hakkımızda',
    'about.text': 'MKT Makina, 2007 yılından bu yana havacılık ve otomotiv sanayii için yüksek kaliteli hassas işleme parçalar ile montaj grubu parçalar üretmektedir. AS9100 sertifikasına sahip şirketimiz, kalite yönetim sistemini havacılık ve otomotiv sanayi gerekliliklerine uygun olarak yapılandırmıştır.',
    'about.more': 'Devamı',

    // Machines
    'machines.title': 'Makina Parkuru',
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
    'nav.products': 'Capabilities',
    'nav.machines': 'Machine Park',
    'nav.references': 'References',
    'nav.certificates': 'Certificates',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    'nav.hr': 'Careers',

    // Company name (lang-based suffix) + brand tagline (global, same across languages)
    'company.name': 'MKT Makina',
    'company.suffix': 'Inc.',
    'company.full': 'MKT Makina Inc.',
    'company.tagline.l1': 'Precision, Traceability',
    'company.tagline.l2': 'Reliability, Innovation',

    // Hero
    'hero.title': 'Aviation-Grade Precision Manufacturing',
    'hero.subtitle': 'High quality precision machined parts and plastic injection solutions for aviation and automotive industry.',
    'hero.cta': 'Contact Us',
    'hero.explore': 'Our Products',
    'hero.slide1.subtitle': 'AS9100 CERTIFIED',
    'hero.slide2.subtitle': 'ADVANCED TECHNOLOGY',
    'hero.slide3.subtitle': 'YOUR PARTNER',
    'hero.slide2.desc': 'Micron-level precision with DMG MORI and HAAS technology.',
    'hero.slide3.desc': 'Your reliable partner in plastic injection and custom mold design.',

    // Stats
    'stats.since': 'Since',
    'stats.certification': 'AS9100 Certified',
    'stats.axis': '5-Axis CNC',
    'stats.references': 'Strong References',

    // Gallery
    'gallery.title': 'Production Gallery',
    'gallery.subtitle': 'Production shots from our facility',

    // Products / Capabilities
    'products.title': 'Capabilities',
    'products.subtitle': 'Precision engineering solutions for aviation and automotive industry',
    'products.assemblies': 'Sub-Assembly Parts',
    'products.fixtures': 'Fixtures',
    'products.apparatus': 'Apparatus',
    'products.molds': 'Molds',
    'products.gauges': 'Quality Control Gauges',
    'products.injection': 'Plastic Injection',
    'products.detail': 'Detail',

    // About
    'about.title': 'About Us',
    'about.text': 'MKT Makina has been manufacturing high quality precision machined parts and sub-assembly parts for aviation and automotive industry since 2007. Certified to AS9100, our quality management system has been structured according to the requirements of aviation and automotive industry.',
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
  de: {
    // Nav
    'nav.home': 'Startseite',
    'nav.about': 'Über Uns',
    'nav.products': 'Fähigkeiten',
    'nav.machines': 'Maschinenpark',
    'nav.references': 'Referenzen',
    'nav.certificates': 'Zertifikate',
    'nav.news': 'Neuigkeiten',
    'nav.contact': 'Kontakt',
    'nav.quote': 'Angebot Anfordern',
    'nav.hr': 'Karriere',

    // Firmenname (sprachabhängiges Suffix) + globaler Markenclaim
    'company.name': 'MKT Makina',
    'company.suffix': 'AG',
    'company.full': 'MKT Makina AG',
    'company.tagline.l1': 'Precision, Traceability',
    'company.tagline.l2': 'Reliability, Innovation',

    // Hero
    'hero.title': 'Fertigung mit Luftfahrtpräzision',
    'hero.subtitle': 'Hochwertige Präzisionsbearbeitungsteile und Kunststoffspritzgusslösungen für die Luft- und Raumfahrt- sowie Automobilindustrie.',
    'hero.cta': 'Kontakt Aufnehmen',
    'hero.explore': 'Unsere Produkte',
    'hero.slide1.subtitle': 'AS9100 ZERTIFIZIERT',
    'hero.slide2.subtitle': 'FORTSCHRITTLICHE TECHNOLOGIE',
    'hero.slide3.subtitle': 'IHR LÖSUNGSPARTNER',
    'hero.slide2.desc': 'Mikronpräzision mit DMG MORI und HAAS Technologie.',
    'hero.slide3.desc': 'Ihr zuverlässiger Partner für Kunststoffspritzguss und individuelle Werkzeugkonstruktion.',

    // Stats
    'stats.since': 'Seit',
    'stats.certification': 'AS9100 Zertifiziert',
    'stats.axis': '5-Achsen CNC',
    'stats.references': 'Starke Referenzen',

    // Gallery
    'gallery.title': 'Produktionsgalerie',
    'gallery.subtitle': 'Aufnahmen aus unserem Fertigungsbetrieb',

    // Products / Fähigkeiten
    'products.title': 'Fähigkeiten',
    'products.subtitle': 'Präzisionstechnische Lösungen für die Luft- und Raumfahrt- sowie Automobilindustrie',
    'products.assemblies': 'Baugruppenteile',
    'products.fixtures': 'Spannvorrichtungen',
    'products.apparatus': 'Vorrichtungen',
    'products.molds': 'Werkzeuge',
    'products.gauges': 'Qualitätskontrolllehren',
    'products.injection': 'Kunststoffspritzguss',
    'products.detail': 'Details',

    // About
    'about.title': 'Über Uns',
    'about.text': 'MKT Makina fertigt seit 2007 hochwertige Präzisionsbearbeitungsteile und Baugruppenteile für die Luft- und Raumfahrt- sowie Automobilindustrie. Als AS9100-zertifiziertes Unternehmen haben wir unser Qualitätsmanagementsystem entsprechend den Anforderungen der Luft- und Raumfahrt- sowie Automobilindustrie aufgebaut.',
    'about.more': 'Mehr Erfahren',

    // Machines
    'machines.title': 'Maschinenpark',
    'machines.subtitle': 'Unsere hochmoderne Fertigungsinfrastruktur',

    // References
    'references.title': 'Referenzen',
    'references.subtitle': 'Unsere vertrauenswürdigen Partner',
    'references.all': 'Alle Anzeigen',

    // CTA
    'cta.title': 'Nehmen Sie Kontakt Für Ihr Projekt Auf',
    'cta.subtitle': 'Kontaktieren Sie uns für Präzisionslösungen in der Luft- und Raumfahrt- sowie Automobilindustrie.',
    'cta.button': 'Kontaktformular',
    'cta.call': 'Rufen Sie Uns An',

    // Footer
    'footer.corporate': 'Unternehmen',
    'footer.quicklinks': 'Schnellzugriff',
    'footer.contact': 'Kontakt',
    'footer.address': 'Hanlıköy Mah. Akgün Cad. No:1 Arifiye / Sakarya, Türkei',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.follow': 'Folgen Sie Uns',

    // Contact
    'contact.title': 'Kontakt',
    'contact.form.name': 'Vor- und Nachname',
    'contact.form.email': 'E-Mail',
    'contact.form.phone': 'Telefon',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Nachricht',
    'contact.form.send': 'Senden',
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'القدرات',
    'nav.machines': 'أسطول الآلات',
    'nav.references': 'المراجع',
    'nav.certificates': 'الشهادات',
    'nav.news': 'الأخبار',
    'nav.contact': 'اتصل بنا',
    'nav.quote': 'طلب عرض سعر',
    'nav.hr': 'الوظائف',

    // اسم الشركة (لاحقة حسب اللغة) + شعار العلامة التجارية
    'company.name': 'MKT Makina',
    'company.suffix': 'ش.م.',
    'company.full': 'MKT Makina ش.م.',
    'company.tagline.l1': 'Precision, Traceability',
    'company.tagline.l2': 'Reliability, Innovation',

    // Hero
    'hero.title': 'تصنيع بدقة الطيران',
    'hero.subtitle': 'قطع مُشغَّلة بدقة عالية وحلول حقن بلاستيكي لصناعتَي الطيران والسيارات.',
    'hero.cta': 'تواصل معنا',
    'hero.explore': 'منتجاتنا',
    'hero.slide1.subtitle': 'معتمد وفق AS9100',
    'hero.slide2.subtitle': 'تكنولوجيا متقدمة',
    'hero.slide3.subtitle': 'شريكك في الحلول',
    'hero.slide2.desc': 'دقة على مستوى الميكرون بتقنيات DMG MORI وHAAS.',
    'hero.slide3.desc': 'شريكك الموثوق في حقن البلاستيك وتصميم القوالب المخصصة.',

    // Stats
    'stats.since': 'منذ عام',
    'stats.certification': 'معتمد وفق AS9100',
    'stats.axis': 'CNC خماسي المحاور',
    'stats.references': 'مراجع قوية',

    // Gallery
    'gallery.title': 'معرض الإنتاج',
    'gallery.subtitle': 'لقطات من منشأتنا الإنتاجية',

    // Products / القدرات
    'products.title': 'القدرات',
    'products.subtitle': 'حلول هندسية دقيقة لصناعتَي الطيران والسيارات',
    'products.assemblies': 'قطع مجموعات التجميع',
    'products.fixtures': 'أدوات التثبيت',
    'products.apparatus': 'الأجهزة والمعدات',
    'products.molds': 'القوالب',
    'products.gauges': 'مقاييس مراقبة الجودة',
    'products.injection': 'حقن البلاستيك',
    'products.detail': 'التفاصيل',

    // About
    'about.title': 'من نحن',
    'about.text': 'تقوم شركة MKT Makina منذ عام 2007 بتصنيع قطع مُشغَّلة بدقة عالية وقطع مجموعات التجميع لصناعتَي الطيران والسيارات. وبحصولنا على شهادة AS9100، بنينا نظام إدارة الجودة لدينا وفق متطلبات صناعتَي الطيران والسيارات.',
    'about.more': 'اقرأ المزيد',

    // Machines
    'machines.title': 'أسطول الآلات',
    'machines.subtitle': 'بنيتنا التحتية الإنتاجية المتطورة',

    // References
    'references.title': 'المراجع',
    'references.subtitle': 'شركاؤنا الموثوقون',
    'references.all': 'عرض الكل',

    // CTA
    'cta.title': 'تواصل معنا لمشروعك',
    'cta.subtitle': 'اتصل بنا للحصول على حلول دقيقة في صناعتَي الطيران والسيارات.',
    'cta.button': 'نموذج الاتصال',
    'cta.call': 'اتصل بنا',

    // Footer
    'footer.corporate': 'الشركة',
    'footer.quicklinks': 'روابط سريعة',
    'footer.contact': 'اتصل بنا',
    'footer.address': 'Hanlıköy Mah. Akgün Cad. No:1 Arifiye / Sakarya، تركيا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.follow': 'تابعنا',

    // Contact
    'contact.title': 'اتصل بنا',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.phone': 'الهاتف',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'الرسالة',
    'contact.form.send': 'إرسال',
  },
} as const;

export function t(lang: Lang, key: string): string {
  return (translations[lang] as Record<string, string>)[key] || key;
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
