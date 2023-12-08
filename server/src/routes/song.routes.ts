import {
  createSong,
  getSong,
  getSongView,
  updateSong,
  deleteSong,
  getSongOptions,
} from '../controllers/song.controllers';
import { Router } from 'express';

const songRouter = Router();

songRouter.post('/create', createSong);
songRouter.get('/get', getSong);
songRouter.get('/get-view', getSongView);
songRouter.put('/update', updateSong);
songRouter.put('/delete', deleteSong);
songRouter.get('/get-options', getSongOptions);

export default songRouter;
