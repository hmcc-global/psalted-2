import { createUser, deleteUser, getUser, updateUser } from '../controllers/user.controllers';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.get('/get', getUser);
userRouter.put('/update', updateUser);
userRouter.delete('/delete', deleteUser);

export default userRouter;
