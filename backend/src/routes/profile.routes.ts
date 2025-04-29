import express from 'express';
import * as authController from '../controllers/profile.controllers';
// import { sessionMiddleware } from '../middleware';

const router = express.Router();

//TODO
// Retrieve user profile and returns a user profile
// router.get('/profile/:userid', profileController.retrieve);

// Edit user profile and returns nth
// router.put('/profile/:userid/edit', profileController.edit);

export default router;
