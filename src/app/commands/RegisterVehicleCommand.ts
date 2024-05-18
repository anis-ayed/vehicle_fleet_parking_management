import { Vehicle } from '../../domain/entities/Vehicle';

/**
 * Command to register a vehicle in a fleet.
 */
export class RegisterVehicleCommand {
  /**
   * Creates an instance of RegisterVehicleCommand.
   * @param {string} fleetId - The unique identifier of the fleet.
   * @param {Vehicle} vehicle - The object of the vehicle .
   */
  constructor(
    public readonly fleetId: string,
    public readonly vehicle: Vehicle,
  ) {}
}
