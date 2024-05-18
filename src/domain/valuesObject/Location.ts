export class Location {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly altitude?: number,
  ) {}
}
