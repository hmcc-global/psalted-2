import { Request, RequestHandler, Response } from 'express';
import { Setlist, ISetlist } from '../models/setlist.model';

const sendResponse = (
  res: Response,
  statusCode: number,
  payload: ISetlist[] | ISetlist | string
) => {
  return res.status(statusCode).json(payload);
};

const createSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...toCreate }: ISetlist = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data = await Setlist.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Setlist not created');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const getSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: setlistId } = req.params;

  if (setlistId) {
    try {
      const data: ISetlist = await Setlist.findOne({ _id: setlistId }).exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Setlist not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  } else {
    try {
      const data: ISetlist[] = await Setlist.find().exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Setlists not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  }
};

const updateSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: setlistId, ...toUpdate } = req.body;

  if (setlistId && Object.keys(toUpdate).length > 0) {
    try {
      const updatedSetlist = await Setlist.findOneAndUpdate({ _id: setlistId }, toUpdate, {
        upsert: true,
        new: true,
      });

      if (updatedSetlist) {
        sendResponse(res, 200, updatedSetlist);
      } else {
        sendResponse(res, 404, 'Setlist not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const deleteSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: setlistId } = req.params;

  if (setlistId) {
    try {
      const data = await Setlist.findOneAndDelete({ _id: setlistId });

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Setlist not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

export { createSetlist, getSetlist, updateSetlist, deleteSetlist };
