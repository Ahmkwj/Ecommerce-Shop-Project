package com.eshop.electronics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.electronics.model.Order;
import com.eshop.electronics.model.OrderItem;
import com.eshop.electronics.model.Status;
import com.eshop.electronics.model.Cart;
import com.eshop.electronics.model.CartItem;
import com.eshop.electronics.model.Product;
import com.eshop.electronics.model.CheckoutRequest;
import com.eshop.electronics.repository.OrderRepository;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    public Order createOrder(String userId) {
        Cart cart = cartService.getCartByUserId(userId);

        List<OrderItem> orderItems = new ArrayList<>();
        double totalPrice = 0.0;

        for (CartItem cartItem : cart.getItems()) {
            Product product = productService.getProductById(cartItem.getProductId());
            OrderItem orderItem = new OrderItem(
                    product,
                    product.getName(),
                    product.getPrice(),
                    cartItem.getQuantity());
            orderItems.add(orderItem);
            totalPrice += product.getPrice() * cartItem.getQuantity();
        }

        Order order = new Order(null, userId, totalPrice, Status.PENDING, new Date());
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        cartService.clearCart(userId);

        return savedOrder;
    }

    public Order checkout(CheckoutRequest checkoutRequest) {
        Cart cart = cartService.getCartByUserId(checkoutRequest.getUserId());

        List<OrderItem> orderItems = new ArrayList<>();
        double totalPrice = 0.0;

        for (CartItem cartItem : cart.getItems()) {
            Product product = productService.getProductById(cartItem.getProductId());
            OrderItem orderItem = new OrderItem(
                    product,
                    product.getName(),
                    product.getPrice(),
                    cartItem.getQuantity());
            orderItems.add(orderItem);
            totalPrice += product.getPrice() * cartItem.getQuantity();
        }

        Order order = new Order(null, checkoutRequest.getUserId(), totalPrice, Status.PENDING, new Date());
        order.setItems(orderItems);
        order.setFirstName(checkoutRequest.getFirstName());
        order.setLastName(checkoutRequest.getLastName());
        order.setShippingAddress(checkoutRequest.getShippingAddress());
        order.setPaymentMethod(checkoutRequest.getPaymentMethod());
        order.setNotes(checkoutRequest.getNotes());

        Order savedOrder = orderRepository.save(order);

        cartService.clearCart(checkoutRequest.getUserId());

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(String id) {
        if (orderRepository.findById(id).isPresent()) {
            return orderRepository.findById(id).get();
        } else {
            return null;
        }
    }

    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order updateOrderStatus(String id, String status) {
        if (orderRepository.findById(id).isPresent()) {
            Order order = orderRepository.findById(id).get();
            Status newStatus = Status.valueOf(status.toUpperCase());
            order.setStatus(newStatus);
            return orderRepository.save(order);
        } else {
            return null;
        }
    }

    public Order cancelOrder(String id) {
        if (orderRepository.findById(id).isPresent()) {
            Order order = orderRepository.findById(id).get();
            order.setStatus(Status.CANCELLED);
            return orderRepository.save(order);
        } else {
            return null;
        }
    }

    public List<Order> getOrdersByStatus(String status) {
        List<Order> allOrders = orderRepository.findAll();
        List<Order> filteredOrders = new ArrayList<>();
        Status statusEnum = Status.valueOf(status.toUpperCase());

        for (Order order : allOrders) {
            if (order.getStatus() == statusEnum) {
                filteredOrders.add(order);
            }
        }

        return filteredOrders;
    }
}
