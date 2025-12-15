let index = 0;

const add = (operands, arr) => {
  arr[arr[index + 3]] = operands[0] + operands[1];
  index += 4;

  return arr;
};

const mul = (operands, arr) => {
  arr[arr[index + 3]] = operands[0] * operands[1];
  index += 4;

  return arr;
};

const readInput = (_operands, arr) => {
  arr[arr[index + 1]] = +prompt("Enter input :");
  index += 2;

  return arr;
};

const displayOutput = (operands, arr) => {
  console.log(operands[0]);
  index += 2;

  return arr;
};

const jumpIfTrue = (operands, arr) => {
  index += 3;

  if (operands[0] !== 0) {
    index = operands[1];
  }

  return arr;
};

const jumpIfFales = (operands, arr) => {
  index += 3;

  if (operands[0] === 0) {
    index = operands[1];
  }

  return arr;
};

const lessThan = (operands, arr) => {
  arr[arr[index + 3]] = 0;
  if (operands[0] < operands[1]) {
    arr[arr[index + 3]] = 1;
  }

  index += 4;

  return arr;
};

const equals = (operands, arr) => {
  arr[arr[index + 3]] = 0;

  if (operands[0] === operands[1]) {
    arr[arr[index + 3]] = 1;
  }

  index += 4;
  return arr;
};

const executor = {
  1: { execute: add, operandsCount: 2 },
  2: { execute: mul, operandsCount: 2 },
  3: { execute: readInput, operandsCount: 1 },
  4: { execute: displayOutput, operandsCount: 1 },
  5: { execute: jumpIfTrue, operandsCount: 2 },
  6: { execute: jumpIfFales, operandsCount: 2 },
  7: { execute: lessThan, operandsCount: 2 },
  8: { execute: equals, operandsCount: 2 },
};

const extractOperand = (mode, arr, index) => {
  if (mode === 1) {
    return arr[index];
  }

  return arr[arr[index]];
};

const noOfOperands = {
  1: (cmdSet, arr, index) => [extractOperand(cmdSet[1], arr, index)],
  2: (cmdSet, arr, index) => [
    extractOperand(cmdSet[1], arr, index),
    extractOperand(cmdSet[0], arr, index + 1),
  ],
};

const padCmd = (arr) => {
  const paddedCmd = (arr[index] + "").padStart(4, "0");

  return [+paddedCmd[0], +paddedCmd[1], +paddedCmd.slice(2)];
};

const fetchOperandDetails = (cmd, cmdSet, arr) => {
  const opCount = executor[cmd].operandsCount;
  const opSet = noOfOperands[opCount](cmdSet, arr, index + 1);

  return opSet;
};

const loopOver = (arr) => {
  while (arr[index] !== 99) {
    const cmdSet = padCmd(arr);
    const cmd = cmdSet[2];
    const opSet = fetchOperandDetails(cmd, cmdSet, arr);

    arr = [...executor[cmd].execute(opSet, arr)];
  }
};

const sprint = (cmds) => {
  const arr = [...cmds];

  return loopOver(arr);
};

const parseCmds = (cmds) => cmds.split(",").map((str) => +str);

sprint(parseCmds(Deno.readTextFileSync("./day_05_sprint_extension_data.txt")));
