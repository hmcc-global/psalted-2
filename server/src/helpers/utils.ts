import { Response } from 'express';

const sendResponse = (res: Response, statusCode: number, payload: any) => {
  return res.status(statusCode).json(payload);
};

export  { sendResponse };