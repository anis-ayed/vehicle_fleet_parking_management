import { Location } from '../valuesObject/Location';

export interface VehicleLocationRepository {
  saveLocation(vehicleId: string, location: Location): void;
  findLocation(vehicleId: string): Location | undefined;
}
