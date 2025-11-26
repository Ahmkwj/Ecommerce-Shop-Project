package com.eshop.electronics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshop.electronics.model.Product;
import com.eshop.electronics.repository.ProductRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        if (productRepository.findById(id).isPresent()) {
            return productRepository.findById(id).get();
        } else {
            return null;
        }
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> getProductsSortedByPriceAsc() {
        List<Product> products = productRepository.findAll();
        List<Product> sortedProducts = new ArrayList<Product>(products);

        for (int i = 0; i < sortedProducts.size(); i++) {
            for (int j = i + 1; j < sortedProducts.size(); j++) {
                if (sortedProducts.get(i).getPrice() > sortedProducts.get(j).getPrice()) {
                    Product temp = sortedProducts.get(i);
                    sortedProducts.set(i, sortedProducts.get(j));
                    sortedProducts.set(j, temp);
                }
            }
        }

        return sortedProducts;
    }

    public List<Product> getProductsSortedByPriceDesc() {
        List<Product> products = productRepository.findAll();
        List<Product> sortedProducts = new ArrayList<Product>(products);

        for (Product product : sortedProducts) {
            for (Product product2 : sortedProducts) {
                if (product.getPrice() < product2.getPrice()) {
                    Product temp = product;
                    product = product2;
                    product2 = temp;
                }
            }
        }

        return sortedProducts;
    }
}