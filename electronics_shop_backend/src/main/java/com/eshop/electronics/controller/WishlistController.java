package com.eshop.electronics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.eshop.electronics.model.Wishlist;
import com.eshop.electronics.service.WishlistService;

// SPL VARIATION POINT: Wishlist Feature
@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public Wishlist getWishlistByUserId(@PathVariable String userId) {
        return wishlistService.getWishlistByUserId(userId);
    }

    @PostMapping("/add")
    public Wishlist addProductToWishlist(@RequestParam String userId, @RequestParam String productId) {
        return wishlistService.addProductToWishlist(userId, productId);
    }

    @DeleteMapping("/remove")
    public Wishlist removeProductFromWishlist(@RequestParam String userId, @RequestParam String productId) {
        return wishlistService.removeProductFromWishlist(userId, productId);
    }

    @DeleteMapping("/clear/{userId}")
    public Wishlist clearWishlist(@PathVariable String userId) {
        return wishlistService.clearWishlist(userId);
    }

    @GetMapping("/check")
    public boolean isProductInWishlist(@RequestParam String userId, @RequestParam String productId) {
        return wishlistService.isProductInWishlist(userId, productId);
    }
}
