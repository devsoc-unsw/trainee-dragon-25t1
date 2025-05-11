import { Request, Response } from 'express';
import * as locationService from '../services/location.services';

// shareSpot - post HTTP method
async function shareSpot(req: Request, res: Response) {
  try {
    const {
      latitude,
      longitude,
      seats,
      noiseLevel,
      comfortability,
      popularity,
    } = req.body;

    const location = locationService.shareSpot(
      latitude,
      longitude,
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

export { shareSpot };
