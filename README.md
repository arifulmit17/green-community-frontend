# 🌱 Green Community

## 📌 Project Title & One-Line Summary

**Green Community** — A full-stack platform where users share, explore, and support eco-friendly ideas through community engagement.

---

## ❗ Problem Statement

Many innovative eco-friendly ideas never reach a wider audience or fail to gain support due to the lack of a centralized platform. People who want to contribute to sustainability often struggle to:

* Share their ideas effectively
* Get community validation
* Discover impactful green initiatives
* Monetize valuable solutions

---

## 💡 Solution Overview

Green Community solves this by providing a collaborative ecosystem where users can:

* Share eco-friendly ideas
* Engage through voting and discussions
* Discover trending sustainable solutions
* Monetize premium ideas securely

It combines social interaction with sustainability, encouraging users to contribute towards a greener future.

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js
* Express.js
* TypeScript

### Database & ORM

* PostgreSQL
* Prisma ORM

### Payments

* Stripe API
* Webhooks

### Authentication

* JWT (stored in HTTP-only cookies)

### Deployment

* Vercel (Frontend)
* Vercel (Backend)

---

## 🚀 Key Features

### 🔐 Authentication & User Management

* Secure login & signup (JWT + cookies)
* Role-based access (Admin / Member)
* Admin controls (Block / Unblock users)

### 💡 Idea Management

* Create, update, and delete ideas
* View all ideas with search & filtering
* Personal dashboard (My Ideas)
* Edit ideas via modal UI

### 👍 Engagement System

* Reddit-style upvote & downvote
* Dynamic vote count
* Popularity-based sorting

### 💳 Monetization

* Paid ideas with secure checkout
* Stripe payment integration
* Webhook-based payment confirmation

### 🔍 UX Features

* Search and category filtering
* Pagination & sorting
* Fully responsive UI

---


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/arifulmit17/green-community.git
cd green-community
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

* Create `.env` file (see Environment Variables section)
* Configure database connection
* Run migrations:

```bash
npx prisma migrate dev
```

* Start server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 🌐 Live URLs

* Frontend: https://green-community-frontend.vercel.app
* Backend API: https://green-community-backend.vercel.app/

---

## 🔑 Environment Variables

### Backend (`.env`)

```
DATABASE_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLIENT_URL=
```

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
```

---

## 📌 Notes

* Ensure PostgreSQL is running locally or use a cloud DB
* Stripe webhook must be configured properly for payments
* Use `.env` files carefully (never commit them)

---

## 🌍 Final Thoughts

Green Community is more than just a platform — it’s a step toward building a collaborative, sustainable future powered by ideas and community engagement.
