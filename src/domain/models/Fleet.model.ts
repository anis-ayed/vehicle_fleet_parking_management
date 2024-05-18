import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const fleetModel = new mongoose.Schema({
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
   * @ref 'Vehicle'
   */
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    },
  ],
});
