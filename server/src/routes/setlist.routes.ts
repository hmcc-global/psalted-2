import {
  createSetlist,
  deleteSetlist,
  getSetlist,
  updateSetlist,
} from '../controllers/setlist.controllers';
import { Router } from 'express';

const setlistRouter = Router();

setlistRouter.post('/create', createSetlist);
setlistRouter.get('/get', getSetlist);
setlistRouter.put('/update', updateSetlist);
setlistRouter.put('/delete', deleteSetlist);

export default setlistRouter;
