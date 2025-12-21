const divideBy3AndRound = (mass) => Math.floor(mass / 3);

export const calculateEach = (mass) => divideBy3AndRound(mass) - 2;

export const calculateFule = (mass) => {
  const masses = mass.split("\n");
  return masses.reduce((sum, mass) => sum += calculateEach(parseInt(mass)), 0);
};

const leastFule = (mass) => {
  let parsedMass = +mass;
  let sum = 0;

  while (parsedMass > 8) {
    parsedMass = calculateEach(parsedMass);
    sum += parsedMass;
  }

  return sum;
};

export const calculateFule2 = (mass) => {
  const masses = mass.split("\n");

  return masses.reduce((sum, mass) => sum += leastFule(mass), 0);
};