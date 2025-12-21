const add = (operand1, operand2) => operand1 + operand2;

const mul = (operand1, operand2) => operand1 * operand2;

const executor = {
  1: add,
  2: mul,
};

const operands = (arr, index) => [
  arr[arr[index + 1]],
  arr[arr[index + 2]],
];

const changeValues = (arr, noun, verb) => {
  const array = [...arr];
  array[1] = noun;
  array[2] = verb;

  return array;
};

const parseCmds = (cmds) => cmds.split(",").map((str) => +str);

const loopOver = (index, arr, location) => {
  while (index < arr.length && arr[index] !== 99) {
    location = arr[index + 3];
    const [operand1, operand2] = operands(arr, index);
    arr[location] = executor[arr[index]](operand1, operand2);
    index += 4;
  }

  return { index, location };
};

const sprint = (cmds, noun = 12, verb = 2) => {
  const arr = changeValues(cmds, noun, verb);
  let [location, index] = [0, 0];

  ({ index, location } = loopOver(index, arr, location));

  return arr[location];
};

const part2 = (cmds) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      if (sprint(cmds, noun, verb) === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
};

console.log(part2(
  parseCmds(
    "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,10,23,1,23,13,27,1,6,27,31,1,9,31,35,2,10,35,39,1,39,6,43,1,6,43,47,2,13,47,51,1,51,6,55,2,6,55,59,2,59,6,63,2,63,13,67,1,5,67,71,2,9,71,75,1,5,75,79,1,5,79,83,1,83,6,87,1,87,6,91,1,91,5,95,2,10,95,99,1,5,99,103,1,10,103,107,1,107,9,111,2,111,10,115,1,115,9,119,1,13,119,123,1,123,9,127,1,5,127,131,2,13,131,135,1,9,135,139,1,2,139,143,1,13,143,0,99,2,0,14,0",
  ),
));
