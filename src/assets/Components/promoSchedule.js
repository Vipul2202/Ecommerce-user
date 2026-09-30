// Central place to schedule time-boxed promos (popups, carousel slides) so
// they turn off automatically once their run ends, instead of needing a
// manual code removal each time.

export const FATHERS_DAY_PROMO_END = new Date('2026-09-30T00:00:00+08:00');

export const isFathersDayPromoActive = () => new Date() < FATHERS_DAY_PROMO_END;
