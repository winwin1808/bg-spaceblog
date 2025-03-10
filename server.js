import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import spaceRoutes from './routes/spaces.js';
import postRoutes from './routes/posts.js';
import logger from './middleware/logger.js';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/posts', postRoutes);

// Error Handling
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
