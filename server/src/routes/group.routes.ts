import { createGroup, getGroup, updateGroup, deleteGroup } from '../controllers/group.controllers';
import { Router } from 'express';

const groupRouter = Router();

groupRouter.post('/create', createGroup);
groupRouter.get('/get', getGroup);
groupRouter.put('/update', updateGroup);
groupRouter.put('/delete', deleteGroup);

export default groupRouter;
