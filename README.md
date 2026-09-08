# Restaurant Ordering System - Multi-Client Architecture

A full-stack restaurant ordering system with a shared Express backend serving two independent clients: a web application and a React Native mobile application.

## Overview

This project demonstrates architectural thinking around **multi-client backend design**. A single Express API powers two independent frontends, each optimized for different user workflows and business needs.

- **Web Client:** Browse menu, customize profile, order as guest or authenticated user (cash on delivery)
- **Mobile Client:** Authenticated-only ordering with dine-in support, Stripe card payment integration, and order tracking
- **Shared Backend:** Single source of truth for menu, orders, users, and payments

**Live Demo:**  
- Web: [Asian Delight](https://asian-delight.netlify.app)

**Repository:** [GitHub](https://github.com/kriti-shesh321/Restaurant-Web-App)

---

## Architecture & Design Philosophy

### Multi-Client Backend Pattern

```
┌──────────────────────────────────────────────────────┐
│           Single Express REST API                    │
│  (JWT Auth, Menu, Orders, Payments, Webhooks)        │
└────────────────────┬─────────────────────────────────┘
                     │
        ┌────────────┼─────────────┐
        │            │             │
   ┌────▼─────┐  ┌───▼─────┐  ┌────▼─────┐
   │   Web    │  │ Mobile  │  │  Future  │
   │ (React)  │  │(RN+Expo)│  │ (Admin?) │
   └────┬─────┘  └───┬─────┘  └────┬─────┘
        │            │             │
   ┌────▼────────────▼─────────────▼─────┐
   │           MySQL + Stripe            │
   └─────────────────────────────────────┘
```

### Why Two Clients?

| Aspect | Web | Mobile |
|--------|-----|--------|
| **User Base** | Guests + registered (broad reach) | Authenticated only (engaged users) |
| **Ordering** | Simple cash-on-delivery | Full payment flow (Stripe) + dine-in |
| **Features** | Profile customization, image uploads | Streamlined checkout, real-time tracking |
| **Payment** | Cash | Cash + Stripe card payment |
| **Target** | Desktop/casual browsing | Mobile-first, payment-ready |

**Key Insight:** Rather than forcing one UI to serve both needs, two lightweight clients against a shared backend is cleaner. Each client knows its own constraints and can optimize for its use case.

---

## Tech Stack

### Backend (Shared)
- **Runtime:** Node.js + Express
- **Database:** MySQL (orders, users, menu, payments)
- **Payments:** Stripe (webhooks, payment intents, verification)
- **Authentication:** JWT (SecureStore on mobile, localStorage on web)

### Web Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State:** React Context
- **HTTP:** Axios
- **Deployment:** Netlify

### Mobile Frontend
- **Framework:** React Native + Expo
- **Language:** TypeScript
- **Navigation:** Expo Router (file-based)
- **State:** TanStack Query (server state) + Zustand (cart state)
- **Secure Storage:** expo-secure-store (JWT persistence)
- **HTTP:** Axios
- **Styling:** NativeWind + StyleSheet
- **Development:** Expo Go
- **Build & Distribution:** EAS

---

## Project Structure

```
Restaurant-Web-App/
│
├── server/                            # Single Express API
│   ├── controllers/                   # Route handlers (auth, menu, orders, payments)
│   ├── models/                        # Sequelize models
│   ├── routes/
│   ├── middleware/                    # Auth handling
│   ├── config/
│   ├── migrations/                    # Database schema
│   ├── index.js
│   └── package.json
│
├── client/                            # Web Frontend (Vite + React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/                     # Menu, checkout, profile, order history
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── utils/                    
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── restaurant-mobile/                 # Mobile Frontend (Expo + React Native)
    ├── app/
    │   ├── login.tsx
    │   ├── signup.tsx
    │   ├── index.tsx
    │   ├── cart.tsx
    │   ├── checkout.tsx
    │   ├── order-success.tsx
    │   └── orders/
    │       ├── index.tsx
    │       └── [id].tsx
    │
    ├── src/
    │   ├── api/
    │   ├── auth/
    │   ├── hooks/
    │   ├── stores/
    │   └── types/
    │
    └── package.json
```

---

## Features by Client

### Web Client
✅ Browse menu (all items)  
✅ Search and filter by category  
✅ Add to cart (guest or authenticated)  
✅ Checkout with delivery address  
✅ Place order (cash on delivery)  
✅ User registration and login  
✅ Profile customization  
✅ Image uploads for profile  
✅ Order history (authenticated users)  
✅ Guest checkout (no account needed)

### Mobile Client
✅ Secure login/signup (no guest mode)  
✅ Browse menu (streamlined)  
✅ Search and filter by category  
✅ Add to cart  
✅ **Delivery and Dine-In order types**  
✅ **Complete payment flow (Stripe)**  
✅ **Order confirmation with payment status**  
✅ **Near-real-time order tracking (5-second polling)**  
✅ **Order history with tracking**  
✅ Secure JWT storage (SecureStore)

### Backend (API)
- Shared menu management
- Dual order creation (web: guest/auth + cash; mobile: auth-only + card payment)
- JWT authentication
- Payment intent creation + webhook verification
- Order status management with state machine validation
- User address management

---

## API Contracts

### Core Endpoints (Both Clients)
| Feature | Method | Route | Auth | Web | Mobile |
|---------|--------|-------|------|-----|--------|
| Menu | GET | `/api/v1/menu/online` | No | ✅ | ✅ |
| Item Detail | GET | `/api/v1/menu/:id` | No | ✅ | ✅ |
| Categories | GET | `/api/v1/menu-category` | No | ✅ | ✅ |
| Signup | POST | `/api/v1/user/signup` | No | ✅ | ✅ |
| Login | POST | `/api/v1/user/login` | No | ✅ | ✅ |

### Web-Only Endpoints
| Feature | Method | Route | Auth |
|---------|--------|-------|------|
| Profile | GET | `/api/v1/user` | Yes |
| Update Profile | PUT | `/api/v1/user` | Yes |
| Delete Account | DELETE | `/api/v1/user` | Yes |

### Mobile-Only Endpoints
| Feature | Method | Route | Auth |
|---------|--------|-------|------|
| Payment Intent | POST | `/api/v1/payment/create-intent` | Yes |
| Payment Webhook | POST | `/api/v1/payment/webhook` | Signature |

### Shared Order Endpoints (Different Payloads)
| Feature | Method | Route | Auth | 
|---------|--------|-------|------|
| Create Order | POST | `/api/v1/order` | Optional | 
| Order History | GET | `/api/v1/order` | Yes | 
| Order Detail | GET | `/api/v1/order/:id` | Yes | 
| Update Status | PATCH | `/api/v1/order/:id/status` | Staff |

---

## Key Technical Decisions

### 1. Shared Backend, Divergent Clients
**Why:** Reduces backend code duplication. Each client can evolve independently based on business needs.  
**Trade-off:** API changes must remain backward-compatible with both clients.

### 2. Client-Specific Order Payloads
**Why:** Web and mobile support different ordering workflows while using the same order endpoint.
**Implementation:** The shared order endpoint accepts a common order shape. Clients provide the fields required by their workflow, such as delivery address, table number, items, and payment method. The backend validates the order type, payment method, and required context.

Mobile card payments are initialized separately through `/api/v1/payment/create-intent` after the order is created.

### 3. Mobile: Authenticated Only
**Why:** Simplifies mobile checkout (no guest cart reconciliation). Encourages repeat usage.  
**Trade-off:** Reduces conversion if users don't want accounts.

### 4. Web: Guest + Authenticated
**Why:** Lowers friction for first-time users. Captures more orders.  
**Trade-off:** Guest orders are stored without a user association, so authenticated order history is not available for them.

### 5. Stripe Webhook Handling
**Implementation:** The backend verifies Stripe webhook signatures before processing events. Payment records are associated with Stripe PaymentIntent IDs, and PaymentIntent creation uses an idempotency key based on the order ID to avoid creating duplicate payment intents when the request is retried.

### 6. Order State Machine
**Implementation:** The backend enforces valid order-status transitions for all clients.
```
Pending → Confirmed → Preparing Order
   │          │              │
   │          │              ├──→ Ready → Served
   │          │              │
   │          │              └──→ Out for Delivery → Delivered
   │          │
   │          └──────────────→ Cancelled
   │
   └─────────────────────────→ Cancelled
```
Orders can also be cancelled from `Pending`, `Confirmed`, or `Preparing Order`.

Cash orders are created directly as `Confirmed`. Card orders start as `Pending` and move to `Confirmed` after a successful Stripe webhook.

Mobile polls the order endpoint every 5 seconds while the order is active.

---

## Setup & Deployment

### Prerequisites
- Node.js 18+
- MySQL
- Stripe account (for mobile payment processing)

### Backend
```bash
cd server
npm install

# Environment setup
cp .env.example .env
# Add: DB_URL, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

# Database
npx sequelize-cli db:migrate \
  --config config/config.cjs \
  --migrations-path migrations

# Start
npm run dev
```

### Web Frontend
```bash
cd client
npm install
npm run dev
```

### Mobile (Expo)
```bash
cd restaurant-mobile
npm install
npx expo start

# Scan QR code in Expo Go app, or run on physical device
```

### Mobile Android Build

EAS is configured for native builds.

```bash
cd restaurant-mobile

# Build an Android APK
eas build --platform android --profile preview
```

### Deployment

| Component | Platform | Status |
|-----------|----------|--------|
| Backend | Railway | ✅ Production |
| Web | Netlify | ✅ Production |
| Mobile | EAS | Android APK built with EAS and tested on a physical device against the production backend |

---

## Testing Workflows

### Web Client Flow
```
1. Signup/Login
2. Browse menu (guest or authenticated)
3. Search/filter categories
4. Add items to cart
5. Checkout
6. Enter delivery address
   - Authenticated: select/add saved address
   - Guest: provide delivery details
7. Place order (cash)
8. Confirmation
```

### Mobile Client Flow
```
1. Login (no guest mode)
2. Browse menu
3. Search/filter categories
4. Add items to cart
5. Select order type: [Delivery] or [Dine-In]
   - If Delivery: enter/select address
   - If Dine-In: enter table number
6. Payment method: [Card] or [Cash]
   - If Cash: order is created as Confirmed
   - If Card: order starts as Pending, then Stripe confirms the payment and the webhook changes the order to Confirmed
7. Place order
8. Near-real-time tracking (polls every 5s)
9. Status updates
   - Delivery: Pending → Confirmed → Preparing Order → Out for Delivery → Delivered
   - Dine-in: Pending → Confirmed → Preparing Order → Ready → Served
```

### Payment Webhook Testing with just backend APIs
```bash
# Stripe CLI for local testing
stripe listen --forward-to localhost:8000/api/v1/payment/webhook
```

---

## Future Improvements

- [ ] WebSocket support for real-time tracking (vs polling)
- [ ] Push notifications for order status
- [ ] Admin dashboard (third client) for order management
- [ ] Guest ordering support for mobile, if the product requires it
- [ ] Offline-first mobile sync
- [ ] Multi-restaurant support
- [ ] Reviews and ratings

---

## Learning Outcomes

This project taught me:

1. **Multi-client backend design** — How to structure APIs for different client needs
2. **Payment integration & security** — Stripe, webhooks, idempotency, webhook verification
3. **State management across clients** — TanStack Query + Zustand + React Context
4. **Mobile-specific patterns** — SecureStore, Expo Router, native components
5. **Production debugging** — Root-causing payment bugs, webhook issues, state inconsistencies
6. **API evolution** — Supporting multiple frontend clients against a shared backend without breaking existing flows

---

## Contact

📧 Email: kritishrivastav17@gmail.com  
🔗 LinkedIn: [Kriti Shrivastav](https://www.linkedin.com/in/kriti-shrivastav-01b52b168)  
📱 GitHub: [@kriti-shesh321](https://github.com/kriti-shesh321)

---

**Last Updated:** September 2026  
**Status:** Working MVP with divergent client architecture