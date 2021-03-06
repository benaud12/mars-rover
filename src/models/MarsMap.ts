interface MarsMapConfig {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface Coordinate {
  x: number;
  y: number;
}

export class MarsMap {
  private minX: number;
  private maxX: number;
  private minY: number;
  private maxY: number;

  constructor({ minX, maxX, minY, maxY }: MarsMapConfig) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }

  public isCoordinateOnMap({ x, y }: Coordinate): boolean {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }
}
