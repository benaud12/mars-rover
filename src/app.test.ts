import { run, RunConfig } from "./app";

describe("app", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("run", () => {
    it("should process map & robot config data and print expected output", () => {
      const config = {
        mapConfig: {
          minX: 0,
          maxX: 3,
          minY: 0,
          maxY: 7,
        },
        robotConfigs: [
          {
            position: {
              x: 2,
              y: 3,
              orientation: "N",
            },
            commands: ["F", "L", "L", "F", "R"],
          },
          {
            position: {
              x: 1,
              y: 0,
              orientation: "S",
            },
            commands: ["F", "F", "R", "L", "F"],
          },
        ],
      } as RunConfig;
      jest.spyOn(console, "log").mockImplementation(() => {});
      run(config);

      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, "(2, 3, W)");
      expect(console.log).toHaveBeenNthCalledWith(2, "(1, 0, S) LOST");
    });
  });
});
