# E-Commerce Frontend (React)

Modern e-commerce frontend built with React, TypeScript, and Tailwind CSS.

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router v6

## Project Structure

```
src/
├── components/              # Reusable components
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   └── ProtectedRoute.tsx
├── pages/                   # Page components
│   ├── Home.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Orders.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Wishlist.tsx
│   └── OrderConfirmation.tsx
├── services/                # API services
│   ├── api.ts
│   ├── productService.ts
│   ├── cartService.ts
│   ├── orderService.ts
│   ├── userService.ts
│   ├── wishlistService.ts
│   └── themeService.ts
├── types/                   # TypeScript types
│   └── index.ts
├── utils/                   # Utility functions
│   └── toast.ts
├── config/                  # Configuration
│   └── theme.dark.ts
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## Features

- Product browsing with search and filters
- Category-based filtering
- Price sorting
- Shopping cart management
- User authentication
- Order management
- Wishlist functionality
- Dark mode support
- Responsive design
- Toast notifications

## Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will be available at http://localhost:5173

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## Docker

### Build Image

```bash
docker build -t eshop-frontend .
```

### Run Container

```bash
docker run -p 3000:80 eshop-frontend
```

## Configuration

### API Base URL

Edit `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:8080";
```

### Theme Configuration

Dark mode can be enabled by uncommenting the import in `src/main.tsx`:

```typescript
// Uncomment to enable dark theme
// import './config/theme.dark'
```

## Routes

- `/` - Home page (product listing)
- `/products/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history
- `/order-confirmation/:orderId` - Order confirmation
- `/wishlist` - Wishlist
- `/login` - Login page
- `/register` - Registration page

## Components

### Layout
Wrapper component with navigation and footer.

### Navbar
Navigation bar with search, cart, and user menu.

### ProtectedRoute
Route guard for authenticated pages.

## Services

### productService
Handles all product-related API calls.

### cartService
Manages shopping cart operations.

### orderService
Handles order placement and history.

### authService
Manages user authentication.

### wishlistService
Handles wishlist operations.

### themeService
Manages theme (light/dark mode).

## Styling

### Tailwind CSS
Utility-first CSS framework for styling.

### Dark Mode
Configured with Tailwind's dark mode class strategy.

### Responsive Design
Mobile-first approach with responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## TypeScript

Strict TypeScript configuration with:
- Type checking
- Interface definitions in `src/types/index.ts`
- Props validation

## Environment

No environment variables needed. Configuration is done in source files.

## Build Output

Production build is output to the `dist/` directory:
- Optimized and minified JavaScript
- CSS bundled and optimized
- Assets with content hashing

## Deployment

The application is served using Nginx in production. The `nginx.conf` file configures:
- Single Page Application routing
- Gzip compression
- Static file serving

## Dependencies

Key dependencies (see `package.json` for complete list):
- React & React DOM
- React Router DOM
- Tailwind CSS
- React Hot Toast
- TypeScript
- Vite

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
