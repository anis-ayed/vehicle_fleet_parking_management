import { Vehicle } from './Vehicle';
import { VehicleAlreadyRegisteredException } from '../../app/exceptions/VehicleAlreadyRegisteredException';
import { VehicleAlreadyParkedException } from '../../app/exceptions/VehicleAlreadyParkedException';
import { Location } from '../valuesObject/Location';

export class Fleet {
  id: string;
  userId: string;
  vehicles: Map<string, Vehicle> = new Map();
  locations: Map<string, Location>;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
    this.vehicles = new Map(); // Map of plateNumber to Vehicle
    this.locations = new Map(); // Map of plateNumber to Location
  }

  /**
   * Registers a vehicle to the fleet.
   * @param {Vehicle} vehicle - The vehicle to register.
   * @throws {Error} Will throw an error if the vehicle is already registered in the fleet.
   */
  registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.has(vehicle.id)) {
      throw new VehicleAlreadyRegisteredException(
        'Vehicle already registered in this fleet',
      );
    }
    this.vehicles.set(vehicle.id, vehicle);
  }

  /**
   * Parks a vehicle at a specific location.
   * @param {Vehicle} vehicle - The vehicle to park.
   * @param {Location} location - The location where the vehicle is parked.
   * @throws {Error} Will throw an error if the vehicle is already parked at the location.
   */
  parkVehicle(vehicle: Vehicle, location: Location): void {
    if (this.isAlreadyParked(vehicle, location)) {
      throw new VehicleAlreadyParkedException(
        'Vehicle already parked at this location',
      );
    }
    this.locations.set(vehicle.plateNumber, location);
  }

  hasVehicle(vehicleId: string): boolean {
    return this.vehicles.has(vehicleId);
  }

  getVehicles(): Vehicle[] {
    return Array.from(this.vehicles.values());
  }

  isAlreadyParked(vehicle: Vehicle, location: Location) {
    if (vehicle && location) {
      return (
        this.locations.get(vehicle.plateNumber)?.latitude ===
          location.latitude &&
        this.locations.get(vehicle.plateNumber)?.longitude ===
          location.longitude
      );
    }
    return false;
  }

  getLocationOfVehicle(plateNumber: string): Location {
    return this.locations.get(plateNumber) as Location;
  }
}
