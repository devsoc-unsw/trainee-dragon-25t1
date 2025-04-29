import { Request, Response } from 'express';
import * as profileService from '../services/profile.services';

// retrieve - get HTTP method
async function retrieve(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const profile = profileService.profileRetrieve(email);
    res.json(profile);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// edit - put HTTP method
async function edit(req: Request, res: Response) {
  try {
    const { email, name, password, bookmarks, likes } = req.body;
    const profile = profileService.profileEdit(
      email,
      name,
      password,
      bookmarks,
      likes
    );
    res.json(profile);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export { retrieve, edit };
