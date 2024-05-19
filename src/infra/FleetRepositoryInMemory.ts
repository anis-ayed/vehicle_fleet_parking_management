import { Fleet } from '../domain/entities/Feet';
import { FleetRepository } from '../domain/repositories/FleetRepository';

export class FleetRepositoryInMemory implements FleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  save(fleet: Fleet): void {
    this.fleets.set(fleet.id, fleet);
  }

  findById(fleetId: string): Fleet | undefined {
    return this.fleets.get(fleetId);
  }

  findAll(): Map<string, Fleet> {
    return this.fleets;
  }
}
