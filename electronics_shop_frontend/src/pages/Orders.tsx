import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import type { Order } from '../types';
import { orderService } from '../services/orderService';
import { authService } from '../services/authService';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const data = await orderService.getOrdersByUser(userId);
      // Sort by timestamp descending (newest first)
      const sortedOrders = data.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      await orderService.cancelOrder(orderId);
      alert('Order cancelled successfully');
      loadOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50';
      case 'SHIPPED':
        return 'text-blue-600 bg-blue-50';
      case 'DELIVERED':
        return 'text-green-600 bg-green-50';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.timestamp).toLocaleDateString()} at{' '}
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-700">
                          {item.productName} x {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  {order.shippingAddress && (
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-700">Shipping Address: </span>
                      <span className="text-sm text-gray-600">{order.shippingAddress}</span>
                    </div>
                  )}
                  {order.paymentMethod && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Payment Method: </span>
                      <span className="text-sm text-gray-600">{order.paymentMethod}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">Total: </span>
                    <span className="text-xl font-bold text-primary-600">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      View Details
                    </button>
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Cancel Order
                      </button>
                    )}
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

