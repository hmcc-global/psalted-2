import {
  login,
  loginGoogle,
  signup,
  signupGoogle,
  forgotPassword,
  resetPassword,
  verifyToken,
} from '../controllers/auth.controllers';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/login-google', loginGoogle);
authRouter.post('/signup', signup);
authRouter.post('/signup-google', signupGoogle);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/verify-token', verifyToken);

export default authRouter;
