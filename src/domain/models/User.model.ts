import mongoose, { Schema } from 'mongoose';

export const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fleets: {
    type: Schema.Types.ObjectId,
    ref: 'Fleet',
  },
});
