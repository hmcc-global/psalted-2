import { Router } from 'express';

import userRouter from './user.routes';
import songRouter from './song.routes';

const getRoutes = (): Router => {
  const router = Router();

  router.use('/users', userRouter);
  router.use('/songs', songRouter);

  return router;
};

export { getRoutes };
