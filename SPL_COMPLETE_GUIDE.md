# Complete SPL Guide - Step by Step with Mobioos Forge

## Overview

This guide will walk you through creating an E-Shop Software Product Line (SPL) using Mobioos Forge extension in VS Code. You'll be able to generate different shop variants (Electronics/Toys, with/without orders, light/dark theme, etc.).

---

## Part 1: Understanding Your Variability Points

Your E-Shop has **6 variability points** that can be mixed and matched:

### 1. Order Management (Optional - Include or Exclude)

**What it does:** Allows users to place orders, view order history, track shipments
**Include when:** You want a full e-commerce shop
**Exclude when:** You want just a product catalog/browser

### 2. User Authentication (Optional - Include or Exclude)

**What it does:** Login/register system, user accounts, protected pages
**Include when:** You need user accounts and personalization
**Exclude when:** You want a simple guest-only browse experience

### 3. Wishlist (Optional - Include or Exclude)

**What it does:** Users can save favorite products
**Include when:** You want enhanced user engagement
**Exclude when:** You want a minimal interface

### 4. Payment Methods (Alternative - Choose One or More)

**Options:** Credit Card / Debit Card / PayPal
**What it does:** Determines which payment options show at checkout
**Note:** Only relevant if Order Management is included

### 5. Theme (Alternative - Choose One)

**Options:** Light Theme / Dark Theme
**What it does:** Sets the visual appearance of the entire app
**How it works:** Simple import change in one file

### 6. Product Catalog (Alternative - Choose One)

**Options:** Electronics / Toys
**What it does:** Determines shop type, categories, branding, database collection
**MongoDB Collections:** "electronics" or "toys"

---

## Part 2: Step-by-Step Mobioos Forge Setup

### STEP 1: Open Mobioos Forge

1. Open VS Code with your E-shop Project
2. Open Command Palette: `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type: `Mobioos Forge: Initialize Project`
4. Press Enter
5. Wait for Mobioos Forge to analyze your project

---

### STEP 2: Create Feature Model

**What is a Feature Model?**
It's a tree structure that defines all possible features and how they relate to each other.

**Steps:**

1. In VS Code sidebar, click on **Mobioos Forge icon**
2. Click **"Create Feature Model"**
3. Name it: `Eshop-SPL`
4. Click **"Add Root Feature"**
5. Name root: `E-Shop Application`

Now add child features to the root:

#### Add Mandatory Features (Always Included)

6. Right-click on `E-Shop Application` → **Add Child → Mandatory**
7. Name: `Product Management`
8. Repeat: Add another mandatory child
9. Name: `Shopping Cart`

#### Add Optional Features (Can Include or Exclude)

10. Right-click on `E-Shop Application` → **Add Child → Optional**
11. Name: `Order Management`
12. Repeat for: `User Authentication` (optional)
13. Repeat for: `Wishlist` (optional)

#### Add Alternative Groups

14. Right-click on `E-Shop Application` → **Add Child → Alternative Group**
15. Name the group: `Payment Methods`
16. Right-click on `Payment Methods` → **Add Child → Optional**
17. Name: `Credit Card`
18. Repeat: Add `Debit Card` (optional)
19. Repeat: Add `PayPal` (optional)

20. Right-click on `E-Shop Application` → **Add Child → Alternative Group**
21. Name: `Theme`
22. Right-click on `Theme` → **Add Child**
23. Name: `Light Theme`
24. Repeat: Add `Dark Theme`

25. Right-click on `E-Shop Application` → **Add Child → Alternative Group**
26. Name: `Product Catalog`
27. Right-click on `Product Catalog` → **Add Child**
28. Name: `Electronics`
29. Repeat: Add `Toys`

**Your Feature Model Tree Should Look Like:**

```
E-Shop Application (root)
├── Product Management (mandatory)
├── Shopping Cart (mandatory)
├── Order Management (optional)
├── User Authentication (optional)
├── Wishlist (optional)
├── Payment Methods (alternative group)
│   ├── Credit Card (optional)
│   ├── Debit Card (optional)
│   └── PayPal (optional)
├── Theme (alternative group)
│   ├── Light Theme
│   └── Dark Theme
└── Product Catalog (alternative group)
    ├── Electronics
    └── Toys
