import { Request, Response } from 'express';
import * as profileService from '../services/profile.services';

// retrieve - get HTTP method
async function retrieve(req: Request, res: Response) {
  try {
    const session = req.cookies.sessionId;
    const profile = profileService.profileRetrieve(session as string);
    res.json(profile);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// edit - put HTTP method
async function edit(req: Request, res: Response) {
  try {
    const session = req.cookies.sessionId;

    const {
      newBookmarks,
      removedBookmarks,
      likes,
      dislikes,
      name,
      email,
      password,
    } = req.body;

    const profile = profileService.profileEdit(
      session as string,
      newBookmarks,
      removedBookmarks,
      likes,
      dislikes,
      name,
      email,
      password
    );
    res.json(profile);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

<<<<<<< HEAD
async function getLikes(req: Request, res: Response) {
  try {
    const session = req.header('session')!;
    const likes = profileService.fetchLikes(session);
    res.json({ likes });
  }
  
  catch (err: any) {
=======
async function clearHistory(req: Request, res: Response) {
  try {
    const session = req.cookies.sessionId;
    const profile = profileService.clearHistory(session as string);
    res.json(profile);
  } catch (err: any) {
>>>>>>> 5fa8f3f167d3ddd9d9a28a28c69bc65c003cfb2d
    res.status(400).json({ error: err.message });
  }
}

<<<<<<< HEAD
async function getDislikes(req: Request, res: Response) {
  try {
    const session = req.header('session')!;
    const dislikes = profileService.fetchDislikes(session);
    res.json({ dislikes });
  }
  
  catch (err: any) {
=======
async function clearBookmarks(req: Request, res: Response) {
  try {
    const session = req.cookies.sessionId;
    const profile = profileService.clearBookmarks(session as string);
    res.json(profile);
  } catch (err: any) {
>>>>>>> 5fa8f3f167d3ddd9d9a28a28c69bc65c003cfb2d
    res.status(400).json({ error: err.message });
  }
}

<<<<<<< HEAD
export { retrieve, edit, getLikes, getDislikes };
=======
export { retrieve, edit, clearHistory, clearBookmarks };
>>>>>>> 5fa8f3f167d3ddd9d9a28a28c69bc65c003cfb2d
