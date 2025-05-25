import express from 'express';
import * as profileController from '../controllers/profile.controllers';
import { sessionMiddleware } from '../middleware';

const router = express.Router();

// Retrieve user profile and returns a user profile
router.get(
    '/profile',
    sessionMiddleware,
    profileController.retrieve
);

// Edit user profile and returns nth
router.put(
    '/profile/edit',
    sessionMiddleware,
    profileController.edit
);

//get the likes array of the user
router.get(
    '/profile/likes',
    sessionMiddleware,
    profileController.getLikes
);

//get the dislikes array of the user 
router.get(
    '/profile/dislikes',
    sessionMiddleware,
    profileController.getDislikes
);

export default router;
