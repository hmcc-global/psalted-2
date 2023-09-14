import { Request, RequestHandler, Response } from 'express';
import Setlist from '../models/setlist.model';

const sendResponse = (res: Response, statusCode: number, payload: any) => {
  return res.status(statusCode).json(payload);
};

const createSetlist: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { ...toCreate } = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data = await Setlist.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, { error: 'Setlist not created' });
      }
    } catch (error: any) {
      sendResponse(res, 500, { error: error.message });
    }
  } else {
    sendResponse(res, 400, { error: 'Missing required fields' });
  }
};

const getSetlist: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { id: setlistId } = req.params;
  console.log(req)
  if (setlistId) {
    try {
      const data = await Setlist.findOne({ _id: setlistId }).exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, { error: 'Setlist not found' });
      }
    } catch (error: any) {
      sendResponse(res, 500, { error: error.message });
    }
  } else {
    try {
      const data = await Setlist.find().exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, { error: 'Setlists not found' });
      }
    } catch (error: any) {
      sendResponse(res, 500, { error: error.message });
    }
  }
};

const updateSetlist: RequestHandler = async (req: Request, res: Response): Promise<any> => {
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
        sendResponse(res, 404, { error: 'Setlist not found' });
      }
    } catch (error: any) {
      sendResponse(res, 500, { error: error.message });
    }
  } else {
    sendResponse(res, 400, { error: 'Missing required fields' });
  }
};

const deleteSetlist: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { id: setlistId } = req.params;

  if (setlistId) {
    try {
      const data = await Setlist.findOneAndDelete({ _id: setlistId });

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, { error: 'Setlist not found' });
      }
    } catch (error: any) {
      sendResponse(res, 500, { error: error.message });
    }
  } else {
    sendResponse(res, 400, { error: 'Missing required fields' });
  }
};

export { createSetlist, getSetlist, updateSetlist, deleteSetlist };
