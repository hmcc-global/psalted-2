import { Request, RequestHandler, Response } from 'express';
import { Group, IGroup } from '../models/group.model';

const sendResponse = (res: Response, statusCode: number, payload: IGroup[] | IGroup | string) => {
  return res.status(statusCode).json(payload);
};

const createGroup: RequestHandler = async (req: Request, res: Response) => {
  const { ...toCreate } = req.body;

  // Check if any fields are present. MongoDB will throw an error
  // if no fields are present or if a required field is missing
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
  }
  sendResponse(res, 400, 'Missing required fields');
};

const getGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id: groupId } = req.params;

  // Get group by id
  if (groupId) {
    try {
      const data = await Group.findOne({ _id: groupId });

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Group not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  }
  // If no id, get all groups
  try {
    const data = await Group.find();

    if (data) {
      sendResponse(res, 200, data);
    } else {
      sendResponse(res, 404, 'Users not found');
    }
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};

const updateGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id: groupId, ...toUpdate } = req.body;

  // Update group by id with fields to update
  if (groupId && Object.keys(toUpdate).length > 0) {
    try {
      const updatedGroup = await Group.updateOne({ _id: groupId }, { $set: toUpdate });

      if (updatedGroup) {
        sendResponse(res, 200, 'Group updated');
      } else {
        sendResponse(res, 404, 'Group not updated');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  }
  sendResponse(res, 400, 'Missing required fields');
};

const deleteGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id: groupId } = req.params;

  // Soft delete group by id
  if (groupId) {
    try {
      await Group.updateOne({ _id: groupId }, { $set: { isDeleted: true } });

      sendResponse(res, 200, 'Group deleted');
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  }
  sendResponse(res, 400, 'Missing required fields');
};

export { createGroup, getGroup, updateGroup, deleteGroup };
