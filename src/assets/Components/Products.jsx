import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import noDataImage from '../../../src/img/no-data.png';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';
import { Menu, Grid3x3, Eye, ShoppingCart } from 'lucide-react';

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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleView = () => setViewType(viewType === "card" ? "table" : "card");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9006/user/get-categories");
      setCategories(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (categoryId = null) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `http://localhost:9006/user/get-products?category=${categoryId}`
        : `http://localhost:9006/user/get-products`;

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

  const handleAddToCart = (product) => {
    if (!user) {
      toast.warning("Login required to add to cart.");
      navigate("/", { state: { openLogin: true } });
      return;
    }

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item._id === product._id);
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    toast.success(`Added ${product.name} to cart`);
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
                  <p className="text-purple-400 text-lg font-bold mb-2">₹{product.price}</p>
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
                      onClick={() => handleAddToCart(product)}
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
                    <td className="px-4 py-2">₹{product.price}</td>
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
                          onClick={() => handleAddToCart(product)}
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
      </div>
    </div>
  );
};

export default Products;