package com.eshop.electronics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.electronics.model.Wishlist;
import com.eshop.electronics.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public Wishlist getWishlistByUserId(String userId) {
        Wishlist wishlist = null;
        if (wishlistRepository.findByUserId(userId).isPresent()) {
            wishlist = wishlistRepository.findByUserId(userId).get();
        } else {
            Wishlist newWishlist = new Wishlist();
            newWishlist.setUserId(userId);
            wishlist = wishlistRepository.save(newWishlist);
        }
        return wishlist;
    }

    public Wishlist addProductToWishlist(String userId, String productId) {
        Wishlist wishlist = getWishlistByUserId(userId);

        boolean productExists = false;
        for (String existingProductId : wishlist.getProductIds()) {
            if (existingProductId.equals(productId)) {
                productExists = true;
                break;
            }
        }

        if (!productExists) {
            wishlist.getProductIds().add(productId);
        }

        return wishlistRepository.save(wishlist);
    }

    public Wishlist removeProductFromWishlist(String userId, String productId) {
        Wishlist wishlist = getWishlistByUserId(userId);

        for (String existingProductId : wishlist.getProductIds()) {
            if (existingProductId.equals(productId)) {
                wishlist.getProductIds().remove(existingProductId);
                break;
            }
        }

        return wishlistRepository.save(wishlist);
    }

    public Wishlist clearWishlist(String userId) {
        Wishlist wishlist = getWishlistByUserId(userId);
        wishlist.getProductIds().clear();
        return wishlistRepository.save(wishlist);
    }

    public boolean isProductInWishlist(String userId, String productId) {
        Wishlist wishlist = getWishlistByUserId(userId);

        for (String existingProductId : wishlist.getProductIds()) {
            if (existingProductId.equals(productId)) {
                return true;
            }
        }

        return false;
    }
}
