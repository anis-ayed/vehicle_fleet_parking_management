import { FleetRepositoryInMemory } from '../FleetRepositoryInMemory';
import { Fleet } from '../../domain/entities/Feet';
import { FleetRepository } from '../../domain/repositories/FleetRepository';

describe('FleetRepositoryInMemory', () => {
  let repository: FleetRepository;

  beforeEach(() => {
    repository = new FleetRepositoryInMemory();
  });

  it('should save and retrieve a fleet', () => {
    const fleet = new Fleet('fleet1', 'user1');

    repository.save(fleet);
    const retrievedFleet = repository.findById('fleet1');

    expect(retrievedFleet).toEqual(fleet);
  });

  it('should return undefined if fleet is not found', () => {
    const retrievedFleet = repository.findById('nonExistentFleet');

    expect(retrievedFleet).toBeUndefined();
  });

  it('should return all fleets', () => {
    const fleet1 = new Fleet('fleet1', 'user1');
    const fleet2 = new Fleet('fleet2', 'user2');

    repository.save(fleet1);
    repository.save(fleet2);

    const allFleets = repository.findAll();

    // @ts-ignore
    expect(allFleets.size).toBe(2);
  });
});
