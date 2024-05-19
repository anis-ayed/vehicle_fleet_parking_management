import mongoose, { Model, Schema } from 'mongoose';
import { Document } from 'mongoose';

/**
 * Represents a geographic location.
 * @interface
 */
export interface ILocation extends Document {
  latitude: number;
  longitude: number;
  altitude?: number;
}

const locationSchema = new Schema<ILocation>({
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

export const LocationModel: Model<ILocation> = mongoose.model<ILocation>(
  'Location',
  locationSchema,
);
