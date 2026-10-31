import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_BASE_URL;

const CATEGORY_LABELS = {
  tier: "Wash & Detail Services",
  premium: "Ultra Premium Finishes",
  extra: "Add On Enhancements",
};

const CATEGORY_ORDER = ["tier", "premium", "extra"];

const PricingPanel = ({ password, onAuthExpired }) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState({}); // { [key]: { sedan, suv, fourWd, flatPrice, quoteOnly } }
  const [savingKey, setSavingKey] = useState(null);

  const authHeaders = { headers: { "x-owner-password": password } };

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/service-prices`, authHeaders);
      const list = res.data?.prices || [];
      setPrices(list);
      const nextDrafts = {};
      list.forEach((p) => {
        nextDrafts[p.key] = {
          sedan: p.sedan ?? "",
          suv: p.suv ?? "",
          fourWd: p.fourWd ?? "",
          flatPrice: p.flatPrice ?? "",
          quoteOnly: !!p.quoteOnly,
        };
      });
      setDrafts(nextDrafts);
    } catch (error) {
      if (error.response?.status === 401) {
        onAuthExpired();
      } else {
        toast.error("Failed to load prices");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDraft = (key, field, value) => {
    setDrafts((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const hasChanges = (item) => {
    const d = drafts[item.key];
    if (!d) return false;
    if (item.category === "tier") {
      return (
        String(d.sedan) !== String(item.sedan ?? "") ||
        String(d.suv) !== String(item.suv ?? "") ||
        String(d.fourWd) !== String(item.fourWd ?? "")
      );
    }
    return (
      String(d.flatPrice) !== String(item.flatPrice ?? "") ||
      !!d.quoteOnly !== !!item.quoteOnly
    );
  };

  const handleSave = async (item) => {
    const d = drafts[item.key];
    setSavingKey(item.key);
    try {
      const body =
        item.category === "tier"
          ? { sedan: d.sedan, suv: d.suv, fourWd: d.fourWd }
          : { flatPrice: d.flatPrice, quoteOnly: d.quoteOnly };
      const res = await axios.put(`${API}/admin/service-prices/${item.key}`, body, authHeaders);
      const updated = res.data?.price;
      setPrices((prev) => prev.map((p) => (p.key === item.key ? updated : p)));
      toast.success(`${item.label} price updated`);
    } catch (error) {
      if (error.response?.status === 401) {
        onAuthExpired();
      } else {
        toast.error(error.response?.data?.message || "Failed to update price");
      }
    } finally {
      setSavingKey(null);
    }
  };

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: prices.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-300">Service Pricing</h2>
        <p className="text-xs text-gray-500">Changes here go live on the website immediately.</p>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-400">Loading prices...</div>
      ) : (
        <div className="flex flex-col gap-8">
          {grouped.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#00a0db] mb-3">
                {CATEGORY_LABELS[group.category]}
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#111] text-gray-300 text-left">
                      <th className="p-3">Service</th>
                      {group.category === "tier" ? (
                        <>
                          <th className="p-3">Sedan ($)</th>
                          <th className="p-3">SUV ($)</th>
                          <th className="p-3">4WD / 7-Seater ($)</th>
                        </>
                      ) : (
                        <>
                          <th className="p-3">Price ($)</th>
                          {group.category === "premium" && <th className="p-3">Quote Only</th>}
                        </>
                      )}
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item) => {
                      const d = drafts[item.key] || {};
                      const changed = hasChanges(item);
                      return (
                        <tr key={item.key} className="border-t border-gray-800">
                          <td className="p-3 whitespace-nowrap font-semibold">{item.label}</td>
                          {item.category === "tier" ? (
                            <>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={d.sedan}
                                  onChange={(e) => updateDraft(item.key, "sedan", e.target.value)}
                                  className="w-20 px-2 py-1 rounded bg-black border border-gray-700 text-white focus:outline-none focus:ring focus:ring-[#00a0db]"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={d.suv}
                                  onChange={(e) => updateDraft(item.key, "suv", e.target.value)}
                                  className="w-20 px-2 py-1 rounded bg-black border border-gray-700 text-white focus:outline-none focus:ring focus:ring-[#00a0db]"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={d.fourWd}
                                  onChange={(e) => updateDraft(item.key, "fourWd", e.target.value)}
                                  className="w-20 px-2 py-1 rounded bg-black border border-gray-700 text-white focus:outline-none focus:ring focus:ring-[#00a0db]"
                                />
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={d.flatPrice}
                                  onChange={(e) => updateDraft(item.key, "flatPrice", e.target.value)}
                                  className="w-24 px-2 py-1 rounded bg-black border border-gray-700 text-white focus:outline-none focus:ring focus:ring-[#00a0db]"
                                />
                              </td>
                              {group.category === "premium" && (
                                <td className="p-3">
                                  <input
                                    type="checkbox"
                                    checked={!!d.quoteOnly}
                                    onChange={(e) => updateDraft(item.key, "quoteOnly", e.target.checked)}
                                    className="w-4 h-4"
                                  />
                                </td>
                              )}
                            </>
                          )}
                          <td className="p-3">
                            <button
                              onClick={() => handleSave(item)}
                              disabled={!changed || savingKey === item.key}
                              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#00a0db] hover:bg-[#0088bb] text-white disabled:opacity-40 transition"
                            >
                              {savingKey === item.key ? "Saving..." : "Save"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingPanel;
