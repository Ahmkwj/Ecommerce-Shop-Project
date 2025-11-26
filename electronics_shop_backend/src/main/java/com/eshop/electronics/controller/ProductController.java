package com.eshop.electronics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.eshop.electronics.model.Product;
import com.eshop.electronics.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    @GetMapping("/search/{name}")
    public List<Product> searchProductsByName(@PathVariable String name) {
        return productService.searchProductsByName(name);
    }

    @GetMapping("/sort/price/asc")
    public List<Product> getProductsSortedByPriceAsc() {
        return productService.getProductsSortedByPriceAsc();
    }

    @GetMapping("/sort/price/desc")
    public List<Product> getProductsSortedByPriceDesc() {
        return productService.getProductsSortedByPriceDesc();
    }
}