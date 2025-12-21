let counter = 0;

const toLeft = (dialPointer, move) => ((dialPointer - move) % 100) + 100 % 100;

const toRight = (dialPointer, move) => (dialPointer + move) % 100;

const directions = {
  "L": toLeft,
  "R": toRight,
};

const main = (ip) => {
  let dialPointer = 50;
  let counter = 0;

  for (let i = 0; i < ip.length; i++) {
    dialPointer = directions[ip[i][0]](dialPointer, parseInt(ip[i].slice(1)));
    if (dialPointer === 0) {
      counter++;
    }
  }

  console.log(counter);
};

const parseInput = (inputStr) => inputStr.split("\n");

main(
  parseInput(Deno.readTextFileSync("01_secret_entrance.txt")),
);
