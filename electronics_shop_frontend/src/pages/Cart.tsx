import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import type { Product } from "../types";
import { cartService } from "../services/cartService";
import { productService } from "../services/productService";
import { authService } from "../services/authService";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "../utils/toast";

interface CartItemWithProduct {
  productId: string;
  quantity: number;
  product: Product;
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const cart = await cartService.getCart(userId);
      const totalPrice = await cartService.getCartTotal(userId);
      setTotal(totalPrice);

      if (cart.items && cart.items.length > 0) {
        const itemsWithProducts = await Promise.all(
          cart.items.map(async (item) => {
            try {
              const product = await productService.getProductById(
                item.productId
              );
              return { ...item, product };
            } catch (error) {
              console.error(`Error loading product ${item.productId}:`, error);
              return null;
            }
          })
        );

        const validItems = itemsWithProducts.filter(
          (item): item is CartItemWithProduct => item !== null
        );
        setCartItems(validItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      showError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (
    productId: string,
    newQuantity: number
  ) => {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    if (newQuantity < 1) return;

    const toastId = showLoading("Updating quantity...");
    try {
      await cartService.updateQuantity({
        userId,
        productId,
        quantity: newQuantity,
      });
      dismissToast(toastId);
      showSuccess("Quantity updated");
      await loadCart();
    } catch (error) {
      dismissToast(toastId);
      console.error("Error updating quantity:", error);
      showError("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    const toastId = showLoading("Removing item...");
    try {
      await cartService.removeFromCart(userId, productId);
      dismissToast(toastId);
      showSuccess("Item removed from cart");
      await loadCart();
    } catch (error) {
      dismissToast(toastId);
      console.error("Error removing item:", error);
      showError("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    const toastId = showLoading("Clearing cart...");
    try {
      await cartService.clearCart(userId);
      dismissToast(toastId);
      showSuccess("Cart cleared");
      await loadCart();
    } catch (error) {
      dismissToast(toastId);
      console.error("Error clearing cart:", error);
      showError("Failed to clear cart");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showError("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-4 py-2 text-red-600 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add some products to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium transition-all inline-flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Start Shopping</span>
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl shadow-sm p-6 transition-all"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {item.product.category}
                      </p>
                      <p className="text-2xl font-bold text-primary-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-red-500 p-2 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>

                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-xl font-bold text-gray-800">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">$0.00</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-bold text-gray-800">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-primary-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium transition-all mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Continue Shopping
                </button>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Free shipping on all orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
