import { useEffect } from "react";
import { Link } from "react-router-dom";

// Catch-all for URLs that don't match any route. Marks the page noindex so
// typos and dead links don't get indexed as copies of the homepage.
const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found | Car Saloon Perth";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, follow");
    document.querySelector('link[rel="canonical"]')?.remove();
  });

  return (
    <div className="min-h-[60vh] bg-black text-white flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-[#00a0db] text-sm font-semibold tracking-wider uppercase mb-4">404</p>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-300 mb-8 max-w-md">
        The page you're looking for doesn't exist. Try one of our services below, or give us a call.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="px-6 py-3 rounded-full bg-[#00a0db] font-semibold">Home</Link>
        <Link to="/washing" className="px-6 py-3 rounded-full border border-white/40 font-semibold">Washing</Link>
        <Link to="/detailing" className="px-6 py-3 rounded-full border border-white/40 font-semibold">Detailing</Link>
        <Link to="/booking" className="px-6 py-3 rounded-full border border-white/40 font-semibold">Book Now</Link>
      </div>
    </div>
  );
};

export default NotFound;
