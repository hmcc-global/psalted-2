import { Request, RequestHandler, Response } from 'express';
import { Song }  from '../models/song.model';
import { SongDocument } from '../types/song.types';

const sendResponse = (res: Response, statusCode: number, payload: SongDocument[] | SongDocument | string ) => {
  return res.status(statusCode).json(payload);
};

const createSong: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...toCreate } = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data: SongDocument = await Song.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Song not created');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields' );
  }
};

const getSong: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id: songId } = req.params;

    if (songId) {
      try {
        const data: SongDocument | null = await Song.findOne({ _id: songId, isDeleted: false }).exec();
  
        if (data) {
          sendResponse(res, 200, data);
        } else {
          sendResponse(res, 404, 'Song not found');
        }
      } catch (error: any) {
        sendResponse(res, 500, error?.message );
      }
    } else {
      try {
        const data: SongDocument[] = await Song.find({ isDeleted: false }).exec();
  
        if (data) {
          sendResponse(res, 200, data);
        } else {
          sendResponse(res, 404, 'Songs not found');
        }
      } catch (error: any) {
        sendResponse(res, 500, error?.message);
      }
    }
};

const updateSong: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { id: songId, ...toUpdate } = req.body;

    if (songId && Object.keys(toUpdate).length > 0) {
      try {
        const updatedSong = await Song.updateOne({ _id: songId, isDeleted: false }, { $set: toUpdate });
  
        if (updatedSong) {
          sendResponse(res, 200, 'Song updated');
        } else {
          sendResponse(res, 404, 'Song not updated');
        }
      } catch (error: any) {
        sendResponse(res, 500, error?.message);
      }
    } else {
      sendResponse(res, 400, 'Missing required fields');
    }
};

const deleteSong: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: songId } = req.params;

  if (songId) {
    try {
      await Song.updateOne({ _id: songId, isDeleted: false }, { $set: { isDeleted: true } });
      sendResponse(res, 200, 'Song successfully deleted');
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

export { createSong, getSong, updateSong, deleteSong };