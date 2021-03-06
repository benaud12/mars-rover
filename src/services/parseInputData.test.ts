import { parseInputData } from "./parseInputData";

describe("parseInputData", () => {
  it("should convert input data into expected map & robot config", () => {
    const inputData = "4 8\n(2, 3, N) FLLFR\n(1, 0, S) FFRLF";
    expect(parseInputData(inputData)).toEqual({
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
    });
  });
});
