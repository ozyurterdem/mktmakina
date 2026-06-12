import type { Lang } from '../i18n/translations';

export interface MachineParkMachine {
  name: string;
  description: {
    tr: string;
    en: string;
  };
  diameter?: string;
  x?: string;
  y?: string;
  z?: string;
  speed?: string;
}

export interface MachineParkGroup {
  category: Record<Lang, string>;
  brand: string;
  machines: MachineParkMachine[];
}

export const machineParkGroups: MachineParkGroup[] = [
  {
    category: {
      tr: '5 Eksen CNC İşleme Merkezleri',
      en: '5-Axis CNC Machining Centers',
      de: '5-Achsen CNC-Bearbeitungszentren',
      ar: 'مراكز تشغيل CNC خماسية المحاور',
    },
    brand: 'DMG MORI / HERMLE',
    machines: [
      {
        name: 'DMU 85 monoBLOCK',
        description: {
          tr: 'DMU 85 monoBLOCK 5 eksen CNC işleme merkezi',
          en: 'DMU 85 monoBLOCK 5 axis CNC machining center',
        },
        diameter: '850',
        x: '935',
        y: '850',
        z: '650',
        speed: '18000',
      },
      {
        name: 'DMU 75 monoBLOCK',
        description: {
          tr: 'DMU 75 monoBLOCK 5 eksen CNC işleme merkezi',
          en: 'DMU 75 monoBLOCK 5 axis CNC machining center',
        },
        diameter: '750',
        x: '835',
        y: '650',
        z: '650',
        speed: '18000',
      },
      {
        name: 'HERMLE C400',
        description: {
          tr: 'HERMLE C400 5 eksen CNC işleme merkezi',
          en: 'HERMLE C400 5 axis CNC machining center',
        },
        diameter: '800',
        x: '800',
        y: '600',
        z: '500',
        speed: '28000',
      },
      {
        name: 'ECOMILL 50',
        description: {
          tr: 'ECOMILL 50 5 eksen CNC işleme merkezi',
          en: 'ECOMILL 50 5 axis CNC machining center',
        },
        diameter: '500',
        x: '500',
        y: '450',
        z: '400',
        speed: '12000',
      },
    ],
  },
  {
    category: {
      tr: 'Yatay CNC İşleme Merkezleri',
      en: 'Horizontal CNC Machining Centers',
      de: 'Horizontale CNC-Bearbeitungszentren',
      ar: 'مراكز التشغيل الأفقية CNC',
    },
    brand: 'DMG MORI NHC',
    machines: [
      {
        name: 'NHC 5000',
        description: {
          tr: 'DMG MORI NHC 5000 yatay işleme merkezi',
          en: 'DMG MORI NHC 5000 horizontal machining center',
        },
        x: '500',
        y: '500',
        z: '630',
        speed: '15000',
      },
      {
        name: 'NHC 5000',
        description: {
          tr: 'DMG MORI NHC 5000 yatay işleme merkezi',
          en: 'DMG MORI NHC 5000 horizontal machining center',
        },
        x: '500',
        y: '500',
        z: '630',
        speed: '15000',
      },
    ],
  },
  {
    category: {
      tr: '3 Eksen CNC İşleme Merkezleri',
      en: '3-Axis CNC Machining Centers',
      de: '3-Achsen CNC-Bearbeitungszentren',
      ar: 'مراكز تشغيل CNC ثلاثية المحاور',
    },
    brand: 'DMG MORI',
    machines: [
      {
        name: 'CMX 600',
        description: {
          tr: 'DMG MORI CMX 600 3 eksen işleme merkezi',
          en: 'DMG MORI CMX 600 3 axis machining center',
        },
        x: '600',
        y: '510',
        z: '510',
        speed: '12000',
      },
      {
        name: 'CMX 1100',
        description: {
          tr: 'DMG MORI CMX 1100 3 eksen işleme merkezi',
          en: 'DMG MORI CMX 1100 3 axis machining center',
        },
        x: '1100',
        y: '560',
        z: '510',
        speed: '12000',
      },
      {
        name: 'CMX 1100',
        description: {
          tr: 'DMG MORI CMX 1100 3 eksen işleme merkezi',
          en: 'DMG MORI CMX 1100 3 axis machining center',
        },
        x: '1100',
        y: '560',
        z: '510',
        speed: '12000',
      },
      {
        name: 'CMX 800',
        description: {
          tr: 'DMG MORI CMX 800 3 eksen işleme merkezi',
          en: 'DMG MORI CMX 800 3 axis machining center',
        },
        x: '800',
        y: '560',
        z: '510',
        speed: '12000',
      },
      {
        name: 'CMX 800',
        description: {
          tr: 'DMG MORI CMX 800 3 eksen işleme merkezi',
          en: 'DMG MORI CMX 800 3 axis machining center',
        },
        x: '800',
        y: '560',
        z: '510',
        speed: '12000',
      },
      {
        name: 'DMC 1035 V',
        description: {
          tr: 'DMG DMC 1035 V 3 eksen işleme merkezi',
          en: 'DMG DMC 1035 V 3 axis machining center',
        },
        x: '1035',
        y: '560',
        z: '510',
        speed: '10000',
      },
      {
        name: 'DMC 835 V',
        description: {
          tr: 'DMG DMC 835 V 3 eksen işleme merkezi',
          en: 'DMG DMC 835 V 3 axis machining center',
        },
        x: '835',
        y: '510',
        z: '510',
        speed: '8000',
      },
      {
        name: 'DMC 835 V',
        description: {
          tr: 'DMG DMC 835 V 3 eksen işleme merkezi',
          en: 'DMG DMC 835 V 3 axis machining center',
        },
        x: '835',
        y: '510',
        z: '510',
        speed: '8000',
      },
    ],
  },
  {
    category: {
      tr: 'CNC Torna',
      en: 'CNC Lathes',
      de: 'CNC-Drehmaschinen',
      ar: 'مخارط CNC',
    },
    brand: 'VICTOR / DMG MORI',
    machines: [
      {
        name: 'VICTOR VTUM-P20',
        description: {
          tr: 'VICTOR VTUM-P20 CNC torna',
          en: 'VICTOR VTUM-P20 CNC lathe',
        },
        diameter: '280',
        x: '140+20',
        z: '370',
        speed: '4500',
      },
      {
        name: 'NLX 2500SY/700',
        description: {
          tr: 'DMG MORI NLX 2500SY/700 CNC torna',
          en: 'DMG MORI NLX 2500SY/700 CNC lathe',
        },
        diameter: '366',
        z: '705',
        speed: '10000',
      },
    ],
  },
  {
    category: {
      tr: 'Ölçüm Sistemleri',
      en: 'Measurement Systems',
      de: 'Messsysteme',
      ar: 'أنظمة القياس',
    },
    brand: 'ZEISS',
    machines: [
      {
        name: 'ZEISS CONTURA',
        description: {
          tr: 'ZEISS CONTURA CMM',
          en: 'ZEISS CONTURA CMM',
        },
        x: '700',
        y: '1000',
        z: '600',
      },
    ],
  },
  {
    category: {
      tr: 'Erozyon Tezgahları',
      en: 'EDM Machines',
      de: 'Erodiermaschinen',
      ar: 'آلات التفريغ الكهربائي',
    },
    brand: 'AJAN / CUT',
    machines: [
      {
        name: 'AJAN EDM 938',
        description: {
          tr: 'AJAN EDM 938 dalma erozyon',
          en: 'AJAN EDM 938 sinking erosion',
        },
        x: '600',
        y: '350',
        z: '300',
      },
      {
        name: 'CUT 30P',
        description: {
          tr: 'CUT 30P tel erozyon',
          en: 'CUT 30P wire erosion',
        },
        x: '600',
        y: '400',
        z: '350',
      },
      {
        name: 'CUT 20P',
        description: {
          tr: 'CUT 20P tel erozyon',
          en: 'CUT 20P wire erosion',
        },
        x: '350',
        y: '250',
        z: '250',
      },
    ],
  },
  {
    category: {
      tr: 'Konvansiyonel Tezgahlar',
      en: 'Conventional Machines',
      de: 'Konventionelle Maschinen',
      ar: 'الآلات التقليدية',
    },
    brand: 'WOC / FIRST',
    machines: [
      {
        name: 'WOC 5906',
        description: {
          tr: 'WOC 5906 universal torna',
          en: 'WOC 5906 universal lathe',
        },
        x: '300',
        z: '1000',
      },
      {
        name: 'FIRST LC 1-1/2 VS',
        description: {
          tr: 'FIRST LC 1-1/2 VS universal freze',
          en: 'FIRST LC 1-1/2 VS universal milling machine',
        },
        x: '790',
        y: '415',
        z: '390',
      },
      {
        name: 'FIRST LC 20-VHS',
        description: {
          tr: 'FIRST LC 20-VHS universal freze',
          en: 'FIRST LC 20-VHS universal milling machine',
        },
        x: '920',
        y: '415',
        z: '460',
      },
    ],
  },
  {
    category: {
      tr: 'Lazer Markalama',
      en: 'Laser Marking',
      de: 'Laserkennzeichnung',
      ar: 'الوسم بالليزر',
    },
    brand: 'Fiber 20',
    machines: [
      {
        name: 'Fiber 20',
        description: {
          tr: 'Fiber 20 lazer markalama',
          en: 'Fiber 20 laser marking',
        },
      },
    ],
  },
  {
    category: {
      tr: 'Taşlama',
      en: 'Grinding',
      de: 'Schleifen',
      ar: 'الطحن والصقل',
    },
    brand: 'TSCHUDIN / KRASNY BORETS',
    machines: [
      {
        name: 'TSCHUDIN HTG 310',
        description: {
          tr: 'TSCHUDIN HTG 310 silindirik taşlama',
          en: 'TSCHUDIN HTG 310 cylindrical grinding machine',
        },
        x: '350',
      },
      {
        name: 'KRASNY BORETS ORSHA-2045',
        description: {
          tr: 'KRASNY BORETS ORSHA-2045 yüzey taşlama',
          en: 'KRASNY BORETS ORSHA-2045 surface grinding machine',
        },
        x: '400',
        y: '200',
        z: '200',
      },
      {
        name: 'KRASNY BORETS ORH-500',
        description: {
          tr: 'KRASNY BORETS ORH-500 yüzey taşlama',
          en: 'KRASNY BORETS ORH-500 surface grinding machine',
        },
        x: '600',
        y: '400',
        z: '300',
      },
    ],
  },
  {
    category: {
      tr: 'Kumlama & Vibrasyon',
      en: 'Sandblasting & Vibration',
      de: 'Sandstrahlen & Vibration',
      ar: 'السفع الرملي والاهتزاز',
    },
    brand: 'SAYKAR / KROMAJ',
    machines: [
      {
        name: 'SAYKAR 1000',
        description: {
          tr: 'SAYKAR 1000 kumlama makinası',
          en: 'SAYKAR 1000 sandblasting machine',
        },
        x: '750',
        y: '500',
        z: '400',
      },
      {
        name: 'SAYKAR 1000',
        description: {
          tr: 'SAYKAR 1000 kumlama makinası',
          en: 'SAYKAR 1000 sandblasting machine',
        },
        x: '750',
        y: '500',
        z: '400',
      },
      {
        name: 'KROMAJ VRM 1000',
        description: {
          tr: 'KROMAJ VRM 1000 vibrasyon makinesi',
          en: 'KROMAJ VRM 1000 vibration machine',
        },
        diameter: '1000',
      },
    ],
  },
];

export const machineParkTotal = machineParkGroups.reduce((total, group) => total + group.machines.length, 0);

export const machineParkStats = [
  {
    value: '4',
    label: {
      tr: '5 Eksen CNC',
      en: '5-Axis CNC',
      de: '5-Achsen CNC',
      ar: 'CNC خماسي',
    },
  },
  {
    value: '8',
    label: {
      tr: '3 Eksen CNC',
      en: '3-Axis CNC',
      de: '3-Achsen CNC',
      ar: 'CNC ثلاثي',
    },
  },
  {
    value: '2',
    label: {
      tr: 'Yatay CNC',
      en: 'Horizontal CNC',
      de: 'Horizontal CNC',
      ar: 'CNC أفقي',
    },
  },
  {
    value: String(machineParkTotal),
    label: {
      tr: 'Toplam Makina',
      en: 'Total Machines',
      de: 'Maschinen gesamt',
      ar: 'إجمالي الآلات',
    },
  },
];
