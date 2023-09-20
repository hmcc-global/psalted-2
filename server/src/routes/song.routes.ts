import { createSong, getSong, updateSong, deleteSong } from '../controllers/song.controllers';
import { Router } from 'express';

const songRouter = Router();

songRouter.post('/create', createSong);
songRouter.get('/get', getSong);
songRouter.put('/update', updateSong);
songRouter.delete('/delete', deleteSong);

export default songRouter;