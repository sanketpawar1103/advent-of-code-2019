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

const move = (wire, axis, steps, value) => {
  for (let step = 0; step < steps; step++) {
    wire[axis] += value;
    wire.path.push([wire.x, wire.y]);
  }
};

const commands = {
  U: (wire, steps) => move(wire, "y", steps, 1),
  D: (wire, steps) => move(wire, "y", steps, -1),
  R: (wire, steps) => move(wire, "x", steps, 1),
  L: (wire, steps) => move(wire, "x", steps, -1),
};

const start = (path, wire) => {
  for (let term = 0; term < path.length; term++) {
    commands[path[term][0]](wire, +(path[term].slice(1)));
  }
};

const areEqual = (point1, point2) =>
  point1[0] === point2[0] && point1[1] === point2[1];

const matchIntersections = (path1, path2) => {
  const intersections = [];

  for (let i = 0; i < path1.length; i++) {
    for (let j = 0; j < path2.length; j++) {
      if (areEqual(path1[i], path2[j])) {
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
  const intersectionPoints = matchIntersections(wire1.path, wire2.path);
  console.log(Math.min(...findDistance(intersectionPoints)));
};

const splitPaths = (path, delimiter) => path.split(delimiter);

const main = () => {
  const paths = splitPaths(
    Deno.readTextFileSync("./crosed_wire_data.txt"),
    "\n",
  );

  crossedWires(splitPaths(paths[0], ","), splitPaths(paths[1], ","));
};

main();
