import { Command } from 'commander';
import { VehicleLocationRepositoryInMemory } from '../../infra/VehicleLocationRepositoryInMemory';
import { RegisterVehicleHandler } from '../handlers/RegisterVehicleHandler';
import { Vehicle } from '../../domain/entities/Vehicle';
import { Location } from '../../domain/valuesObject/Location';
import { RegisterVehicleCommand } from '../commands/RegisterVehicleCommand';
import { ParkVehicleHandler } from '../handlers/ParkVehicleHandler';
import { ParkVehicleCommand } from '../commands/ParkVehicleCommand';
import { Fleet } from '../../domain/entities/Feet';
import { FleetRepositoryInMemory } from '../../infra/FleetRepositoryInMemory';
import { FleetRepository } from '../../domain/repositories/FleetRepository';
import { VehicleLocationRepository } from '../../domain/repositories/VehicleLocationRepository';
import { v4 } from 'uuid';

function filterArgs(args: string[]): string[] {
  const allowedArgs = ['create', 'register-vehicle', 'localize-vehicle'];
  return args.filter(arg => {
    return allowedArgs.includes(arg) || !arg.startsWith('--');
  });
}

export class CliController {
  private program: Command;
  private readonly fleetRepository: FleetRepository;
  private readonly vehicleLocationRepository: VehicleLocationRepository;

  constructor(
    fleetRepository: FleetRepository,
    vehicleLocationRepository: VehicleLocationRepository,
  ) {
    this.program = new Command();
    this.fleetRepository = fleetRepository;
    this.vehicleLocationRepository = vehicleLocationRepository;
    this.initializeCommands();
  }

  private initializeCommands() {
    this.program.command('create <userId>').action(this.createFleet.bind(this));
    this.program
      .command('register-vehicle <fleetId> <vehicleId> <plateNumber>')
      .action(this.registerVehicle.bind(this));
    this.program
      .command('localize-vehicle <fleetId> <vehicleId> <lat> <lng> [alt]')
      .action(this.localizeVehicle.bind(this));
  }

  private createFleet(userId: string) {
    const fleet: Fleet = new Fleet(v4(), userId);
    this.fleetRepository.save(fleet);
    console.log(fleet.id);
  }

  private registerVehicle(
    fleetId: string,
    vehicleId: string,
    plateNumber: string,
  ) {
    const fleet = this.fleetRepository.findById(fleetId);
    if (!fleet) {
      throw new Error('Fleet not found');
    }
    const registerVehicleHandler: RegisterVehicleHandler =
      new RegisterVehicleHandler(this.fleetRepository);
    const vehicle: Vehicle = new Vehicle(vehicleId, plateNumber);
    const command: RegisterVehicleCommand = new RegisterVehicleCommand(
      fleetId,
      vehicle,
    );
    registerVehicleHandler.handle(command);
    console.log('Vehicle registered successfully');
  }

  private localizeVehicle(
    fleetId: string,
    vehicleId: string,
    lat: number,
    lng: number,
    alt?: number,
  ) {
    const fleet = this.fleetRepository.findById(fleetId);
    if (!fleet) {
      throw new Error('Fleet not found');
    }
    const parkVehicleHandler: ParkVehicleHandler = new ParkVehicleHandler(
      this.fleetRepository,
      this.vehicleLocationRepository,
    );
    const location: Location = new Location(lat, lng, alt);
    const command: ParkVehicleCommand = new ParkVehicleCommand(
      fleetId,
      vehicleId,
      location,
    );
    parkVehicleHandler.handle(command);
    console.log('Vehicle location updated successfully');
  }

  public run(args: string[]) {
    const filteredArgs = filterArgs(args);
    this.program.parse(filteredArgs);
  }
}

/*
const fleetRepository: FleetRepository = new FleetRepositoryInMemory();
const vehicleLocationRepository: VehicleLocationRepository = new VehicleLocationRepositoryInMemory();
const cliController: CliController = new CliController(fleetRepository, vehicleLocationRepository);
cliController.run(process.argv);
*/
