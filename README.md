# mars-rover

A program written in [Typescript](https://www.typescriptlang.org/) which takes in commands and moves one or more robots around Mars.

## Contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Running](#running)
- [Testing](#testing)
- [TODO](#todo)

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/): version >= 12
  - npm: version >= 6

## Install

`npm install`

## Running

The program takes commands from a local `commands.txt` file in the following format:

```sh
4 8
(0, 2, N) FFLFRFF
(2, 3, E) LFRFF
```

Where the first line `4 8` specifies the size of the map and subsequent lines each represent the initial state and commands for a single robot. (0, 2, N) specifies the initial state of the form (x, y, orientation). FFLFRFF represents the sequence of movement commands for the robot.

To run the program, create a `commands.txt` file in the root of the project (or copy `commands.example.txt`) and run:

```sh
npm start
```

## Testing

Tests have been written using [Jest](https://jestjs.io/docs/en/getting-started). Run with the following command:

```sh
npm test
```

## TODO

- Add build step to compile Typescript, currently runs using `ts-node` directly
- Handle validation of input data, currently assumes everything will be given with correct format/values
- Add more robust testing around edge cases and other scenarios, currently only testing one scenario in `run` and `parseInputData`
- Add some end-to-end testing for the full program run
