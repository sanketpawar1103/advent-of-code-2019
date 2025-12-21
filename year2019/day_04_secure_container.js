const doesOccureTwice = (number) => {
  let i = 0;

  while (i < 5) {
    const lastIndex = number.lastIndexOf(number[i]);
    const occurances = lastIndex - number.indexOf(number[i]) + 1;
    if (occurances === 2) {
      return true;
    }
    i = lastIndex + 1;
  }

  return false;
};

const isInAscendingOrder = (number) =>
  number.split("").sort().join("") === number;

const iterateInRange = (start, end) => {
  let counter = 0;

  for (let i = start; i <= end; i++) {
    if (doesOccureTwice(i.toString()) && isInAscendingOrder(i.toString())) {
      counter++;
    }
  }

  return counter;
};

const main = (start, end) => {
  console.log(iterateInRange(start, end));
};

main(264360, 746325);
