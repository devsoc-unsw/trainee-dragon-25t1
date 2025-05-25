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

// add study spot preferences
router.post(
  '/location/studyspot/preference',
  sessionMiddleware,
  locationController.addSpotPreference
);

// gets study spot history
router.get(
  '/location/studyspot/history',
  sessionMiddleware,
  locationController.getStudySpotHistory
);

// posts study spot history
router.post(
  '/location/studyspot/visited',
  sessionMiddleware,
  locationController.saveStudySpot
)


export default router;
