# E-Commerce Backend (Spring Boot)

REST API backend for the e-commerce application.

## Technology Stack

- Spring Boot 3.5.7
- Java 17
- Spring Data MongoDB
- Maven 3.9

## Project Structure

```
src/main/java/com/eshop/electronics/
├── controller/              # REST API endpoints
│   ├── ProductController.java
│   ├── UserController.java
│   ├── CartController.java
│   ├── OrderController.java
│   └── WishlistController.java
├── service/                 # Business logic
│   ├── ProductService.java
│   ├── UserService.java
│   ├── CartService.java
│   ├── OrderService.java
│   └── WishlistService.java
├── model/                   # Data models
│   ├── Product.java
│   ├── User.java
│   ├── Cart.java
│   ├── Order.java
│   └── Wishlist.java
├── repository/              # MongoDB repositories
│   ├── ProductRepository.java
│   ├── UserRepository.java
│   ├── CartRepository.java
│   ├── OrderRepository.java
│   └── WishlistRepository.java
├── config/                  # Configuration
│   └── CorsConfig.java
└── ElectronicsApplication.java  # Main application
```

## Configuration

### application.properties

```properties
spring.data.mongodb.uri=mongodb+srv://user:pass@cluster.mongodb.net/dbname
spring.data.mongodb.database=electronics-shop
server.port=8080
```

## Build and Run

### Using Maven

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Run tests
mvn test

# Package
mvn clean package
```

### Using Docker

```bash
# Build image
docker build -t eshop-backend .

# Run container
docker run -p 8080:8080 eshop-backend
```

## API Documentation

### Products API

- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `GET /products/category/{category}` - Get products by category
- `GET /products/search/{name}` - Search products by name
- `GET /products/sort/price/asc` - Get products sorted by price (ascending)
- `GET /products/sort/price/desc` - Get products sorted by price (descending)

### Users API

- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/{id}` - Get user by ID

### Cart API

- `GET /cart/{userId}` - Get cart for user
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/remove/{productId}?userId={userId}` - Remove item
- `DELETE /cart/clear/{userId}` - Clear cart
- `GET /cart/total/{userId}` - Get cart total
- `GET /cart/count/{userId}` - Get cart item count

### Orders API

- `POST /orders/place` - Place new order
- `GET /orders/user/{userId}` - Get user's orders
- `GET /orders/{orderId}` - Get order by ID

### Wishlist API

- `GET /wishlist/{userId}` - Get user's wishlist
- `POST /wishlist/add` - Add item to wishlist
- `DELETE /wishlist/remove/{productId}?userId={userId}` - Remove item
- `GET /wishlist/check/{userId}/{productId}` - Check if item in wishlist

## Database Collections

- `electronics` - Electronics products
- `toys` - Toys products
- `users` - User accounts
- `carts` - Shopping carts
- `orders` - Order records
- `wishlists` - User wishlists

## Catalog Configuration

The application supports two product catalogs. To switch catalogs, edit `ProductService.java`:

```java
private static final String COLLECTION = "electronics"; // or "toys"
```

## CORS Configuration

CORS is configured in `CorsConfig.java` to allow requests from:

- http://localhost:3000 (production frontend)
- http://localhost:5173 (development frontend)

## Error Handling

The API returns standard HTTP status codes:

- 200 OK - Success
- 400 Bad Request - Invalid input
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error

## Testing

Run unit tests:

```bash
mvn test
```

Run integration tests:

```bash
mvn verify
```

## Dependencies

Key dependencies (see `pom.xml` for complete list):

- Spring Boot Starter Web
- Spring Boot Starter Data MongoDB
- Spring Boot Starter Validation
- Lombok (optional)

## Environment Variables

- `SPRING_DATA_MONGODB_URI` - MongoDB connection string
- `SPRING_DATA_MONGODB_DATABASE` - Database name
- `SERVER_PORT` - Server port (default: 8080)