```

30. Click **"Save Feature Model"**

---

### STEP 3: Add Markers for Order Management

**What are Markers?**
Markers tell Mobioos Forge which files/code belong to which feature.

#### Mark Backend Files

1. In Feature Model, click on **`Order Management`** feature
2. Click **"Add Marker"** button
3. Click **"Add File Marker"**
4. Navigate to: `electronics_shop_backend/src/main/java/com/eshop/electronics/controller/OrderController.java`
5. Select **entire file** → Click **"Mark"**
6. Repeat for these files (mark entire files):
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/service/OrderService.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/model/Order.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/model/OrderItem.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/model/CheckoutRequest.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/model/OrderRequest.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/repository/OrderRepository.java`

#### Mark Frontend Files

7. Still on `Order Management` feature
8. Click **"Add File Marker"**
9. Navigate to: `electronics_shop_frontend/src/pages/Orders.tsx`
10. Select **entire file** → Click **"Mark"**
11. Repeat for entire files:
    - `electronics_shop_frontend/src/pages/Checkout.tsx`
    - `electronics_shop_frontend/src/pages/OrderConfirmation.tsx`
    - `electronics_shop_frontend/src/services/orderService.ts`

#### Mark Specific Code Blocks

12. Click **"Add Line Marker"**
13. Navigate to: `electronics_shop_frontend/src/App.tsx`
14. Select lines **35 to 62** (the order routes section)
15. Click **"Mark"**

16. Click **"Add Line Marker"**
17. Navigate to: `electronics_shop_frontend/src/components/Navbar.tsx`
18. Select lines **112 to 121** (Orders navigation link)
19. Click **"Mark"**

20. Click **"Add Line Marker"**
21. Navigate to: `electronics_shop_frontend/src/pages/Cart.tsx`
22. Select line **347** (the "Proceed to Checkout" button)
23. Click **"Mark"**

24. Click **"Save Markers"**

---

### STEP 4: Add Markers for User Authentication

1. In Feature Model, click on **`User Authentication`** feature
2. Click **"Add Marker"**

#### Mark Backend Files

3. Mark these entire files:
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/controller/UserController.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/service/UserService.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/model/User.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/repository/UserRepository.java`

#### Mark Frontend Files

4. Mark these entire files:
   - `electronics_shop_frontend/src/pages/Login.tsx`
   - `electronics_shop_frontend/src/pages/Register.tsx`
   - `electronics_shop_frontend/src/components/ProtectedRoute.tsx`
   - `electronics_shop_frontend/src/services/authService.ts`

#### Mark Code Blocks

5. In `electronics_shop_frontend/src/App.tsx`, mark lines **24-25** (auth routes)
6. In `electronics_shop_frontend/src/components/Navbar.tsx`, mark lines **179-237** (login/logout UI)

7. Click **"Save Markers"**

---

### STEP 5: Add Markers for Wishlist

1. In Feature Model, click on **`Wishlist`** feature
2. Click **"Add Marker"**

#### Mark Backend Files

3. Mark these entire files:
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/controller/WishlistController.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/service/WishlistService.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/model/Wishlist.java`
   - `electronics_shop_backend/src/main/java/com/eshop/electronics/repository/WishlistRepository.java`

#### Mark Frontend Files

4. Mark these entire files:
   - `electronics_shop_frontend/src/pages/Wishlist.tsx`
   - `electronics_shop_frontend/src/services/wishlistService.ts`

#### Mark Code Blocks

5. In `electronics_shop_frontend/src/App.tsx`, mark lines **65-72** (wishlist route)
6. In `electronics_shop_frontend/src/components/Navbar.tsx`, mark lines **123-131** (wishlist link)
7. In `electronics_shop_frontend/src/pages/Home.tsx`, mark lines **291-323** (heart button on products)
8. In `electronics_shop_frontend/src/pages/ProductDetails.tsx`, mark lines **186-195** (heart button)

9. Click **"Save Markers"**

---

### STEP 6: Add Markers for Payment Methods

**Special Note:** Payment methods use a function that returns an array. We'll create alternatives for this function.

1. In Feature Model, click on **`Credit Card`** feature
2. Click **"Add Marker"** → **"Add Alternative Marker"**
3. Navigate to: `electronics_shop_frontend/src/pages/Checkout.tsx`
4. Find the function `getAvailablePaymentMethods()` (around line 25-28)
5. Select the **entire function**
6. In the marker dialog, replace the function content with:
   ```typescript
   const getAvailablePaymentMethods = (): string[] => {
     return ["Credit Card"];
   };
   ```
7. Click **"Mark"**

8. Click on **`Debit Card`** feature
9. Click **"Add Marker"** → **"Add Alternative Marker"**
10. Same location: `Checkout.tsx`, same function
11. Replace with:
    ```typescript
    const getAvailablePaymentMethods = (): string[] => {
      return ["Credit Card", "Debit Card"];
    };
    ```
