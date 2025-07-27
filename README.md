# ⚽ Football Manager App

![Screenshot](https://raw.githubusercontent.com/mohamed-osama45987/football-manager/main/screenshots/football-manager.png)

This is a full-stack Football Manager web application where users can manage their own football teams, buy/sell players on a transfer market, and The system is built using a modern tech stack with focus on modularity, scalability, and developer experience.

---

## 🚀 Tech Stack

### Frontend

- React + Vite
- TypeScript
- Tailwind CSS
- ShadCN UI
- Axios for API requests
- React Hook Form + Zod for form validation
- React Router DOM
- Context API for Authentication
- Loader & toast UX feedback

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Agenda.js (for background player generation)
- Jest + Supertest (unit testing)

---

## 🧩 Features

- Login / Registration flow with hashed passwords
- Automatically generate 15–25 players on team creation
- Dashboard to view and manage your team
- Sell / unsell players with price input dialog
- Transfer Market to buy players
- Filters by player name, team, and price
- Pagination on all player lists
- Responsive UI
- Full backend unit testing per route

---

## ⚙️ Setup Instructions

### 📁 Project Structure

```
football-manager/
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── testSetup.ts
│   └── ...
├── frontend/
│   ├── src/
│   ├── vite.config.ts
│   └── ...
├── package.json         # Root script runner
└── README.md
```

### 🛠 Prerequisites

- Node.js ≥ 18.x
- MongoDB (or use Docker)
- npm (preferred)

### 🔧 Step-by-step Setup

```bash
# Clone the repo
git clone https://github.com/mohamed-osama45987/football-manager.git
cd football-manager

# Install all dependencies
npm install

# Run backend & frontend concurrently
npm run dev
```

#### ⛳ Backend

```bash
cd backend
cp .env.example .env         # Fill in MongoDB URI , JWT_SECRET and PORT

npm run dev                  # Start dev server
npm test                     # Run all unit tests
```

#### ⚛️ Frontend

```bash
cd frontend
cp .env.example .env         # Fill in VITE_API_URL
npm run dev                  # Start dev frontend
```

---

## ⏱️ Time Report

| Section                             | Time Spent |
| ----------------------------------- | ---------- |
| 🔧 Project Setup & Folder Structure | 2 hour     |
| 🔐 Auth & JWT Integration           | 0.5 hours  |
| ⚽ Team & Player Schema Design      | 2 hours    |
| 🔄 Agenda Job System                | 0.5 hour   |
| 💾 MongoDB Aggregation & Filters    | 0.5 hours  |
| 📦 Frontend Structure (Vite + TS)   | 0.5 hour   |
| 🎨 UI with ShadCN + Tailwind        | 2 hours    |
| 💬 Dialogs + React Hook Form        | 0.5 hours  |
| 🔍 Filters + Pagination             | 0.5 hours  |
| ✅ Unit Testing (Supertest + Jest)  | 0.5 hours  |
| 📄 README & Documentation           | 0.5 hour   |
| **Total**                           | **10 hrs** |

---

## 🧪 Running Tests

```bash
cd backend
npm test         # Runs all route-level unit tests

```
