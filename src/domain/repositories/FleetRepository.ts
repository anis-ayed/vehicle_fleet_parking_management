import { Fleet } from '../entities/Feet';

export interface FleetRepository {
  save(fleet: Fleet): void;
  findById(fleetId: string): Fleet | undefined | Promise<Fleet | null>;
  findAll(): Map<string, Fleet> | Promise<Fleet[]>;
}
