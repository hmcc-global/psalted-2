import { login, loginGoogle, signup, signupGoogle } from '../controllers/auth.controllers';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/login-google', loginGoogle);
authRouter.post('/signup', signup);
authRouter.post('/signup-google', signupGoogle);

export default authRouter;
