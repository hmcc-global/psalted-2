import { Request, RequestHandler, Response } from 'express';
import { Song } from '../models/song.model';
import { SongDocument, SongOptions } from '../types/song.types';

const sendResponse = (
  res: Response,
  statusCode: number,
  payload: SongDocument[] | SongDocument | SongOptions | string
) => {
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
    sendResponse(res, 400, 'Missing required fields');
  }
};

const getSong: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id: songId } = req.params;

  if (songId) {
    try {
      const data: SongDocument | null = await Song.findOne({
        _id: songId,
        isDeleted: false,
      }).exec();

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'Song not found');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
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

const getSongView: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...filter } = req.body;
  if (Object.keys(filter).length > 0) {
    //for future features, can share link with pre filtered songs, also needs to define req lol
  } else {
    try {
      const data: SongDocument[] = await Song.find({ isDeleted: false })
        .select(
          '_id title tempo originalKey themes artist year code lyricsPreview isVerified isDeleted createdAt updatedAt'
        )
        .exec();

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
      const updatedSong = await Song.updateOne(
        { _id: songId, isDeleted: false },
        { $set: toUpdate }
      );

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

const getSongOptions: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data: SongDocument[] = await Song.find({ isDeleted: false })
      .select('tempo themes')
      .exec();

    if (data) {
      // remove duplicates and rearrange
      const themes: string[] = [];
      const tempos: string[] = [];

      data.forEach((song) => {
        song.themes.forEach((theme) => {
          if (!themes.includes(theme)) {
            themes.push(theme);
          }
        });
        song.tempo.forEach((tempo) => {
          if (!tempos.includes(tempo)) {
            tempos.push(tempo);
          }
        });
      });

      const result = {
        themes: themes.sort(),
        tempo: tempos.sort(),
      };

      sendResponse(res, 200, result);
    } else {
      sendResponse(res, 404, 'Song options not found');
    }
  } catch (error: any) {
    sendResponse(res, 500, error?.message);
  }
};

export { createSong, getSong, getSongView, updateSong, deleteSong, getSongOptions };
