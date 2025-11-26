# Electronics Shop - E-Shop Application

**Name:** Ahmed Khawaja  
**Student ID:** 60104808

**Name:** Nasser Al-Kawari  
**Student ID:** 60303522

## Overview

A modern e-shop application built with Spring Boot backend connected to MongoDB Atlas.

## Technology Stack

- **Backend:** Spring Boot 3.5.7
- **Database:** MongoDB Atlas
- **API:** RESTful Services

### 1. Run the Application

```bash
./mvnw spring-boot:run
```

Or on Windows:

```cmd
mvnw.cmd spring-boot:run
```

### 3. Test the API

Open `api-tests.http` and run the tests to verify everything works.

## API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `GET /products/category/{category}` - Get products by category
- `GET /products/sort/price/asc` - Sort products by price (low to high)
- `GET /products/sort/price/desc` - Sort products by price (high to low)

### Shopping Cart

- `GET /cart/{userId}` - Get cart by user ID
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update item quantity in cart
- `DELETE /cart/remove/{productId}?userId={userId}` - Remove item from cart
- `DELETE /cart/clear/{userId}` - Clear cart

### Orders

- `POST /orders` - Create new order from user's cart
- `GET /orders` - Get all orders
- `GET /orders/{id}` - Get order by ID
- `GET /orders/user/{userId}` - Get orders by user ID
- `PUT /orders/{id}/status/{status}` - Update order status

## Project Structure

```
electronics/
├── src/main/java/com/eshop/electronics/
│   ├── controller/          # REST Controllers
│   ├── service/            # Business Logic
│   ├── repository/         # MongoDB Repositories
│   └── model/              # Data Models
├── mongodb-collections/     # Sample data for import
│   ├── products.json
│   └── orders-sample.json
└── api-tests.http          # API test file
```

## Sample Data

The `mongodb-collections/` folder contains:

- **8 Products** across 4 categories (Smartphones, Laptops, Audio, Tablets)
- **3 Sample Orders** with different statuses

## Notes

- All data is stored in MongoDB Atlas
- No local data initialization
- Import JSON files before first run
- Application runs on port 8080
