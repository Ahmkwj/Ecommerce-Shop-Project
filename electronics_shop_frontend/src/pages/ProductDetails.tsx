import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import type { Product } from "../types";
import { productService } from "../services/productService";
import { cartService } from "../services/cartService";
import { wishlistService } from "../services/wishlistService";
import { authService } from "../services/authService";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
      checkWishlist();
    }
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    const userId = authService.getCurrentUserId();
    if (userId && id) {
      try {
        const inWishlist = await wishlistService.isInWishlist(userId, id);
        setIsInWishlist(inWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    }
  };

  const handleAddToCart = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!id) return;

    try {
      await cartService.addToCart({ userId, productId: id, quantity });
      alert("Added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  const handleToggleWishlist = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      alert("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    if (!id) return;

    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(userId, id);
        setIsInWishlist(false);
      } else {
        await wishlistService.addToWishlist(userId, id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Product not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-600 mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                  Category: {product.category}
                </p>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black dark:text-black"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-md font-medium disabled:bg-gray-400"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className="px-6 py-3 border border-gray-300 rounded-md text-2xl"
                  >
                    {isInWishlist ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
