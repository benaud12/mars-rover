import { MarsMap, MarsMapConfig } from "./models/MarsMap";
import { Position, Robot, MoveCommand } from "./models/Robot";

export interface RobotConfig {
  position: Position;
  commands: MoveCommand[];
}

export interface RunConfig {
  mapConfig: MarsMapConfig;
  robotConfigs: RobotConfig[];
}

export function run(config: RunConfig) {
  const map = new MarsMap(config.mapConfig);
  config.robotConfigs.forEach(({ position, commands }) => {
    const robot = new Robot(position, map);

    let i = 0;
    while (!robot.isLost && i < commands.length) {
      robot.move(commands[i]);
      i++;
    }

    console.log(robot.status);
  });
}
