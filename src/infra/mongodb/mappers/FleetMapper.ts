import { IFleet } from '../../../domain/models/Fleet.model';
import { Fleet } from '../../../domain/entities/Feet';

export class FleetMapper {
  static toDomain(fleet: IFleet | null): Fleet | null {
    if (!fleet) return null;
    return new Fleet(fleet._id as string, fleet.userId.toString());
  }
}
