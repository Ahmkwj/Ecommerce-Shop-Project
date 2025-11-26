package com.eshop.electronics.model;

public class OrderRequest {
    private String userId;

    public OrderRequest() {
    }

    public OrderRequest(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
