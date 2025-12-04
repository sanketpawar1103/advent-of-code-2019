const add = (operands) => operands[0] + operands[1];

const mul = (operands) => operands[0] * operands[1];

const readInput = () => +prompt("Enter input :");

const displayOutput = (operandSet) => {
  console.log(operandSet[0]);

  return operandSet[0];
};

const executor = {
  1: { execute: add, operandsCount: 3 },
  2: { execute: mul, operandsCount: 3 },
  3: { execute: readInput, operandsCount: 1 },
  4: { execute: displayOutput, operandsCount: 1 },
};

const parseCmd = (cmd) => cmd.slice(2);

const extractOperand = (mode, arr, index) => {
  if (mode === 1) {
    return arr[index];
  }

  return arr[arr[index]];
};

const noOfOperands = {
  1: (cmdSet, arr, index) => [extractOperand(cmdSet[1], arr, index)],
  3: (cmdSet, arr, index) => [
    extractOperand(cmdSet[1], arr, index),
    extractOperand(cmdSet[0], arr, index + 1),
  ],
};

const padCmd = (arr, index) => {
  const paddedCmd = (arr[index] + "").padStart(4, "0");

  return [+paddedCmd[0], +paddedCmd[1], +parseCmd(paddedCmd)];
};

const fetchOperandDetails = (cmd, cmdSet, arr, index) => {
  const opCount = executor[cmd].operandsCount;
  const opSet = noOfOperands[opCount](cmdSet, arr, index + 1);

  return { opCount, opSet };
};

const loopOver = (index, arr, location) => {
  while (index < arr.length && arr[index] !== 99) {
    const cmdSet = padCmd(arr, index);
    const cmd = cmdSet[2];

    const { opCount, opSet } = fetchOperandDetails(cmd, cmdSet, arr, index);

    arr[arr[index + opCount]] = executor[cmd].execute(opSet);
    index = index + opCount + 1;
  }

  return { index: index, location: location };
};

const sprint = (cmds) => {
  const arr = [...cmds];

  return loopOver(0, arr, 0);
};

const parseCmds = (cmds) => cmds.split(",").map((str) => +str);

sprint(parseCmds(Deno.readTextFileSync("./sprint_extension_data.txt")));
