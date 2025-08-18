import "dotenv/config.js";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { Server as IOServer } from "socket.io";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, { 
  cors: { 
    origin: [
      'http://localhost:3000',
      'https://mern-ecom-test-tp89.vercel.app',
      'https://mern-ecom-test.vercel.app'
    ],
    methods: ["GET", "POST"],
    credentials: true
  } 
});

// make io available in routes
app.set("io", io);

io.on("connection", socket => {
  socket.on("admin:join", () => socket.join("admins"));
});

connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://mern-ecom-test-tp89.vercel.app',
  'https://mern-ecom-test.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/uploads", uploadRoutes);

// static for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.get("/api/health", (req, res) => res.json({ ok: true }));
// server.listen(PORT, () => console.log(`API running on ${PORT}`));
export default server;