import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accent, navy, border, fraunces, useGoogleFont } from "./redesignTheme";
import { DECEMBER_SPECIAL_END } from "./promoSchedule";

const SIDE_BANNER_DELAY_MS = 1000;
const DISMISS_KEY = "decemberSpecialDismissed";

const MYAREE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=4%2F41+McCoy+Street%2C+Myaree+WA+6154";
const MIDLAND_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=7+Loton+Avenue%2C+Midland+WA+6056";

const DecemberSpecialOfferV2 = () => {
  useGoogleFont();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSideBanner, setShowSideBanner] = useState(false);
  const [sideBannerExpanded, setSideBannerExpanded] = useState(false);
  const sideBannerTimerRef = useRef(null);

  const offerExpired = Date.now() > DECEMBER_SPECIAL_END.getTime();

  useEffect(() => {
    if (offerExpired) return;

    let dismissedThisSession = false;
    try {
      dismissedThisSession = sessionStorage.getItem(DISMISS_KEY) === "true";
    } catch (e) {
      // sessionStorage unavailable (private mode, etc.) - fall back to showing the modal
    }

    if (dismissedThisSession) {
      // Already closed once this browser session - keep the side tab docked, skip the modal.
      setShowSideBanner(true);
      return;
    }

    const modalTimer = setTimeout(() => setShowModal(true), 1500);
    return () => {
      clearTimeout(modalTimer);
      clearTimeout(sideBannerTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch (e) {
      // ignore - worst case the modal can reappear on a future page load this session
    }
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

  const goBook = () => navigate("/booking");

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
              <span className="text-[10px] uppercase tracking-wide mt-1 leading-tight text-white/80">Interior Protection</span>
            </div>

            <p className="text-center text-xs font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>
              December Special
            </p>
            <h2 style={fraunces} className="text-center text-2xl font-semibold text-[#13242c] mb-2">
              The Gift That Keeps Shining
            </h2>
            <p className="text-center text-sm text-[#6b7278] mb-4">
              Book a Gtechniq ceramic coating before Christmas Eve and unwrap a free interior protection upgrade (leather or fabric).
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ border: `1px solid ${border}` }}>
                <span className="text-sm font-semibold text-[#13242c]">5 Year Coating</span>
                <span className="text-sm font-semibold" style={{ color: accent }}>From $499</span>
              </div>
              <div className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ backgroundColor: navy }}>
                <span className="text-sm font-semibold text-white">9 Year Coating</span>
                <span className="text-sm font-semibold text-white">From $699</span>
              </div>
              <p className="text-[11px] text-[#8a8f94] text-center -mt-1">
                Both include free wheel coating; the 9 year also includes free glass coating.
              </p>
            </div>

            <p className="text-center text-xs text-[#4a5056] mb-4">
              Also this month: Full Detail from <strong>$175</strong> &middot; Window Tint from <strong>$499</strong>
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
              Valid till 24/12/2026
            </p>
            <p className="text-center text-[10px] text-[#8a8f94] mt-1">
              *Prices may change subject to condition and size of vehicle. Free interior protection: leather or fabric, one per vehicle. Not valid with any other offer.
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
          aria-label="Open December Special offer"
        >
          <span className="text-[10px] font-bold text-white" style={{ writingMode: "vertical-rl" }}>
            DECEMBER SPECIAL
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
                  December Special
                </p>
                <p className="font-semibold text-sm text-[#13242c]">The Gift That Keeps Shining</p>
                <p className="text-xs text-[#6b7278] mt-1">Gtechniq coating + FREE interior protection</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#4a5056]">5 Year Coating</span>
                <span className="font-semibold" style={{ color: accent }}>From $499</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#4a5056]">9 Year Coating</span>
                <span className="font-semibold" style={{ color: accent }}>From $699</span>
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
            <p className="text-[10px] uppercase tracking-wide text-[#8a8f94] mt-2">Valid till 24/12/2026</p>
            <p className="text-[9px] text-[#8a8f94] mt-0.5">*Prices may vary by vehicle. Free interior protection one per vehicle. Not valid with any other offer.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecemberSpecialOfferV2;
