package com.eshop.electronics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.eshop.electronics.model.Order;
import com.eshop.electronics.model.OrderRequest;
import com.eshop.electronics.model.CheckoutRequest;
import com.eshop.electronics.service.OrderService;

import java.util.List;

// SPL VARIATION POINT: Order Management Feature
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order createOrder(@RequestBody OrderRequest request) {
        return orderService.createOrder(request.getUserId());
    }

    @PostMapping("/checkout")
    public Order checkout(@RequestBody CheckoutRequest checkoutRequest) {
        return orderService.checkout(checkoutRequest);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable String userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PutMapping("/{id}/status/{status}")
    public Order updateOrderStatus(@PathVariable String id, @PathVariable String status) {
        return orderService.updateOrderStatus(id, status);
    }

    @PutMapping("/{id}/cancel")
    public Order cancelOrder(@PathVariable String id) {
        return orderService.cancelOrder(id);
    }

    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable String status) {
        return orderService.getOrdersByStatus(status);
    }
}
