import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/user.model';
import { UserDocument } from '../types/user.types';
import { hashPassword } from '../utils/auth.utils';

const sendResponse = (
  res: Response,
  statusCode: number,
  payload: UserDocument[] | UserDocument | string
) => {
  return res.status(statusCode).json(payload);
};

const createUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...toCreate }: UserDocument = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      toCreate.password = await hashPassword(toCreate.password);
      const data: UserDocument = await User.create(toCreate);

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
      const data: UserDocument | null = await User.findOne({ _id: userId, isDeleted: false });

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
      const data: UserDocument[] = await User.find({ isDeleted: false });

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
      const data: UserDocument = await User.findOneAndUpdate(
        { _id: userId, isDeleted: false },
        { $set: toUpdate },
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
  const { id: userId } = req.params;

  if (userId) {
    try {
      await User.updateOne({ _id: userId, isDeleted: false }, { $set: { isDeleted: true } });
      sendResponse(res, 404, 'User successfully deleted');
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

export { createUser, getUser, updateUser, deleteUser };
