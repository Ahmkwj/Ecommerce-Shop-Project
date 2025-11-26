import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { cartService } from "../services/cartService";
import { orderService } from "../services/orderService";
import { authService } from "../services/authService";
import { showSuccess, showError, showInfo, showLoading, dismissToast } from "../utils/toast";

export default function Checkout() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCartSummary();
  }, []);

  const loadCartSummary = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const cartTotal = await cartService.getCartTotal(userId);
      const count = await cartService.getCartCount(userId);
      setTotal(cartTotal);
      setItemCount(count);

      if (count === 0) {
        showInfo("Your cart is empty");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error loading cart summary:", error);
      showError("Failed to load cart summary");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userId = authService.getCurrentUserId();
    if (!userId) return;

    setLoading(true);
    const toastId = showLoading("Processing your order...");

    try {
      const checkoutData = {
        userId,
        firstName,
        lastName,
        shippingAddress,
        paymentMethod,
        notes,
      };

      const order = await orderService.checkout(checkoutData);
      dismissToast(toastId);
      showSuccess("Order placed successfully!");
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      dismissToast(toastId);
      console.error("Error placing order:", error);
      showError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  Shipping Address
                </h2>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  rows={3}
                  placeholder="123 Main St, City, State, ZIP Code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Payment Method
                </h2>
                <div className="grid gap-4">
                  {["Credit Card", "Debit Card", "PayPal"].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === method
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-primary-600 focus:ring-2 focus:ring-primary-500"
                      />
                      <span className="ml-3 font-medium text-gray-800">
                        {method}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Order Notes (Optional)
                </h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any special instructions for your order..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary-600 text-white rounded-xl font-medium transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Place Order</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({itemCount})</span>
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

              <div className="space-y-3 pt-6 border-t">
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
                  <span>Secure checkout</span>
                </div>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
