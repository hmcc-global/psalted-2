import { Router } from 'express';

import userRouter from './user.routes';
import groupRouter from './group.routes';
import setlistRouter from './setlist.routes';
import songRouter from './song.routes';

const getRoutes = (): Router => {
  const router = Router();

  router.use('/users', userRouter);
  router.use('/groups', groupRouter);
  router.use('/setlist', setlistRouter);
  router.use('/songs', songRouter);

  return router;
};

export { getRoutes };