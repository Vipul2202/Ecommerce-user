// Central place to schedule time-boxed promos (popups, carousel slides) so
// they turn off automatically once their run ends, instead of needing a
// manual code removal each time.

export const FATHERS_DAY_PROMO_END = new Date('2026-09-30T17:00:00+08:00');

// Permanently off — not date-based anymore. A device holding a stale
// cached bundle (e.g. an old mobile session) must never be able to see
// the popup/slide or claim the discount again, regardless of its clock.
export const isFathersDayPromoActive = () => false;
