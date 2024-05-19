import { ILocation } from '../../../domain/models/Location.model';
import { Location } from '../../../domain/valuesObject/Location';

export class LocationMapper {
  static toDomain(location: ILocation): Location | null {
    if (!location) return null;
    return new Location(
      location.latitude,
      location.longitude,
      location.altitude,
    );
  }
}
