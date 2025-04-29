import { Request, Response } from 'express';
import * as authService from '../services/auth.services';

// register - post HTTP method
async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const auth = authService.authRegister(name, email, password);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// login - post HTTP method
async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const auth = authService.authLogin(email, password);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// logout - delete HTTP method
async function logout(req: Request, res: Response) {
  try {
    const session = req.header('session');
    const auth = authService.authLogout(session as string);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export { register, login, logout };
