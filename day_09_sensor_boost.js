let [index, offSet] = [0, 0];

const add = (addressSet, arr) => {
  // console.log(addressSet);
  const [op1, op2] = [arr[addressSet[0]] || 0, arr[addressSet[1]] || 0];
  arr[addressSet[2]] = op1 + op2;
  index += 4;

  return arr;
};

const mul = (addressSet, arr) => {
  // console.log(addressSet);
  const [op1, op2] = [arr[addressSet[0]] || 0, arr[addressSet[1]] || 0];
  arr[addressSet[2]] = op1 * op2;
  index += 4;

  return arr;
};

const readInput = (addressSet, arr) => {
  arr[addressSet[0]] = parseInt(prompt("Enter input :"));
  index += 2;

  return arr;
};

const displayOutput = (addressSet, arr) => {
  console.log(arr[addressSet[0]] || 0);
  index += 2;

  return arr;
};

const jumpIfTrue = (addressSet, arr) => {
  index += 3;
  if ((arr[addressSet[0]] || 0) !== 0) {
    index = arr[addressSet[1]] || 0;
  }

  return arr;
};

const jumpIfFales = (addressSet, arr) => {
  index += 3;
  if ((arr[addressSet[0]] || 0) === 0) {
    index = arr[addressSet[1]] || 0;
  }

  return arr;
};

const lessThan = (addressSet, arr) => {
  const [op1, op2] = [arr[addressSet[0]] || 0, arr[addressSet[1]] || 0];
  arr[addressSet[2]] = op1 < op2 ? 1 : 0;
  index += 4;

  return arr;
};

const equals = (addressSet, arr) => {
  const [op1, op2] = [arr[addressSet[0]] || 0, arr[addressSet[1]] || 0];
  arr[addressSet[2]] = op1 === op2 ? 1 : 0;
  index += 4;

  return arr;
};

const relative = (addressSet, arr) => {
  offSet = offSet + (arr[addressSet[0]] || 0);
  index += 2;

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
  9: { execute: relative, operandsCount: 1 },
};

const MODES = {
  0: (arr, index) => arr[index],
  1: (_arr, index) => index,
  2: (arr, index) => arr[index] + offSet,
};

const extractOperand = (mode, arr, index) => MODES[mode](arr, index);

const noOfOperands = {
  1: (cmdSet, arr, index) => [extractOperand(cmdSet[2], arr, index)],
  2: (cmdSet, arr, index) => [
    extractOperand(cmdSet[2], arr, index),
    extractOperand(cmdSet[1], arr, index + 1),
    extractOperand(cmdSet[0], arr, index + 2),
  ],
};

const padCmd = (arr) => {
  const paddedCmd = (arr[index] + "").padStart(5, "0");

  return [
    +paddedCmd[0],
    +paddedCmd[1],
    +paddedCmd[2],
    +paddedCmd.slice(3),
  ];
};

const fetchIndices = (cmd, cmdSet, arr) => {
  const opCount = executor[cmd].operandsCount;
  const opSet = noOfOperands[opCount](cmdSet, arr, index + 1);

  return opSet;
};

const loopOver = (arr) => {
  while (index < arr.length && arr[index] !== 99) {
    const cmdSet = padCmd(arr);
    const cmd = cmdSet[3];
    const addressSet = fetchIndices(cmd, cmdSet, arr);
    console.log(addressSet);

    arr = [...executor[cmd].execute(addressSet, arr)];
  }
};

const sprint = (cmds) => {
  const arr = [...cmds];

  return loopOver(arr);
};

const parseCmds = (cmds) => eval(`[${cmds}]`);

sprint(parseCmds(Deno.readTextFileSync("./day_09_sensor_boost_data.txt")));
