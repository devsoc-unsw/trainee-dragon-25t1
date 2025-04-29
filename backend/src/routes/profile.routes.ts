import express from 'express';
import * as profileController from '../controllers/profile.controllers';
import { sessionMiddleware } from '../middleware';

const router = express.Router();

// Retrieve user profile and returns a user profile
router.get('/profile', profileController.retrieve);

// Edit user profile and returns nth
router.put('/profile/edit', sessionMiddleware, profileController.edit);

export default router;
