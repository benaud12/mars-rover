import { Coordinate, MarsMap } from "./MarsMap";

type Orientation = "N" | "E" | "S" | "W";
type RotateDirection = "L" | "R";
export type MoveCommand = "F" | RotateDirection;

export interface Position extends Coordinate {
  orientation: Orientation;
}

export class Robot {
  private orientations: Orientation[] = ["N", "E", "S", "W"];
  private positionLog: Position[];

  constructor(position: Position, private map: MarsMap) {
    this.positionLog = [position];
  }

  public get status(): string {
    if (this.isLost) {
      const { x, y, orientation } = this.lastPositionOnMap;
      return `(${x}, ${y}, ${orientation}) LOST`;
    }
    const { x, y, orientation } = this.position;
    return `(${x}, ${y}, ${orientation})`;
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

  public get isLost(): boolean {
    return !this.map.isCoordinateOnMap(this.position);
  }

  private get position(): Position {
    return this.positionLog[this.positionLog.length - 1];
  }

  private set position(newPosition: Position) {
    this.positionLog.push(newPosition);
  }

  private get lastPositionOnMap(): Position {
    const positionLogReversed = [...this.positionLog].reverse();
    return (
      positionLogReversed.find((position) =>
        this.map.isCoordinateOnMap(position)
      ) || this.positionLog[0]
    );
  }

  private moveForward() {
    const { x, y, orientation } = this.position;
    this.position = {
      x: orientation === "E" ? x + 1 : orientation === "W" ? x - 1 : x,
      y: orientation === "N" ? y + 1 : orientation === "S" ? y - 1 : y,
      orientation,
    };
  }

  private rotate(direction: RotateDirection) {
    const { x, y, orientation } = this.position;
    const indexShift = direction === "L" ? -1 : 1;
    const currentIndex = this.orientations.indexOf(orientation);
    const newIndex =
      (currentIndex + indexShift + this.orientations.length) %
      this.orientations.length;
    this.position = {
      x,
      y,
      orientation: this.orientations[newIndex],
    };
  }
}
