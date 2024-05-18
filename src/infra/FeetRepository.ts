import { Fleet } from '../domain/entities/Feet';

export class FleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  save(fleet: Fleet): void {
    this.fleets.set(fleet.id, fleet);
  }

  find(fleetId: string): Fleet | undefined {
    return this.fleets.get(fleetId);
  }
}
