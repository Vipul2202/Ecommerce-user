import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Package, Calendar, MapPin, Phone, Mail, Download, ArrowLeft } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // API Base URL
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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    toast.info("Session expired. Please login again.");
    navigate("/");
  };

  // Fetch user orders
  const fetchUserOrders = async () => {
    if (!user) {
      toast.error("Please login to view orders");
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const authAxios = createAuthAxios();
      const response = await authAxios.get('/user/get-my-orders');
      
      // Debug logging
      console.log('Full API Response:', response.data);
      console.log('Response Data Type:', typeof response.data.data);
      console.log('Is Array?', Array.isArray(response.data.data));

      if (response.data && response.data.message === "Your orders fetched successfully") {
        console.log('User orders:', response.data.data);
        // Extract the actual orders array from the nested structure
        const ordersData = response.data.data;
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else if (ordersData && typeof ordersData === 'object') {
          // If it's a single order object, wrap it in an array
          setOrders([ordersData]);
        } else {
          setOrders([]);
        }
        
        // Debug the first order structure
        if (ordersData && ordersData.length > 0) {
          console.log('First Order Structure:', ordersData[0]);
          console.log('First Order Items:', ordersData[0].items);
        }
      } else {
        throw new Error(response.data?.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error('Error fetching orders:', error);

      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Download order slip
  const downloadOrderSlip = (order) => {
    const orderSlipContent = `
ORDER DETAILS
=============

Order ID: ${order._id || order.orderId}
Order Date: ${new Date(order.createdAt || order.orderDate).toLocaleDateString()}
Status: ${order.status}

CUSTOMER INFORMATION
--------------------
Name: ${order.shippingAddress?.fullName || user.name}
Email: ${user.email}
Phone: ${order.shippingAddress?.phone || user.phone}

DELIVERY ADDRESS
----------------
${order.shippingAddress?.address}
${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.postalCode}
${order.shippingAddress?.country}

ORDER ITEMS
-----------
${order.items?.map(item => {
      const productName = item.productDetails?.name || 
                         item.productId?.name || 
                         item.name || 
                         item.product?.name || 
                         'Product';
      const productPrice = item.productDetails?.price || 
                          item.productId?.price || 
                          item.price || 
                          item.product?.price || 
                          0;
      return `${productName} - Qty: ${item.quantity} - ₹${productPrice} each = ₹${productPrice * item.quantity}`;
    }).join('\n') || 'Items not available'}

TOTAL AMOUNT: ₹${order.totalAmount}

Thank you for your order!
    `;

    const blob = new Blob([orderSlipContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Order_${order._id || order.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Order slip downloaded successfully!");
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'placed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/");
      toast.error("Please login to view orders");
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#00a0db] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#00a0db] hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your orders</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-lg">{user?.name}</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Found</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-[#00a0db] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-lg">{order._id || order.orderId || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium flex items-center gap-1">
                          <Calendar size={16} />
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 
                           order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status || 'pending')}`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="font-bold text-xl text-green-600">₹{order.totalAmount || 0}</p>
                      </div>
                      <button
                        onClick={() => downloadOrderSlip(order)}
                        className="p-2 bg-[#00a0db] text-white rounded-lg hover:bg-blue-600 transition"
                        title="Download Order Slip"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-lg mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => {
                            // Debug each item to understand structure
                            console.log('Order Item:', item);
                            
                            // Try different possible data structures
                            const productName = item.productDetails?.name || 
                                              item.productId?.name || 
                                              item.name || 
                                              item.product?.name || 
                                              'Product Name Not Available';
                            
                            const productPrice = item.productDetails?.price || 
                                                item.productId?.price || 
                                                item.price || 
                                                item.product?.price || 
                                                0;
                            
                            const productImage = item.productDetails?.image || 
                                                item.productId?.image || 
                                                item.image || 
                                                item.product?.image || 
                                                '/api/placeholder/80/80';
                            
                            const quantity = item.quantity || 1;
                            
                            return (
                              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <img
                                  src={productImage}
                                  alt={productName}
                                  className="w-16 h-16 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.src = '/api/placeholder/80/80';
                                  }}
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{productName}</h4>
                                  <p className="text-sm text-gray-600">
                                    ₹{productPrice} × {quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">₹{productPrice * quantity}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-gray-500 text-center py-4">No items found for this order</p>
                        )}
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        {order.shippingAddress ? (
                          <>
                            <div className="flex items-start gap-2">
                              <MapPin size={16} className="text-gray-500 mt-1" />
                              <div>
                                <p className="font-medium">{order.shippingAddress.fullName}</p>
                                <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                                <p className="text-sm text-gray-600">
                                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                                </p>
                                <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
                              </div>
                            </div>
                            {order.shippingAddress.phone && (
                              <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-500" />
                                <p className="text-sm">{order.shippingAddress.phone}</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-gray-500 text-sm">Shipping address not available</p>
                        )}
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-500" />
                          <p className="text-sm">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;