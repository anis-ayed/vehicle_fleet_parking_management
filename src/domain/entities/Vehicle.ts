export class Vehicle {
  /**
   * Creates a new vehicle.
   * @param id
   * @param {string} plateNumber - The plate number of the vehicle.
   */
  constructor(
    public readonly id: string,
    public readonly plateNumber: string,
  ) {}
}
