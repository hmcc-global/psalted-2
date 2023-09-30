import { Schema, model, models, Types } from 'mongoose';
import { UserSchema } from '../types/user.types';

const userSchema = new Schema<UserSchema>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessType: { type: String, enum: ['admin', 'normal'], default: 'normal' },
    groupIds: [{ type: Types.ObjectId, ref: 'Group' }],
    setlistIds: [{ type: Types.ObjectId, ref: 'Setlist' }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || model<UserSchema>('User', userSchema);

export { User };
