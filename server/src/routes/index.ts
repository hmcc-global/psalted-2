import { Router } from 'express';

import authRouter from './auth.routes';
import userRouter from './user.routes';
import groupRouter from './group.routes';
import setlistRouter from './setlist.routes';
import songRouter from './song.routes';
import songOptionRouter from './song-option.routes';

const getRoutes = (): Router => {
  const router = Router();

  router.use('/auth', authRouter);
  router.use('/users', userRouter);
  router.use('/groups', groupRouter);
  router.use('/setlists', setlistRouter);
  router.use('/songs', songRouter);
  router.use('/song-options', songOptionRouter);

  return router;
};

export { getRoutes };
