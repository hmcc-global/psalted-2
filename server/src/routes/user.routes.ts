import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  changePassword,
} from '../controllers/user.controllers';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.get('/get', getUser);
userRouter.put('/update', updateUser);
userRouter.put('/delete', deleteUser);
userRouter.put('/change-password', changePassword);

export default userRouter;
