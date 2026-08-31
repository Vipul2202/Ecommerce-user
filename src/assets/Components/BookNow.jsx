import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;

const BookNow = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [formData, setFormData] = useState({
    location:"",
    registration: "",
    services: [],
    date: "",
    time: "",
    firstName: "",

    email: "",
    phone: "",
    marketingConsent: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const servicesList = [
    "Outside Only", "Inside & Out", "Premium Wash", "Full Detail", "Signature Detail", "The Works",
    "Ceramic Coating", "Interior Protection Pack", "Windows Tinting", "Paintless Dent Removal",
    "Stage 3 Paint Correction", "Buff and Polish", "Head Light Restoration", "Leather Clean/Seats Steam Clean", "Dog Hair Removal", "Bull Bar Polish"
  ];

  const serviceTaglines = {
    "Full Detail": "Best for Regular Care",
    "Signature Detail": "Best for Restoration",
    "The Works": "Best for Offroad & Pre-Sale",
  };

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    const serviceFromUrl = searchParams.get('service');
    if (serviceFromUrl) {
      const decodedService = decodeURIComponent(serviceFromUrl);
      let mappedService = decodedService;

      switch (decodedService.toLowerCase()) {
        case 'inside and outside':
        case 'inside & out':
          mappedService = 'Inside & Out';
          break;
        case 'full detail':
          mappedService = 'Full Detail';
          break;
        case 'signature detail':
          mappedService = 'Signature Detail';
          break;
        case 'the works':
          mappedService = 'The Works';
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
        case 'paintless dent removal':
          mappedService = 'Paintless Dent Removal';
          break;
        case 'stage 3 paint correction':
          mappedService = 'Stage 3 Paint Correction';
          break;
        case 'buff and polish':
          mappedService = 'Buff and Polish';
          break;
        case 'head light restoration':
        case 'headlight restoration':
          mappedService = 'Head Light Restoration';
          break;
        case 'leather clean/seats steam clean':
          mappedService = 'Leather Clean/Seats Steam Clean';
          break;
        case 'dog hair removal':
          mappedService = 'Dog Hair Removal';
          break;
        case 'bull bar polish':
          mappedService = 'Bull Bar Polish';
          break;
        default:
          const foundService = servicesList.find(
            service => service.toLowerCase() === decodedService.toLowerCase()
          );
          if (foundService) {
            mappedService = foundService;
          }
      }

      if (servicesList.includes(mappedService)) {
        setFormData(prev => ({
          ...prev,
          services: [mappedService]
        }));
      }
    }
  }, [searchParams]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.firstName = 'Name must be at least 2 characters';
        } else {
          delete newErrors.firstName;
        }
        break;
        
      
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (value.trim().length < 8) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
        
      
        
      case 'registration':
        if (!value.trim()) {
          newErrors.registration = 'Vehicle registration is required';
        } else if (value.trim().length < 3) {
          newErrors.registration = 'Vehicle registration must be at least 3 characters';
        } else {
          delete newErrors.registration;
        }
        break;
        
      case 'date':
        if (!value) {
          newErrors.date = 'Date is required';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            newErrors.date = 'Please select a future date';
          } else {
            delete newErrors.date;
          }
        }
        break;
        
      case 'time':
        if (!value) {
          newErrors.time = 'Time is required';
        } else {
          const [hour, minute] = value.split(":").map(Number);
          const totalMinutes = hour * 60 + minute;
          const minMinutes = 7 * 60;
          const maxMinutes = 17 * 60;
          
          if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
            newErrors.time = 'Please select a time between 07:00 and 17:00';
          } else {
            delete newErrors.time;
          }
        }
        break;
        case 'location':
          if (!value) {
            newErrors.location = 'Please select a location';
          } else {
            delete newErrors.location;
          }
        break;

      default:
        break;
    }
    
   /* setErrors(newErrors);
    return Object.keys(newErrors).length === 0;*/
    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Allow flexible phone number format for Australian numbers
    if (name === 'phone') {
      // Allow digits, spaces, hyphens, parentheses, and plus sign
      processedValue = value.replace(/[^\d\s\-\(\)\+]/g, '');
    }
    
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
    
    // Validate field if it has been touched
    if (touched[name]) {
      validateField(name, processedValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const newServices = checked
      ? [...formData.services, value]
      : formData.services.filter((service) => service !== value);
    
    setFormData((prev) => ({
      ...prev,
      services: newServices,
    }));
    
    // Validate services
    const newErrors = { ...errors };
    if (newServices.length === 0) {
      newErrors.services = 'Please select at least one service';
    } else {
      delete newErrors.services;
    }
    setErrors(newErrors);
  };

  const isFormValid = () => {
    const requiredFields = ['location','firstName', 'email', 'phone',  'registration', 'date', 'time'];
    const hasRequiredFields = requiredFields.every(field => formData[field] && formData[field].toString().trim());
    const hasServices = formData.services.length > 0;
    const hasNoErrors = Object.keys(errors).length === 0;
    
    return hasRequiredFields && hasServices && hasNoErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Mark all fields as touched to show validation errors
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    let hasErrors = false;
    Object.keys(formData).forEach(key => {
      if (key !== 'services') {
        const isValid = validateField(key, formData[key]);
        if (!isValid) hasErrors = true;
      }
    });

    // Validate services
    if (formData.services.length === 0) {
      setErrors(prev => ({ ...prev, services: 'Please select at least one service' }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      setIsLoading(true);
      const payload = formData;
      console.log("Booking payload:", payload);
      const response = await axios.post(`${API}/user/create-booking`, payload);
      
      console.log("Booking response:", response);
      if (response.status === 200 || response.status === 201) {
        setFormData({
          location:"",
          registration: "",
          services: [],
          date: "",
          time: "",
          firstName: "",

          email: "",
          phone: "",
          marketingConsent: false,
        });
        setErrors({});
        setTouched({});
        setShowModal(true);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          // Map backend error messages to field names
          if (err.includes('First name')) backendErrors.firstName = err;
          else if (err.includes('email')) backendErrors.email = err;
          else if (err.includes('phone')) backendErrors.phone = err;
          
          else if (err.includes('registration')) backendErrors.registration = err;
          else if (err.includes('Date')) backendErrors.date = err;
          else if (err.includes('Time')) backendErrors.time = err;
          else if (err.includes('service')) backendErrors.services = err;
        });
        setErrors(prev => ({ ...prev, ...backendErrors }));
      } else if (error.response?.data?.message) {
        // Show general error message
        setErrors(prev => ({ ...prev, general: error.response.data.message }));
      } else {
        setErrors(prev => ({ ...prev, general: "Booking failed. Please try again." }));
      }
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
            {searchParams.get('service') && (
              <div className="text-sm font-normal mt-1 opacity-90">
                Pre-selected: {decodeURIComponent(searchParams.get('service'))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                
              </div>
              <div>
              <label className="block mb-2 font-medium text-white">
                Select Location *
              </label>

                <div className="flex gap-6">
                  {["Midland", "Myaree"].map((loc) => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer"
                    >
                      <input type="radio" name="location" value={loc} checked={formData.location === loc} onChange={handleChange} onBlur={handleBlur} className="accent-[#00a0db]"
                      />
                      <span className={
                          formData.location === loc
                            ? "text-[#00a0db] font-medium"
                            : ""
                        }
                      >
                        {loc}
                      </span>
                    </label>
                  ))}
                </div>

                {errors.location && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.location}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-white ">Vehicle Registration *</label>
                <input
                  type="text"
                  name="registration"
                  placeholder="Enter vehicle registration"
                  value={formData.registration}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: e.target.name,
                        value: e.target.value.toUpperCase(),
                      },
                    })
                  }
                  onBlur={handleBlur}
                  className={`p-2 text-black rounded w-full uppercase placeholder:normal-case border-2 ${
                    errors.registration ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.registration && (
                  <p className="text-red-400 text-sm mt-1">{errors.registration}</p>
                )}
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
                      {serviceTaglines[service] && (
                        <span className="block text-xs text-gray-400">{serviceTaglines[service]}</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="text-red-400 text-sm mt-2">{errors.services}</p>
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
                  onBlur={handleBlur}
                  min={minDate}
                  className={`p-2 text-black rounded w-full border-2 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.date && (
                  <p className="text-red-400 text-sm mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-white">Clock *</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`p-2 text-black rounded w-full border-2 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">--Select Time</option>
                  {Array.from({ length: 17 - 7 + 1 }, (_, hourOffset) => {
                    const hour = hourOffset + 7;
                    return [0, 30].map((minute) => {
                      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                      const ampm = hour < 12 ? "AM" : "PM";
                      const minuteStr = minute.toString().padStart(2, '0');
                      const value = `${hour.toString().padStart(2, '0')}:${minuteStr}`;
                      const label = `${hour12}:${minuteStr} ${ampm}`;
                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    });
                  }).flat()}
                </select>
                {errors.time && (
                  <p className="text-red-400 text-sm mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block mb-1 font-medium text-white">Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`p-2 text-black rounded w-full border-2 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                
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
                  onBlur={handleBlur}
                  className={`p-2 text-black rounded w-full border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-white">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`p-2 text-black rounded w-full border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, marketingConsent: e.target.checked }))
                  }
                  className="accent-[#00a0db] w-4 h-4 mt-1"
                />
                <span className="text-sm text-gray-300">
                  I would like to receive promotional offers and updates from Car Saloon via SMS and email. See our{" "}
                  <a href="/promotional-terms" target="_blank" rel="noopener noreferrer" className="text-[#00a0db] underline">
                    Offer Terms & Conditions
                  </a>.
                </span>
              </label>
            </div>

            {errors.general && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p className="text-sm">{errors.general}</p>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  isFormValid() && !isLoading
                    ? 'bg-white text-black hover:bg-[#00a0db] hover:text-white'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
                disabled={!isFormValid() || isLoading}
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

