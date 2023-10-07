import { Router } from 'express';

import userRouter from './user.routes';
import songRouter from './song.routes';
import groupRouter from './group.routes';
import setlistRouter from './setlist.routes';

const getRoutes = (): Router => {
  const router = Router();

  router.use('/users', userRouter);
  router.use('/songs', songRouter);
  router.use('/groups', groupRouter);
  router.use('/setlist', setlistRouter);

  return router;
};

export { getRoutes };