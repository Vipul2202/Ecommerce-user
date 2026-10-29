import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './assets/Components/TopBar'
import Navbar from './assets/Components/Navbar'
import HomePage from './assets/Components/HomePage'
import Homenext from './assets/Components/Homenext'
import Footer from './assets/Components/Footer'
import ContactUs from './assets/Components/Contactus'
import BookNow from './assets/Components/BookNow'
import ManageBooking from './assets/Components/ManageBooking'
import Extras from './assets/Components/Extras'
// import Service from './assets/Components/Service'
// import Faqs from './assets/Components/Faqs';
import Ultrapremium from './assets/Components/Ultrapremium'
import Detailing from './assets/Components/Detailing'
import Washing from './assets/Components/Washing'
import About from './assets/Components/About'
import CarDetailPage from './assets/Components/CarDetailPage'
// import BeforeAfterGallery from './assets/Components/BeforeAfterGallery'
// import Gallery from './assets/Components/Gallery'
import Gallery from './assets/Components/Gallery'
import GalleryCategory from './assets/Components/GalleryCategory'
import ConfirmationPage from './assets/Components/ConfirmationPage'
import MyOrders from './assets/Components/MyOrders';
import LastBar from './assets/Components/Lastbar';
import Outside from './assets/Components/outside';
import InsideOutside from './assets/Components/inside_outside';
import PremiumWash from './assets/Components/premium_wash';

import MiniDetail from './assets/Components/mini_detail';
import InteriorDetail from './assets/Components/interior_detail';
import FullDetail from './assets/Components/full_detail';
import SignatureDetail from './assets/Components/signature_detail';
import TheWorks from './assets/Components/the_works';
import OwnerPanel from './assets/Components/OwnerPanel';

import Terms from './assets/Components/Terms';
import Faqs from './assets/Components/Faqs';
import Privacy from './assets/Components/Privacy';
import PromoTerms from './assets/Components/PromoTerms';
import FathersDayOffer from './assets/Components/FathersDayOffer';
import { isFathersDayPromoActive } from './assets/Components/promoSchedule';
import HomePageV2 from './assets/Components/HomePageV2';
import ServiceTierPageV2 from './assets/Components/ServiceTierPageV2';
import MockupAccordion from './assets/Components/MockupAccordion';
import MockupGrid from './assets/Components/MockupGrid';
import MockupPriceToggle from './assets/Components/MockupPriceToggle';
import MockupPriceStrip from './assets/Components/MockupPriceStrip';
import serviceTierData from './assets/Components/serviceTierData';

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
  '/mockup-accordion',
  '/mockup-grid',
  '/mockup-price-toggle',
  '/mockup-price-strip',
];

const SiteChrome = ({ children }) => {
  const { pathname } = useLocation();
  if (PREVIEW_PATHS.includes(pathname)) return null;
  return children;
};

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <ScrollToTop />
        <SiteChrome>
          <div className="sticky top-0 z-50 bg-[#052c3d] text-white py-1.5 text-sm font-semibold overflow-hidden">
            <div className="marquee-track">
              <span>Walk-ins Welcome — No Booking Required</span>
              <span>-</span>
              <span>Gtechniq Ceramic Coating</span>
              <span>-</span>
              <span>Full Detail</span>
              <span>-</span>
              <span>Tinting</span>
              <span>-</span>
              <span>Walk-ins Welcome — No Booking Required</span>
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
          <Route path="/mockup-accordion" element={<MockupAccordion />} />
          <Route path="/mockup-grid" element={<MockupGrid />} />
          <Route path="/mockup-price-toggle" element={<MockupPriceToggle />} />
          <Route path="/mockup-price-strip" element={<MockupPriceStrip />} />
          <Route path="/new-outside" element={<ServiceTierPageV2 data={serviceTierData.outside} />} />
          <Route path="/new-inside_outside" element={<ServiceTierPageV2 data={serviceTierData.inside_outside} />} />
          <Route path="/new-premium_wash" element={<ServiceTierPageV2 data={serviceTierData.premium_wash} />} />
          <Route path="/new-mini_detail" element={<ServiceTierPageV2 data={serviceTierData.mini_detail} />} />
          <Route path="/new-interior_detail" element={<ServiceTierPageV2 data={serviceTierData.interior_detail} />} />
          <Route path="/new-full_detail" element={<ServiceTierPageV2 data={serviceTierData.full_detail} />} />
          <Route path="/new-signature_detail" element={<ServiceTierPageV2 data={serviceTierData.signature_detail} />} />
          <Route path="/new-the_works" element={<ServiceTierPageV2 data={serviceTierData.the_works} />} />
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
         <Route path="/owner-panel" element={<OwnerPanel />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/promotional-terms" element={<PromoTerms />} />
        </Routes>

        <SiteChrome>
          <Footer />
          {isFathersDayPromoActive() && <FathersDayOffer />}
        </SiteChrome>
      </Router>
    </div>
  )
}

export default App