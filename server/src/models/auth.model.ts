import { Schema, model, models } from 'mongoose';
import { ResetPwdTokenSchema } from '../types/auth.types';

const resetPwdTokenSchema = new Schema<ResetPwdTokenSchema>({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Number, required: true },
  isUsed: { type: Boolean, default: false },
});

const ResetPwdToken =
  models.ResetPwdToken || model<ResetPwdTokenSchema>('ResetPwdToken', resetPwdTokenSchema);

export { ResetPwdToken };
