package com.eshop.electronics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.eshop.electronics.model.Cart;
import com.eshop.electronics.model.CartRequest;
import com.eshop.electronics.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable String userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody CartRequest request) {
        return cartService.addToCart(
                request.getUserId(),
                request.getProductId(),
                request.getQuantity());
    }

    @PutMapping("/update")
    public Cart updateItemQuantity(@RequestBody CartRequest request) {
        return cartService.updateItemQuantity(
                request.getUserId(),
                request.getProductId(),
                request.getQuantity());
    }

    @DeleteMapping("/remove/{productId}")
    public Cart removeItem(@RequestParam String userId, @PathVariable String productId) {
        return cartService.removeItem(userId, productId);
    }

    @DeleteMapping("/clear/{userId}")
    public Cart clearCart(@PathVariable String userId) {
        return cartService.clearCart(userId);
    }

    @GetMapping("/total/{userId}")
    public double getCartTotalPrice(@PathVariable String userId) {
        return cartService.getCartTotalPrice(userId);
    }

    @GetMapping("/count/{userId}")
    public int getCartItemCount(@PathVariable String userId) {
        return cartService.getCartItemCount(userId);
    }
}
