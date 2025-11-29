# E-Commerce Application

A full-stack e-commerce application built with Spring Boot, React, and MongoDB. Features product browsing, shopping cart, user authentication, order management, and wishlist functionality.

## Technology Stack

### Backend

- Spring Boot 3.5.7
- Java 17
- MongoDB (Atlas Cloud)
- Maven

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router

### Infrastructure

- Docker & Docker Compose
- Nginx (for frontend)

## Project Structure

```
.
├── electronics_shop_backend/    # Spring Boot REST API
│   ├── src/main/java/com/eshop/electronics/
│   │   ├── controller/         # REST controllers
│   │   ├── service/            # Business logic
│   │   ├── model/              # Data models
│   │   └── repository/         # MongoDB repositories
│   ├── Dockerfile
│   └── pom.xml
│
├── electronics_shop_frontend/   # React application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   └── types/              # TypeScript types
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml           # Docker orchestration
└── start.bat                    # Quick start script (Windows)
```

## Features

### Core Features

- Product browsing and search
- Category filtering
- Price sorting
- Product details view
- Shopping cart management
- User authentication (login/register)
- Order management
- Order history
- Wishlist functionality

### Catalog Support

The application supports two product catalogs:

- Electronics (laptops, smartphones, tablets, accessories)
- Toys (action figures, dolls, board games, puzzles)

Catalog selection is configured in the backend service layer.

## Prerequisites

- Docker Desktop
- Docker Compose

OR for local development:

- Java 17 or higher
- Node.js 20 or higher
- Maven 3.9 or higher
- MongoDB Atlas account (or local MongoDB)

## Quick Start with Docker

### 1. Build and Start All Services

```bash
docker-compose up --build
```

### 2. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### 3. Stop Services

```bash
docker-compose down
```

## Local Development

### Backend Setup

1. Navigate to backend directory:

```bash
cd electronics_shop_backend
```

2. Install dependencies and build:

```bash
mvn clean install
```

3. Run the application:

```bash
mvn spring-boot:run
```

Backend will start on http://localhost:8080

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd electronics_shop_frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Frontend will start on http://localhost:5173

## API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `GET /products/category/{category}` - Filter by category
- `GET /products/search/{name}` - Search products
- `GET /products/sort/price/asc` - Sort by price ascending
- `GET /products/sort/price/desc` - Sort by price descending

### Users

- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/{id}` - Get user by ID

### Cart

- `GET /cart/{userId}` - Get user cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update item quantity
- `DELETE /cart/remove/{productId}` - Remove item from cart
- `DELETE /cart/clear/{userId}` - Clear cart
- `GET /cart/total/{userId}` - Get cart total
- `GET /cart/count/{userId}` - Get cart item count

### Orders

- `POST /orders/place` - Place order
- `GET /orders/user/{userId}` - Get user orders
- `GET /orders/{orderId}` - Get order by ID

### Wishlist

- `GET /wishlist/{userId}` - Get user wishlist
- `POST /wishlist/add` - Add item to wishlist
- `DELETE /wishlist/remove/{productId}` - Remove from wishlist
- `GET /wishlist/check/{userId}/{productId}` - Check if item in wishlist

## Configuration

### Backend Configuration

Edit `electronics_shop_backend/src/main/resources/application.properties`:

```properties
# MongoDB Configuration
spring.data.mongodb.uri=your-mongodb-uri
spring.data.mongodb.database=electronics-shop

# Server Configuration
server.port=8080
```

### Frontend Configuration

Edit `electronics_shop_frontend/src/services/api.ts` for API base URL:

```typescript
const API_BASE_URL = "http://localhost:8080";
```

### Catalog Configuration

To switch between catalogs, edit `electronics_shop_backend/src/main/java/com/eshop/electronics/service/ProductService.java`:

```java
private static final String COLLECTION = "electronics"; // or "toys"
```

## Docker Configuration

### docker-compose.yml

Orchestrates both frontend and backend services with proper networking.

### Backend Dockerfile

Multi-stage build using Maven and Eclipse Temurin JRE.

### Frontend Dockerfile

Multi-stage build using Node.js and Nginx.

## Environment Variables

### Backend

- `SPRING_DATA_MONGODB_URI` - MongoDB connection string
- `SPRING_DATA_MONGODB_DATABASE` - Database name
- `SERVER_PORT` - Server port (default: 8080)

### Frontend

No environment variables needed. API URL is configured in the source code.

## Database

The application uses MongoDB with the following collections:

- `electronics` - Electronics products
- `toys` - Toys products
- `users` - User accounts
- `carts` - Shopping carts
- `orders` - Order records
- `wishlists` - User wishlists

## Troubleshooting

### Docker Issues

**Containers won't start:**

```bash
docker-compose down -v
docker-compose up --build
```

**Port already in use:**
Change ports in `docker-compose.yml`

### Backend Issues

**MongoDB connection failed:**
Check MongoDB Atlas connection string and network access settings.

**Build fails:**

```bash
mvn clean
mvn install -DskipTests
```

### Frontend Issues

**Dependencies installation fails:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails:**

```bash
npm run build
```

## License

This project is for educational purposes.

## Authors

Developed as part of a software product line engineering project.
