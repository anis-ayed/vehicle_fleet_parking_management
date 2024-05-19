import { Fleet } from '../entities/Feet';
import { Vehicle } from '../entities/Vehicle';
import { Location } from '../valuesObject/Location';

describe('Fleet', () => {
  let fleet: Fleet;
  let vehicle: Vehicle;

  beforeEach(() => {
    fleet = new Fleet('fleet1', 'user1');
    vehicle = new Vehicle('vehicle1', 'ABC123');
  });

  it('should register a vehicle', () => {
    fleet.registerVehicle(vehicle);

    expect(fleet.hasVehicle('vehicle1')).toBeTruthy();
  });

  it('should not allow registering the same vehicle twice', () => {
    fleet.registerVehicle(vehicle);

    expect(() => fleet.registerVehicle(vehicle)).toThrowError(
      'Vehicle already registered in this fleet',
    );
  });

  it('should park a vehicle at a specific location', () => {
    const location: Location = new Location(45.0, 90.0);

    fleet.registerVehicle(vehicle);
    fleet.parkVehicle(vehicle, location);

    expect(fleet.isAlreadyParked(vehicle, location)).toBeTruthy();
  });

  it('should not allow parking a vehicle at the same location twice', () => {
    const location: Location = new Location(45.0, 90.0);

    fleet.registerVehicle(vehicle);
    fleet.parkVehicle(vehicle, location);

    expect(() => fleet.parkVehicle(vehicle, location)).toThrowError(
      'Vehicle already parked at this location',
    );
  });

  it('should return list of registered vehicles', () => {
    const vehicle2: Vehicle = new Vehicle('vehicle2', 'XYZ456');
    const vehicle3: Vehicle = new Vehicle('vehicle3', 'DEF789');

    fleet.registerVehicle(vehicle);
    fleet.registerVehicle(vehicle2);
    fleet.registerVehicle(vehicle3);

    const vehicles: Vehicle[] = fleet.getVehicles();

    expect(vehicles).toContainEqual(vehicle);
    expect(vehicles).toContainEqual(vehicle2);
    expect(vehicles).toContainEqual(vehicle3);
  });
});
