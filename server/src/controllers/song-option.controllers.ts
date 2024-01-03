import { Request, RequestHandler, Response } from 'express';
import { SongOption } from '../models/song-option.model';
import { SongOptionDocument } from '../types/song-option.types';

const sendResponse = (
  res: Response,
  statusCode: number,
  payload: SongOptionDocument[] | SongOptionDocument | string | any
) => {
  return res.status(statusCode).json(payload);
};

const createSongOption: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...toCreate } = req.body;

  if (Object.keys(toCreate).length > 0) {
    try {
      const data: SongOptionDocument = await SongOption.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Song option not created');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 400, 'Missing required fields');
  }
};

const getSongOption: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.params;

  // if there is category selected, get one category
  if (category) {
    try {
      const data: SongOptionDocument | null = await SongOption.findOne({
        category: category,
        isDeleted: false,
      });

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Song option not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    // or get all
    try {
      const data: SongOptionDocument[] = await SongOption.find({ isDeleted: false });

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Song options not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  }
};

const getSongOptionList: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data: SongOptionDocument[] = await SongOption.find({ isDeleted: false });

    if (data) {
      const result: any = {};

      for (const row of data) {
        result[row.category] = row.list;
      }

      sendResponse(res, 200, result);
    } else {
      sendResponse(res, 404, 'Song options not found');
    }
  } catch (error: any) {
    sendResponse(res, 500, error?.message);
  }
};

export { createSongOption, getSongOption, getSongOptionList };
