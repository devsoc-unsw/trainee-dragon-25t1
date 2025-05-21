import { Request, Response } from 'express';
import * as locationService from '../services/location.services';

// shareSpot - post HTTP method
async function recommend(req: Request, res: Response) {
  try {
    const {
      latitude,
      longitude,
      zLevel,
      seats,
      noiseLevel,
      comfortability,
      popularity,
    } = req.body;

    const location = locationService.recommendSpot(
      latitude,
      longitude,
      zLevel,
      seats,
      noiseLevel,
      comfortability,
      popularity
    );
    res.json(location);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// addSpotPreference - post HTTP method
async function addSpotPreference(req: Request, res: Response) {
  try {
    const session = req.header('session');
    const { likes, dislikes } = req.body;

    const location = locationService.addStudySpotPreference(
      session as string,
      likes,
      dislikes
    );
    res.json(location);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function saveStudySpot(req: Request, res: Response) {
  try {
    const session = req.header('session');
    const { latitude, longitude, zLevel } = req.body;

    const location = locationService.saveStudySpotHistory(
      session as string,
      latitude,
      longitude,
      zLevel
    );
    res.json(location);
  } catch (err: any) {
    res.status(400).json({ error: err.message });

  }
}

export { recommend, addSpotPreference, saveStudySpot };
