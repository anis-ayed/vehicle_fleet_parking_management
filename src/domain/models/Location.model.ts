import mongoose from 'mongoose';

export const locationModel = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  altitude: {
    type: Number,
  },
});
