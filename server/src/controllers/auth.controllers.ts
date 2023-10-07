import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/user.model';
import { UserSchema, UserDocument } from '../types/user.types';
import {
  hashPassword,
  validatePassword,
  generateJwtToken,
  verifyGoogleToken,
} from '../utils/auth.utils';
import { CredentialsSchema, GooglePayloadSchema } from '#/types/auth.types';
import { OAuth2Client } from 'google-auth-library';

const sendResponse = (
  res: Response,
  statusCode: number,
  payload: UserDocument[] | UserDocument | GooglePayloadSchema | string
) => {
  return res.status(statusCode).json(payload);
};

const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const credentials: CredentialsSchema = req.body;

  if (Object.keys(credentials).length > 0 && credentials.email && credentials.password) {
    try {
      const userRecord: UserDocument | null = await User.findOne({
        email: credentials.email.toLowerCase(),
      });

      if (userRecord && (await validatePassword(credentials.password, userRecord.password))) {
        const token = await generateJwtToken(
          userRecord._id,
          userRecord.email,
          userRecord.accessType
        );

        sendResponse(res, 200, token);
      } else {
        sendResponse(res, 401, 'Invalid login credentials');
      }
    } catch (error: any) {
      sendResponse(res, 500, error?.message);
    }
  } else {
    sendResponse(res, 422, 'Missing required fields');
  }
};

const loginGoogle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { tokenId } = req.body;

  if (tokenId) {
    const client: OAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
      const data = await verifyGoogleToken(client, tokenId);

      if (data && data.email && data.name) {
        const { email } = data;

        const userRecord = await User.findOne({ email: email.toLowerCase() });

        if (userRecord && userRecord.password !== '') {
          const token = await generateJwtToken(
            userRecord._id,
            userRecord.email,
            userRecord.accessType
          );

          sendResponse(res, 200, token);
        } else {
          sendResponse(res, 401, 'The provided email address is not registered');
        }
      }
    } catch {
      sendResponse(res, 500, 'Google token verification failed');
    }
  } else {
    sendResponse(res, 422, 'Missing Token ID');
  }
};

const signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { ...toCreate }: UserSchema = req.body;

  if (Object.keys(toCreate).length > 0 && toCreate.password && toCreate.email) {
    try {
      toCreate.email = toCreate.email.toLowerCase();
      toCreate.password = await hashPassword(toCreate.password);
      const data: UserDocument = await User.create(toCreate);

      if (data) {
        sendResponse(res, 200, data);
      } else {
        sendResponse(res, 404, 'New user account was created successfully');
      }
    } catch (error: any) {
      if (error?.name === 'ValidationError') {
        sendResponse(res, 422, 'Missing required fields');
      } else if (error?.code === 11000) {
        sendResponse(res, 409, 'The provided email address is already in use');
      } else {
        sendResponse(res, 500, error?.message);
      }
    }
  } else {
    sendResponse(res, 422, 'Missing required fields');
  }
};

const signupGoogle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { tokenId } = req.body;

  if (tokenId) {
    const client: OAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
      const data = await verifyGoogleToken(client, tokenId);

      if (data && data.email && data.name) {
        const { email, name: fullName } = data;
        const newEmail = email.toLowerCase();

        const userRecord = await User.findOne({ email: newEmail });

        if (userRecord) {
          sendResponse(res, 409, 'The provided email address is already in use');
        }

        const payload = { email: newEmail, fullName: fullName };

        sendResponse(res, 200, payload);
      }
    } catch {
      sendResponse(res, 500, 'Google token verification failed');
    }
  } else {
    sendResponse(res, 422, 'Missing Token ID');
  }
};

export { login, loginGoogle, signup, signupGoogle };
