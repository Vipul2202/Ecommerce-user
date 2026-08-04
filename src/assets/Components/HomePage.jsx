import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import carousel1 from "../../../src/img/carousel-2.jpg";
import carousel2 from "../../../src/img/carousel-1.jpg";
import carousel3 from "../../../src/img/carousel-3.jpg";
import carousel4 from "../../../src/img/gtechniq_s.png";

import about from "../../../src/img/about.jpg";
import {
  Car,
  Droplets,
  Shield,
  Sparkles,
  Home,
  Settings,
  Wrench,
  Plus,
} from "lucide-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Custom arrows for desktop
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2
    w-10 h-10 rounded-full bg-white/30 backdrop-blur-md 
    flex items-center justify-center cursor-pointer z-20 
    hover:bg-white/50 transition"
  >
    <span className="text-black text-xl">›</span>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2
    w-10 h-10 rounded-full bg-white/30 backdrop-blur-md 
    flex items-center justify-center cursor-pointer z-20 
    hover:bg-white/50 transition"
  >
    <span className="text-black text-xl">‹</span>
  </div>

);

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null); // ✅ Ref added

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const carouselData = [
  
    {
      img: carousel1,
      
    },
    {
      img: carousel2,
     
      
    },
   {
      img: carousel4,
      
    }
  ];

  const services = [
    {
      icon: <Car className="w-12 h-12" />,
      title: "Outside Only",
      description: "Exterior wash and rinse",
      link: "/outside"
    },
    {
      icon: <Droplets className="w-12 h-12" />,
      title: "Inside & Out",
      description: "Complete interior and exterior cleaning",
      link: "/inside_outside"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Premium Wash",
      description: "Premium exterior treatment",
      link: "/premium_wash"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Mini Detail",
      description: "Quick detailing service",
      link: "/mini_detail"
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Interior Detail",
      description: "Deep interior cleaning",
      link: "/interior_detail"
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Full Detail",
      description: "Complete detailing package",
      link: "/full_detail"
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Ultra Premium Finishes",
      description: "Luxury finishing touches",
      link: "/Ultrapremium"
    },
    {
      icon: <Plus className="w-12 h-12" />,
      title: "Extras",
      description: "Additional services",
      link: "/Extras"
    },
  ];

  const settings = {
   dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  };

  // ✅ Updated functions to use ref instead of querySelector
  const triggerPrev = () => sliderRef.current?.slickPrev();
  const triggerNext = () => sliderRef.current?.slickNext();

  return (
    <div className="text-white mx-auto bg-black">
      {/* Carousel Section */}
      <div className="overflow-hidden relative w-full mx-0 px-0">
        <Slider ref={sliderRef} {...settings}>
          {carouselData.map((item, index) => (
            <div
              key={index}
              className="relative h-[24rem] md:h-[32rem] lg:h-[36rem]"
            >
              <img
                src={item.img}
                alt={`carousel-${index}`}
                draggable="false"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-xl md:text-2xl font-light text-white">
                  {item.subtitle}
                </h3>
                <h1 className="text-2xl md:text-4xl font-bold text-white">
                  {item.title}
                </h1>
              </div>
            </div>
          ))}
        </Slider>

        {/* Arrows for Mobile View (bottom center) */}
        {isMobile && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 z-20">
            <button
              onClick={triggerPrev}
              className="bg-white/20 p-2 rounded-full text-white backdrop-blur-md border border-white/30"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={triggerNext}
              className="bg-white/20 p-2 rounded-full text-white backdrop-blur-md border border-white/30"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
       
      </div>

     {/* About Section */}
<section className="py-12 bg-black text-white" id="about">
  {/* Top Heading Section */}
  <div className="container mx-auto px-4 flex flex-col items-center text-center mb-10">
  <h1 className="text-[#00a0db] text-4xl font-bold mb-2">CAR SALOON</h1>
  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
    Where Your Car Gets the Saloon Treatment
  </h2>
  {/* Stylish Blue Divider */}
  <div className="w-24 h-1 bg-[#00a0db] rounded-full"></div>
</div>

  {/* Content Section */}
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-start gap-8">
    {/* Image Section */}
    <div className="w-full md:w-1/3 flex justify-center">
      <img
        src={about}
        alt="About"
        draggable="false"
        className="rounded-lg w-full"
      />
    </div>

    {/* Animated Divider */}
   {/* White Divider */}
<div className="hidden md:block w-px bg-white mx-4 transition-all duration-500 hover:scale-y-125 origin-center animate-pulse"></div>

    {/* Text Section */}
    <div className="w-full md:w-2/3">
      <p className="text-justify leading-relaxed text-lg">
        At Car Saloon, we believe your car deserves more than a rinse—it deserves respect.
        Whether you're a passionate car enthusiast, a dealer preparing for sale, or simply someone who loves their ride, our expert team delivers premium car care with precision and pride.
        <br /><br />
        For Those Who Love Their Cars. Your car deserves more than a rinse—it deserves respect.
        At Car Saloon, we offer high-end detailing, ceramic coating, tinting, and paint correction tailored for true enthusiasts.
        Our friendly professionals go beyond the basics, offering precision dent and paint repair that revives your car’s flawless finish.
        From underbody washes to full detailing, we’re here to help you drive clean, confident, and proud.
      </p>
    </div>
  </div>
</section>
      {/* Services Section */}
      <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#00a0db] text-sm font-semibold tracking-wider uppercase mb-4">
              WHAT WE DO?
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Premium Washing Services
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {services.map((service, index) => (
            
             
  <a
    key={index}
    href={service.link}
    className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
  >
    <div className="mb-6 p-6 rounded-lg border-2 border-[#00a0db] bg-transparent hover:bg-[#00a0db]/10 transition-colors duration-300">
      <div className="text-[#00a0db] group-hover:text-white transition-colors duration-300">
        {service.icon}
      </div>
    </div>

    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00a0db] transition-colors duration-300">
      {service.title}
    </h3>

    <p className="text-gray-400 text-sm hidden md:block group-hover:text-gray-300 transition-colors duration-300">
      {service.description}
    </p>
  </a>
))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
