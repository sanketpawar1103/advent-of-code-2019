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

const move = (wire, axis, steps) => {
  const crrtPos = [wire.x, wire.y];
  wire[axis] += steps;
  const newPos = [wire.x, wire.y];

  wire.path.push([crrtPos, newPos]);
  // for (let step = 0; step < steps; step++) {
  //   wire[axis] += value;
  //   wire.path.push([wire.x, wire.y]);
  // }
};

const commands = {
  U: (wire, steps) => move(wire, "y", +steps),
  D: (wire, steps) => move(wire, "y", -steps),
  R: (wire, steps) => move(wire, "x", +steps),
  L: (wire, steps) => move(wire, "x", -steps),
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

const crossedWires = (path1, path2) => {
  start(path1, wire1);
  start(path2, wire2);

  console.log(wire1.path);
  console.log(wire2.path);

  const intersectionPoints = matchIntersections(wire1.path, wire2.path);
  // console.log(Math.min(...findDistance(intersectionPoints)));
};

const splitPaths = (path, delimiter) => path.split(delimiter);

const main = () => {
  const paths = splitPaths(
    "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83",
    "\n",
  );

  crossedWires(splitPaths(paths[0], ","), splitPaths(paths[1], ","));
};

main();

const part2 = () => {
};
