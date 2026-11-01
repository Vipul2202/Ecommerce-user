import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const PricingContext = createContext({ pricesByKey: {}, loading: true });

export const PricingProvider = ({ children }) => {
  const [pricesByKey, setPricesByKey] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    axios
      .get(`${API}/user/get-service-prices`)
      .then((res) => {
        if (cancelled) return;
        const map = {};
        (res.data?.prices || []).forEach((p) => {
          map[p.key] = p;
        });
        setPricesByKey(map);
      })
      .catch(() => {
        // Site keeps working off each component's hardcoded fallback price.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PricingContext.Provider value={{ pricesByKey, loading }}>
      {children}
    </PricingContext.Provider>
  );
};

// Returns the live price doc for a service key, or undefined if it
// hasn't loaded yet (or the fetch failed) — callers should fall back to
// their own hardcoded default in that case, e.g.:
//   const live = usePrice("outside");
//   const sedan = live?.sedan ?? 35;
export const usePrice = (key) => {
  const { pricesByKey } = useContext(PricingContext);
  return pricesByKey[key];
};

export const useAllPrices = () => useContext(PricingContext);

// Takes a static list of { key, pricing: { sedan, suv, fourWd }, ... }
// (wash/detail tiers) and returns a copy with each item's pricing
// overridden by the live value where one exists.
export const useMergedTierServices = (staticList) => {
  const { pricesByKey } = useContext(PricingContext);
  return staticList.map((item) => {
    const live = pricesByKey[item.key];
    if (!live) return item;
    return {
      ...item,
      pricing: {
        sedan: live.sedan ?? item.pricing.sedan,
        suv: live.suv ?? item.pricing.suv,
        fourWd: live.fourWd ?? item.pricing.fourWd,
      },
    };
  });
};

// Takes a static list of { key, price, note? } (premium finishes / extras,
// flat-priced) and returns a copy with each item's price overridden by the
// live flatPrice, and `price` forced to null (quote-only) when the owner
// has flagged that service as quoteOnly.
export const useMergedFlatServices = (staticList) => {
  const { pricesByKey } = useContext(PricingContext);
  return staticList.map((item) => {
    const live = pricesByKey[item.key];
    if (!live) return item;
    return {
      ...item,
      price: live.quoteOnly ? null : live.flatPrice ?? item.price,
    };
  });
};
