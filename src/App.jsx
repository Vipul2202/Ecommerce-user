import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './assets/Components/TopBar'
import Navbar from './assets/Components/Navbar'
const HomePage = lazy(() => import('./assets/Components/HomePage'));
const Homenext = lazy(() => import('./assets/Components/Homenext'));
import Footer from './assets/Components/Footer'
const ContactUs = lazy(() => import('./assets/Components/Contactus'));
const BookNow = lazy(() => import('./assets/Components/BookNow'));
const ManageBooking = lazy(() => import('./assets/Components/ManageBooking'));
const Extras = lazy(() => import('./assets/Components/Extras'));
// import Service from './assets/Components/Service'
// import Faqs from './assets/Components/Faqs';
const Ultrapremium = lazy(() => import('./assets/Components/Ultrapremium'));
const Detailing = lazy(() => import('./assets/Components/Detailing'));
const Washing = lazy(() => import('./assets/Components/Washing'));
const About = lazy(() => import('./assets/Components/About'));
const CarDetailPage = lazy(() => import('./assets/Components/CarDetailPage'));
// import BeforeAfterGallery from './assets/Components/BeforeAfterGallery'
// import Gallery from './assets/Components/Gallery'
const Gallery = lazy(() => import('./assets/Components/Gallery'));
const GalleryCategory = lazy(() => import('./assets/Components/GalleryCategory'));
const ConfirmationPage = lazy(() => import('./assets/Components/ConfirmationPage'));
const MyOrders = lazy(() => import('./assets/Components/MyOrders'));
const LastBar = lazy(() => import('./assets/Components/Lastbar'));
const Outside = lazy(() => import('./assets/Components/outside'));
const InsideOutside = lazy(() => import('./assets/Components/inside_outside'));
const PremiumWash = lazy(() => import('./assets/Components/premium_wash'));

const MiniDetail = lazy(() => import('./assets/Components/mini_detail'));
const InteriorDetail = lazy(() => import('./assets/Components/interior_detail'));
const FullDetail = lazy(() => import('./assets/Components/full_detail'));
const SignatureDetail = lazy(() => import('./assets/Components/signature_detail'));
const TheWorks = lazy(() => import('./assets/Components/the_works'));
const AdminPanel = lazy(() => import('./assets/Components/AdminPanel'));

const Terms = lazy(() => import('./assets/Components/Terms'));
const Faqs = lazy(() => import('./assets/Components/Faqs'));
const Privacy = lazy(() => import('./assets/Components/Privacy'));
const PromoTerms = lazy(() => import('./assets/Components/PromoTerms'));
import FathersDayOffer from './assets/Components/FathersDayOffer';
import NovemberSpecialOffer from './assets/Components/NovemberSpecialOffer';
import NovemberSpecialOfferV2 from './assets/Components/NovemberSpecialOfferV2';
import { isFathersDayPromoActive, isNovemberSpecialActive } from './assets/Components/promoSchedule';
const HomePageV2 = lazy(() => import('./assets/Components/HomePageV2'));
const HeroMockups = lazy(() => import('./assets/Components/HeroMockups'));
const TimelineMockups = lazy(() => import('./assets/Components/TimelineMockups'));
const ServiceTierPageV2 = lazy(() => import('./assets/Components/ServiceTierPageV2'));
const GalleryV2 = lazy(() => import('./assets/Components/GalleryV2'));
const GalleryCategoryV2 = lazy(() => import('./assets/Components/GalleryCategoryV2'));
const AboutV2 = lazy(() => import('./assets/Components/AboutV2'));
const ContactV2 = lazy(() => import('./assets/Components/ContactV2'));
const ExtrasV2 = lazy(() => import('./assets/Components/ExtrasV2'));
const ProductsV2 = lazy(() => import('./assets/Components/ProductsV2'));
const UltrapremiumV2 = lazy(() => import('./assets/Components/UltrapremiumV2'));
const FaqsV2 = lazy(() => import('./assets/Components/FaqsV2'));
const LegalPageV2 = lazy(() => import('./assets/Components/LegalPageV2'));
import legalPagesData from './assets/Components/legalPagesData';
import serviceTierData from './assets/Components/serviceTierData';
const BookingFormV2 = lazy(() => import('./assets/Components/BookingFormV2'));
import { PricingProvider } from './assets/Components/PricingContext';
import SEOManager from './assets/Components/SEOManager';
import NotFound from './assets/Components/NotFound';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Redesign preview routes render their own self-contained nav/footer, so
// the site's existing marquee/TopBar/Navbar/Footer are hidden only on
// these paths — every other route is completely unaffected.
const PREVIEW_PATHS = [
  '/new-home',
  '/new-outside',
  '/new-inside_outside',
  '/new-premium_wash',
  '/new-mini_detail',
  '/new-interior_detail',
  '/new-full_detail',
  '/new-signature_detail',
  '/new-the_works',
  '/new-gallery',
  '/new-about',
  '/new-contact',
  '/new-extras',
  '/new-products',
  '/new-ultrapremium',
  '/new-faqs',
  '/new-terms',
  '/new-privacy',
  '/new-promotional-terms',
  '/new-booking',
];

// The admin panel is a private, owner-only tool — it never carries the
// public site's marquee/nav/footer or any promo popup. It's never linked
// from public nav/footer, only ever reached by typing the URL directly.
const NO_CHROME_PATHS = ['/admin-panel'];

