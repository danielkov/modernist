import createLog from "@modernist/log";
import { Config } from "@modernist/types";

const log = createLog("modernist/cli");

const stripDash = (argument: string) => {
  return argument.replace(/^-?-/, "");
};

const isArgumentName = (candidate: string) => {
  return /^(-\w$)|(--\w+)/.test(candidate);
};

const parse = (args: string[]) => {
  log`Parsing arguments: ${args}`;
  const parsed: any = {};
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    log`Parsing argument: ${argument}`;
    if (!isArgumentName(argument)) {
      log`${argument} is not a valid name for an argument - bailing`;
      throw new Error(`Failed to parse argument: ${argument} - invalid name`);
    }
    let value;
    log`Attempting to parse name=value notation`;
    const split = argument.split("=");
    if (split[1]) {
      log`We have a name=value notation`;
      [value, value] = split;
    } else if (args[index + 1] && !isArgumentName(args[index + 1])) {
      log`argument value is in the next element - skipping it`;
      value = args[index + 1];
      index += 1;
    } else {
      log`No value associated with argument - treating it as boolean`;
      value = true;
    }
    log`Argument name is ${argument} and value is ${value}`;
    parsed[stripDash(argument)] = value;
  }
  return parsed;
};

const cli = async (config: Config) => {
  const { actions } = config;
  log`Adding argument parser configuration`;

  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const { version } = require("../package.json");
  log`Reported version: ${version}`;

  Object.entries(actions).forEach(([command, value]) => {
    const desc =
      value.description || `Generates branch ${command} of .modernistrc.js`;
    log`Start setting up options for command: ${command}`;
    log`Adding command: ${command} with description: ${desc}`;
    Object.entries(value.args || {}).forEach(([name, description]) => {
      log`Adding option: ${name} to command: ${command} with description: ${description}`;
    });
  });

  const command = process.argv[2];

  const args = parse(process.argv.slice(3));

  log`After parsing we have command: ${command} with arguments: ${args}`;

  return { command, args };
};

export default cli;
