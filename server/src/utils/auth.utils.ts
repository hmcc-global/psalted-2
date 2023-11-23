import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client, LoginTicket, TokenPayload } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const hashInput = async function (input: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(input, salt);
};

const validateInput = function (input: string, hashedInput: string): Promise<boolean> {
  return bcrypt.compare(input, hashedInput);
};

const generateRandomToken = (length: number): string => {
  return crypto.randomBytes(length || 32).toString('hex');
};

const generateJwtToken = (userId: Types.ObjectId, email: string, accessType: string): string => {
  try {
    const maxAge = 24 * 60 * 60 * 7 * 8; // token stays for 2 month (1 sec increment)
    return jwt.sign(
      {
        id: userId,
        emailAddress: email,
        accessType: accessType,
      },
      process.env.JWT_KEY as jwt.Secret,
      { expiresIn: maxAge }
    );
  } catch (error: any) {
    throw new Error('Invalid token or no authentication present');
  }
};

const verifyGoogleToken = async (client: OAuth2Client, token: string): Promise<TokenPayload> => {
  try {
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    if (payload === undefined) {
      throw new Error('Google token verification failed');
    } else {
      return payload;
    }
  } catch (error) {
    throw new Error('Google token verification failed');
  }
};

export { hashInput, validateInput, generateRandomToken, generateJwtToken, verifyGoogleToken };
