# Live Well - Building Management System

A full-featured building management system where users can view apartments, apply for rental agreements, and manage payments, while admins and members have role-based access for additional features.

## 🌐 Live Website

[Live Well](https://llive-well.netlify.app/)

---

## ✨ Features

- **User Authentication** with Firebase (Email/Password & Google Login)
- **Role-Based Dashboards**
  - **Admin**: Manage apartments, view agreement requests, manage users.
  - **Member**: View personal apartment agreements and make payments.
  - **User**: Browse apartments, apply for agreements.
- **Apartment Management**:
  - View all apartments with floor, block, rent, and availability.
  - Agreement request system with pending/accept/reject workflow.
- **Payment Integration**: Stripe integration for secure payments.
- **Coupons & Discounts**: Apply coupon codes for rent discounts.
- **Dynamic Search & Pagination** on apartment listing.
- **Responsive & Modern UI** using TailwindCSS + DaisyUI + Framer Motion animations.
- **Interactive Map** using React Leaflet.
- **Lottie Animations** for loading & error pages.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, DaisyUI, Framer Motion
- **Backend**: Node.js, Express, MongoDB (deployed on Vercel)
- **Authentication**: Firebase
- **Payments**: Stripe
- **Data Fetching**: Axios + React Query

---

## 📦 Dependencies

Key dependencies from `package.json`:

- `react`, `react-dom`, `react-router`
- `axios`, `@tanstack/react-query`
- `tailwindcss`, `daisyui`
- `firebase`, `sweetalert2`
- `stripe`, `react-stripe-js`, `stripe-js`
- `lottie-react`, `framer-motion`, `react-icons`, `recharts`, `react-leaflet`

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone <repo-url>
cd live-well-client
```
