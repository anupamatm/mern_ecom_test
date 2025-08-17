# MERN E-commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform provides a complete online shopping experience with user authentication, product management, and order processing capabilities.

## 🚀 Features

### User Authentication
- User registration and login
- JWT-based authentication with refresh tokens
- Protected routes and role-based access control
- Secure password hashing with bcrypt

### Product Catalog
- Browse products with advanced filtering
- Product search with autocomplete
- Product categories and tags
- Responsive product grid and list views

### Shopping Experience
- Shopping cart with local storage persistence
- Secure checkout process
- Order tracking and history
- Product reviews and ratings

### Admin Dashboard
- **Product Management**
  - Add, edit, and delete products
  - Bulk product upload
  - Inventory management

- **Order Management**
  - View and filter orders
  - Update order status (Pending → Processing → Delivered)
  - Order analytics and statistics
  - Date-based order filtering

- **User Management**
  - View registered users
  - User role management
  - Activity monitoring

- **Analytics Dashboard**
  - Sales statistics
  - Product performance metrics
  - Order status overview

## 🛠 Technology Stack

### Frontend
- React.js 18 with Hooks
- React Router v6 for navigation
- Context API for state management
- Axios for API calls
- Custom CSS with modern layout techniques (Flexbox/Grid)
- React Icons for vector icons
- Responsive design for all devices

### Backend
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT for stateless authentication
- Bcrypt for password hashing
- Express Validator for request validation
- CORS, Helmet, and Rate Limiting for security
- File upload handling
- Error handling middleware

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anupamatm/mern_ecom_test.git
   cd mern-ecom
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. Start the development servers:
   ```bash
   # From the root directory
   # Start backend
   cd server
   npm run dev
   
   # In a new terminal, start frontend
   cd ../client
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Admin Access

To access the admin dashboard:
1. Visit the admin login page: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
2. Use the following default admin credentials (make sure to change these in production):
   - **Email**: admin@example.com
   - **Password**: admin123

> **Note**: For security reasons, it's highly recommended to change the default admin credentials after your first login.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any inquiries, please open an issue on GitHub.
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
