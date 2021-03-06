import { MarsMap } from "./MarsMap";

describe("MarsMap", () => {
  describe("isCoordinateOnMap", () => {
    it.each([
      [{ minX: 0, maxX: 4, minY: 0, maxY: 6 }, { x: 2, y: 3 }, true],
      [{ minX: 0, maxX: 4, minY: 0, maxY: 6 }, { x: 5, y: 3 }, false],
      [{ minX: 0, maxX: 4, minY: 0, maxY: 6 }, { x: 2, y: 7 }, false],
      [{ minX: 0, maxX: 5, minY: 0, maxY: 5 }, { x: 5, y: 5 }, true],
      [{ minX: 0, maxX: 5, minY: 0, maxY: 5 }, { x: 0, y: 0 }, true],
    ])(
      "should correctly identify if a coordinate is within the map (#%#)",
      (mapConfig, coordinate, expected) => {
        const map = new MarsMap(mapConfig);
        expect(map.isCoordinateOnMap(coordinate)).toEqual(expected);
      }
    );
  });
});
