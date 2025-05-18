import express from 'express';
import * as locationController from '../controllers/location.controllers';
import { sessionMiddleware } from '../middleware';

const router = express.Router();

// Shares a spot
router.post('/location/share', sessionMiddleware, locationController.shareSpot);

export default router;
