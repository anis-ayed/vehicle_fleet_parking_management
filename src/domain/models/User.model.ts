import mongoose, { Model, Schema } from 'mongoose';
import { Document } from 'mongoose';
export interface IUser extends Document {
  name: string;
  fleets: any;
}
export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  fleets: {
    type: Schema.Types.ObjectId,
    ref: 'Fleet',
  },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  'User',
  userSchema,
);
