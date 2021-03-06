import { MarsMap } from "./MarsMap";
import { Robot, MoveCommand, Position } from "./Robot";

describe("Robot", () => {
  let testMap: MarsMap;

  beforeEach(() => {
    testMap = new MarsMap({
      minX: 0,
      maxX: 9,
      minY: 0,
      maxY: 9,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("status", () => {
    it("should give status of position & orientation", () => {
      const robot = new Robot({ x: 2, y: 1, orientation: "N" }, testMap);
      expect(robot.status).toEqual("(2, 1, N)");
    });
  });

  describe("move", () => {
    it.each<[Position, MoveCommand, string]>([
      [{ x: 1, y: 3, orientation: "N" }, "F", "(1, 4, N)"],
      [{ x: 1, y: 3, orientation: "E" }, "F", "(2, 3, E)"],
      [{ x: 1, y: 3, orientation: "S" }, "F", "(1, 2, S)"],
      [{ x: 1, y: 3, orientation: "W" }, "F", "(0, 3, W)"],
      [{ x: 1, y: 3, orientation: "N" }, "L", "(1, 3, W)"],
      [{ x: 1, y: 3, orientation: "E" }, "L", "(1, 3, N)"],
      [{ x: 1, y: 3, orientation: "S" }, "L", "(1, 3, E)"],
      [{ x: 1, y: 3, orientation: "W" }, "L", "(1, 3, S)"],
      [{ x: 1, y: 3, orientation: "N" }, "R", "(1, 3, E)"],
      [{ x: 1, y: 3, orientation: "E" }, "R", "(1, 3, S)"],
      [{ x: 1, y: 3, orientation: "S" }, "R", "(1, 3, W)"],
      [{ x: 1, y: 3, orientation: "W" }, "R", "(1, 3, N)"],
    ])(
      "should move the robot to the expected position/orientation (#%#)",
      (position, moveCommand, expectedStatus) => {
        const robot = new Robot(position, testMap);
        robot.move(moveCommand);
        expect(robot.status).toEqual(expectedStatus);
      }
    );
  });

  describe("isLost", () => {
    it("should return false when current position is on map", () => {
      jest.spyOn(testMap, "isCoordinateOnMap").mockReturnValue(true);
      const position: Position = { x: 3, y: 4, orientation: "N" };
      const robot = new Robot(position, testMap);
      const result = robot.isLost;
      expect(result).toEqual(false);
      expect(testMap.isCoordinateOnMap).toHaveBeenCalledWith(position);
    });

    it("should return true when current position is not on map", () => {
      jest.spyOn(testMap, "isCoordinateOnMap").mockReturnValue(false);
      const position: Position = { x: 3, y: 4, orientation: "N" };
      const robot = new Robot(position, testMap);
      const result = robot.isLost;
      expect(result).toEqual(true);
      expect(testMap.isCoordinateOnMap).toHaveBeenCalledWith(position);
    });
  });

  describe("moves into lost position", () => {
    it("should give status of last known position when moved into lost position", () => {
      jest
        .spyOn(testMap, "isCoordinateOnMap")
        .mockImplementation((coordinate) => {
          return coordinate.y >= 0;
        });
      const robot = new Robot({ x: 0, y: 0, orientation: "S" }, testMap);
      robot.move("F");
      expect(robot.isLost).toEqual(true);
      expect(robot.status).toEqual("(0, 0, S) LOST");
    });
  });
});
