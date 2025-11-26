package com.eshop.electronics.model;

public class OrderItem {
    private Product product;
    private String name;
    private double price;
    private int quantity;

    public OrderItem() {
    }

    public OrderItem(Product product, String name, double price, int quantity) {
        this.product = product;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}