import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import type { Product } from "../types";
import { productService } from "../services/productService";
import { cartService } from "../services/cartService";
import { wishlistService } from "../services/wishlistService";
import { authService } from "../services/authService";
import { showSuccess, showError, showInfo } from "../utils/toast";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProducts();
    if (authService.isAuthenticated()) {
      loadWishlist();
    }
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      showError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    const userId = authService.getCurrentUserId();
    if (userId) {
      try {
        const wishlist = await wishlistService.getWishlist(userId);
        setWishlistIds(new Set(wishlist.productIds));
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadProducts();
      return;
    }
    try {
      const data = await productService.searchProducts(searchTerm);
      setProducts(data);
      if (data.length === 0) {
        showInfo("No products found matching your search");
      }
    } catch (error) {
      console.error("Error searching products:", error);
      showError("Search failed");
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    try {
      if (category === "All") {
        await loadProducts();
      } else {
        const data = await productService.getProductsByCategory(category);
        setProducts(data);
      }
    } catch (error) {
      console.error("Error filtering by category:", error);
      showError("Failed to filter products");
    }
  };

  const handleSortChange = async (order: string) => {
    setSortOrder(order);
    try {
      if (order === "asc") {
        const data = await productService.getProductsSortedByPriceAsc();
        setProducts(data);
      } else if (order === "desc") {
        const data = await productService.getProductsSortedByPriceDesc();
        setProducts(data);
      } else {
        await loadProducts();
      }
    } catch (error) {
      console.error("Error sorting products:", error);
      showError("Failed to sort products");
    }
  };

  const handleAddToCart = async (productId: string, productName: string) => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      showError("Please login to add items to cart");
      return;
    }

    try {
      await cartService.addToCart({ userId, productId, quantity: 1 });
      showSuccess(`${productName} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      showError("Failed to add to cart");
    }
  };

  const handleToggleWishlist = async (
    productId: string,
    productName: string
  ) => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      showError("Please login to manage wishlist");
      return;
    }

    try {
      if (wishlistIds.has(productId)) {
        await wishlistService.removeFromWishlist(userId, productId);
        setWishlistIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        showInfo(`${productName} removed from wishlist`);
      } else {
        await wishlistService.addToWishlist(userId, productId);
        setWishlistIds((prev) => new Set(prev).add(productId));
        showSuccess(`${productName} added to wishlist`);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      showError("Failed to update wishlist");
    }
  };

  // SPL VARIATION POINT: Product Categories - Static combined list
  // Categories from both electronics and toys catalogs
  const categories = [
    "All",
    "Laptops",
    "Audio",
    "Tablets",
    "Smartphones",
    "Building Sets",
    "Vehicles",
    "Dolls",
    "Outdoor Toys",
    "Plush Toys",
    "Arts & Crafts",
    "Educational Toys",
    "Puzzles",
    "RC Toys",
    "Action Figures",
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        {/* SPL VARIATION POINT: Shop Branding */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white shadow-lg">
          {/* Electronics Shop Variant */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to ElectroShop
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-6">
            Discover the latest electronics at unbeatable prices
          </p>

          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-primary-100">Products</p>
              <p className="text-2xl font-bold">{products.length}+</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-primary-100">Free Shipping</p>
              <p className="text-2xl font-bold">All Orders</p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium transition-all"
            >
              Search
            </button>
          </div>

          {/* Categories and Sort */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="none">Sort by</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  {/* SPL VARIATION POINT: Wishlist Feature */}
                  <button
                    onClick={() =>
                      handleToggleWishlist(product.id, product.name)
                    }
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all"
                  >
                    {wishlistIds.has(product.id) ? (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                  </button>
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Only {product.stock} left
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Out of Stock
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-primary-600 font-medium mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.stock} in stock
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(product.id, product.name)}
                      disabled={product.stock === 0}
                      className="w-full py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="block text-center py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
