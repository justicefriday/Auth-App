import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/users', userRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  // Serve index.html for all non-API routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('Server is running...'));
}

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
