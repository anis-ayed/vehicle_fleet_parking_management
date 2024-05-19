import { Vehicle } from '../entities/Vehicle';

describe('Vehicle', () => {
  it('should create a new vehicle with provided properties', () => {
    const vehicle = new Vehicle('vehicle1', 'ABC123');

    expect(vehicle.id).toBe('vehicle1');
    expect(vehicle.plateNumber).toBe('ABC123');
  });
});
