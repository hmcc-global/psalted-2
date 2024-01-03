import {
  getSongOption,
  createSongOption,
  getSongOptionList,
} from '../controllers/song-option.controllers';
import { Router } from 'express';

const songOptionRouter = Router();

songOptionRouter.post('/create', createSongOption);
songOptionRouter.post('/get', getSongOption);
songOptionRouter.get('/list', getSongOptionList);

export default songOptionRouter;
