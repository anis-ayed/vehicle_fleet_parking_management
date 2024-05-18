import { Fleet } from '../entities/Feet';

export interface FleetRepository {
  save(fleet: Fleet): void;
  find(fleetId: string): Fleet | undefined;
}
