package com.eshop.electronics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.electronics.model.Cart;
import com.eshop.electronics.model.CartItem;
import com.eshop.electronics.model.Product;
import com.eshop.electronics.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    public Cart getCartByUserId(String userId) {
        Cart cart = null;
        if (cartRepository.findByUserId(userId).isPresent()) {
            cart = cartRepository.findByUserId(userId).get();
        } else {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            cart = cartRepository.save(newCart);
        }
        return cart;
    }

    public Cart addToCart(String userId, String productId, int quantity) {
        Cart cart = getCartByUserId(userId);

        boolean productFound = false;
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                productFound = true;
                break;
            }
        }

        if (!productFound) {
            CartItem newItem = new CartItem(productId, quantity);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    public Cart updateItemQuantity(String userId, String productId, int quantity) {
        Cart cart = getCartByUserId(userId);

        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
                break;
            }
        }

        return cartRepository.save(cart);
    }

    public Cart removeItem(String userId, String productId) {
        Cart cart = getCartByUserId(userId);
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                cart.getItems().remove(item);
                break;
            }
        }

        return cartRepository.save(cart);
    }

    public Cart clearCart(String userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }

    public double getCartTotalPrice(String userId) {
        Cart cart = getCartByUserId(userId);
        double totalPrice = 0.0;

        for (CartItem item : cart.getItems()) {
            Product product = productService.getProductById(item.getProductId());
            totalPrice += product.getPrice() * item.getQuantity();
        }

        return totalPrice;
    }

    public int getCartItemCount(String userId) {
        Cart cart = getCartByUserId(userId);
        int count = 0;

        for (CartItem item : cart.getItems()) {
            count += item.getQuantity();
        }

        return count;
    }
}
