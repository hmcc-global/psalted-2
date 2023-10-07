import { Router } from 'express';

import authRouter from './auth.routes';
import userRouter from './user.routes';
import groupRouter from './group.routes';
import setlistRouter from './setlist.routes';

const getRoutes = (): Router => {
  const router = Router();

  router.use('/auth', authRouter);
  router.use('/users', userRouter);
  router.use('/groups', groupRouter);
  router.use('/setlist', setlistRouter);

  return router;
};

export { getRoutes };