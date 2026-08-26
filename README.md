# SmartMart

A React + Vite frontend built from Figma designs for a scan-and-shop
grocery app: onboarding, login, home/browse, barcode scanning, cart,
checkout (address → payment → confirmation), order history, and profile.

## Stack

- React 18
- Vite
- React Router v6
- Plain CSS (custom properties for design tokens, no framework)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. The layout is mobile-first (max width
480px, centered) and scales up gracefully on wider viewports.

## Project structure

```
src/
├── assets/icons/         Inline SVG icon set (Icon.jsx)
├── components/
│   ├── common/            Button, IconButton, StatusBadge, EmptyState,
│   │                       QuantityStepper, OrderSummary
│   ├── layout/              AppHeader, BottomNav, PageContainer
│   ├── product/               ProductCard, CategoryCard
│   ├── cart/                    CartItemCard
│   ├── checkout/                  AddressCard, PaymentMethodCard
│   ├── orders/                      OrderCard
│   └── onboarding/                    OnboardingSlide, ScannerFrame
├── pages/                One folder per screen (JSX + CSS colocated)
├── context/CartContext.jsx   Shared cart/checkout state
├── hooks/useCart.js           Convenience hook for the cart context
├── data/placeholderData.js     All mock data in one place
├── router/                       AppRouter + RootLayout (nav visibility)
└── styles/                        variables.css (tokens), global.css
```

## Notes on implementation choices

- **Cart state** lives in React Context (`CartContext`) rather than
  local component state, since it needs to persist across Home → Cart
  → Checkout → Order Placed.
- **Empty Cart** is not a separate route — it's a conditional render
  inside `ShoppingCart.jsx` when `items.length === 0`, avoiding
  duplicate cart logic.
- **Bottom nav** only renders on the three tab routes (`/home`,
  `/scan`, `/cart`); checkout, orders, and profile screens are
  full-screen flows without it, matching the Figma screens.
- **Design tokens** (`src/styles/variables.css`) hold every color,
  spacing, radius, and font-size value used in the app — update there
  to re-theme globally instead of editing individual component CSS.
- **Placeholder data** (`src/data/placeholderData.js`) is the single
  source of truth for products, categories, addresses, payment
  methods, and past orders. Swap this file for real API calls when a
  backend is available; components already consume it as props/hooks,
  not inline literals.

## Known simplifications

- Auth (`Login`) is a placeholder — submitting the form navigates
  straight to `/home` with no real validation or persistence.
- Barcode scanning is simulated with a timed state transition rather
  than a real camera/scanner integration.
- Order history contains one sample order; the "Reorder" button on
  `OrderCard` is not yet wired to cart logic.
