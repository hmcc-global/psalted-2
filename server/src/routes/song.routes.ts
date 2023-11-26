import {
  createSong,
  getSong,
  getSongView,
  updateSong,
  deleteSong,
} from '../controllers/song.controllers';
import { Router } from 'express';

const songRouter = Router();

songRouter.post('/create', createSong);
songRouter.get('/get', getSong);
songRouter.get('/get-view', getSongView);
songRouter.put('/update', updateSong);
songRouter.put('/delete', deleteSong);

export default songRouter;
