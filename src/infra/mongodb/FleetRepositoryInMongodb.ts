import { FleetRepository } from '../../domain/repositories/FleetRepository';
import { Fleet } from '../../domain/entities/Feet';
import { FleetModel, IFleet } from '../../domain/models/Fleet.model';
import { FleetMapper } from './mappers/FleetMapper';

export class FleetRepositoryInMongodb implements FleetRepository {
  async findAll(): Promise<Fleet[]> {
    try {
      const fleets: Fleet[] = [];
      const fleetDocuments: IFleet[] = await FleetModel.find();
      fleetDocuments.forEach((fleet: IFleet) => {
        fleets.push(<Fleet>FleetMapper.toDomain(fleet));
      });
      return fleets;
    } catch (error) {
      console.error('Failed to fetch a fleet', error);
      return [];
    }
  }

  async findById(fleetId: string): Promise<Fleet | null> {
    try {
      const fleetDocument: IFleet | null = await FleetModel.findById(fleetId);
      return FleetMapper.toDomain(fleetDocument);
    } catch (error) {
      console.error('Failed to fetch a fleet', error);
      return null;
    }
  }

  async save(fleet: Fleet): Promise<void> {
    try {
      const fleetModel = new FleetModel(fleet);
      await fleetModel.save();
    } catch (error) {
      console.error('Failed to save a Fleet', error);
    }
  }
}