// React Router matches routes case-insensitively by default, so
// /NEW-HOME renders HomePageV2 same as /new-home does — but this
// PREVIEW_PATHS check was doing a case-sensitive string compare, so an
// uppercase (or mixed-case) URL failed to match and the old site's
// marquee/nav/footer rendered on top of the new homepage as well.
// Lowercasing both sides keeps this in sync with React Router's own
// matching behavior.
const matchesPath = (pathname, paths) => {
  const lower = pathname.toLowerCase();
  return paths.some((p) => lower === p || lower.startsWith(`${p}/`));
};

const SiteChrome = ({ children }) => {
  const { pathname } = useLocation();
  const isPreview = matchesPath(pathname, PREVIEW_PATHS);
  const isNoChrome = matchesPath(pathname, NO_CHROME_PATHS);
  if (isPreview || isNoChrome) return null;
  return children;
};

// Mirror image of SiteChrome — renders only on /new-* preview paths, so the
// redesign gets its own site-wide promo popup without showing it twice
// alongside the old site's version (or vice versa).
const PreviewChrome = ({ children }) => {
  const { pathname } = useLocation();
  const isPreview = matchesPath(pathname, PREVIEW_PATHS);
  if (!isPreview) return null;
  return children;
};

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <PricingProvider>
      <Router>
        <ScrollToTop />
        <SEOManager />
        <SiteChrome>
          <div className="sticky top-0 z-50 bg-[#052c3d] text-white py-1.5 text-sm font-semibold overflow-hidden">
            <div className="marquee-track">
              <span>Gtechniq Ceramic Coating</span>
              <span>-</span>
              <span>Full Detail</span>
              <span>-</span>
              <span>Tinting</span>
              <span>-</span>
              <span>Gtechniq Ceramic Coating</span>
              <span>-</span>
              <span>Full Detail</span>
              <span>-</span>
              <span>Tinting</span>
              <span>-</span>
            </div>
          </div>
          <TopBar />
          <Navbar />
        </SiteChrome>

        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-12 h-12 rounded-full border-4 border-white border-t-[#00a0db] animate-spin" />
          </div>
        }>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Homenext />
                <LastBar />
              </>
            }
          />
          <Route path="/new-home" element={<HomePageV2 />} />
          <Route path="/mockup-hero2" element={<HeroMockups />} />
          <Route path="/mockup-timeline" element={<TimelineMockups />} />
          <Route path="/new-outside" element={<ServiceTierPageV2 data={serviceTierData.outside} />} />
          <Route path="/new-inside_outside" element={<ServiceTierPageV2 data={serviceTierData.inside_outside} />} />
          <Route path="/new-premium_wash" element={<ServiceTierPageV2 data={serviceTierData.premium_wash} />} />
          <Route path="/new-mini_detail" element={<ServiceTierPageV2 data={serviceTierData.mini_detail} />} />
          <Route path="/new-interior_detail" element={<ServiceTierPageV2 data={serviceTierData.interior_detail} />} />
          <Route path="/new-full_detail" element={<ServiceTierPageV2 data={serviceTierData.full_detail} />} />
          <Route path="/new-signature_detail" element={<ServiceTierPageV2 data={serviceTierData.signature_detail} />} />
          <Route path="/new-the_works" element={<ServiceTierPageV2 data={serviceTierData.the_works} />} />
          <Route path="/new-gallery" element={<GalleryV2 />} />
          <Route path="/new-gallery/:categorySlug" element={<GalleryCategoryV2 />} />
          <Route path="/new-about" element={<AboutV2 />} />
          <Route path="/new-contact" element={<ContactV2 />} />
          <Route path="/new-extras" element={<ExtrasV2 />} />
          <Route path="/new-products" element={<ProductsV2 />} />
          <Route path="/new-ultrapremium" element={<UltrapremiumV2 />} />
          <Route path="/new-faqs" element={<FaqsV2 />} />
          <Route path="/new-terms" element={<LegalPageV2 data={legalPagesData.terms} />} />
          <Route path="/new-privacy" element={<LegalPageV2 data={legalPagesData.privacy} />} />
          <Route path="/new-promotional-terms" element={<LegalPageV2 data={legalPagesData.promoTerms} />} />
          <Route path="/new-booking" element={<BookingFormV2 />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking" element={<BookNow />} />
          <Route path="/manage-booking/:id" element={<ManageBooking />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/ultrapremium" element={<Ultrapremium />} />
          <Route path="/detailing" element={<Detailing />} />
          <Route path="/washing" element={<Washing />} />
          <Route path="/about" element={<About />} />
          <Route path="/car-details/:id" element={<CarDetailPage />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='gallery/:categorySlug' element={<GalleryCategory />} />
          <Route path='confirmation' element={<ConfirmationPage />} />
          {/* <Route path="/service" element={<Service />} /> */}
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="/outside" element={<Outside />} />
          <Route path="/inside_outside" element={<InsideOutside />} />
          <Route path="/premium_wash" element={<PremiumWash />} />
          <Route path="/mini_detail" element={<MiniDetail />} />

         <Route path="/interior_detail" element={<InteriorDetail />} />
         <Route path="/full_detail" element={<FullDetail />} />
         <Route path="/signature_detail" element={<SignatureDetail />} />
         <Route path="/the_works" element={<TheWorks />} />
         <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/promotional-terms" element={<PromoTerms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>

        <SiteChrome>
          <Footer />
          {isFathersDayPromoActive() && <FathersDayOffer />}
          {isNovemberSpecialActive() && <NovemberSpecialOffer />}
        </SiteChrome>

        <PreviewChrome>
          {isNovemberSpecialActive() && <NovemberSpecialOfferV2 />}
        </PreviewChrome>
      </Router>
      </PricingProvider>
    </div>
  )
}

export default App