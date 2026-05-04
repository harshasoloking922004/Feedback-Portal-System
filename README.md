# Customer Feedback & Feature Request Portal

A comprehensive full-stack MERN application designed for managing customer feedback and crowdsourcing feature requests for various applications and games. 

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):** Distinct roles for standard `user` and `admin`. Admins have extended privileges to manage feedback and review feature statuses.
*   **Product Categorization:** Users can target their feedback to specific products (e.g., Games like PUBG, Free Fire, Call of Duty; Apps like WhatsApp, YouTube, Instagram).
*   **Feature Voting System:** A community-driven feature where users can upvote feature requests they want to see implemented.
*   **Admin Dashboard:** A centralized control panel for administrators to moderate feedback and update the development status of feature requests (Pending, Under Review, Implemented).
*   **Secure Authentication:** JWT-based authentication with bcrypt password hashing.

---

## 🏗️ Project Architecture

The application follows a standard client-server architecture using the **MERN** stack (MongoDB, Express.js, React, Node.js). 

### Directory Structure

```text
feedback-portal/
├── backend/               # Express.js Server & REST API
│   ├── config/            # Database connection configuration
│   ├── controllers/       # Business logic for API endpoints
│   ├── middleware/        # Custom middleware (Authentication & Roles)
│   ├── models/            # Mongoose schemas for MongoDB
│   ├── routes/            # Express route definitions
│   └── server.js          # Main application entry point
│
└── frontend/              # React.js Client Application
    ├── src/
    │   ├── components/    # Reusable UI components (Navbar, Backgrounds)
    │   ├── context/       # React Context API for global state (Auth)
    │   ├── pages/         # Top-level route components (Dashboards, Forms)
    │   ├── App.jsx        # Routing configuration
    │   └── index.css      # TailwindCSS configurations and global styles
    └── package.json       # Frontend dependencies (Vite)
```

---

## ⚙️ Backend Explained (`/backend`)

The backend is a RESTful API built with Express and connected to a MongoDB database.

### 1. Data Models (`/models`)
*   **`User.js`**: Stores user credentials, email, and role (`user` or `admin`). 
*   **`Feedback.js`**: Represents general feedback/bug reports. Contains fields for title, description, category (bug, enhancement, ui), and the `targetProduct` (e.g., WhatsApp, PUBG).
*   **`FeatureRequest.js`**: Similar to feedback but tracks community `votes` and developer `status` (pending, under_review, implemented).
*   **`Vote.js`**: A join-table schema that links a `User` to a `FeatureRequest` to ensure users can only vote once per feature.

### 2. Controllers & Routes (`/controllers`, `/routes`)
*   **Auth**: Handles user registration and login, issuing JWT tokens upon success. The *first* user to ever register is automatically granted `admin` rights.
*   **Feedback**: Handles creating new feedback, fetching lists, and allowing admins to delete inappropriate feedback.
*   **Features**: Handles creating features, fetching them (sorted by votes), updating their status (admin only), and processing user upvotes.

### 3. Middleware (`/middleware/auth.js`)
*   `protect`: Intercepts incoming requests, extracts the JWT from the `Authorization` header, decodes it, and attaches the user document to `req.user`. Blocks unauthorized requests.
*   `admin`: Ensures that `req.user.role` is set to `admin` before allowing access to destructive or managerial routes.

---

## 🎨 Frontend Explained (`/frontend`)

The frontend is a React Single Page Application (SPA) built with Vite and styled completely with TailwindCSS.

### 1. State Management (`/context/AuthContext.jsx`)
Global state is managed using React's Context API. The `AuthContext` provides:
*   The current logged-in user object (`user`).
*   `login()` and `register()` functions that interact with the backend API and store the JWT in `localStorage`.
*   A `logout()` function to clear the session.
*   Axios interceptors are set up here to automatically attach the JWT token to every outgoing API request.

### 2. Routing (`App.jsx`)
React Router DOM is used for navigation. 
*   **Protected Routes:** Custom wrapper components (`<PrivateRoute>` and `<AdminRoute>`) inspect the `AuthContext`. If a user is not logged in, or lacks admin privileges, they are redirected appropriately.

### 3. Pages (`/pages`)
*   **`SubmitFeedback.jsx`**: A unified form for submitting both general feedback and feature requests. Includes dynamic dropdowns for selecting the target Game/App.
*   **`FeedbackList.jsx` & `FeatureRequests.jsx`**: Data-display pages. The Feature Requests page handles optimistic UI updates when a user clicks the "Vote" button, providing immediate visual feedback.
*   **`AdminDashboard.jsx`**: A restricted control panel utilizing tabbed navigation to let admins view all data, change the status of features, and delete feedback.

---

## 🚀 Setup Instructions

### Prerequisites
*   Node.js installed
*   MongoDB installed locally OR a MongoDB Atlas connection string

### 1. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/feedback-portal
   JWT_SECRET=your_jwt_secret_here
   ```
4. Start the server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the client: `npm run dev`

*Note: The frontend runs on `http://localhost:5173` and proxies API requests to the backend at `http://localhost:5000` via Vite's proxy configuration.*
