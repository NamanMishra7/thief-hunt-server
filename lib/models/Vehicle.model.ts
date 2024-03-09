import { Model } from "./Model";

export class Vehicle extends Model {
  private name: string;
  private range: number;
  private count: number;

  constructor(name: string, range: number, count: number) {
    super("vehicle");
    this.name = name;
    this.range = range;
    this.count = count;
  }
}