export class VehicleAlreadyRegisteredException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VehicleAlreadyRegisteredException';
  }
}
