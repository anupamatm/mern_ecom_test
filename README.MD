# MERN E-commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **User Authentication**
  - User registration and login
  - JWT-based authentication
  - Protected routes

- **Product Management**
  - Browse products with filters
  - Product details and reviews
  - Search functionality

- **Shopping Experience**
  - Shopping cart functionality
  - Checkout process
  - Order history

- **Admin Dashboard**
  - Manage products
  - View and manage orders
  - User management

## 🛠 Technology Stack

### Frontend
- React.js 18
- React Router v6
- Redux Toolkit for state management
- Axios for API calls
- Tailwind CSS for styling
- React Icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Express Validator
- CORS and Helmet for security

### Development Tools
- Vite for frontend tooling
- Nodemon for development
- Postman/Insomnia for API testing
- Git for version control

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mern-ecom.git
   cd mern-ecom
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

#### Backend Server
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a `.env` file with your environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

3. Start the backend server:
   ```bash
   # Development mode with hot-reload
   npm run dev
   
   # Production mode
   npm start
   ```
   The backend will be available at `http://localhost:5000`

#### Frontend Application
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Create a `.env` file with your frontend environment variables:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

3. Start the development server:
   ```bash
   # Development server with hot-reload
   npm run dev
   
   # Build for production
   npm run build
   
   # Preview production build
   npm run preview
   ```
   The frontend will be available at `http://localhost:5173`

### Creating Admin User

To create a default admin user, run the seed script:

```bash
# From the server directory
cd server
node src/utils/seed.js
```

This will create an admin user with the following credentials:
- Email: admin@demo.com
- Password: admin123

**Important:** Change these credentials after your first login for security.

### Available Scripts

#### Backend (in server directory)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Run database seed (admin creation)
- `npm test` - Run tests
- `npm run lint` - Run ESLint

#### Frontend (in client directory)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- Node.js v18 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mern-ecom.git
   cd mern-ecom
