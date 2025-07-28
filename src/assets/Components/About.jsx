import React, { useState } from "react";
import about from "../../../src/img/about.jpg";
const About = () => {
  const [formData, setFormData] = useState({
    carType: "",
    registration: "",
    services: [],
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

 

  return (
    <div className="flex flex-col  bg-black text-white h-full">
      {/* Header */}
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
   About
        </h1>
        <nav className="text-gray-600">
          <span className="text-orange-500">Home</span>
          <span className="mx-2">/</span>
          <span>About</span>
        </nav>
      </div>

       <section className="py-12 bg-black" id="about">
           <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
             <img src={about} alt="About" draggable="false"  className="w-full md:w-1/2 rounded-lg" />
             <div className="md:w-1/2">
               <div className="text-orange-500 font-bold mb-4 border-b-2 border-orange-500 pb-1 inline-block">
                 About
               </div>
               <h2 className="text-3xl font-bold mb-4">Car Wash & Detailing</h2>
               <p className="text-justify">
                 We are a specialized facility that provides professional cleaning and
                 detailing services for vehicles. We offer a range of services, from basic
                 exterior washes to full interior and exterior detailing. At car wash
                 saloon, we use automated systems, high-pressure water jets, eco-friendly
                 cleaning solutions, and manual handwashing techniques to ensure a thorough
                 and gentle cleaning process.
               </p>
             </div>
           </div>
         </section>

    
     
    </div>
  );
};

export default About;
