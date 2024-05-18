#!/usr/bin/env ts-node
import { Command } from 'commander';
import { FleetRepository } from '../../infra/FeetRepository';
import { VehicleLocationRepository } from '../../infra/VehicleLocationRepository';
import { Fleet } from '../../domain/entities/Feet';
import { RegisterVehicleHandler } from '../handlers/RegisterVehicleHandler';
import { RegisterVehicleCommand } from '../commands/RegisterVehicleCommand';
import { ParkVehicleHandler } from '../handlers/ParkVehicleHandler';
import { ParkVehicleCommand } from '../commands/ParkVehicleCommand';
import { Location } from '../../domain/valuesObject/Location';
import { Vehicle } from '../../domain/entities/Vehicle';

const program: Command = new Command();
const fleetRepository: FleetRepository = new FleetRepository();
const vehicleLocationRepository: VehicleLocationRepository =
  new VehicleLocationRepository();

program.command('create <userId>').action((userId: string) => {
  const fleet: Fleet = new Fleet(`${Math.random()}`, userId);
  fleetRepository.save(fleet);
  console.log(fleet.id);
});

program
  .command('register-vehicle <fleetId> <vehicleId> <plateNumber>')
  .action((fleetId: string, vehicleId: string, plateNumber: string) => {
    const registerVehicleHandler: RegisterVehicleHandler =
      new RegisterVehicleHandler(fleetRepository);
    const vehicle: Vehicle = new Vehicle(vehicleId, plateNumber);
    const command: RegisterVehicleCommand = new RegisterVehicleCommand(
      fleetId,
      vehicle,
    );
    registerVehicleHandler.handle(command);
    console.log('Vehicle registered successfully');
  });

program
  .command('localize-vehicle <fleetId> <vehicleId> <lat> <lng> [alt]')
  .action(
    (
      fleetId: string,
      vehicleId: string,
      lat: number,
      lng: number,
      alt?: number,
    ) => {
      const parkVehicleHandler: ParkVehicleHandler = new ParkVehicleHandler(
        fleetRepository,
        vehicleLocationRepository,
      );
      const location: Location = new Location(lat, lng, alt);
      const command: ParkVehicleCommand = new ParkVehicleCommand(
        fleetId,
        vehicleId,
        location,
      );
      parkVehicleHandler.handle(command);
      console.log('Vehicle location updated successfully');
    },
  );

program.parse(process.argv);
