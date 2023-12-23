import { getSongOption, createSongOption } from '../controllers/song-option.controllers';
import { Router } from 'express';

const songOptionRouter = Router();

songOptionRouter.post('/create', createSongOption);
songOptionRouter.post('/get', getSongOption);

export default songOptionRouter;
