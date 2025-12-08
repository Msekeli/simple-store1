# Simple Store

A lightweight full-stack storefront built with a Node.js + TypeScript backend and a React (JavaScript) frontend.  
Includes clean architecture, API routing, state management, and a responsive shopping cart.

---

## Backend

Built with Node, Express, and TypeScript.

Endpoints:
- `GET /products` — list products  
- `GET /products/:id` — product details  
- `POST /cart` — add item to cart (in-memory)  
- `PATCH /cart` — update/remove item  

Features:
- JSON-based product dataset  
- Clean layered structure (domain, application, infrastructure, interfaces)  
- Modular controllers, routes, and repositories  
- CORS + JSON middleware enabled  

---

## Frontend

Built with React, JavaScript, Vite, Zustand, Tailwind, and React Router.

Features:
- Product grid with responsive layout  
- Add-to-cart with backend integration  
- Cart page with image, details, quantity controls, remove option, and total  
- Global toast notifications (success/error/info)  
- Zustand for cart and toast state  
- Clean reusable UI components  
- Fully responsive design  

---

## Running the Project

### Backend
- cd backend
- npm install
- npm run dev
### Backend
- cd frontend
- npm install
- npm run dev
