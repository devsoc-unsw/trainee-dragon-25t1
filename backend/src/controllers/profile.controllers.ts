import { Request, Response } from 'express';
import * as authService from '../services/auth.services';

// retrieve - get HTTP method
async function retrieve(req: Request, res: Response) {
  try {
    // const { name, email, password } = req.body;
    // const auth = profileService.profileRetrieve(name, email, password);
    // res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// edit - put HTTP method
async function edit(req: Request, res: Response) {
  try {
    // const { email, password } = req.body;
    // const auth = profileService.profileEdit(email, password);
    // res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export { retrieve, edit };
