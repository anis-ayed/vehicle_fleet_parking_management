import * as mongoose from 'mongoose';
import { Model, Schema, Types } from 'mongoose';
import { IVehicle } from './Vehicle.model';
import { Location } from '../valuesObject/Location';
import { Document } from 'mongoose';

/**
 * Represents a fleet of vehicles.
 * @interface
 * @extends Document
 */
export interface IFleet extends Document {
  /** The user ID associated with the fleet. */
  userId: Types.ObjectId;
  /** An array of vehicles in the fleet. */
  vehicles: IVehicle[];
  locations: Location[];
}

const fleetSchema = new Schema<IFleet>({
  /**
   * The user ID associated with the fleet.
   * @type {Schema.Types.ObjectId}
   * @ref 'User'
   * @required
   */
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  /**
   * An array of vehicle references.
   * @type {Array<Object>}
   * @ref 'Vehicle'
   */
  vehicles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
  ],

  /**
   * An array of locations references.
   * @type {Array<Object>}
   * @ref 'Location'
   */
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    },
  ],
});

export const FleetModel: Model<IFleet> = mongoose.model<IFleet>(
  'Fleet',
  fleetSchema,
);
