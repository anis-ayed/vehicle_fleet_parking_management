import { VehicleLocationRepositoryInMemory } from '../VehicleLocationRepositoryInMemory';
import { Location } from '../../domain/valuesObject/Location';
describe('VehicleLocationRepositoryInMemory', () => {
  let repository: VehicleLocationRepositoryInMemory;

  beforeEach(() => {
    repository = new VehicleLocationRepositoryInMemory();
  });

  it('should save and retrieve a vehicle location', () => {
    const location = new Location(45.0, 90.0, 100);

    repository.saveLocation('vehicle1', location);
    const retrievedLocation = repository.findLocation('vehicle1');

    expect(retrievedLocation).toEqual(location);
  });

  it('should return undefined if vehicle location is not found', () => {
    const retrievedLocation = repository.findLocation('nonExistentVehicle');

    expect(retrievedLocation).toBeUndefined();
  });
});
