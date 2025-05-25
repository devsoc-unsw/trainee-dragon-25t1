import express from 'express';
import * as profileController from '../controllers/profile.controllers';
import { sessionMiddleware } from '../middleware';

const router = express.Router();

// Retrieve user profile and returns a user profile
router.get('/profile', sessionMiddleware, profileController.retrieve);

// Edit user profile and returns nth
router.put('/profile/edit', sessionMiddleware, profileController.edit);

// Clear user history
router.delete(
  '/profile/history',
  sessionMiddleware,
  profileController.clearHistory
);

// Clear user bookmarks
router.delete(
  '/profile/bookmarks',
  sessionMiddleware,
  profileController.clearBookmarks
);

export default router;
