import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import GoogleLogo from "../../img/images.png";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { ChevronDown, ShoppingCart, Trash2, Plus, Minus, MapPin, User, Phone, Mail, Download, X } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import OpeningHours from "../../../src/assets/Components/OpeningHours";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false); const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);
  console.log("Cart items: 24", cartItems[0]?.productDetails);
  // Checkout modal states
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showOrderSlip, setShowOrderSlip] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const sidebarRef = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Address form state
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    country: "India" // Default country
  });
  const handleClick = (type) => {
    setActiveTooltip((prev) => (prev === type ? "" : type));
  };
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
  ];

  const services = [
    { label: "Outside Only", href: "/outside" },
    { label: "Inside & Out", href: "/inside_outside" },
    { label: "Premium Wash", href: "/premium_wash" },
    { label: "Full Detail", href: "/full_detail" },
    { label: "Full Detail Plus", href: null },
    { label: "Signature Detail", href: null },
    { label: "Signature Detail Plus", href: null },
    { label: "Ultra Premium Finishes", href: "/ultrapremium" },
  ];

  const extrasItems = [
    { label: "Stage 3 Paint Correction", href: "/extras" },
    { label: "Buff and Polish", href: "/extras" },
    { label: "Head Light Restoration", href: "/extras" },
    { label: "Leather Clean/Seats Steam Clean", href: "/extras" },
    { label: "Dog Hair Removal", href: "/extras" },
    { label: "Bull Bar Polish", href: "/extras" },
  ];

  // API Base URL
  // const API_BASE_URL = "http://localhost:9006";
  const API = import.meta.env.VITE_API_BASE_URL;

  // Get Authorization Token
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Create axios instance with auth header
  const createAuthAxios = () => {
    const token = getAuthToken();
    return axios.create({
      baseURL: API,
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
  };

  // Load cart items from API
  const loadCartItems = async () => {
    if (!user) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    try {
      setCartLoading(true);

      // const token =  localStorage.getItem("token");

      const authAxios = createAuthAxios();
      const token = localStorage.getItem('token');
      // const response = await authAxios.get('/user/get-cart',  {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add authorization header if needed
      //     'Authorization': `Bearer ${toastoken}`
      //   },
      //   timeout: 10000 // 10 second timeout
      // });

      const API = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${API}/user/get-cart`, {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          'Authorization': `Bearer ${token}`
        },
        timeout: 10000 // 10 second timeout
      });
      console.log('Cart response:', response.data.data);
      if (response.data && response.data.data) {
        const cartData = response.data.data;
        const items = cartData.items || [];
        console.log('Cart items:', cartData);
        console.log("✅ First item productDetails:", items[0]?.productDetails);
        setCartItems(items);
        const totalCount = items.reduce((total, item) => total + (item.quantity || 0), 0);
        setCartCount(totalCount);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      if (error.response?.status === 401) {
        // Token expired or invalid
        handleLogout();
        toast.error("Session expired. Please login again.");
      } else {
        // toast.error("Failed to load cart items");
      }
      setCartItems([]);
      setCartCount(0);
    } finally {
      setCartLoading(false);
    }
  };

  // Remove item from cart via API
  const removeFromCart = async (productId) => {
    if (!user) {
      toast.error("Please login to manage cart");
      return;
    }

    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.delete(`/user/remove-from-cart/${productId}`);
      if (response.status === 200) {
        await loadCartItems(); // Reload cart
        toast.success(response.data?.message || "Item removed from cart");
      } else {
        toast.error(response.data?.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      if (error.response?.status === 401) {
        handleLogout();
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to remove item from cart");
      }
    }
  };


  // Update cart quantity (you might need to implement this API endpoint)
  const updateCartQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (!user) {
      toast.error("Please login to manage cart");
      return;
    }

    try {
      const authAxios = createAuthAxios();
      // Note: You might need to implement this endpoint on your backend
      const response = await authAxios.put('/user/update-cart-quantity', {
        productId,
        quantity: newQuantity
      });

      if (response.data && response.data.success) {
        await loadCartItems();
        toast.success("Cart updated");
      } else {
        toast.error(response.data?.message || "Failed to update cart");
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      if (error.response?.status === 404) {
        // If the endpoint doesn't exist, fall back to local update
        toast.info("Quantity update API not available. Using local update.");
        const updatedCart = cartItems.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
      } else if (error.response?.status === 401) {
        handleLogout();
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to update cart");
      }
    }
  };

  useEffect(() => {
    // Load cart items when component mounts or user changes
    loadCartItems();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartItems();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !event.target.closest(".logout-button")
      ) {
        setIsProfileOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      // Pre-fill address form with user data
      const userObj = JSON.parse(userData);
      setAddressForm(prev => ({
        ...prev,
        fullName: userObj.name || "",
        email: userObj.email || "",
        phone: userObj.phone || ""
      }));
    }
  }, [showModal]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (location.state?.openRegister) {
      setShowModal(true);
      setIsLogin(false);
      window.history.replaceState({}, document.title);
    } else if (location.state?.openLogin) {
      setShowModal(true);
      setIsLogin(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotMode) {
      if (!form.email) {
        toast.error("Please enter your email to reset password.");
        return;
      }

      setLoading(true);

      try {
        await axios.post(import.meta.env.VITE_API_FORGOT_PASSWORD, {
          email: form.email,
        });
        toast.success(`Reset link sent to ${form.email}`);
        setShowModal(false);
        setForgotMode(false);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send reset email.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!isLogin) {
      if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
        toast.error("All fields are required");
        return;
      }
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const res = await axios.post(import.meta.env.VITE_API_REGISTER, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
        toast.success("Registration successful!");
        setIsLogin(true);
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed.");
      }
    } else {
      if (!form.email || !form.password) {
        toast.error("Email and Password are required");
        return;
      }

      try {
        const res = await axios.post(import.meta.env.VITE_API_LOGIN, {
          email: form.email,
          password: form.password,
        });
        toast.success("Login successful!");
        localStorage.setItem("token", res.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(res.data?.data?.user));
        setUser(res.data?.data?.user);
        setShowModal(false);
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed.");
      }
    }
  };

  const handleLogout = (e) => {
    if (e) e.stopPropagation();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // Clear local cart on logout
    setUser(null);
    setCartItems([]);
    setCartCount(0);
    toast.info("Logged out");
    navigate("/");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.productDetails?.price || item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  };
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsCartOpen(false);
    setShowCheckoutModal(true);
  };

  const handleViewProductDetails = (productId) => {
    setIsCartOpen(false);
    navigate(`/product-details/${productId}`);
  };

  // Validate address form
  const validateAddressForm = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    for (let field of required) {
      if (!addressForm[field].trim()) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(addressForm.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Basic phone validation
    if (addressForm.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    // Basic pincode validation
    if (addressForm.pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }

    return true;
  };

  // Handle checkout submission with actual API integration
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (!validateAddressForm()) {
      return;
    }

    if (!user) {
      toast.error("Please login to place order");
      return;
    }

    setCheckoutLoading(true);

    try {
      const authAxios = createAuthAxios();

      // Prepare shipping address according to API format
      const shippingAddress = {
        fullName: addressForm.fullName,
        address: addressForm.address,
        city: addressForm.city,
        state: addressForm.state,
        postalCode: parseInt(addressForm.pincode), // Convert to number as per API
        country: addressForm.country,
        phone: addressForm.phone
      };

      // If landmark is provided, add it to address
      if (addressForm.landmark.trim()) {
        shippingAddress.address = `${addressForm.address}, ${addressForm.landmark}`;
      }

      console.log('Creating order with:', { shippingAddress });

      // Create order via API
      const response = await authAxios.post('/user/create-order', {
        shippingAddress
      });

      console.log('Order creation response:', response.data);

      if (response.data && response.data.success) {
        const orderData = response.data.data;

        // Prepare order details for display
        const orderDetails = {
          orderId: orderData._id || orderData.orderId || `ORD-${Date.now()}`,
          customerInfo: {
            fullName: shippingAddress.fullName,
            email: addressForm.email,
            phone: shippingAddress.phone,
            address: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            pincode: shippingAddress.postalCode,
            country: shippingAddress.country,
            landmark: addressForm.landmark
          },
          items: cartItems.map(item => ({
            _id: item._id,
            name: item.productDetails?.name || item.name,
            price: item.productDetails?.price || item.price,
            quantity: item.quantity,
            image: item.productDetails?.image || item.image
          })),
          totalAmount: getTotalPrice(),
          orderDate: orderData.createdAt || new Date().toISOString(),
          status: orderData.status || 'Confirmed'
        };

        setOrderDetails(orderDetails);
        setShowCheckoutModal(false);
        setShowOrderSlip(true);

        // Clear cart after successful order
        await loadCartItems();

        toast.success(response.data.message || "Order placed successfully!");

      } else {
        throw new Error(response.data?.message || "Failed to create order");
      }

    } catch (error) {
      console.error('Error creating order:', error);

      if (error.response?.status === 401) {
        handleLogout();
        toast.error("Session expired. Please login again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data?.message || "Invalid order data. Please check your information.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || error.message || "Failed to place order. Please try again.");
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Fetch user orders (you can call this function when needed)
  // const fetchUserOrders = async () => {
  //   if (!user) {
  //     toast.error("Please login to view orders");
  //     return [];
  //   }

  //   try {
  //     const authAxios = createAuthAxios();
  //     const response = await authAxios.get('/user/get-my-orders');

  //     if (response.data && response.data.success) {
  //       console.log('User orders:', response.data.data);
  //       return response.data.data;
  //     } else {
  //       throw new Error(response.data?.message || "Failed to fetch orders");
  //     }
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);

  //     if (error.response?.status === 401) {
  //       handleLogout();
  //       toast.error("Session expired. Please login again.");
  //     } else {
  //       toast.error(error.response?.data?.message || "Failed to fetch orders");
  //     }
  //     return [];
  //   }
  // };

  // Download order slip as PDF/Text
  const downloadOrderSlip = () => {
    if (!orderDetails) return;

    const orderSlipContent = `
ORDER CONFIRMATION
==================

Order ID: ${orderDetails.orderId}
Order Date: ${new Date(orderDetails.orderDate).toLocaleDateString()}
Status: ${orderDetails.status}

CUSTOMER INFORMATION
--------------------
Name: ${orderDetails.customerInfo.fullName}
Email: ${orderDetails.customerInfo.email}
Phone: ${orderDetails.customerInfo.phone}

DELIVERY ADDRESS
----------------
${orderDetails.customerInfo.address}
${orderDetails.customerInfo.landmark ? orderDetails.customerInfo.landmark + ', ' : ''}${orderDetails.customerInfo.city}
${orderDetails.customerInfo.state} - ${orderDetails.customerInfo.pincode}
${orderDetails.customerInfo.country}

ORDER ITEMS
-----------
${orderDetails.items.map(item =>
      `${item.name} - Qty: ${item.quantity} - $${item.price} each = $${item.price * item.quantity}`
    ).join('\n')}

TOTAL AMOUNT: $${orderDetails.totalAmount}

Thank you for your order!
    `;

    const blob = new Blob([orderSlipContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Order_${orderDetails.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Order slip downloaded successfully!");
  };
  useEffect(() => {
    setIsOpen(false);
    setIsSidebarOpen(false);
    setIsExtrasOpen(false);
  }, [location.pathname]);
  return (
    <>
      <nav className="bg-[#00a0db] text-white sticky top-0 z-50 shadow-2xl">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="hidden lg:flex justify-between items-center w-full font-medium">
            <div className="flex gap-24 items-center">
              {navItems.map((item, index) => (
                <Link to={item.href} key={index} className="hover:text-black">
                  {item.label}
                </Link>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => {
                  setIsOpen(false);
                  setIsExtrasOpen(false);
                }}
              >
                {/* Toggle button */}
                <button
                  className="px-4 py-2 flex items-center gap-2 b hover:text-black text-white rounded-full transition-all duration-200"
                >
                  Services
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white text-black rounded-xl shadow-lg flex flex-col z-50">
                    {services.map((service, index) =>
                      service.href ? (
                        <Link
                          key={index}
                          to={service.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300"
                        >
                          {service.label}
                        </Link>
                      ) : (
                        <span
                          key={index}
                          className="block px-4 py-2 text-gray-400 border-b border-gray-300 cursor-not-allowed"
                        >
                          {service.label}
                        </span>
                      )
                    )}
                    <div
                      className="relative"
                      onMouseEnter={() => setIsExtrasOpen(true)}
                      onMouseLeave={() => setIsExtrasOpen(false)}
                    >
                      <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                        Extras
                        {isExtrasOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                      </button>
                      {isExtrasOpen && (
                        <div className="absolute top-0 left-full w-64 bg-white text-black rounded-xl shadow-lg flex flex-col z-50">
                          {extrasItems.map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => {
                                setIsOpen(false);
                                setIsExtrasOpen(false);
                              }}
                              className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300 last:border-b-0"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <Link to="/booking" className="relative px-4 py-2 rounded-full bg-white text-black overflow-hidden group">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Book Now</span>
                <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
              </Link>

              {/* Cart Icon */}
              {user && (
                <div className="relative" ref={cartRef}>
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
                    disabled={cartLoading}
                  >
                    <ShoppingCart size={24} />
                    {cartLoading ? (
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                      </span>
                    ) : cartCount > 0 ? (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full min-w-[1.5rem] px-2 h-6 flex items-center justify-center font-bold">
                        {cartCount}
                      </span>

                    ) : null}
                  </button>

                  {/* Cart Modal */}
                  {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded-lg shadow-xl z-50 max-h-[500px] flex flex-col">
                      <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">Shopping Cart ({cartCount})</h3>
                        {cartLoading && (
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            Loading cart...
                          </div>
                        )}
                      </div>

                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 flex-1 overflow-auto">
                          {cartLoading ? "Loading..." : "Your cart is empty"}
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 overflow-y-auto">
                            {cartItems.map((item) => (
                              <div key={item._id} className="p-4 border-b flex gap-3">
                                <img
                                  src={item.productDetails?.image}
                                  alt={item.productDetails?.name}
                                  className="w-16 h-16 object-cover rounded cursor-pointer"
                                  onClick={() => handleViewProductDetails(item.productDetails?._id)}
                                />
                                <div className="flex-1">
                                  <h4
                                    className="font-medium truncate cursor-pointer hover:text-blue-600"
                                    onClick={() => handleViewProductDetails(item.productDetails?._id)}
                                  >
                                    {item.productDetails.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">${item.productDetails?.price}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <button
                                      onClick={() => updateCartQuantity(item.productDetails?._id, item.quantity - 1)}
                                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                    <button
                                      onClick={() => updateCartQuantity(item.productDetails?._id, item.quantity + 1)}
                                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                                    >
                                      <Plus size={12} />
                                    </button>
                                    <button
                                      onClick={() => removeFromCart(item.productDetails?._id)}
                                      className="p-1 rounded bg-black hover:bg-red-300 text-white ml-2"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${item.productDetails?.price * item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 border-t">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-semibold">Total: ${getTotalPrice()}</span>
                            </div>
                            <button
                              onClick={handlePlaceOrder}
                              className="w-full bg-[#00a0db] text-white py-2 rounded-lg hover:bg-black transition font-semibold"
                            >
                              Place Order
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                </div>
              )}

              {user ? (
                <div className="relative" ref={profileRef}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  />
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-3 z-50">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm truncate w-40" title={user.email}>{user.email}</p>
                      <button
                        onClick={() => {

                          setIsProfileOpen(false);
                          navigate('/my-orders');
                          setIsProfileOpen(false);
                        }}
                        className="mt-2 bg-green-600 text-white w-full rounded py-1 hover:bg-green-700 mb-2"
                      >
                        My Orders
                      </button>
                      <button
                        data-logout
                        onClick={handleLogout}
                        className="bg-[#00a0db] text-white w-full rounded py-1 hover:bg-black"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="relative px-4 py-2 rounded-full bg-white text-black overflow-hidden group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Register</span>
                  <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                </button>
              )}
            </div>
          </div>

          <button
  className="lg:hidden flex items-center gap-2 focus:outline-none z-50"
  onClick={() => setIsSidebarOpen(true)}
>
  {/* Left: Hamburger icon */}
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>

  {/* Right: Services text */}
  <span className="text-white font-semibold">Services</span>
</button>


        </div>

        {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-5 flex flex-col gap-5">
            {/* Close button and profile */}
            <div className="flex items-center justify-between">
              {user && (
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  {/* Cart icon for mobile */}
                  <div className="relative">
                    <button
                      onClick={() => setIsCartOpen(!isCartOpen)}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                      disabled={cartLoading}
                    >
                      <ShoppingCart size={20} />
                      {cartLoading ? (
                        <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></div>
                        </span>
                      ) : cartCount > 0 ? (
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full min-w-[1.5rem] px-2 h-6 flex items-center justify-center font-bold">

                          {cartCount}
                        </span>
                      ) : null}
                    </button>
                  </div>
                </div>
              )}
              <button className="text-gray-500 hover:text-black ml-auto" onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>
             
            {/* Navigation Items */}
            {navItems.map((item, index) => (
  <Link key={index} to={item.href} onClick={() => {
    setIsSidebarOpen(false);
    setIsOpen(false);
  }} className="hover:text-[#00a0db]">
    {item.label}
  </Link>
))}

            {/* Dropdown Services */}
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => {
                setIsOpen(false);
                setIsExtrasOpen(false);
              }}
            >
              {/* Toggle button */}
              <button
                className=" py-2 flex items-center  b hover:text-black text-black rounded-full transition-all duration-200"
              >
                Services
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="mt-2 w-full bg-white text-black rounded-xl shadow-lg flex flex-col z-50">
                  {services.map((service, index) =>
                    service.href ? (
                      <Link
                        key={index}
                        to={service.href}
                        onClick={() => {
                          setIsSidebarOpen(false);
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300"
                      >
                        {service.label}
                      </Link>
                    ) : (
                      <span
                        key={index}
                        className="block px-4 py-2 text-gray-400 border-b border-gray-300 cursor-not-allowed"
                      >
                        {service.label}
                      </span>
                    )
                  )}
                  <div
                    onMouseEnter={() => setIsExtrasOpen(true)}
                    onMouseLeave={() => setIsExtrasOpen(false)}
                  >
                    <button
                      className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                    >
                      Extras
                      {isExtrasOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    </button>
                    {isExtrasOpen && (
                      <div className="flex flex-col bg-gray-50">
                        {extrasItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.href}
                            onClick={() => {
                              setIsSidebarOpen(false);
                              setIsOpen(false);
                              setIsExtrasOpen(false);
                            }}
                            className="block pl-8 pr-4 py-2 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Book Now & Register/Login Buttons (stacked vertically) */}
            <div className="flex flex-col gap-3 mt-5">
              <Link
                to="/booking"
                className="relative px-4 py-2 rounded-full bg-[#00a0db] text-white text-center overflow-hidden group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#00a0db]">
                  Book Now
                </span>
                <span className="absolute inset-0 bg-white z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
              </Link>

              {user ? (
                <>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/my-orders');
                    }}
                    className="relative px-4 py-2 rounded-full bg-green-600 text-white text-center overflow-hidden group"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-green-600">
                      My Orders
                    </span>
                    <span className="absolute inset-0 bg-white z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="relative px-4 py-2 rounded-full bg-red-500 text-white text-center overflow-hidden group"
                  >
                    <span className="relative z-10 transition-colors duration-300  group-hover:text-red-500">
                      Logout
                    </span>
                    <span className="absolute inset-0 bg-white z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="relative px-4 py-2 rounded-full bg-[#00a0db] text-white text-center overflow-hidden group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#00a0db]">
                    Register
                  </span>
                  <span className="absolute inset-0 bg-white z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Modal for Mobile */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] lg:hidden">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md max-h-96 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Shopping Cart ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl text-gray-600 hover:text-black">×</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                {cartLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Loading cart...
                  </div>
                ) : (
                  "Your cart is empty"
                )}
              </div>
            ) : (
              <>
                <div className="max-h-48 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-3 p-3 border-b">
                      <img
                        src={item.productDetails?.image}
                        alt={item.productDetails?.name}
                        className="w-12 h-12 object-cover rounded cursor-pointer"
                        onClick={() => handleViewProductDetails(item.productDetails?._id)}
                      />
                      <div className="flex-1">
                        <h4
                          className="font-medium text-sm truncate cursor-pointer hover:text-blue-600"
                          onClick={() => handleViewProductDetails(item.productDetails?._id)}
                        >
                          {item.productDetails?.name}
                        </h4>
                        <p className="text-xs text-gray-600">${item.productDetails?.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateCartQuantity(item.productDetails?._id, item.quantity - 1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.productDetails?._id, item.quantity + 1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.productDetails?._id)}
                            className="p-1 rounded bg-red-200 hover:bg-red-300 text-red-600 ml-1"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">${(item.productDetails?.price) * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total: ${getTotalPrice()}</span>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#00a0db] text-white py-2 rounded-lg hover:bg-black transition font-semibold"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-2xl text-gray-600 hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={addressForm.fullName}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={addressForm.email}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Delivery Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Complete Address *</label>
                    <textarea
                      name="address"
                      value={addressForm.address}
                      onChange={handleAddressChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="House/Flat No., Street, Area"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={addressForm.pincode}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="6"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        name="landmark"
                        value={addressForm.landmark}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Near hospital, school, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={addressForm.country}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img src={item.productDetails?.image} alt={item.productDetails?.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-medium">{item.productDetails?.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${item.productDetails?.price * item.quantity}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-300">
                    <span className="text-lg font-bold">Total Amount:</span>
                    <span className="text-lg font-bold text-green-600">${getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={checkoutLoading}
                  className="flex-1 py-3 px-6 bg-[#00a0db] text-white rounded-lg hover:bg-blue-600 transition font-medium flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Order...
                    </>
                  ) : (
                    'Confirm Order'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Slip Modal */}
      {showOrderSlip && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-600">Order Confirmed!</h2>
              <button
                onClick={() => setShowOrderSlip(false)}
                className="text-2xl text-gray-600 hover:text-black"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Details */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-bold text-lg">{orderDetails.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {orderDetails.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-lg text-green-600">${orderDetails.totalAmount}</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{orderDetails.customerInfo.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{orderDetails.customerInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{orderDetails.customerInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{orderDetails.customerInfo.address}</p>
                  {orderDetails.customerInfo.landmark && (
                    <p className="text-gray-600">Landmark: {orderDetails.customerInfo.landmark}</p>
                  )}
                  <p className="font-medium">
                    {orderDetails.customerInfo.city}, {orderDetails.customerInfo.state} - {orderDetails.customerInfo.pincode}
                  </p>
                  <p className="font-medium">{orderDetails.customerInfo.country}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {orderDetails.items.map((item) => (
                    <div key={item._id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">${item.price} × {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={downloadOrderSlip}
                  className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Order Slip
                </button>
                <button
                  onClick={() => {
                    setShowOrderSlip(false);
                    navigate('/');
                  }}
                  className="flex-1 py-3 px-6 bg-[#00a0db] text-white rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Thank You Message */}
              <div className="text-center bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-blue-800 mb-2">Thank you for your order!</p>
                <p className="text-blue-600">You will receive a confirmation email shortly with tracking details.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login/Register Modal */}
      {showModal && (
        <>
          <style>{`body { overflow: hidden; }`}</style>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm relative">
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black">×</button>
              <h2 className="text-2xl font-bold mb-6 text-center">
                {forgotMode ? "Reset Password" : isLogin ? "Login" : "Register"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && !forgotMode && (
                  <>
                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring" />
                    <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring" />
                  </>
                )}
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring" />
                {!forgotMode && (
                  <>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring pr-10"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 text-xl"
                      >
                        {showPassword ? "👁️" : "🙈"}
                      </span>
                    </div>

                    {!isLogin && (
                      <div className="relative">
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring pr-10" />
                        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 text-xl">👁️</span>
                      </div>
                    )}
                  </>
                )}
                <button type="submit" className="w-full bg-[#00a0db] text-white py-2 rounded-md font-semibold hover:bg-black flex justify-center items-center gap-2">
                  {loading ? (
                    <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    forgotMode ? "Send Reset Link" : isLogin ? "Login" : "Register"
                  )}
                </button>
              </form>

              <div className="text-center text-sm mt-3">
                {forgotMode ? (
                  <p>
                    Remember your password?{" "}
                    <button onClick={() => setForgotMode(false)} className="text-[#00a0db] font-medium hover:underline">
                      Back to Login
                    </button>
                  </p>
                ) : isLogin ? (
                  <>
                    <p>
                      Forgot Password?{" "}
                      <button onClick={() => setForgotMode(true)} className="text-[#00a0db] font-medium hover:underline">
                        Click here
                      </button>
                    </p>
                    <p className="mt-2">
                      Don't have an account?{" "}
                      <button onClick={() => setIsLogin(false)} className="text-[#00a0db] font-medium hover:underline">
                        Register
                      </button>
                    </p>
                  </>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => setIsLogin(true)} className="text-blue-600 font-medium hover:underline">
                      Login
                    </button>
                  </p>
                )}
              </div>

              {/* Social Login */}
              <div className="mt-6 text-center">
                <p className="text-black text-sm mb-2">or Login with</p>
                <div className="flex justify-center gap-4 mt-4">
                  {/* Google Button + Tooltip */}
                  <div className="relative flex flex-col items-center">
                    {activeTooltip === "google" && (
                      <div className="absolute bottom-full mb-2 w-full flex justify-center">
                        <div className="flex items-center gap-2 px-2 py-2 rounded-full border bg-white bg-opacity-20 backdrop-blur-md text-black text-sm shadow-md border-white/30">
                          <span>Coming Soon</span>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleClick("google")}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition"
                    >
                      <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
                      <span>Google</span>
                    </button>
                  </div>

                  {/* Facebook Button + Tooltip */}
                  <div className="relative flex flex-col items-center">
                    {activeTooltip === "facebook" && (
                      <div className="absolute bottom-full mb-2 w-full flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white bg-opacity-20 backdrop-blur-md text-black text-sm shadow-md border-white/30">
                          <span>Coming Soon</span>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleClick("facebook")}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition"
                    >
                      <FaFacebook className="text-blue-600" />
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Navbar;