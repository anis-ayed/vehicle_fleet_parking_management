import { VehicleLocationRepository } from '../../domain/repositories/VehicleLocationRepository';
import { IVehicle, VehicleModel } from '../../domain/models/Vehicle.model';
import { LocationMapper } from './mappers/LocationMapper';
import { Location } from '../../domain/valuesObject/Location';
import { ILocation, LocationModel } from '../../domain/models/Location.model';

export class VehicleLocationRepositoryInMongodb
  implements VehicleLocationRepository
{
  async findLocation(vehicleId: string): Promise<Location | null> {
    try {
      const vehicle: IVehicle | null = await VehicleModel.findById(vehicleId);
      return LocationMapper.toDomain(vehicle?.location as ILocation);
    } catch (error) {
      console.error('Failed to fetch a location', error);
      return null;
    }
  }

  async saveLocation(vehicleId: string, location: Location): Promise<void> {
    try {
      const locationModel: ILocation = new LocationModel(location);
      const locationSaved: ILocation = await locationModel.save();
      let vehicle: IVehicle | null = await VehicleModel.findById(vehicleId);
      if (!vehicle) {
        throw new EntityNotFoundException('Vehicle not found!');
      }
      vehicle.location = <ILocation>locationSaved._id;
      await vehicle.save();
    } catch (error) {
      console.error('Failed to save a location', error);
    }
  }
}
