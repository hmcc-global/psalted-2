import { Router } from 'express';

import userRouter from './user.routes';
import groupRouter from './group.routes'

const getRoutes = (): Router => {
  const router = Router();

  router.use('/users', userRouter);
  router.use('/groups', groupRouter)

  return router;
};

export { getRoutes };