12. Click **"Mark"**

13. Click on **`PayPal`** feature
14. Click **"Add Marker"** → **"Add Alternative Marker"**
15. Same location, replace with:
    ```typescript
    const getAvailablePaymentMethods = (): string[] => {
      return ["Credit Card", "Debit Card", "PayPal"];
    };
    ```
16. Click **"Mark"**

17. Click **"Save Markers"**

---

### STEP 7: Add Markers for Theme

**Special Note:** Theme is controlled by ONE import statement. Super simple!

1. In Feature Model, click on **`Light Theme`** feature
2. Click **"Add Marker"** → **"Add Alternative Marker"**
3. Navigate to: `electronics_shop_frontend/src/services/themeService.ts`
4. Find line **6** (the import statement)
5. Select the import line
6. Replace with:
   ```typescript
   import {
     THEME_MODE,
     initializeTheme,
     canSwitchTheme,
   } from "../config/theme.light";
   ```
7. Click **"Mark"**

8. Click on **`Dark Theme`** feature
9. Click **"Add Marker"** → **"Add Alternative Marker"**
10. Same file, same line
11. Replace with:
    ```typescript
    import {
      THEME_MODE,
      initializeTheme,
      canSwitchTheme,
    } from "../config/theme.dark";
    ```
12. Click **"Mark"**

13. Click **"Save Markers"**

---

### STEP 8: Add Markers for Product Catalog

**Note:** This requires changes in multiple places.

#### Electronics Variant

1. In Feature Model, click on **`Electronics`** feature
2. Click **"Add Marker"** → **"Add Alternative Marker"**

**Marker 1: Database Collection** 3. Navigate to: `electronics_shop_backend/src/main/java/com/eshop/electronics/model/Product.java` 4. Find line **9**: `@Document(collection = "electronics")` 5. Select that line 6. Keep it as: `@Document(collection = "electronics")` 7. Click **"Mark"**

**Marker 2: Categories** 8. Click **"Add Alternative Marker"** 9. Navigate to: `electronics_shop_frontend/src/pages/Home.tsx` 10. Find lines **145-153** (the categories array) 11. Select those lines 12. Keep the electronics categories:
`typescript
    const categories = [
      "All",
      "Laptops",
      "Smartphones",
      "Accessories",
      "Tablets",
      "Headphones",
    ];
    ` 13. Click **"Mark"**

**Marker 3: Shop Branding** 14. Click **"Add Alternative Marker"** 15. Same file (`Home.tsx`), find lines **172-178** (the hero section title and description) 16. Select those lines 17. Keep:
`typescript
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Welcome to ElectroShop
    </h1>
    <p className="text-lg md:text-xl text-primary-100 mb-6">
      Discover the latest electronics at unbeatable prices
    </p>
    ` 18. Click **"Mark"**

**Marker 4: Navbar Logo** 19. Click **"Add Alternative Marker"** 20. Navigate to: `electronics_shop_frontend/src/components/Navbar.tsx` 21. Find lines **77-98** (logo and shop name) 22. Select those lines (keep the electronics version, the uncommented one) 23. Click **"Mark"**

#### Toys Variant

24. In Feature Model, click on **`Toys`** feature
25. Click **"Add Marker"** → **"Add Alternative Marker"**

**Marker 1: Database Collection** 26. Navigate to: `Product.java`, line 9 27. Replace with: `@Document(collection = "toys")` 28. Click **"Mark"**

**Marker 2: Categories** 29. Click **"Add Alternative Marker"** 30. Navigate to: `Home.tsx`, lines 145-153 31. Replace with toys categories:
`typescript
    const categories = [
      "All",
      "Action Figures",
      "Dolls",
      "Board Games",
      "Puzzles",
      "Educational",
    ];
    ` 32. Click **"Mark"**

**Marker 3: Shop Branding** 33. Click **"Add Alternative Marker"** 34. Same file, lines 172-178 35. Replace with:
`typescript
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Welcome to ToyWorld
    </h1>
    <p className="text-lg md:text-xl text-primary-100 mb-6">
      Discover amazing toys for all ages at unbeatable prices
    </p>
    ` 36. Click **"Mark"**

**Marker 4: Navbar Logo** 37. Click **"Add Alternative Marker"** 38. Navigate to: `Navbar.tsx`, find the commented toys logo section (around lines 100-130) 39. Select and uncomment the toys logo section 40. Click **"Mark"**

41. Click **"Save Markers"**

---

### STEP 9: Create Variant Configurations

Now that all markers are set, you can generate different shop variants!

#### Variant 1: Full Electronics Shop (Light Theme)

