import { Coordinate, MarsMap } from "./MarsMap";

export type Orientation = "N" | "E" | "S" | "W";
export type RotateDirection = "L" | "R";
export type MoveCommand = "F" | RotateDirection;

export class Robot {
  private orientations: Orientation[] = ["N", "E", "S", "W"];

  constructor(
    private position: Coordinate,
    private orientation: Orientation,
    private map: MarsMap
  ) {}

  public get status(): string {
    const { x, y } = this.position;
    return `(${x}, ${y}, ${this.orientation})`;
  }

  public move(command: MoveCommand) {
    switch (command) {
      case "F":
        this.moveForward();
        break;
      case "L":
      case "R":
        this.rotate(command);
      default:
        break;
    }
  }

  private moveForward() {
    const { x, y } = this.position;
    this.position = {
      x:
        this.orientation === "E" ? x + 1 : this.orientation === "W" ? x - 1 : x,
      y:
        this.orientation === "N" ? y + 1 : this.orientation === "S" ? y - 1 : y,
    };
  }

  private rotate(direction: RotateDirection) {
    const indexShift = direction === "L" ? -1 : 1;
    const currentIndex = this.orientations.indexOf(this.orientation);
    const newIndex =
      (currentIndex + indexShift + this.orientations.length) %
      this.orientations.length;
    this.orientation = this.orientations[newIndex];
  }
}
