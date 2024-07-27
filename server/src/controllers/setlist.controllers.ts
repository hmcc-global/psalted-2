import { Request, RequestHandler, Response } from 'express';
import { Setlist } from '../models/setlist.model';
import { SetlistDocument } from '../types/setlist.types';
import { nanoid } from 'nanoid';

const sendResponse = (
  res: Response,
  statusCode: number,
  payload: SetlistDocument[] | SetlistDocument | string
) => {
  return res.status(statusCode).json(payload);
};

const createSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...toCreate }: SetlistDocument = req.body;
  const defaultUrl: string = req.protocol + '://' + req.get('host') + '/setlist/';

  if (Object.keys(toCreate).length > 0) {
    try {
      const urlSafeId = nanoid(10);

      // this is to set the default url of the public link to setlist/:id,
      // and to setlist/custom-name if the user define a custom link name
      const setlistUrl = toCreate.publicLink
        ? defaultUrl + toCreate.publicLink
        : defaultUrl + urlSafeId;

      const data: SetlistDocument = await Setlist.create({
        ...toCreate,
        publicLink: setlistUrl,
      });

      if (data) {
        sendResponse(res, 200, 'Setlist created');
      } else {
        sendResponse(res, 404, 'Setlist not created');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const getSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: setlistId } = req.query;
  
  if (setlistId) {
    try {
      const data: SetlistDocument = await Setlist.findOne({
        _id: setlistId,
        isDeleted: false,
      }).exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Setlist not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    try {
      const data: SetlistDocument[] = await Setlist.find({ isDeleted: false }).exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Setlists not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  }
};

const updateSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: setlistId, ...toUpdate } = req.body;

  if (setlistId && Object.keys(toUpdate).length > 0) {
    try {
      const updatedSetlist = await Setlist.updateOne(
        { _id: setlistId, isDeleted: false },
        toUpdate,
        {
          upsert: true,
          new: true,
        }
      );

      if (updatedSetlist) {
        sendResponse(res, 200, 'Setlist updated');
      } else {
        sendResponse(res, 404, 'Setlist not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const deleteSetlist: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: setlistId } = req.params;

  if (setlistId) {
    try {
      const data = await Setlist.updateOne(
        { _id: setlistId, isDeleted: false },
        { isDeleted: true }
      );

      if (data) {
        sendResponse(res, 200, 'Setlist deleted');
      } else {
        sendResponse(res, 404, 'Setlist not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

export { createSetlist, getSetlist, updateSetlist, deleteSetlist };
