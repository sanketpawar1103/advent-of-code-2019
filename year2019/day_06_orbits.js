const orbitPairs = {};

const increaseCounter = (val, path) => {
  if (val in orbitPairs) {
    path.push(val);
    return increaseCounter(orbitPairs[val], path);
  }

  return path;
};

const fillOrbitPairs = (splitedStr) => {
  splitedStr.forEach((pair) => {
    const valKey = pair.split(")");
    orbitPairs[valKey[1]] = valKey[0];
  });
};

const loopOver = () => {
  const path1 = increaseCounter(orbitPairs["YOU"], []);
  const path2 = increaseCounter(orbitPairs["SAN"], []);

  for (let index = 0; index < path1.length; index++) {
    const indexInPath2 = path2.indexOf(path1[index]);

    if (indexInPath2 !== -1) {
      return index + indexInPath2;
    }
  }

  return path1.length + path2.length;
};

const main = () => {
  const str = Deno.readTextFileSync("./day_06_orbit_data.txt");
  fillOrbitPairs(str.split("\n"));

  return loopOver();
};

console.log(main());
