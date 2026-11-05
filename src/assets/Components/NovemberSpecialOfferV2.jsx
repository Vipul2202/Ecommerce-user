import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accent, navy, border, fraunces, useGoogleFont } from "./redesignTheme";
import { NOVEMBER_SPECIAL_END } from "./promoSchedule";

const SIDE_BANNER_DELAY_MS = 1000;

const MYAREE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=4%2F41+McCoy+Street%2C+Myaree+WA+6154";
const MIDLAND_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=7+Loton+Avenue%2C+Midland+WA+6056";

const NovemberSpecialOfferV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSideBanner, setShowSideBanner] = useState(false);
  const [sideBannerExpanded, setSideBannerExpanded] = useState(false);
  const sideBannerTimerRef = useRef(null);

  const offerExpired = Date.now() > NOVEMBER_SPECIAL_END.getTime();

  useEffect(() => {
    if (offerExpired) return;
    const modalTimer = setTimeout(() => setShowModal(true), 1500);
    return () => {
      clearTimeout(modalTimer);
      clearTimeout(sideBannerTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    if (offerExpired) return;
    // The sticky side banner takes over once the modal is dismissed, and
    // stays docked there for the rest of the visit (no re-popping toast).
    sideBannerTimerRef.current = setTimeout(() => setShowSideBanner(true), SIDE_BANNER_DELAY_MS);
  };

  const handleCloseSideBanner = () => {
    setShowSideBanner(false);
    setSideBannerExpanded(false);
    clearTimeout(sideBannerTimerRef.current);
  };

  const goBook = () => navigate("/new-booking");

  if (offerExpired) return null;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative" style={{ border: `1px solid ${border}` }}>
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-2xl text-[#8a8f94] hover:text-[#13242c]"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="relative mx-auto mb-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center px-2" style={{ backgroundColor: navy }}>
              <span style={fraunces} className="text-lg font-semibold leading-none text-white">FREE</span>
              <span className="text-[10px] uppercase tracking-wide mt-1 leading-tight text-white/80">Engine Bay Clean</span>
            </div>

            <p className="text-center text-xs font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>
              November Special
            </p>
            <h2 style={fraunces} className="text-center text-2xl font-semibold text-[#13242c] mb-2">
              Spend $150+, get a FREE Engine Bay clean
            </h2>
            <p className="text-center text-base font-semibold text-[#13242c] mb-1">Degrease + High-Pressure Clean</p>
            <p className="text-center text-sm text-[#6b7278] mb-4">
              Book any detailing or coating service worth $150 or more this November and we'll clean your engine bay at no extra cost.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => { handleCloseModal(); goBook(); }}
                className="py-2.5 rounded-full font-semibold text-sm text-white"
                style={{ backgroundColor: navy }}
              >
                Book Now
              </button>
              <a
                href={MYAREE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCloseModal}
                className="text-center py-2.5 rounded-full font-semibold text-sm"
                style={{ border: `1px solid ${border}`, color: "#4a5056" }}
              >
                Myaree Direction
              </a>
              <a
                href={MIDLAND_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCloseModal}
                className="text-center py-2.5 rounded-full font-semibold text-sm"
                style={{ border: `1px solid ${border}`, color: "#4a5056" }}
              >
                Midland Direction
              </a>
            </div>

            <p className="text-center text-[11px] uppercase tracking-wide text-[#8a8f94] mt-4">
              Valid till 30/11/2026
            </p>
            <p className="text-center text-[10px] text-[#8a8f94] mt-1">
              *Min. $150 spend per car, per booking. Mention this offer when booking. Not valid with any other offer.
            </p>
          </div>
        </div>
      )}

      {showSideBanner && !sideBannerExpanded && (
        <button
          type="button"
          onClick={() => setSideBannerExpanded(true)}
          className="fixed bottom-24 right-0 z-[9999] rounded-l-2xl shadow-2xl px-2.5 py-4 flex flex-col items-center gap-2 hover:pr-3.5 transition-all"
          style={{ backgroundColor: navy, border: `1px solid ${border}`, borderRight: "none" }}
          aria-label="Open November Special offer"
        >
          <span className="text-[10px] font-bold text-white" style={{ writingMode: "vertical-rl" }}>
            NOVEMBER SPECIAL
          </span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full text-[9px] font-bold text-white" style={{ backgroundColor: accent }}>
            %
          </span>
        </button>
      )}

      {showSideBanner && sideBannerExpanded && (
        <div
          className="fixed bottom-24 right-0 z-[9999] w-72 max-w-[calc(100vw-1.5rem)] bg-white rounded-l-2xl shadow-2xl p-4 flex gap-3"
          style={{ border: `1px solid ${border}`, borderRight: "none" }}
        >
          <div className="w-1.5 self-stretch rounded-full shrink-0" style={{ backgroundColor: accent }} />
          <div className="flex-1 min-w-0">
            <button
              onClick={() => setSideBannerExpanded(false)}
              className="absolute top-2 right-2 text-lg text-[#8a8f94] hover:text-[#13242c]"
              aria-label="Collapse"
            >
              &times;
            </button>
            <div className="flex items-start gap-3 pr-4">
              <div className="flex-none w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: navy }}>
                FREE
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                  November Special
                </p>
                <p className="font-semibold text-sm text-[#13242c]">FREE Engine Bay clean*</p>
                <p className="text-sm font-semibold text-[#13242c] mt-1">Spend $150+ this November</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={() => { handleCloseSideBanner(); goBook(); }}
                className="py-2 rounded-full font-semibold text-xs text-white"
                style={{ backgroundColor: navy }}
              >
                Book Now
              </button>
              <a
                href={MYAREE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2 rounded-full font-semibold text-xs"
                style={{ border: `1px solid ${border}`, color: "#4a5056" }}
              >
                Myaree Direction
              </a>
              <a
                href={MIDLAND_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2 rounded-full font-semibold text-xs"
                style={{ border: `1px solid ${border}`, color: "#4a5056" }}
              >
                Midland Direction
              </a>
            </div>
            <p className="text-[10px] uppercase tracking-wide text-[#8a8f94] mt-2">Valid till 30/11/2026</p>
            <p className="text-[9px] text-[#8a8f94] mt-0.5">*Min. $150 spend per car, per booking. Not valid with any other offer.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NovemberSpecialOfferV2;
