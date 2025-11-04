import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import carousel1 from "../../../src/img/carousel-1.jpg";
import carousel2 from "../../../src/img/carousel-2.jpg";
import carousel3 from "../../../src/img/carousel-3.jpg";
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
    className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 
    w-12 h-12 items-center justify-center
    bg-white/20 backdrop-blur-md rounded-full cursor-pointer z-10 
    hover:bg-white/30 shadow-lg border border-white/30 transition"
  >
    <span className="text-white text-lg">▶</span>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 
    w-12 h-12 items-center justify-center
    bg-white/20 backdrop-blur-md rounded-full cursor-pointer z-10 
    hover:bg-white/30 shadow-lg border border-white/30 transition"
  >
    <span className="text-white text-lg">◀</span>
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
      subtitle: "Car Washing",
      title: "Keep your Car Newer",
    },
    {
      img: carousel2,
      subtitle: "Car Washing",
      title: "Quality service for you",
    },
    {
      img: carousel3,
      subtitle: "Car Washing",
      title: "Exterior & Interior Washing",
    },
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
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
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
      <div className="overflow-hidden relative max-w-screen-2xl mx-auto px-4">
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
      <section className="py-12 bg-black" id="about">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <img
            src={about}
            alt="About"
            draggable="false"
            className="w-full md:w-1/2 rounded-lg"
          />
          <div className="md:w-1/2">
            <div className="text-[#00a0db] text-3xl font-bold mb-4 border-b-2 border-[#00a0db] pb-1 inline-block">
              CAR SALOON
            </div>
            <h2 className="text-xl font-bold italic mb-4">Perth’s Trusted Car Wash & Auto Detailing Specialists</h2>
            <p className="text-justify">
              We are a specialized facility that provides professional cleaning and
              detailing services for vehicles. We offer a range of services, from basic
              exterior washes to full interior and exterior detailing. At car saloon, we handwash your car with high-pressure water jets, eco-friendly
              cleaning solutions to ensure a thorough
              and gentle cleaning process.
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
