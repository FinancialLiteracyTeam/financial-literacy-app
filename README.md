# Financial Literacy Mobile Application using Gamification

## Introduction

Financial literacy is an important skill for students and young adults because they increasingly make decisions related to spending, saving, budgeting, and credit. However, traditional financial education can be difficult to sustain because it often lacks interaction and continuous engagement. 

This repository contains a full-stack mobile-based financial learning platform that combines financial education with gamification to make learning interactive, accessible, and engaging.

## Features

- **Authentication System:** Secure JWT-based user registration and login.
- **Learning Modules:** Bite-sized educational content on Budgeting, Saving, Credit, and Investing.
- **Interactive Quizzes:** Topic-based quizzes to reinforce learning and test financial concepts.
- **Progress Tracking:** Monitors user performance, completed lessons, and quiz scores.
- **Gamification Elements:** Earn XP and level up as you complete lessons and quizzes.

## Tech Stack

### Frontend (Mobile App)
- **Framework:** React Native with Expo & Expo Router
- **Language:** TypeScript
- **State & Storage:** React Hooks, AsyncStorage
- **Styling:** React Native Stylesheets & Expo UI

### Backend (API)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs for password hashing

## Project Structure

```text
PRJ411/
├── backend/                   # Node.js/Express API
│   ├── config/                # Database and environment configurations
│   ├── models/                # Mongoose database schemas
│   ├── routes/                # Express API routes (auth, lessons, quizzes, progress)
│   ├── middleware/            # Custom middlewares (e.g., JWT verification)
│   ├── server.js              # Entry point for the backend
│   └── package.json           # Backend dependencies
│
└── financial-literacy-app/    # React Native (Expo) Frontend
    ├── src/
    │   ├── app/               # Expo Router pages and tabs
    │   ├── components/        # Reusable UI components
    │   ├── context/           # React Context (Auth State, etc.)
    │   ├── services/          # API integration services
    │   └── hooks/             # Custom React hooks
    ├── package.json           # Frontend dependencies
    └── app.json               # Expo configuration
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Expo CLI](https://expo.dev/)

### 1. Clone the repository
```bash
git clone https://github.com/FinancialLiteracyTeam/financial-literacy-app.git
cd financial-literacy-app
```

### 2. Backend Setup
1. Navigate to the `backend` directory (if in a monorepo setup):
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should now be running on http://localhost:5000*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd financial-literacy-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the backend API URL (e.g., in `src/services/api.ts` or a local `.env` file) to point to your backend API (`http://localhost:5000/api`).
4. Start the Expo app:
   ```bash
   npx expo start
   ```
5. Use the **Expo Go** app on your physical device to scan the QR code, or press `a` for Android emulator / `i` for iOS simulator.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token

### Lessons
- `GET /api/lessons` - Get all available learning modules

### Quizzes
- `GET /api/quizzes/:topicId` - Get quizzes for a specific topic
- `POST /api/quizzes/submit` - Submit quiz answers and calculate score

### Progress
- `GET /api/progress/:userId` - Get user's learning progress and XP

---
*Built for the Financial Literacy Mini Project.*
