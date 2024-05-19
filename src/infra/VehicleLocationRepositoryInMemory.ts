import { Location } from '../domain/valuesObject/Location';
import { VehicleLocationRepository } from '../domain/repositories/VehicleLocationRepository';

export class VehicleLocationRepositoryInMemory
  implements VehicleLocationRepository
{
  private locations: Map<string, Location> = new Map();

  findLocation(
    vehicleId: string,
  ): Location | Promise<Location | null> | null | undefined {
    return this.locations.get(vehicleId);
  }

  saveLocation(vehicleId: string, location: Location): void {
    this.locations.set(vehicleId, location);
  }
}
