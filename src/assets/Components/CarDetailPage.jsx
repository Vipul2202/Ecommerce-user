import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftCircle, X, Plus, Minus } from 'react-feather';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [serverError, setServerError] = useState(false);

  // Modal states
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [orderLoading, setOrderLoading] = useState(false);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchCarDetail = async () => {
    try {
      const response = await axios.get(`${API}/user/get-product/${id}`, {
        timeout: 5000
      });
      setCar(response.data?.data);
      setServerError(false);
    } catch (error) {
      console.error('Error fetching car details:', error);
      setServerError(true);
      
      // Mock data fallback when server is offline
      const mockCar = {
        _id: id,
        name: 'Sample Product',
        price: 1299,
        image: 'https://via.placeholder.com/500x400?text=Sample+Product',
        description: 'This is a sample product description shown when the server is offline. It demonstrates all the features including quantity selection and order placement.',
        category: { name: 'Sample Category' }
      };
      setCar(mockCar);
      
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        toast.error("Server not available. Showing sample data.", {
          toastId: 'server-error',
          autoClose: 5000
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetail();
  }, [id]);

  const handlePlaceOrderClick = () => {
    if (!user) {
      toast.warning("Login required to place order.");
   navigate("/", { state: { openLogin: true } });
      return;
    }
    
    setQuantity(1);
    setShowOrderModal(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleOrderDetailsChange = (field, value) => {
    setOrderDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateOrderForm = () => {
    const required = ['fullName', 'phoneNumber', 'email', 'address', 'city', 'state', 'pincode'];
    for (let field of required) {
      if (!orderDetails[field].trim()) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
        return false;
      }
    }
    
    // Phone number validation
    if (!/^\d{10}$/.test(orderDetails.phoneNumber)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderDetails.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    // Pincode validation
    if (!/^\d{6}$/.test(orderDetails.pincode)) {
      toast.error('Pincode must be 6 digits');
      return false;
    }
    
    return true;
  };

  const handleConfirmOrder = async () => {
    if (!validateOrderForm()) return;
    
    setOrderLoading(true);
    
    // If server was already detected as offline, skip API call
    if (serverError) {
      // Save order locally
      const orderData = {
        productId: car._id,
        productName: car.name,
        productPrice: car.price,
        productImage: car.image,
        quantity: quantity,
        totalPrice: car.price * quantity,
        customerDetails: {
          fullName: orderDetails.fullName,
          phoneNumber: orderDetails.phoneNumber,
          email: orderDetails.email,
          address: orderDetails.address,
          landmark: orderDetails.landmark,
          city: orderDetails.city,
          state: orderDetails.state,
          pincode: orderDetails.pincode,
          paymentMethod: orderDetails.paymentMethod
        },
        userId: user?.id || user?._id || 'demo-user',
        orderDate: new Date().toISOString(),
        status: 'pending',
        localOrder: true,
        source: 'product-detail-page'
      };

      const localOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      localOrders.push({
        ...orderData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('pendingOrders', JSON.stringify(localOrders));
      
      toast.success('Order saved locally! (Server offline)', {
        autoClose: 3000
      });
      setShowOrderModal(false);
      resetModal();
      setOrderLoading(false);
      return;
    }

    try {
      const orderData = {
        productId: car._id,
        productName: car.name,
        productPrice: car.price,
        productImage: car.image,
        quantity: quantity,
        totalPrice: car.price * quantity,
        customerDetails: {
          fullName: orderDetails.fullName,
          phoneNumber: orderDetails.phoneNumber,
          email: orderDetails.email,
          address: orderDetails.address,
          landmark: orderDetails.landmark,
          city: orderDetails.city,
          state: orderDetails.state,
          pincode: orderDetails.pincode,
          paymentMethod: orderDetails.paymentMethod
        },
        userId: user?.id || user?._id,
        orderDate: new Date().toISOString(),
        status: 'pending',
        source: 'product-detail-page'
      };

      console.log('Sending order data:', orderData);
      
      // Try the API call
      const response = await axios.post(`${API}/user/place-order`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${user.token}`
        },
        timeout: 10000 // 10 second timeout
      });
      
      console.log('Order response:', response.data);
      
      if (response.data && (response.data.success || response.status === 200)) {
        toast.success('Order placed successfully!');
        setShowOrderModal(false);
        resetModal();
        
        // Optionally refresh product data to update stock
        fetchCarDetail();
      } else {
        throw new Error(response.data?.message || 'Order placement failed');
      }
      
    } catch (error) {
      console.error('Error placing order:', error);
      
      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout. Please check your connection and try again.');
      } else if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || `Server error (${error.response.status})`;
        toast.error(`Error: ${errorMessage}`);
        console.error('Server error:', error.response.data);
      } else if (error.request || error.code === 'ERR_NETWORK') {
        // Request was made but no response received or network error
        setServerError(true);
        
        // Fallback: Save order locally if API fails
        const orderData = {
          productId: car._id,
          productName: car.name,
          productPrice: car.price,
          productImage: car.image,
          quantity: quantity,
          totalPrice: car.price * quantity,
          customerDetails: {
            fullName: orderDetails.fullName,
            phoneNumber: orderDetails.phoneNumber,
            email: orderDetails.email,
            address: orderDetails.address,
            landmark: orderDetails.landmark,
            city: orderDetails.city,
            state: orderDetails.state,
            pincode: orderDetails.pincode,
            paymentMethod: orderDetails.paymentMethod
          },
          userId: user?.id || user?._id || 'demo-user',
          orderDate: new Date().toISOString(),
          status: 'pending',
          localOrder: true,
          source: 'product-detail-page'
        };
        
        const localOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
        localOrders.push({
          ...orderData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('pendingOrders', JSON.stringify(localOrders));
        
        toast.success('Order saved locally! Will sync when server is available.', {
          autoClose: 4000
        });
        setShowOrderModal(false);
        resetModal();
      } else {
        // Something else happened
        toast.error(error.message || 'Failed to place order. Please try again.');
      }
    }
    setOrderLoading(false);
  };

  const resetModal = () => {
    setQuantity(1);
    setOrderDetails({
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      paymentMethod: 'cod'
    });
  };

  const closeModal = () => {
    setShowOrderModal(false);
    resetModal();
  };

  const totalPrice = car ? car.price * quantity : 0;

  if (loading) return <div className="text-black p-6">Loading...</div>;
  if (!car) return <div className="text-black p-6">Product not found.</div>;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-semibold">Product Details</div>
        {serverError && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-500">
              Server offline - Demo data
            </span>
          </div>
        )}
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6 flex gap-2 items-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 hover:text-gray-600 transition-colors"
        >
          <ArrowLeftCircle size={16} />
          Back
        </button>
        <span>/</span>
        <span className="text-black">{car.name}</span>
      </div>

      {/* Card */}
      <div className="border border-gray-300 rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-lg">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={car.image}
            alt={car.name}
            className="w-full object-cover rounded-xl bg-white p-2"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{car.name}</h2>
            <p className="text-black mb-4">{car.description}</p>
            <p className="text-purple-500 text-2xl font-bold mb-4">₹ {car.price}</p>

            <div className="space-y-2 mb-6">
              <p className="text-sm">
                <span className="font-semibold">Category:</span>{' '}
                <span className="text-gray-700">{car.category?.name || 'N/A'}</span>
              </p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="mt-6 flex gap-4">
            <button 
              onClick={handlePlaceOrderClick}
              className="px-8 py-3 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Place Order
            </button>
            <button 
              onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-lg font-medium border border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && car && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Place Order</h2>
              <button 
                onClick={closeModal} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Product Details */}
              <div className="flex gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
                  <p className="text-purple-600 text-xl font-bold">₹{car.price}</p>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Total Price: <span className="font-bold text-xl text-purple-600">₹{totalPrice}</span>
                  </p>
                </div>
              </div>

              {/* Order Details Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Delivery Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      value={orderDetails.fullName}
                      onChange={(e) => handleOrderDetailsChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number *</label>
                    <input
                      type="tel"
                      value={orderDetails.phoneNumber}
                      onChange={(e) => handleOrderDetailsChange('phoneNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="10-digit phone number"
                      maxLength="10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    value={orderDetails.email}
                    onChange={(e) => handleOrderDetailsChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Address *</label>
                  <textarea
                    value={orderDetails.address}
                    onChange={(e) => handleOrderDetailsChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Landmark</label>
                  <input
                    type="text"
                    value={orderDetails.landmark}
                    onChange={(e) => handleOrderDetailsChange('landmark', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nearby landmark (optional)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">City *</label>
                    <input
                      type="text"
                      value={orderDetails.city}
                      onChange={(e) => handleOrderDetailsChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">State *</label>
                    <input
                      type="text"
                      value={orderDetails.state}
                      onChange={(e) => handleOrderDetailsChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="State"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Pincode *</label>
                    <input
                      type="text"
                      value={orderDetails.pincode}
                      onChange={(e) => handleOrderDetailsChange('pincode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="6-digit pincode"
                      maxLength="6"
                    />
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Payment Method</label>
                  <select
                    value={orderDetails.paymentMethod}
                    onChange={(e) => handleOrderDetailsChange('paymentMethod', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOrder}
                  disabled={orderLoading}
                  className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {orderLoading ? 'Placing Order...' : `Confirm Order - ₹${totalPrice}`}
                </button>
              </div>

              {/* Debug Information */}
              {/* <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
                <p><strong>Debug Info:</strong></p>
                <p>Status: {serverError ? '🔴 Server Offline' : '🟢 Server Online'}</p>
                <p>API Endpoint: {BASE_URL}/user/place-order</p>
                <p>User ID: {user?.id || user?._id || 'Not found'}</p>
                <p>Product ID: {car?._id}</p>
                <p>Total Price: ₹{totalPrice}</p>
                {serverError && (
                  <p className="text-orange-600 mt-2">
                    ⚠️ Orders will be saved locally and synced when server is available
                  </p>
                )}
              </div> */}
            </div>
          </div>
        </div>
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
              toastClassName="custom-toast"
              bodyClassName="custom-toast-body"
            />
    </div>
  );
};

export default CarDetailPage;