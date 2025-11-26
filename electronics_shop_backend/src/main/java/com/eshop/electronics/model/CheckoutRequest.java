package com.eshop.electronics.model;

// SPL VARIATION POINT: Order Management Feature
public class CheckoutRequest {
    private String userId;
    private String firstName;
    private String lastName;
    private String shippingAddress;
    // SPL VARIATION POINT: Payment Methods - payment method field
    private String paymentMethod;
    private String notes;

    public CheckoutRequest() {
    }

    public CheckoutRequest(String userId, String firstName, String lastName, String shippingAddress,
            String paymentMethod, String notes) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.notes = notes;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
