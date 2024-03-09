import { Model } from "./Model";

export class City extends Model {
  private name: string;
  private knownAs: string;
  private distance: number;
  private description: string;

  constructor(name: string, knownAs: string, distance: number, description: string) {
    super("city");
    this.name = name;
    this.knownAs = knownAs;
    this.distance = distance;
    this.description = description;
  }
}