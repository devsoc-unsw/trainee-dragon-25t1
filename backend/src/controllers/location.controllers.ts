import { Request, Response } from 'express';
import * as locationService from '../services/location.services';
import { GeoSpot } from '../constants/types';


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

// gets the study spot history of a user
async function getStudySpotHistory(req: Request, res: Response) {
  try {
    const session = req.header('session')!;
    const history = locationService.getStudySpotHistory(session);
    res.json(history);
  }
  
  catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}


// posts the study spot history of a user
async function saveStudySpot(req: Request, res: Response) {
  try {
    const session = req.header('session')!;
    const { latitude, longitude, zLevel } = req.body;

    const spot: GeoSpot = {
      lngLat: { lat: latitude, lng: longitude },
      zLevel,
    };

    locationService.saveStudySpotHistory(session, spot);
    res.json({ ok: true });
  }
  
  catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}


export { recommend, addSpotPreference, saveStudySpot, getStudySpotHistory };
