import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/user.model';
import { UserMongoType } from '../types/user.types';

const sendResponse = (
  res: Response,
  statusCode: number,
  payload: UserMongoType[] | UserMongoType | string
) => {
  return res.status(statusCode).json(payload);
};

const createUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...toCreate }: UserMongoType = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data: UserMongoType = await User.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'User not created');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const getUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;

  if (userId) {
    try {
      const data: UserMongoType = await User.findOne({ _id: userId, isDeleted: false }).exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'User not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    try {
      const data: UserMongoType[] = await User.find({ isDeleted: false }).exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Users not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  }
};

const updateUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: userId, ...toUpdate } = req.body;

  if (userId && Object.keys(toUpdate).length > 0) {
    try {
      const data: UserMongoType = await User.findOneAndUpdate(
        { _id: userId, isDeleted: false },
        toUpdate,
        {
          upsert: true,
          new: true,
        }
      );

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'User not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const deleteUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.body;

  if (userId) {
    try {
      const data: UserMongoType | null = await User.findOneAndUpdate(
        { _id: userId, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'User not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

export { createUser, getUser, updateUser, deleteUser };
