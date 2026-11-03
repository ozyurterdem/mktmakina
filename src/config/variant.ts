// Site iki sürümle derlenir: `SITE_VARIANT=savunma npm run build` savunma sürümünü,
// değişken yoksa endüstri sürümünü üretir. Varsayılan bilerek endüstri: değişken
// unutulursa savunma içeriği yanlışlıkla yayına çıkmaz.
export type SiteVariant = 'endustri' | 'savunma';

export const SITE_VARIANT: SiteVariant = process.env.SITE_VARIANT === 'savunma' ? 'savunma' : 'endustri';

export const isSavunma = SITE_VARIANT === 'savunma';

/** Yalnız savunma sürümünde görünecek öğeleri listeden ayıklar. */
export const onlyInSavunma = <T>(items: T[]): T[] => (isSavunma ? items : []);
