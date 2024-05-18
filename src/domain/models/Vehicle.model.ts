import mongoose from 'mongoose';

export const vehicleModel = new mongoose.Schema({
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
});