1. In Mobioos Forge sidebar, click **"Create New Variant"**
2. Name: `Electronics-Full-Light`
3. Description: `Full-featured electronics shop with light theme`
4. Select features:
   - ✅ Product Management (mandatory - auto-selected)
   - ✅ Shopping Cart (mandatory - auto-selected)
   - ✅ Order Management
   - ✅ User Authentication
   - ✅ Wishlist
   - ✅ Credit Card (under Payment Methods)
   - ✅ Debit Card (under Payment Methods)
   - ✅ PayPal (under Payment Methods)
   - ✅ Light Theme
   - ✅ Electronics (under Product Catalog)
5. Click **"Generate Variant"**
6. Wait for generation to complete
7. New folder created: `generated_variants/Electronics-Full-Light/`

#### Variant 2: Simple Toys Catalog (Dark Theme)

1. Click **"Create New Variant"**
2. Name: `Toys-Simple-Dark`
3. Description: `Simple toys catalog browser with dark theme, no orders`
4. Select features:
   - ✅ Product Management (mandatory)
   - ✅ Shopping Cart (mandatory)
   - ❌ Order Management (uncheck)
   - ❌ User Authentication (uncheck)
   - ❌ Wishlist (uncheck)
   - ❌ All Payment Methods (uncheck all - not relevant without orders)
   - ✅ Dark Theme
   - ✅ Toys
5. Click **"Generate Variant"**
6. New folder: `generated_variants/Toys-Simple-Dark/`

#### Variant 3: Electronics Store - Basic (Light Theme)

1. Click **"Create New Variant"**
2. Name: `Electronics-Basic-Light`
3. Description: `Basic electronics store with orders, no wishlist, credit card only`
4. Select features:
   - ✅ Product Management
   - ✅ Shopping Cart
   - ✅ Order Management
   - ✅ User Authentication
   - ❌ Wishlist (uncheck)
   - ✅ Credit Card only (check only this one)
   - ✅ Light Theme
   - ✅ Electronics
5. Click **"Generate Variant"**
6. New folder: `generated_variants/Electronics-Basic-Light/`

---

### STEP 10: Test Your Variants

For each generated variant, you can start it with ONE COMMAND using Docker!

#### Prerequisites (One-time Setup)

1. Install **Docker Desktop** from https://www.docker.com/products/docker-desktop
2. Start Docker Desktop
3. That's it! No need to install Node.js, Java, or Maven.

#### Starting a Variant

**On Windows:**

1. Navigate to variant folder: `generated_variants/[variant-name]/`
2. Double-click: `start.bat`
3. Wait 3-5 minutes (first run only)
4. Done! Application is running.

**On Mac/Linux:**

1. Navigate to variant folder: `generated_variants/[variant-name]/`
2. Open terminal and run:
   ```bash
   ./start.sh
   ```
3. Wait 3-5 minutes (first run only)
4. Done! Application is running.

**What the script does:**

- ✓ Checks Docker is running
- ✓ Builds backend container (Java + Spring Boot)
- ✓ Builds frontend container (React + Nginx)
- ✓ Starts both containers
- ✓ Shows you the URLs

#### Access the Application

Once containers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

#### Verify Features

Open browser to `http://localhost:3000` and check:

- Theme (light or dark)
- Shop name and categories (Electronics or Toys)
- Login/Register buttons (present or absent based on auth feature)
- Wishlist heart icons (present or absent)
- Can you checkout? (if Order Management included)
- Which payment methods appear? (if orders included)

#### Stopping the Variant

**Windows:** Double-click `stop.bat`
**Mac/Linux:** Run `./stop.sh`

Or use:

```bash
docker-compose down
```

#### Viewing Logs

To see what's happening:

```bash
docker-compose logs -f
```

#### Rebuilding After Changes

If you modify code:

```bash
docker-compose up --build -d
```

Or just run `start.bat` / `start.sh` again (rebuilds automatically).

---

## Part 3: Quick Reference Tables

### Feature Selection Guide

| Feature             | When to Include         | When to Exclude         |
| ------------------- | ----------------------- | ----------------------- |
| Order Management    | Full e-commerce shop    | Product catalog only    |
| User Authentication | Need user accounts      | Guest-only browsing     |
| Wishlist            | Enhanced engagement     | Minimal interface       |
| Credit Card         | Standard payment        | Not doing payments      |
| Debit Card          | More payment options    | Keep it simple          |
| PayPal              | International customers | Limited payment options |
| Light Theme         | Professional look       | Prefer dark             |
| Dark Theme          | Modern look             | Prefer light            |
| Electronics         | Selling tech products   | Selling toys            |
| Toys                | Selling toys            | Selling electronics     |

