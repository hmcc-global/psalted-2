import { Router } from 'express';

import userRouter from './user.routes';

const getRoutes = (): Router => {
  const router = Router();

  router.use('/users', userRouter);

  return router;
};

export { getRoutes };
