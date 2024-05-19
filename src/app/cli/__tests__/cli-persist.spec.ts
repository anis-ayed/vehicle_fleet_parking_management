import { CliController } from '../cli';
import { Fleet } from '../../../domain/entities/Feet';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { FleetRepository } from '../../../domain/repositories/FleetRepository';
import { VehicleLocationRepository } from '../../../domain/repositories/VehicleLocationRepository';
import { FleetRepositoryInMongodb } from '../../../infra/mongodb/FleetRepositoryInMongodb';
import { VehicleLocationRepositoryInMongodb } from '../../../infra/mongodb/VehicleLocationRepositoryInMongodb';
import { Database } from '../../../infra/db/Database';
import { IUser, UserModel } from '../../../domain/models/User.model';
import { User } from '../../../domain/entities/User';

describe('CliController', () => {
  let cliController: CliController;
  let fleetRepository: FleetRepository;
  let vehicleLocationRepository: VehicleLocationRepository;
  const db = new Database();
  const user: IUser = new UserModel({ name: 'user1', fleets: null });
  let savedUser: IUser;

  beforeEach(async () => {
    fleetRepository = new FleetRepositoryInMongodb();
    vehicleLocationRepository = new VehicleLocationRepositoryInMongodb();
    cliController = new CliController(
      fleetRepository,
      vehicleLocationRepository,
    );
    savedUser = await user.save();
  });
  afterAll(async () => db.disconnect());

  it('should create a fleet', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const userId = savedUser._id as string;
    cliController.run(['node', 'cli', 'create', userId]);

    const allFleet: Fleet[] = (await fleetRepository.findAll()) as Fleet[];
    const savedFleet: Fleet = fleetRepository.findById(allFleet[0].id) as Fleet;
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
