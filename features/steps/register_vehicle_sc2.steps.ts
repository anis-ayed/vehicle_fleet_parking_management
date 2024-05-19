import { FleetRepository } from '../../src/infra/FleetRepositoryInMemory';
import { Given, Then, When } from 'cucumber';
import { Fleet } from '../../src/domain/entities/Feet';
import { Vehicle } from '../../src/domain/entities/Vehicle';
import { RegisterVehicleHandler } from '../../src/app/handlers/RegisterVehicleHandler';
import { RegisterVehicleCommand } from '../../src/app/commands/RegisterVehicleCommand';

const idFleet: string = '637deb66337d08f4a447e60d';
const idVehicle: string = '637d5c036129eb8472bd1a09';
const userId: string = 'user1';
const plateNumber: string = 'ABC12341RR';

let myVehicle: Vehicle;
const fleetRepository: FleetRepository = new FleetRepository();
const registerVehicleHandler: RegisterVehicleHandler =
  new RegisterVehicleHandler(fleetRepository);
let registerVehicleCommand: RegisterVehicleCommand;
let registrationError: any;

Given('my fleet', () => {
  const myFleet: Fleet = new Fleet(idFleet, userId);
  fleetRepository.save(myFleet);
});

Given('a vehicle', () => {
  myVehicle = new Vehicle(idVehicle, plateNumber);
});

Given('I have registered this vehicle into my fleet', () => {
  registerVehicleCommand = new RegisterVehicleCommand(idFleet, myVehicle);
  registerVehicleHandler.handle(registerVehicleCommand);
});

When('I try to register this vehicle into my fleet', () => {
  try {
    registerVehicleCommand = new RegisterVehicleCommand(idFleet, myVehicle);
    registerVehicleHandler.handle(registerVehicleCommand);
  } catch (error) {
    registrationError = error;
  }
});

Then(
  'I should be informed this this vehicle has already been registered into my fleet',
  () => {
    console.assert(
      registrationError.message.includes(
        'Vehicle already registered in this fleet',
      ),
    );
  },
);
