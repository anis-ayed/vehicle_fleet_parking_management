import { RegisterVehicleCommand } from '../commands/RegisterVehicleCommand';
import { Fleet } from '../../domain/entities/Feet';
import { FleetRepository } from '../../domain/repositories/FleetRepository';

/**
 * Handler for registering a vehicle.
 */
export class RegisterVehicleHandler {
  /**
   * Creates an instance of RegisterVehicleHandler.
   * @param {FleetRepository} fleetRepository - The repository to manage fleet data.
   */
  constructor(private readonly fleetRepository: FleetRepository) {}

  /**
   * Handles the registration of a vehicle.
   * @param {RegisterVehicleCommand} command - The command containing the information needed to register the vehicle.
   * @throws Will throw an error if the fleet is not found.
   * @returns {void}
   */
  handle(command: RegisterVehicleCommand): void {
    const fleet: Fleet | undefined = this.fleetRepository.findById(
      command.fleetId,
    ) as Fleet;
    if (!fleet) {
      throw new Error('Fleet not found');
    }
    fleet.registerVehicle(command.vehicle);
    this.fleetRepository.save(fleet);
  }
}
