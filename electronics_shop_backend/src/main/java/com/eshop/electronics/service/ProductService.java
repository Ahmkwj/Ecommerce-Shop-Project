package com.eshop.electronics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.eshop.electronics.model.Product;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private MongoTemplate mongoTemplate;

    private String COLLECTION = "toys";
    private String COLLECTION = "electronics";

    public List<Product> getAllProducts() {
        return mongoTemplate.findAll(Product.class, COLLECTION);
    }

    public List<Product> getProductsByCategory(String category) {
        return getAllProducts().stream()
                .filter(p -> p.getCategory().equals(category))
                .collect(Collectors.toList());
    }

    public List<Product> searchProductsByName(String name) {
        return getAllProducts().stream()
                .filter(p -> p.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Product> getProductsSortedByPriceAsc() {
        return getAllProducts().stream()
                .sorted(Comparator.comparingDouble(Product::getPrice))
                .collect(Collectors.toList());
    }

    public List<Product> getProductsSortedByPriceDesc() {
        return getAllProducts().stream()
                .sorted(Comparator.comparingDouble(Product::getPrice).reversed())
                .collect(Collectors.toList());
    }

    public Product getProductById(String id) {
        return getAllProducts().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
