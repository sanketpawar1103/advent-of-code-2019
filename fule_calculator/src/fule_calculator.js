const divideBy3AndRound = (mass) => Math.floor(mass / 3);

export const calculateEach = (mass) => divideBy3AndRound(mass) - 2;

export const calculateFule = (mass) => {
  const masses = mass.split("\n");
  return masses.reduce((sum, mass) => sum += calculateEach(parseInt(mass)), 0);
};
