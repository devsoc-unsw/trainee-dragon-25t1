import { Request, Response } from 'express';
import * as profileService from '../services/profile.services';

// retrieve - get HTTP method
async function retrieve(req: Request, res: Response) {
  try {
    const session = req.header('session');
    const profile = profileService.profileRetrieve(session as string);
    res.json(profile);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// edit - put HTTP method
async function edit(req: Request, res: Response) {
  try {
    const session = req.header('session');

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

export { retrieve, edit };
