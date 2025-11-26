# Electronics Shop Frontend

A modern e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **User Authentication**: Register and login functionality
- **Product Browsing**: View all products with search, filter by category, and sort by price
- **Product Details**: Detailed product information page
- **Shopping Cart**: Add/remove items, update quantities, view cart total
- **Wishlist**: Save favorite products for later
- **Checkout**: Complete order with shipping information and payment method
- **Order History**: View past orders and their status
- **Order Management**: Cancel pending orders

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── OrderConfirmation.tsx
│   ├── Orders.tsx
│   └── Wishlist.tsx
├── services/           # API service layer
│   ├── api.ts
│   ├── authService.ts
│   ├── productService.ts
│   ├── cartService.ts
│   ├── orderService.ts
│   └── wishlistService.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main app component with routing
├── main.tsx           # App entry point
└── index.css          # Global styles with Tailwind
```

## Features Overview

### Authentication
- User registration with username and password
- Login with credentials stored in localStorage
- Protected routes that require authentication

### Product Management
- Browse all products
- Search products by name
- Filter by category (Laptops, Smartphones, Accessories, etc.)
- Sort by price (ascending/descending)
- View detailed product information

### Shopping Experience
- Add products to cart with quantity selection
- Update item quantities in cart
- Remove items from cart
- View cart total and item count
- Add/remove products from wishlist

### Checkout & Orders
- Complete checkout with shipping information
- Select payment method (Credit Card, Debit Card, PayPal)
- Add order notes
- View order confirmation
- Track order history
- Cancel pending orders

## Design Philosophy

- **Clean & Simple**: Minimal design without unnecessary decorations
- **User-Friendly**: Intuitive navigation and clear call-to-actions
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Accessible**: Semantic HTML and proper ARIA labels

## API Integration

The frontend communicates with the backend API running on `http://localhost:8080`. All API calls are handled through service layers in the `services/` directory.

Make sure the backend is running before starting the frontend.

## Notes

- This is a learning project - authentication uses simple localStorage
- No actual payment processing is implemented
- Passwords are stored as plain text in the backend (not for production use)

## License

This project is for educational purposes.
