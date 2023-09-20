import { Request, RequestHandler, Response } from 'express';
import { Song, ISong }  from '../models/song.model';

const sendResponse = (res: Response, statusCode: number, payload: ISong[] | ISong | string ) => {
  return res.status(statusCode).json(payload);
};

const createSong: RequestHandler = async (req: Request, res: Response): Promise<ISong | string> => {
  const { ...toCreate } = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data = await Song.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Song not created');
      }
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields' );
  }
  return '';
};

const getSong: RequestHandler = async (req: Request, res: Response): Promise<ISong[] | ISong | string> => {
    const { id: songId } = req.params;

    if (songId) {
      try {
        const data = await Song.findOne({ _id: songId }).exec();
  
        if (data) {
          sendResponse(res, 200, data);
        } else {
          sendResponse(res, 404, 'Song not found');
        }
      } catch (error: any) {
        sendResponse(res, 500, error.message );
      }
    } else {
      try {
        const data = await Song.find().exec();
  
        if (data) {
          sendResponse(res, 200, data);
        } else {
          sendResponse(res, 404, 'Songs not found');
        }
      } catch (error: any) {
        sendResponse(res, 500, error.message);
      }
    }

    return ''
};

const updateSong: RequestHandler = async (req: Request, res: Response): Promise<ISong | string> => {
    const { id: songId, ...toUpdate } = req.body;
    console.log("song id", songId);

    if (songId && Object.keys(toUpdate).length > 0) {
      try {
        const updatedGroup = await Song.updateOne({ _id: songId }, { $set: toUpdate });
  
        if (updatedGroup) {
          sendResponse(res, 200, 'Group updated');
        } else {
          sendResponse(res, 404, 'Group not updated');
        }
      } catch (error: any) {
        sendResponse(res, 500, error.message);
      }
    } else {
      sendResponse(res, 400, 'Missing required fields');
    }

    return ''
};

const deleteSong: RequestHandler = async (req: Request, res: Response): Promise<ISong | string> => {
  const { id: songId } = req.params;
  console.log("song id delete", songId);

  if (songId) {
    try {
      const data = await Song.findOneAndDelete({ _id: songId }, { $set: { isDeleted: true } });

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

  return ''
};

export { createSong, getSong, updateSong, deleteSong };