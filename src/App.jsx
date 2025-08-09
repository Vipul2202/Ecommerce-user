// import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black text-white text-center p-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div>
//         <h1 className="text-4xl font-bold mb-4">🚧 Website Coming Soon 🚧</h1>
//         <p className="text-lg">
//           The work is on updation.<br />
//           Please check back in a few hours!
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import Products from './assets/Components/Products'
import CarDetailPage from './assets/Components/CarDetailPage'
// import BeforeAfterGallery from './assets/Components/BeforeAfterGallery'
// import Gallery from './assets/Components/Gallery'
import Gallery from './assets/Components/Gallery'
import ConfirmationPage from './assets/Components/ConfirmationPage'
import MyOrders from './assets/Components/MyOrders';
import LastBar from './assets/Components/Lastbar';
import CarRentalPage from './assets/Components/CarRentalPage';
import CarRentalPage1 from './assets/Components/CarRentalPage1';
import CarRentalPage2 from './assets/Components/CarRentalPage2';
import CarRentalPage4 from './assets/Components/CarRentalPage4';
import CarRentalPage3 from './assets/Components/CarRentalPage3';
import CarRentalPage5 from './assets/Components/CarRentalPage5';
import Terms from './assets/Components/Terms';
import Faqs from './assets/Components/Faqs';
import Privacy from './assets/Components/Privacy';
function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
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
          <Route path="/products" element={<Products />} />
          <Route path="/car-details/:id" element={<CarDetailPage />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path ='confirmation' element={<ConfirmationPage />} />
          {/* <Route path="/service" element={<Service />} /> */}
          <Route path ="my-orders" element={<MyOrders />} />
          <Route path="/carrental" element={<CarRentalPage />} />
           <Route path="/carrental1" element={<CarRentalPage1 />} />
            <Route path="/carrental2" element={<CarRentalPage2 />} />
             <Route path="/carrental3" element={<CarRentalPage3 />} />
              <Route path="/carrental4" element={<CarRentalPage4 />} />
               <Route path="/carrental5" element={<CarRentalPage5 />} />
               <Route path="/terms" element={<Terms />} />
                <Route path="/faqs" element={<Faqs />} />
                 <Route path="/privacy" element={<Privacy />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App

