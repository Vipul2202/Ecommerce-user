import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom"; // Add these imports
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;


const BookNow = () => {
  const [searchParams] = useSearchParams(); // Hook to get URL parameters
  const location = useLocation();

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

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const servicesList = [
    "Outside Only", "Mini Detail", "Ceramic Coating", "Paintless Dent Removal", "Head Light Restoration",
    "Inside and Outside", "Interior Detail", "Interior Protection Pack", "Stage 3 Paint Correction", "Leather Clean/Seats Steam Clean",
    "Premium Wash", "Full Detail", "Windows Tinting", "Buff and Polish", "Dog Hair Removal"
  ];

  // Auto-select service based on URL parameter
  useEffect(() => {
    const serviceFromUrl = searchParams.get('service');
    if (serviceFromUrl) {
      const decodedService = decodeURIComponent(serviceFromUrl);
      
      // Map service names to match the servicesList
      let mappedService = decodedService;
      
      // Handle mapping from card titles to actual service names
      switch (decodedService.toLowerCase()) {
        case 'mini detail':
          mappedService = 'Mini Detail';
          break;
        case 'interior detail':
          mappedService = 'Interior Detail';
          break;
        case 'full detail':
          mappedService = 'Full Detail';
          break;
        case 'ceramic coating':
          mappedService = 'Ceramic Coating';
          break;
        case 'interior protection pack':
          mappedService = 'Interior Protection Pack';
          break;
        case 'windows tinting':
          mappedService = 'Windows Tinting';
          break;
        case 'stage 3 paint correction':
          mappedService = 'Stage 3 Paint Correction';
          break;
        default:
          // Check if the service exists in the list (case-insensitive)
          const foundService = servicesList.find(
            service => service.toLowerCase() === decodedService.toLowerCase()
          );
          if (foundService) {
            mappedService = foundService;
          }
      }

      // Only add if the service exists in our servicesList
      if (servicesList.includes(mappedService)) {
        setFormData(prev => ({
          ...prev,
          services: [mappedService]
        }));
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((service) => service !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [hour, minute] = formData.time.split(":").map(Number);
    const totalMinutes = hour * 60 + minute;
    const minMinutes = 7 * 60;
    const maxMinutes = 17 * 60;

    if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
      alert("Please select a time between 07:00 and 17:00.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = [formData];
      console.log("Booking payload:", payload);
     const response = await axios.post(`${API}/user/create-booking`, payload);
      console.log("Booking response:", response);
      if (response.status === 200 || response.status === 201) {
        setFormData({
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
        setShowModal(true);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Success</h2>
            <p>Your booking has been successfully submitted!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-[#00a0db] text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="loader border-4 border-white border-t-[#00a0db] rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00a0db] mb-4">Book Now</h1>
        <nav className="text-gray-600">
          <span className="text-[#00a0db]">Home</span>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </nav>
      </div>

      <div className="flex justify-center items-center flex-1 px-4 py-10 bg-black">
        <div className="w-full max-w-4xl bg-black text-white">
          <div className="bg-[#00a0db] text-center py-2 rounded mb-6 text-white font-semibold">
            Book A Service
            {/* Show selected service from URL */}
            {searchParams.get('service') && (
              <div className="text-sm font-normal mt-1 opacity-90">
                Pre-selected: {decodeURIComponent(searchParams.get('service'))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-white">Choose Car Type *</label>
                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  required
                  className="p-2 text-black rounded w-full"
                >
                  <option value="">--Select--</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-white">Vehicle Registration *</label>
                <input
                  type="text"
                  name="registration"
                  placeholder="Enter Vehicle Registration"
                  value={formData.registration}
                  onChange={handleChange}
                  required
                  className="p-2 text-black rounded w-full"
                />
              </div>
            </div>

            <div>
              <label className="block mb-3 font-medium text-white">Select Services *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                {servicesList.map((service) => (
                  <label key={service} className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
                    <input
                      type="checkbox"
                      value={service}
                      onChange={handleServiceChange}
                      className="accent-[#00a0db] w-4 h-4"
                      checked={formData.services.includes(service)}
                    />
                    <span className={formData.services.includes(service) ? 'text-[#00a0db] font-medium' : ''}>
                      {service}
                    </span>
                  </label>
                ))}
              </div>
              {formData.services.length === 0 && (
                <p className="text-red-400 text-sm mt-2">Please select at least one service</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-white">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="p-2 text-black rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-white">Clock *</label>
                <div>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="p-2 text-black rounded w-full"
                  >
                    <option value="">--Select Time</option>
                    {Array.from({ length: 17 - 9 + 1 }, (_, hour) => {
                      const h = hour + 9;
                      return [":00", ":30"].map((m) => {
                        const time = `${h.toString().padStart(2, "0")}${m}`;
                        return (
                          <option key={time} value={time}>
                            {time} 
                          </option>
                        );
                      });
                    }).flat()}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-white">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="p-2 text-black rounded w-full"
                />


              </div>
              <div>
                <label className="block mb-1 font-medium text-white hello">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                   required
                  className="p-2 text-black rounded w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-white">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 text-black rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-white">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-2 text-black rounded w-full"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-[#00a0db] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || formData.services.length === 0}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookNow;