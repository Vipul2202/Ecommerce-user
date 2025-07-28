import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import GoogleLogo from "../../img/images.png";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronDown, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
  ];

  // Load cart items from localStorage
  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    loadCartItems();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartItems();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

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
    }
  }, [showModal]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    e.stopPropagation();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart"); // Clear cart on logout
    setUser(null);
    setCartItems([]);
    setCartCount(0);
    toast.info("Logged out");
    navigate("/");
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    toast.success("Item removed from cart");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handleViewProductDetails = (productId) => {
    setIsCartOpen(false);
    navigate(`/product-details/${productId}`);
  };

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
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:text-black focus:outline-none"
                >
                  Services
                  <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg flex flex-col z-50">
                    <Link to="/washing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Washing Services</Link>
                    <Link to="/detailing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Detailing Services</Link>
                    <Link to="/ultrapremium" className="block px-4 py-2 border-b hover:bg-gray-100">Ultra Premium Services</Link>
                    <Link to="/extras" className="block px-4 py-2 hover:bg-gray-100">Extras</Link>
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
                  >
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Cart Modal */}
                  {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
                      <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">Shopping Cart ({cartCount})</h3>
                      </div>
                      
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          Your cart is empty
                        </div>
                      ) : (
                        <>
                          <div className="max-h-64 overflow-y-auto">
                            {cartItems.map((item) => (
                              <div key={item._id} className="p-4 border-b flex gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-16 h-16 object-cover rounded cursor-pointer"
                                  onClick={() => handleViewProductDetails(item._id)}
                                />
                                <div className="flex-1">
                                  <h4 
                                    className="font-medium truncate cursor-pointer hover:text-blue-600"
                                    onClick={() => handleViewProductDetails(item._id)}
                                  >
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">₹{item.price}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <button
                                      onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                    <button
                                      onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                                    >
                                      <Plus size={12} />
                                    </button>
                                    <button
                                      onClick={() => removeFromCart(item._id)}
                                      className="p-1 rounded bg-red-200 hover:bg-red-300 text-red-600 ml-2"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">₹{item.price * item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="p-4 border-t">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-semibold">Total: ₹{getTotalPrice()}</span>
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
                        data-logout
                        onClick={handleLogout}
                        className="mt-2 bg-[#00a0db] text-white w-full rounded py-1 hover:bg-black"
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

          <button className="lg:hidden focus:outline-none z-50" onClick={() => setIsSidebarOpen(true)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
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
                    >
                      <ShoppingCart size={20} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
              <button className="text-gray-500 hover:text-black ml-auto" onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>

            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <Link key={index} to={item.href} onClick={() => setIsSidebarOpen(false)} className="hover:text-[#00a0db]">
                {item.label}
              </Link>
            ))}

            {/* Dropdown Services */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:text-black focus:outline-none"
              >
                Services
                <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg flex flex-col z-50">
                  <Link to="/washing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Washing Services</Link>
                  <Link to="/detailing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Detailing Services</Link>
                  <Link to="/ultrapremium" className="block px-4 py-2 hover:bg-gray-100">Ultra Premium Services</Link>
                  <Link to="/extras" className="block px-4 py-2 hover:bg-gray-100">Extras</Link>
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
                <button
                  onClick={handleLogout}
                  className="relative px-4 py-2 rounded-full bg-red-500 text-white text-center overflow-hidden group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-red-500">
                    Logout
                  </span>
                  <span className="absolute inset-0 bg-white z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                </button>
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
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="max-h-48 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-3 p-3 border-b">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded cursor-pointer"
                        onClick={() => handleViewProductDetails(item._id)}
                      />
                      <div className="flex-1">
                        <h4 
                          className="font-medium text-sm truncate cursor-pointer hover:text-blue-600"
                          onClick={() => handleViewProductDetails(item._id)}
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-1 rounded bg-red-200 hover:bg-red-300 text-red-600 ml-1"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total: ₹{getTotalPrice()}</span>
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
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 flex justify-center items-center gap-2">
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
                    <button onClick={() => setForgotMode(false)} className="text-blue-600 font-medium hover:underline">
                      Back to Login
                    </button>
                  </p>
                ) : isLogin ? (
                  <>
                    <p>
                      Forgot Password?{" "}
                      <button onClick={() => setForgotMode(true)} className="text-blue-600 font-medium hover:underline">
                        Click here
                      </button>
                    </p>
                    <p className="mt-2">
                      Don't have an account?{" "}
                      <button onClick={() => setIsLogin(false)} className="text-blue-600 font-medium hover:underline">
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
                <div className="flex justify-center gap-4">
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition">
                    <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
                    <span>Google</span>
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition">
                    <FaFacebook className="text-blue-600" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;