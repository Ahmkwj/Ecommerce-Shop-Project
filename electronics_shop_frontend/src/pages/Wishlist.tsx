import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import type { Product } from '../types';
import { wishlistService } from '../services/wishlistService';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';

export default function Wishlist() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const wishlist = await wishlistService.getWishlist(userId);
      
      // Load product details for each product in wishlist
      const productPromises = wishlist.productIds.map(id => 
        productService.getProductById(id)
      );
      const productsData = await Promise.all(productPromises);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    try {
      await wishlistService.removeFromWishlist(userId, productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId: string) => {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    try {
      await cartService.addToCart({ userId, productId, quantity: 1 });
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const handleClearWishlist = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    if (!confirm('Are you sure you want to clear your wishlist?')) return;

    try {
      await wishlistService.clearWishlist(userId);
      setProducts([]);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading wishlist...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          {products.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="text-red-600 text-sm font-medium"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0}
                      className="w-full bg-primary-600 text-white py-2 rounded-md text-sm font-medium disabled:bg-gray-400"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="w-full border border-red-300 text-red-600 py-2 rounded-md text-sm font-medium"
                    >
                      Remove from Wishlist
                    </button>
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

