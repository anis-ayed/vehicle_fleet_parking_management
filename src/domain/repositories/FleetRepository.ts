import { Fleet } from '../entities/Feet';

export interface FleetRepository {
  save(fleet: Fleet): void;
  findById(fleetId: string): Fleet | undefined;
  findAll(): Map<string, Fleet>;
}
