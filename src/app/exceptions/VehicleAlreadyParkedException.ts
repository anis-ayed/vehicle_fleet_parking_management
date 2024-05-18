export class VehicleAlreadyParkedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VehicleAlreadyParkedException';
  }
}
