let counter = 0;

const toRight = (dialPointer, move) => {
  counter += Math.floor((dialPointer + move) / 100);

  return (dialPointer + move) % 100;
};

const toLeft = (dialPointer, move) => {
  counter += Math.floor((dialPointer - 1) / 100) -
    Math.floor((dialPointer - move - 1) / 100);

  return ((dialPointer - move) % 100 + 100) % 100;
};

const directions = { L: toLeft, R: toRight };

const main = (ip) => {
  let dialPointer = 50;

  for (const instruction of ip) {
    const [dir, move] = [instruction[0], parseInt(instruction.slice(1))];
    dialPointer = directions[dir](dialPointer, move);
  }

  console.log(counter);
};

const parseInput = (str) => str.split("\n");

main(parseInput(Deno.readTextFileSync("01_secret_entrance.txt")));
