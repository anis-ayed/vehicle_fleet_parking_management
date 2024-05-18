import { Location } from '../../domain/valuesObject/Location';

/**
 * Command to park a vehicle at a location.
 */
export class ParkVehicleCommand {
  /**
   * Creates an instance of ParkVehicleCommand.
   * @param {string} fleetId The ID of the fleet to which the vehicle belongs.
   * @param {string} vehicleId The ID of the vehicle to park.
   * @param {Location} location The location where the vehicle will be parked.
   */
  constructor(
    public readonly fleetId: string,
    public readonly vehicleId: string,
    public readonly location: Location,
  ) {}
}
