import { Coordinate, MarsMap } from "./MarsMap";
import { Robot, Orientation, MoveCommand } from "./Robot";

describe("Robot", () => {
  let mockMap: MarsMap;

  beforeEach(() => {
    mockMap = ({
      isCoordinateOnMap: jest.fn(),
    } as unknown) as MarsMap;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("status", () => {
    it("should give status of position & orientation", () => {
      const robot = new Robot({ x: 2, y: 1 }, "N", mockMap);
      expect(robot.status).toEqual("(2, 1, N)");
    });
  });

  describe("move", () => {
    it.each<[Coordinate, Orientation, MoveCommand, string]>([
      [{ x: 1, y: 3 }, "N", "F", "(1, 4, N)"],
      [{ x: 1, y: 3 }, "E", "F", "(2, 3, E)"],
      [{ x: 1, y: 3 }, "S", "F", "(1, 2, S)"],
      [{ x: 1, y: 3 }, "W", "F", "(0, 3, W)"],
      [{ x: 1, y: 3 }, "N", "L", "(1, 3, W)"],
      [{ x: 1, y: 3 }, "E", "L", "(1, 3, N)"],
      [{ x: 1, y: 3 }, "S", "L", "(1, 3, E)"],
      [{ x: 1, y: 3 }, "W", "L", "(1, 3, S)"],
      [{ x: 1, y: 3 }, "N", "R", "(1, 3, E)"],
      [{ x: 1, y: 3 }, "E", "R", "(1, 3, S)"],
      [{ x: 1, y: 3 }, "S", "R", "(1, 3, W)"],
      [{ x: 1, y: 3 }, "W", "R", "(1, 3, N)"],
    ])(
      "should move the robot to the expected position/orientation (#%#)",
      (position, orientation, moveCommand, expectedStatus) => {
        const robot = new Robot(position, orientation, mockMap);
        robot.move(moveCommand);
        expect(robot.status).toEqual(expectedStatus);
      }
    );
  });
});
