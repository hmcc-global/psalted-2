import { Schema, model, models, Types } from 'mongoose';

interface IUser {
  fullName: string;
  email: string;
  password: string;
  accessType: string;
  groupIds: Types.Array<Types.ObjectId>;
  setlistIds: Types.Array<Types.ObjectId>;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessType: { type: String },
  groupIds: [{ type: Types.ObjectId, ref: 'Group' }],
  setlistIds: [{ type: Types.ObjectId, ref: 'Setlist' }],
}, {
  timestamps: true,
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
