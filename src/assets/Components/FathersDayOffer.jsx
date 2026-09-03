import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const OFFER_EXPIRY = new Date(2026, 8, 30, 23, 59, 59); // 30 September 2026
const TOAST_INTERVAL_MS = 2 * 60 * 1000; // repeat every 2 minutes
const TOAST_FIRST_DELAY_MS = 10 * 1000; // first toast 10s after the modal closes

const MYAREE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=4%2F41+McCoy+Street%2C+Myaree+WA+6154";
const MIDLAND_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=7+Loton+Avenue%2C+Midland+WA+6056";

const Sparkle = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="#e0a13a"
    aria-hidden="true"
  >
    <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" />
  </svg>
);

const CarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 12l2-5.5A2 2 0 0 1 6.9 5h10.2a2 2 0 0 1 1.9 1.5L21 12" />
    <path d="M3 12h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <circle cx="7.5" cy="15.5" r="1" />
    <circle cx="16.5" cy="15.5" r="1" />
  </svg>
);

const FathersDayOffer = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastFirstTimerRef = useRef(null);
  const toastIntervalRef = useRef(null);

  const offerExpired = Date.now() > OFFER_EXPIRY.getTime();

  const startToastCycle = (initialDelay) => {
    if (offerExpired) return;
    toastFirstTimerRef.current = setTimeout(() => {
      setShowToast(true);
      toastIntervalRef.current = setInterval(() => {
        setShowToast(true);
      }, TOAST_INTERVAL_MS);
    }, initialDelay);
  };

  useEffect(() => {
    if (offerExpired) return;

    const modalTimer = setTimeout(() => {
      setShowModal(true);
    }, 1500);

    return () => {
      clearTimeout(modalTimer);
      clearTimeout(toastFirstTimerRef.current);
      clearInterval(toastIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    startToastCycle(TOAST_FIRST_DELAY_MS);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    clearTimeout(toastFirstTimerRef.current);
    clearInterval(toastIntervalRef.current);
  };

  if (offerExpired) return null;

  return (
    <>
      <style>{`
        @keyframes fdoSweep {
          0% { transform: translateX(-120%) rotate(8deg); }
          100% { transform: translateX(220%) rotate(8deg); }
        }
        @keyframes fdoTwinkle {
          0%, 100% { opacity: .35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes fdoSlideIn {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .fdo-shine {
          position: absolute;
          top: -40%;
          left: 0;
          width: 30%;
          height: 180%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
          animation: fdoSweep 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        .fdo-sparkle { animation: fdoTwinkle 2.4s ease-in-out infinite; }
        .fdo-sparkle.d2 { animation-delay: 1s; }
        .fdo-toast-in { animation: fdoSlideIn .5s cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .fdo-shine, .fdo-sparkle, .fdo-toast-in { animation: none !important; }
        }
      `}</style>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] px-4">
          <div className="bg-white text-black rounded-2xl shadow-xl w-full max-w-sm p-6 relative overflow-hidden">
            <div className="fdo-shine"></div>

            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="relative mx-auto mb-4 w-28 h-28">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from -40deg, #00a0db, #016d94, #00a0db)",
                }}
              ></div>
              <div className="absolute inset-[3px] rounded-full bg-[#00a0db] text-white flex flex-col items-center justify-center shadow-inner">
                <span className="text-2xl font-bold leading-none">15%*</span>
                <span className="text-xs uppercase tracking-wide mt-1">Off</span>
              </div>
              <Sparkle className="fdo-sparkle absolute" style={{ top: "-2px", left: "-4px" }} />
              <Sparkle
                className="fdo-sparkle d2 absolute"
                style={{ bottom: "4px", right: "-6px", width: 10, height: 10 }}
              />
            </div>

            <p className="text-center text-xs font-semibold uppercase tracking-wide text-[#00a0db] mb-1">
              This Father's Day
            </p>
            <h2 className="text-center text-2xl font-bold mb-2">
              Get 15% off* on Wash and Detail services
            </h2>
            <p className="text-center text-sm text-gray-600 mb-4">Walk-ins Welcome</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700 p-3 mb-4">
              <span className="font-semibold text-amber-700">Myaree</span> store - No bookings required. Heading to{" "}
              <span className="font-semibold text-amber-700">Midland</span>? Book Online.
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to="/booking"
                onClick={handleCloseModal}
                className="text-center bg-[#00a0db] text-white py-2 rounded-full font-semibold hover:bg-black transition"
              >
                Book Now
              </Link>
              <a
                href={MYAREE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCloseModal}
                className="text-center border border-gray-300 text-gray-700 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Myaree Direction
              </a>
              <a
                href={MIDLAND_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCloseModal}
                className="text-center border border-gray-300 text-gray-700 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Midland Direction
              </a>
            </div>

            <p className="text-center text-[11px] uppercase tracking-wide text-gray-400 mt-4">
              Offer ends 30/09/2026
            </p>
            <p className="text-center text-[10px] text-gray-400 mt-1">
              *Terms and conditions apply
            </p>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fdo-toast-in fixed bottom-24 right-4 z-[9999] w-80 max-w-[calc(100vw-2.5rem)] bg-white text-black rounded-xl shadow-xl p-4 border border-gray-200">
          <button
            onClick={handleCloseToast}
            className="absolute top-2 right-2 text-lg text-gray-500 hover:text-black"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="flex items-start gap-3">
            <div className="flex-none w-10 h-10 rounded-lg bg-[#00a0db] text-white flex items-center justify-center">
              <CarIcon />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#00a0db]">
                This Father's Day
              </p>
              <p className="font-semibold text-sm">15% off* for Dad</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Walk-ins Welcome
              </p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg text-xs text-gray-700 p-2 mt-3">
            <span className="font-semibold text-amber-700">Myaree</span> store - No bookings required. Heading to{" "}
            <span className="font-semibold text-amber-700">Midland</span>? Book Online.
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <Link
              to="/booking"
              onClick={handleCloseToast}
              className="text-center bg-[#00a0db] text-white text-xs py-2 rounded-full font-semibold hover:bg-black transition"
            >
              Book Now
            </Link>
            <a
              href={MYAREE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center border border-gray-300 text-gray-700 text-xs py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Myaree Direction
            </a>
            <a
              href={MIDLAND_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center border border-gray-300 text-gray-700 text-xs py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Midland Direction
            </a>
          </div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400 mt-2">Ends 30/09/2026</p>
          <p className="text-[9px] text-gray-400 mt-0.5">*Terms and conditions apply</p>
        </div>
      )}
    </>
  );
};

export default FathersDayOffer;
