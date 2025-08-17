# E-commerce Frontend

This is the frontend of the MERN E-commerce platform, built with React 18 and Vite.

## 🎨 Features

- Modern React with Hooks
- React Router for navigation
- Redux Toolkit for state management
- Responsive design with Tailwind CSS
- Form handling with React Hook Form
- Toast notifications for user feedback
- Protected routes and authentication flow
- Product listing and filtering
- Shopping cart functionality
- Order management
- User profile management

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Backend server (see main README for setup)

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the client directory with the following variables:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🛠 Tech Stack

- React 18
- Vite
- React Router 6
- Redux Toolkit
- React Hook Form
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast
- React Helmet Async

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
├── features/        # Feature-based modules
│   ├── auth/       # Authentication
│   ├── products/   # Product management
│   ├── cart/       # Shopping cart
│   └── orders/     # Order management
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
├── services/       # API services
├── store/          # Redux store configuration
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
