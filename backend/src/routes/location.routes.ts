import express from 'express';
import * as locationController from '../controllers/location.controllers';
import { sessionMiddleware } from '../middleware';

const router = express.Router();

// Recommend a spot
router.post(
  '/location/recommend',
  sessionMiddleware,
  locationController.recommend
);

export default router;
