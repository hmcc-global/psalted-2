import { Request, RequestHandler, Response } from 'express';
import Group from '../models/group.model';
import { sendResponse } from '../helpers/utils';

const createGroup: RequestHandler = async (req: Request, res: Response) => {
  const { ...toCreate } = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data = await Group.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, { error: 'Group not created' });
      }
    } catch (error: any) {
      sendResponse(res, 500, { error: error.message });
    }
  } else {
    sendResponse(res, 400, { error: 'Missing required fields' });
  }
}

const getGroup: RequestHandler = async (req: Request, res: Response) => {}

const updateGroup: RequestHandler = async (req: Request, res: Response) => {}

const deleteGroup: RequestHandler = async (req: Request, res: Response) => {}

export { createGroup, getGroup, updateGroup, deleteGroup };
