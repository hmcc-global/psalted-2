import {
  login,
  loginGoogle,
  signup,
  signupGoogle,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controllers';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/login-google', loginGoogle);
authRouter.post('/signup', signup);
authRouter.post('/signup-google', signupGoogle);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

export default authRouter;
