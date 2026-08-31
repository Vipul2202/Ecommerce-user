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

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <ScrollToTop />
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
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking" element={<BookNow />} />
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

        <Footer />
      </Router>
    </div>
  )
}

export default App