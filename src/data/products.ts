export interface Product {
  slug: string;
  name: { tr: string; en: string };
  image: string;
  description: { tr: string; en: string };
  details: { tr: string[]; en: string[] };
}

export const products: Product[] = [
  {
    slug: 'aparatlar',
    name: { tr: 'Aparatlar', en: 'Apparatus' },
    image: '/images/categories/aparatlar_7.jpg',
    description: {
      tr: 'Üretim süreçlerinde kullanılan özel tasarım aparatlar. Her müşterinin ihtiyacına göre hassas mühendislik ile üretilir.',
      en: 'Custom designed apparatus for production processes. Precision engineered for each customer\'s needs.',
    },
    details: {
      tr: [
        'Montaj aparatları',
        'Kaynak aparatları',
        'Kontrol aparatları',
        'Bükme aparatları',
        'Pres aparatları',
        'Müşteriye özel tasarım ve üretim',
      ],
      en: [
        'Assembly apparatus',
        'Welding apparatus',
        'Inspection apparatus',
        'Bending apparatus',
        'Press apparatus',
        'Custom design and manufacturing',
      ],
    },
  },
  {
    slug: 'fikstur',
    name: { tr: 'Fikstür', en: 'Fixtures' },
    image: '/images/categories/fikstur_8.jpg',
    description: {
      tr: 'CNC tezgahları ve montaj hatları için yüksek hassasiyetli fikstür sistemleri. Tekrarlanabilir doğruluk sağlar.',
      en: 'High precision fixture systems for CNC machines and assembly lines. Ensures repeatable accuracy.',
    },
    details: {
      tr: [
        'CNC işleme fikstürleri',
        'Montaj fikstürleri',
        'Kaynak fikstürleri',
        'Hidrolik ve pnömatik fikstürler',
        'Vakumlu bağlama sistemleri',
        '5 eksen CNC uyumlu tasarımlar',
      ],
      en: [
        'CNC machining fixtures',
        'Assembly fixtures',
        'Welding fixtures',
        'Hydraulic and pneumatic fixtures',
        'Vacuum clamping systems',
        '5-axis CNC compatible designs',
      ],
    },
  },
  {
    slug: 'kaliplar',
    name: { tr: 'Kalıplar', en: 'Molds' },
    image: '/images/categories/kaliplar_12.jpg',
    description: {
      tr: 'Plastik enjeksiyon kalıpları ve özel üretim kalıp çözümleri. Havacılık ve otomotiv sektörü standartlarında.',
      en: 'Plastic injection molds and custom mold solutions. Aviation and automotive industry standards.',
    },
    details: {
      tr: [
        'Plastik enjeksiyon kalıpları',
        'Sıcak yolluk kalıpları',
        'Çoklu kavite kalıpları',
        'Prototip kalıpları',
        'Kalıp bakım ve revizyon',
        'CAD/CAM destekli kalıp tasarımı',
      ],
      en: [
        'Plastic injection molds',
        'Hot runner molds',
        'Multi-cavity molds',
        'Prototype molds',
        'Mold maintenance and revision',
        'CAD/CAM supported mold design',
      ],
    },
  },
  {
    slug: 'uygulamalar',
    name: { tr: 'Uygulamalar', en: 'Applications' },
    image: '/images/categories/parcalar_13.jpg',
    description: {
      tr: 'Talaşlı imalat parçaları ve montaj grupları. 5 eksen CNC işleme merkezlerinde hassas üretim.',
      en: 'Machined parts and sub-assemblies. Precision manufacturing on 5-axis CNC machining centers.',
    },
    details: {
      tr: [
        'Talaşlı imalat parçaları',
        'Montaj grupları ve alt montajlar',
        'Havacılık yapısal parçaları',
        'Otomotiv komponentleri',
        'Alüminyum, çelik, titanyum işleme',
        'Yüzey işlemleri (anodizasyon, kaplama)',
      ],
      en: [
        'Machined parts',
        'Assemblies and sub-assemblies',
        'Aerospace structural parts',
        'Automotive components',
        'Aluminum, steel, titanium machining',
        'Surface treatments (anodizing, coating)',
      ],
    },
  },
  {
    slug: 'kalite-kontrol-mastarlari',
    name: { tr: 'Kalite Kontrol Mastarları', en: 'Quality Control Gauges' },
    image: '/images/categories/mastarlar_14.jpg',
    description: {
      tr: 'Üretim kalitesini doğrulayan hassas ölçüm mastarları. AS9100 standartlarına uygun tasarım ve üretim.',
      en: 'Precision measurement gauges that verify production quality. Designed to AS9100 standards.',
    },
    details: {
      tr: [
        'Go/No-Go mastarları',
        'Profil mastarları',
        'Montaj kontrol mastarları',
        'Özel tolerans mastarları',
        'Sertifikalı kalibrasyon',
        'AS9100 uyumlu dokümantasyon',
      ],
      en: [
        'Go/No-Go gauges',
        'Profile gauges',
        'Assembly inspection gauges',
        'Custom tolerance gauges',
        'Certified calibration',
        'AS9100 compliant documentation',
      ],
    },
  },
  {
    slug: 'plastik-enjeksiyon',
    name: { tr: 'Plastik Enjeksiyon', en: 'Plastic Injection' },
    image: '/images/categories/parcalar_13.jpg',
    description: {
      tr: 'LS LST 280 plastik enjeksiyon makinası ile seri üretim. Otomotiv ve havacılık parçaları.',
      en: 'Serial production with LS LST 280 plastic injection machine. Automotive and aviation parts.',
    },
    details: {
      tr: [
        'Plastik enjeksiyon baskı üretimi',
        'Küçük ve orta seri üretim',
        'Teknik plastik parçalar',
        'Otomotiv plastik komponentleri',
        'Kalıp tasarımından üretime komple çözüm',
        'Kalite kontrol ve ölçüm raporları',
      ],
      en: [
        'Plastic injection molding production',
        'Small and medium batch production',
        'Technical plastic parts',
        'Automotive plastic components',
        'Complete solution from mold design to production',
        'Quality control and measurement reports',
      ],
    },
  },
];
