import mongoose, { Model, Schema } from 'mongoose';
import { Document } from 'mongoose';
import { ILocation } from './Location.model';

/**
 * Represents a vehicle.
 * @interface
 */
export interface IVehicle extends Document {
  plateNumber: string;
  location: ILocation;
}
export const vehicleSchema = new Schema<IVehicle>({
  /**
   * The plate number of the vehicle.
   * @type {String}
   * @required
   * @unique
   */
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
});

/**
 * Mongoose model for the IVehicle interface.
 * @constant {Model<IVehicle>}
 */

export const VehicleModel: Model<IVehicle> = mongoose.model<IVehicle>(
  'Vehicle',
  vehicleSchema,
);
