import { FleetRepository } from '../../../domain/repositories/FleetRepository';
import { VehicleLocationRepositoryInMemory } from '../../../infra/VehicleLocationRepositoryInMemory';
import { ParkVehicleHandler } from '../ParkVehicleHandler';
import { Fleet } from '../../../domain/entities/Feet';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { ParkVehicleCommand } from '../../commands/ParkVehicleCommand';
import { Location } from '../../../domain/valuesObject/Location';
describe('ParkVehicleHandler', () => {
  let fleetRepository: FleetRepository;
  let vehicleLocationRepository: VehicleLocationRepositoryInMemory;
  let parkVehicleHandler: ParkVehicleHandler;
  let fleet: Fleet;
  let vehicle: Vehicle;

  beforeEach(() => {
    fleetRepository = {
      findById: jest.fn(),
    } as unknown as FleetRepository;
    vehicleLocationRepository = new VehicleLocationRepositoryInMemory();
    parkVehicleHandler = new ParkVehicleHandler(
      fleetRepository,
      vehicleLocationRepository,
    );
    fleet = new Fleet('fleet1', 'user1');
    vehicle = new Vehicle('vehicle1', 'ABC123');
  });

  it('should throw an error if fleet is not found', () => {
    (fleetRepository.findById as jest.Mock).mockReturnValueOnce(undefined);
    const command: ParkVehicleCommand = {
      fleetId: 'nonExistentFleet',
      vehicleId: 'vehicle1',
      location: new Location(45.0, 90.0),
    };

    expect(() => parkVehicleHandler.handle(command)).toThrow(
      'Fleet or vehicle not found',
    );
  });

  it('should throw an error if vehicle is not found in the fleet', () => {
    (fleetRepository.findById as jest.Mock).mockReturnValueOnce(fleet);
    const command: ParkVehicleCommand = {
      fleetId: 'fleet1',
      vehicleId: 'nonExistentVehicle',
      location: new Location(45.0, 90.0),
    };

    expect(() => parkVehicleHandler.handle(command)).toThrow(
      'Fleet or vehicle not found',
    );
  });

  it('should park the vehicle if fleet and vehicle are found', () => {
    (fleetRepository.findById as jest.Mock).mockReturnValueOnce(fleet);
    fleet.registerVehicle(vehicle);
    const command: ParkVehicleCommand = {
      fleetId: 'fleet1',
      vehicleId: 'vehicle1',
      location: new Location(45.0, 90.0),
    };

    parkVehicleHandler.handle(command);

    expect(fleet.getLocationOfVehicle('ABC123')).toEqual(
      new Location(45.0, 90.0),
    );
    expect(vehicleLocationRepository.findLocation('vehicle1')).toEqual(
      new Location(45.0, 90.0),
    );
  });
});
