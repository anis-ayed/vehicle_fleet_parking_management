import { FleetRepository } from '../../src/infra/FeetRepository';
import { Given, Then, When } from 'cucumber';
import { Fleet } from '../../src/domain/entities/Feet';
import { Vehicle } from '../../src/domain/entities/Vehicle';
import { RegisterVehicleHandler } from '../../src/app/handlers/RegisterVehicleHandler';
import { RegisterVehicleCommand } from '../../src/app/commands/RegisterVehicleCommand';

const idMyFleet: string = '637deb66337d08f4a447e60d';
const myUserId: string = 'user1';
const idFleetAnotherUser: string = '937deb66337d08f4a447e60a';
const anotherUserId: string = 'user2';
const idVehicle: string = '637d5c036129eb8472bd1a09';
const plateNumber: string = 'ABC12341RR';

let vehicle: Vehicle;
const fleetRepository: FleetRepository = new FleetRepository();
const registerVehicleHandler: RegisterVehicleHandler =
  new RegisterVehicleHandler(fleetRepository);
let registerVehicleCommand: RegisterVehicleCommand;

Given('my fleet', () => {
  const myFleet: Fleet = new Fleet(idMyFleet, myUserId);
  fleetRepository.save(myFleet);
});

Given('the fleet of another user', () => {
  const fleetAnotherUser: Fleet = new Fleet(idFleetAnotherUser, anotherUserId);
  fleetRepository.save(fleetAnotherUser);
});

Given('a vehicle', () => {
  vehicle = new Vehicle(idVehicle, plateNumber);
});

Given("this vehicle has been registered into the other user's fleet", () => {
  registerVehicleCommand = new RegisterVehicleCommand(
    idFleetAnotherUser,
    vehicle,
  );
  registerVehicleHandler.handle(registerVehicleCommand);
});

When('I register this vehicle into my fleet', () => {
  registerVehicleCommand = new RegisterVehicleCommand(idMyFleet, vehicle);
  registerVehicleHandler.handle(registerVehicleCommand);
});

Then('this vehicle should be part of my vehicle fleet', () => {
  const myFleet: Fleet | undefined = fleetRepository.find(idMyFleet);
  console.assert(myFleet?.hasVehicle(vehicle.id));
});
