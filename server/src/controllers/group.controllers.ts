import { Request, RequestHandler, Response } from 'express';
import { Group, IGroup } from '../models/group.model';

const sendResponse = (res: Response, statusCode: number, payload: IGroup[] | IGroup | string) => {
  return res.status(statusCode).json(payload);
};

const createGroup: RequestHandler = async (req: Request, res: Response) => {
  const { ...toCreate } = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data = await Group.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Group not created');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const getGroup: RequestHandler = async (req: Request, res: Response) => {};

const updateGroup: RequestHandler = async (req: Request, res: Response) => {};

const deleteGroup: RequestHandler = async (req: Request, res: Response) => {};

export { createGroup, getGroup, updateGroup, deleteGroup };
