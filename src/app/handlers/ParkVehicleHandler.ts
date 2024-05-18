import { ParkVehicleCommand } from '../commands/ParkVehicleCommand';
import { Fleet } from '../../domain/entities/Feet';
import { FleetRepository } from '../../infra/FeetRepository';
import { VehicleLocationRepository } from '../../infra/VehicleLocationRepository';
import { Vehicle } from '../../domain/entities/Vehicle';

/**
 * Handler for parking a vehicle.
 */
export class ParkVehicleHandler {
  /**
   * Creates an instance of ParkVehicleHandler.
   * @param {FleetRepository} fleetRepository - The repository to manage fleet data.
   * @param {VehicleLocationRepository} vehicleLocationRepository - The repository to manage vehicle location data.
   */
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly vehicleLocationRepository: VehicleLocationRepository,
  ) {}

  /**
   * Handles the parking of a vehicle.
   * @param {ParkVehicleCommand} command - The command containing the information needed to park the vehicle.
   * @throws Will throw an error if the fleet or vehicle is not found.
   * @returns {void}
   */
  handle(command: ParkVehicleCommand): void {
    const fleet: Fleet | undefined = this.fleetRepository.find(command.fleetId);
    if (!fleet || !fleet.hasVehicle(command.vehicleId)) {
      throw new Error('Fleet or vehicle not found');
    }
    const vehicle: Vehicle | undefined = fleet
      .getVehicles()
      .find((v: Vehicle) => v.id === command.vehicleId);
    if (vehicle) {
      fleet.parkVehicle(vehicle, command.location);
      this.vehicleLocationRepository.saveLocation(
        command.vehicleId,
        command.location,
      );
    }
  }
}
