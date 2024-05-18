import { Location } from '../domain/valuesObject/Location';

export class VehicleLocationRepository {
  private locations: Map<string, Location> = new Map();

  saveLocation(vehicleId: string, location: Location): void {
    this.locations.set(vehicleId, location);
  }

  findLocation(vehicleId: string): Location | undefined {
    return this.locations.get(vehicleId);
  }
}
