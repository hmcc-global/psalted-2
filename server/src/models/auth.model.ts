import { Schema, model, models } from 'mongoose';
import { ResetPwdTokenSchema } from '../types/auth.types';
import { PWD_RESET_TOKEN_TTL } from '../constants';

const resetPwdTokenSchema = new Schema<ResetPwdTokenSchema>({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expireAt: { type: Date, default: () => new Date(Date.now() + PWD_RESET_TOKEN_TTL) }, // defaults to expire in 1 hour after document creation
  isUsed: { type: Boolean, default: false }, // for tokens that have been used but not yet expired
});

// Expire at the specified date
resetPwdTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const ResetPwdToken =
  models.ResetPwdToken || model<ResetPwdTokenSchema>('ResetPwdToken', resetPwdTokenSchema);

export { ResetPwdToken };
