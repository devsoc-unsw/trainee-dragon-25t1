import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import otherRoutes from './routes/other.routes';
import locationRoutes from './routes/location.routes';
import { errorMiddleware } from './middleware';
import { loadData, connectToDatabase } from './dataStore';

import { PORT } from '../config.json';

const app = express();
const port = process.env.PORT || PORT;

app.use(express.json());

dotenv.config();

async function startServer() {
  try {
    await connectToDatabase();
    await loadData();

    app.listen(port, () => {
      console.log(`Spotz server is running at http://localhost:${port}`);
    });

    // Routes & middleware
    app.use(express.json());
    app.use(cors());
    app.use('', authRoutes);
    app.use('', profileRoutes);
    app.use('', otherRoutes);
    app.use('', locationRoutes);
    app.use(errorMiddleware);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

startServer();

// closing the server
process.on('SIGINT', async () => {
  console.log('Shutting down server.');
  // dbDisconnect();
  process.exit();
});