### File Locations Quick Reference

| Feature  | Backend Files                                       | Frontend Files                                      |
| -------- | --------------------------------------------------- | --------------------------------------------------- |
| Orders   | OrderController, OrderService, Order model          | Orders.tsx, Checkout.tsx, OrderConfirmation.tsx     |
| Auth     | UserController, UserService, User model             | Login.tsx, Register.tsx, authService.ts             |
| Wishlist | WishlistController, WishlistService, Wishlist model | Wishlist.tsx, wishlistService.ts                    |
| Payments | CheckoutRequest model                               | Checkout.tsx (getAvailablePaymentMethods function)  |
| Theme    | -                                                   | themeService.ts (import line)                       |
| Catalog  | Product.java (@Document line)                       | Home.tsx (categories + branding), Navbar.tsx (logo) |

### MongoDB Collections

- **Electronics variant:** Uses collection named `electronics`
- **Toys variant:** Uses collection named `toys`

Make sure your MongoDB has data in the appropriate collection for your variant!

---

## Part 4: Common Issues and Solutions

### Issue 1: Variant doesn't compile

**Solution:** Check that all imports are correct. If you excluded a feature, make sure no other files are trying to import from it.

### Issue 2: Theme not working

**Solution:** Verify the import in `themeService.ts` is pointing to the correct config file (theme.light or theme.dark).

### Issue 3: No products showing

**Solution:** Check MongoDB - make sure you have data in the correct collection (electronics or toys).

### Issue 4: Routes not working

**Solution:** Check `App.tsx` - make sure routes for excluded features are actually removed in the generated variant.

### Issue 5: Payment methods not showing

**Solution:** Verify `getAvailablePaymentMethods()` in `Checkout.tsx` returns the correct array for your variant.

---

## Part 5: Variant Ideas

Here are some useful variant combinations:

1. **Premium Electronics Store**

   - All features enabled, all payments, light theme, electronics

2. **Budget Toys Shop**

   - Orders + Auth, credit card only, dark theme, toys

3. **Electronics Showcase**

   - No orders, no auth, no wishlist, light theme, electronics
   - Perfect for displaying products without selling

4. **Kids Toys Store**

   - Orders + Auth + Wishlist, credit card + PayPal, light theme, toys

5. **Quick Browse Electronics**
   - No orders, no auth, yes wishlist, dark theme, electronics
   - Users can browse and save favorites

---

## Part 6: Docker Setup (Already Done!)

Your project includes Docker configuration for easy deployment:

### Files Included

- `docker-compose.yml` - Orchestrates both frontend and backend
- `start.sh` / `start.bat` - One-command startup scripts
- `stop.sh` / `stop.bat` - Stop scripts
- `electronics_shop_backend/Dockerfile` - Backend container config
- `electronics_shop_frontend/Dockerfile` - Frontend container config
- `README_DOCKER.md` - Detailed Docker documentation

### How It Works

1. **Backend Container:**

   - Uses Maven to build Spring Boot JAR
   - Runs on Java 17
   - Exposes port 8080
   - Connects to MongoDB Atlas (cloud)

2. **Frontend Container:**
   - Builds React app with Vite
   - Serves with Nginx
   - Exposes port 80 (mapped to 3000)
   - Production-optimized build

### Mobioos Forge Integration

When you generate a variant, Mobioos Forge will copy all Docker files to the variant folder. This means:

✓ Each variant has its own Docker setup
✓ Each variant can run independently
✓ No conflicts between variants
✓ Easy to demonstrate different variants

### Testing Multiple Variants

**Variant 1:**

```bash
cd generated_variants/Electronics-Full-Light
./start.sh  # Windows: start.bat
# Access at http://localhost:3000
```

**Variant 2 (after stopping Variant 1):**

```bash
docker-compose down
cd ../Toys-Simple-Dark
./start.sh  # Windows: start.bat
# Access at http://localhost:3000
```

---

## Congratulations!

You now know how to create SPL variants using Mobioos Forge. You can generate as many variants as you need by mixing and matching features!

**Next Steps:**

1. Create FlagSmith project (separate implementation with runtime flags)
2. Write documentation (max 5 pages) explaining your feature model
3. Record video demonstration showing different variants
4. Prepare presentation slides

**Remember:**

- Each variant is a complete, independent application
- Use Docker for easy testing (just run `start.bat` or `./start.sh`)
- Test thoroughly before deploying
- See `README_DOCKER.md` for detailed Docker instructions
