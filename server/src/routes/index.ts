import { Router } from 'express';

import userRouter from './user.routes';
import setlistRouter from './setlist.routes';

const getRoutes = (): Router => {
  const router = Router();

  router.use('/users', userRouter);
  router.use('/setlist', setlistRouter)

  return router;
};

export { getRoutes };
