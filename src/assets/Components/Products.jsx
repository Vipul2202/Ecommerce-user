import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import noDataImage from '../../../src/img/no-data.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';




import { Table } from 'react-bootstrap';
import { Menu, Grid3x3, Eye, ShoppingCart, X, Plus, Minus } from 'lucide-react';
const API = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("card");
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ label: "All Categories", value: null });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Modal states
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false); // Loading state for API call
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setUserId(JSON.parse(userData)._id);
    }
  }, []);

  const toggleView = () => setViewType(viewType === "card" ? "table" : "card");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/user/get-categories`);

      setCategories(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (categoryId = null) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `${API}/user/get-products?category=${categoryId}`
        : `${API}/user/get-products`;


      const res = await axios.get(url);
      setProducts(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory?.value || null);
  }, [selectedCategory]);

  // Open quantity modal
  const handleAddToCartClick = (product) => {
    if (!user) {
      toast.warning("Login required to add to cart.");
      navigate("/", { state: { openLogin: true } });
      return;
    }

    setSelectedProduct(product);
    setQuantity(1);
    setShowQuantityModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowQuantityModal(false);
    setSelectedProduct(null);
    setQuantity(1);
    setAddingToCart(false);
  };

  // Handle quantity change
  const handleQuantityChange = (value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= selectedProduct?.qty) {
      setQuantity(numValue);
    }
  };

  // Handle increment
  const incrementQuantity = () => {
    const current = parseInt(quantity, 10);
    if (current < selectedProduct?.qty) {
      setQuantity(current + 1);
    }
  };

  const decrementQuantity = () => {
    const current = parseInt(quantity, 10);
    if (current > 1) {
      setQuantity(current - 1);
    }
  };

  // Handle manual input
  const handleManualInput = (e) => {
    const value = e.target.value;

    if (value === '') {
      setQuantity(1);
      return;
    }

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setQuantity(numValue);
    }
  };

  // Handle input blur (when user leaves the input field)
  const handleInputBlur = () => {
    if (!quantity || quantity < 1) {
      setQuantity(1);
    } else if (quantity > selectedProduct?.qty) {
      setQuantity(selectedProduct?.qty);
    }
  };

  // Add to cart with API integration
  const handleAddToCart = async () => {
    if (!selectedProduct || !quantity || quantity < 1) return;

    setAddingToCart(true);

    try {
      const finalQuantity = parseInt(quantity) || 1;
      // API call to add product to cart
      const response = await axios.post(`${API}/user/add-to-cart`, {
        productId: selectedProduct._id,
        quantity: finalQuantity,
        userId: userId
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if you have token
          'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}`
        }
      });

      if (response.data && response.data.success !== false) {
        // Success - Update local cart for immediate UI feedback
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = existingCart.findIndex(item => item._id === selectedProduct._id);

        if (existingItemIndex > -1) {
          existingCart[existingItemIndex].quantity += finalQuantity;
        } else {
          existingCart.push({
            ...selectedProduct,
            quantity: finalQuantity,
            addedAt: new Date().toISOString()
          });
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        window.dispatchEvent(new CustomEvent('cartUpdated'));

        toast.success(`Added ${finalQuantity} ${selectedProduct.name}${finalQuantity > 1 ? 's' : ''} to cart`);
        closeModal();
      } else {
        throw new Error(response.data?.message || 'Failed to add to cart');
      }

    } catch (error) {
      console.error('Error adding to cart:', error);

      // Handle different error scenarios
      if (error.response?.status === 401) {
        toast.error("Please login to add items to cart");
        navigate("/", { state: { openLogin: true } });
      } else if (error.response?.status === 400) {
        toast.error(error.response.data?.message || "Invalid request");
      } else if (error.response?.status === 404) {
        toast.error("Product not found");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later");
      } else {
        toast.error(error.response?.data?.message || "Failed to add to cart. Please try again");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const handleViewDetails = (product) => {
    navigate(`/car-details/${product._id}`);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryOptions = [
    { label: "All Categories", value: null },
    ...categories.map((cat) => ({ label: cat.name, value: cat._id })),
  ];

  return (
    <div className={`p-4 min-h-screen ${darkMode ? 'bg-[#0d0d0d]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            Products
          </h2>
          <div className="flex gap-2">
            <button
              onClick={toggleView}
              className="p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
              title="Toggle View"
            >
              {viewType === "card" ? <Menu /> : <Grid3x3 />}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            options={categoryOptions}
            value={categoryOptions.find((opt) => opt.value === selectedCategory?.value)}
            onChange={setSelectedCategory}
            className="w-full md:w-64"
          />
        </div>

        {/* Loader / No Data */}
        {loading ? (
          <p className={`${darkMode ? 'text-white' : 'text-black'}`}>Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <img src={noDataImage} alt="No Data" className="w-64" />
            <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No products found
            </p>
          </div>
        ) : viewType === "card" ? (
          // Card View
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`rounded-xl shadow-lg overflow-hidden transition border 
                  ${darkMode ? 'bg-[#1a1a1a] text-white border-gray-700' : 'bg-white text-black border-gray-200'}`}
              >
                <div className="relative">
                  <img
                    src={product?.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />
                  {product.qty <= 0 && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate mb-2">{product.name}</h3>
                  <p className="text-purple-400 text-lg font-bold mb-2">${product.price}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 mb-4`}>
                    {product.description || "No description available."}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddToCartClick(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition 
                        ${product.qty <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00a0db] hover:bg-black text-white'}`}
                      disabled={product.qty <= 0}
                    >
                      <ShoppingCart size={16} />
                      {product.qty <= 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <div className="overflow-x-auto rounded-xl shadow-xl">
            <table className={`min-w-full border ${darkMode ? 'text-white' : 'text-black'}`}>
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="px-4 py-2">
                      <img src={product.image} alt={product.name} className="h-14 w-14 object-cover rounded" />
                    </td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-4 py-2">
                      {product.qty <= 0 ? (
                        <span className="text-red-500 font-semibold">Out of Stock</span>
                      ) : (
                        product.qty
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="px-3 py-1 rounded text-sm font-semibold bg-gray-600 hover:bg-gray-800 text-white flex items-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => handleAddToCartClick(product)}
                          disabled={product.qty <= 0}
                          className={`px-3 py-1 rounded text-sm font-semibold flex items-center gap-1
                            ${product.qty <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800 text-white'}`}
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Quantity Modal */}
        {showQuantityModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`rounded-lg p-6 w-96 max-w-sm mx-4 ${darkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}>
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select Quantity</h3>
                <button
                  onClick={closeModal}
                  className={`p-1 rounded-full hover:bg-gray-200 ${darkMode ? 'hover:bg-gray-700' : ''}`}
                  disabled={addingToCart}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium truncate">{selectedProduct.name}</h4>
                  <p className="text-purple-400 font-bold">${selectedProduct.price}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Available: {selectedProduct.qty}
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <label className="block text-sm font-medium mb-2">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || addingToCart}
                  className={`p-2 rounded-lg border transition-colors ${quantity <= 1 || addingToCart
                    ? 'opacity-50 cursor-not-allowed bg-gray-100' + (darkMode ? ' bg-gray-800' : '')
                    : 'hover:bg-gray-100 active:bg-gray-200 ' + (darkMode ? 'hover:bg-gray-700 active:bg-gray-600 border-gray-600' : 'border-gray-300')
                    }`}
                >
                  <Minus size={16} />
                </button>

                <input
                  type="number"
                  min="1"
                  max={selectedProduct?.qty}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value)) {
                      setQuantity(value);
                    } else {
                      setQuantity(prev => prev + 1);
                    }
                  }}
                  onBlur={handleInputBlur}
                  disabled={addingToCart}
                  className={`w-24 px-3 py-2 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
                    } ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="1"
                />

                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= selectedProduct?.qty || addingToCart}
                  className={`p-2 rounded-lg border transition-colors ${quantity >= selectedProduct?.qty || addingToCart
                    ? 'opacity-50 cursor-not-allowed bg-gray-100' + (darkMode ? ' bg-gray-800' : '')
                    : 'hover:bg-gray-100 active:bg-gray-200 ' + (darkMode ? 'hover:bg-gray-700 active:bg-gray-600 border-gray-600' : 'border-gray-300')
                    }`}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Total Price */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold text-purple-400">
                    ${(selectedProduct.price * (parseInt(quantity) || 1)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  disabled={addingToCart}
                  className={`flex-1 py-2 px-4 rounded-lg border transition ${darkMode
                    ? 'border-gray-600 hover:bg-gray-700'
                    : 'border-gray-300 hover:bg-gray-50'
                    } ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className={`flex-1 py-2 px-4 rounded-lg bg-[#00a0db] hover:bg-blue-600 text-white transition font-medium ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>

        )}
      </div>
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

export default Products;