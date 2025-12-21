const wire1 = {
  x: 0,
  y: 0,
  path: [],
};

const wire2 = {
  x: 0,
  y: 0,
  path: [],
};

const move = (wire, axis, val, steps) => {
  for (let step = 0; step < steps; step++) {
    wire[axis] += val;
    wire.path.push([wire.x, wire.y]);
  }
};

const commands = {
  U: (wire, steps) => move(wire, "y", +1, steps),
  D: (wire, steps) => move(wire, "y", -1, steps),
  R: (wire, steps) => move(wire, "x", +1, steps),
  L: (wire, steps) => move(wire, "x", -1, steps),
};

const start = (path, wire) => {
  for (let term = 0; term < path.length; term++) {
    commands[path[term][0]](wire, +(path[term].slice(1)));
  }
};

const isInRange = (point1, point2) =>
  point1[0] === point2[0] && point1[1] === point2[1];

const matchIntersections = (path1, path2) => {
  // for (let index = 0; index < path1.length; index++) {
  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];

  //   }
  // }
  const intersections = [];

  for (let i = 0; i < path1.length; i++) {
    for (let j = 0; j < path2.length; j++) {
      if (isInRange(path1[i], path2[j])) {
        intersections.push(path2[j]);
      }
    }
  }

  return intersections;
};

const findDistance = (intersectionPoints) =>
  intersectionPoints.map((point) =>
    Math.abs(0 - point[0]) + Math.abs(0 - point[1])
  );

const loopOverSteps = (point) => {
  let ct1 = 0;
  let ct2 = 0;

  while (point[0] !== wire1.path[ct1][0] || point[1] !== wire1.path[ct1][1]) {
    ct1 += 1;
  }

  while (point[0] !== wire2.path[ct2][0] || point[1] !== wire2.path[ct2][1]) {
    ct2 += 1;
  }

  return ct1 + ct2 + 2;
};

const countSteps = (intersectionPoints) =>
  intersectionPoints.map((each) => loopOverSteps(each));

const crossedWires = (path1, path2) => {
  start(path1, wire1);
  start(path2, wire2);

  const intersectionPoints = matchIntersections(wire1.path, wire2.path);
  console.log(intersectionPoints);
  console.log(Math.min(...countSteps(intersectionPoints)));
  // const steps = countSteps(intersectionPoints);
};

const splitPaths = (path, delimiter) => path.split(delimiter);

const main = () => {
  const paths = splitPaths(
    Deno.readTextFileSync("day_03_crosed_wire_data.txt"),
    "\n",
  );

  crossedWires(splitPaths(paths[0], ","), splitPaths(paths[1], ","));
};

main();
