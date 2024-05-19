import { CliController } from '../cli';
import { FleetRepositoryInMemory } from '../../../infra/FleetRepositoryInMemory';
import { VehicleLocationRepositoryInMemory } from '../../../infra/VehicleLocationRepositoryInMemory';
import { Fleet } from '../../../domain/entities/Feet';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { FleetRepository } from '../../../domain/repositories/FleetRepository';
import { VehicleLocationRepository } from '../../../domain/repositories/VehicleLocationRepository';

describe('CliController', () => {
  let cliController: CliController;
  let fleetRepository: FleetRepository;
  let vehicleLocationRepository: VehicleLocationRepository;

  beforeEach(() => {
    fleetRepository = new FleetRepositoryInMemory();
    vehicleLocationRepository = new VehicleLocationRepositoryInMemory();
    cliController = new CliController(
      fleetRepository,
      vehicleLocationRepository,
    );
  });

  it('should create a fleet', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const userId = 'user1';
    cliController.run(['node', 'cli', 'create', userId]);

    // @ts-ignore
    const savedFleet = fleetRepository.findById(
      Array.from(fleetRepository.findAll().values())[0].id,
    );
    expect(savedFleet).not.toBeUndefined();
    expect(savedFleet?.userId).toBe(userId);
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });

  it('should register a vehicle', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const fleetId = 'fleet1';
    const vehicleId = 'vehicle1';
    const plateNumber = 'ABC123';

    const fleet = new Fleet(fleetId, 'user1');
    fleetRepository.save(fleet);

    cliController.run([
      'node',
      'cli',
      'register-vehicle',
      fleetId,
      vehicleId,
      plateNumber,
    ]);

    expect(fleet.vehicles.has(vehicleId)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith('Vehicle registered successfully');
    logSpy.mockRestore();
  });

  it('should throw error if fleet not found when registering a vehicle', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const fleetId = 'nonExistentFleet';
    const vehicleId = 'vehicle1';
    const plateNumber = 'ABC123';

    expect(() => {
      cliController.run([
        'node',
        'cli',
        'register-vehicle',
        fleetId,
        vehicleId,
        plateNumber,
      ]);
    }).toThrow('Fleet not found');

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should localize a vehicle', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const fleetId = 'fleet1';
    const vehicleId = 'vehicle1';
    const lat = 45.0;
    const lng = 90.0;
    const alt = 100;

    const fleet = new Fleet(fleetId, 'user1');
    fleetRepository.save(fleet);
    fleet.vehicles.set(vehicleId, new Vehicle(vehicleId, 'ABC123'));

    cliController.run([
      'node',
      'cli',
      'localize-vehicle',
      fleetId,
      vehicleId,
      lat.toString(),
      lng.toString(),
      alt.toString(),
    ]);

    expect(fleet.locations.has('ABC123')).toBe(true);
    expect(logSpy).toHaveBeenCalledWith(
      'Vehicle location updated successfully',
    );
    logSpy.mockRestore();
  });

  it('should throw error if fleet not found when localizing a vehicle', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const fleetId = 'nonExistentFleet';
    const vehicleId = 'vehicle1';
    const lat = 45.0;
    const lng = 90.0;
    const alt = 100;

    expect(() => {
      cliController.run([
        'node',
        'cli',
        'localize-vehicle',
        fleetId,
        vehicleId,
        lat.toString(),
        lng.toString(),
        alt.toString(),
      ]);
    }).toThrow('Fleet not found');

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
