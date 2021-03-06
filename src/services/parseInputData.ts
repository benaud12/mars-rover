import { RunConfig, RobotConfig } from "../app";
import { MarsMapConfig } from "../models/MarsMap";
import { Orientation, MoveCommand } from "../models/Robot";

export function parseInputData(data: string): RunConfig {
  const [mapData, ...robotConfigsData] = data
    .split(/\n/)
    .filter((line) => line.length > 0);

  return {
    mapConfig: parseMapData(mapData),
    robotConfigs: robotConfigsData.map((robotConfigData) =>
      parseRobotConfigData(robotConfigData)
    ),
  };
}

function parseMapData(mapData: string): MarsMapConfig {
  const mapRegex = /(?<mapX>\d)\s*(?<mapY>\d)/;
  const mapMatch = mapData.match(mapRegex);
  return {
    minX: 0,
    minY: 0,
    maxX: parseInt(mapMatch?.groups?.mapX || "1", 10) - 1,
    maxY: parseInt(mapMatch?.groups?.mapY || "1", 10) - 1,
  };
}

function parseRobotConfigData(robotConfigData: string): RobotConfig {
  const robotRegex = /\((?<robotX>\d),\s*(?<robotY>\d),\s*(?<orientation>[NESW])\)\s*(?<commands>\w*)/;
  const robotMatch = robotConfigData.match(robotRegex);
  return {
    position: {
      x: parseInt(robotMatch?.groups?.robotX || "0", 10),
      y: parseInt(robotMatch?.groups?.robotY || "0", 10),
      orientation: (robotMatch?.groups?.orientation || "N") as Orientation,
    },
    commands: (robotMatch?.groups?.commands || "").split("") as MoveCommand[],
  };
}
