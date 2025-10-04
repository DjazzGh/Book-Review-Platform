# Book Reviews Application

This project is a full-stack application for managing book reviews, consisting of a frontend built with React and a backend built with Node.js/Express.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Frontend Structure](#frontend-structure)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [Book Routes](#book-routes)
  - [Review Routes](#review-routes)
- [Deployment Links](#deployment-links)

## Features
- User authentication (registration, login)
- Create, read, update, and delete books
- Create, read, update, and delete reviews for books

## Technologies Used

### Frontend
- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication

## Setup Instructions

### Backend Setup

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `backend` directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
    - Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., `mongodb://localhost:27017/bookreviews` for local or a MongoDB Atlas URI).
    - Replace `your_jwt_secret` with a strong, unique secret key for JWT token generation.
4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000` (or the port you specified in `.env`).

### Frontend Setup

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `frontend` directory and add the following environment variables:
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
    If your backend is running on a different URL or port, update `VITE_API_BASE_URL` accordingly.
4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will open in your browser, usually at `http://localhost:5173`.

## Frontend Structure

The frontend is a React application structured as follows:

-   `src/App.jsx`: Main application component, handles routing using `react-router-dom`.
-   `src/main.jsx`: Entry point of the React application, wraps the `App` component with `AuthProvider`.
-   `src/context/AuthContext.jsx`: Provides authentication context to the application, managing user login, signup, and logout states.
-   `src/axiosInstance.js`: Configures an Axios instance for making API requests to the backend, including handling of authentication tokens.
-   `src/components/`: Contains reusable React components such as `Navbar`, `BookCard`, `ReviewCard`, `Pagination`, and `ProtectedRoute`.
-   `src/pages/`: Contains the main views/pages of the application:
    -   `Home.jsx`: Landing page for unauthenticated users.
    -   `Signup.jsx`: User registration page.
    -   `Login.jsx`: User login page.
    -   `BookList.jsx`: Displays a list of all books.
    -   `BookDetails.jsx`: Shows details of a single book, including its reviews.
    -   `AddEditBook.jsx`: Form for adding new books or editing existing ones.

## API Documentation

The backend API is built with Express.js and follows a RESTful architecture. All API endpoints are prefixed with `/api`.

### Authentication Routes
-   `POST /api/auth/signup`: Register a new user.
    -   **Request Body:** `{ "username": "string", "email": "string", "password": "string" }`
    -   **Response:** `{ "token": "string" }`
-   `POST /api/auth/login`: Log in an existing user.
    -   **Request Body:** `{ "email": "string", "password": "string" }`
    -   **Response:** `{ "token": "string" }`

### Book Routes
-   `POST /api/books`: Add a new book. (Requires authentication)
    -   **Request Body:** `{ "title": "string", "author": "string", "description": "string", "genre": "string" }`
    -   **Response:** `{ "book": { ... } }`
-   `GET /api/books`: Get all books.
    -   **Response:** `[ { "book": { ... } }, ... ]`
-   `GET /api/books/:id`: Get a single book by ID.
    -   **Response:** `{ "book": { ... } }`
-   `PUT /api/books/:id`: Update a book by ID. (Requires authentication)
    -   **Request Body:** `{ "title": "string", "author": "string", "description": "string", "genre": "string" }`
    -   **Response:** `{ "book": { ... } }`
-   `DELETE /api/books/:id`: Delete a book by ID. (Requires authentication)
    -   **Response:** `{ "message": "Book removed" }`

### Review Routes
-   `POST /api/reviews`: Add a new review. (Requires authentication)
    -   **Request Body:** `{ "bookId": "string", "rating": "number", "comment": "string" }`
    -   **Response:** `{ "review": { ... } }`
-   `GET /api/reviews/book/:bookId`: Get all reviews for a specific book.
    -   **Response:** `[ { "review": { ... } }, ... ]`
-   `PUT /api/reviews/:id`: Update a review by ID. (Requires authentication)
    -   **Request Body:** `{ "rating": "number", "comment": "string" }`
    -   **Response:** `{ "review": { ... } }`
-   `DELETE /api/reviews/:id`: Delete a review by ID. (Requires authentication)
    -   **Response:** `{ "message": "Review removed" }`

## Deployment Links

-   **Frontend Deployment:** (https://book-review-platform-f.onrender.com)
-   **Backend API Documentation:** (https://book-review-platform-2yrc.onrender.com)