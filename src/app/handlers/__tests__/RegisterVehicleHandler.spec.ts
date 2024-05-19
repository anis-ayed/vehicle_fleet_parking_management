import { FleetRepository } from '../../../domain/repositories/FleetRepository';
import { RegisterVehicleHandler } from '../RegisterVehicleHandler';
import { Fleet } from '../../../domain/entities/Feet';
import { RegisterVehicleCommand } from '../../commands/RegisterVehicleCommand';
import { Vehicle } from '../../../domain/entities/Vehicle';

describe('RegisterVehicleHandler', () => {
  let fleetRepository: FleetRepository;
  let registerVehicleHandler: RegisterVehicleHandler;
  let fleet: Fleet;
  let command: RegisterVehicleCommand;

  beforeEach(() => {
    fleetRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as FleetRepository;
    registerVehicleHandler = new RegisterVehicleHandler(fleetRepository);

    fleet = new Fleet('fleet1', 'user1');
    command = {
      fleetId: 'fleet1',
      vehicle: new Vehicle('vehicle1', 'ABC123'),
    };
  });

  it('should register the vehicle if fleet is found', () => {
    (fleetRepository.findById as jest.Mock).mockReturnValueOnce(fleet);
    registerVehicleHandler.handle(command);

    expect(fleet.getVehicles()).toContain(command.vehicle);
    expect(fleetRepository.save).toHaveBeenCalledWith(fleet);
  });

  it('should throw an error if fleet is not found', () => {
    (fleetRepository.findById as jest.Mock).mockReturnValueOnce(undefined);
    expect(() => registerVehicleHandler.handle(command)).toThrow(
      'Fleet not found',
    );
    expect(fleet.getVehicles()).not.toContain(command.vehicle);
    expect(fleetRepository.save).not.toHaveBeenCalled();
  });
});
