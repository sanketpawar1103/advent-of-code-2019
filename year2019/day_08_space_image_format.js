import { chunk } from "jsr:@std/collections";

const non2s = (col, layers, row, emptyArr) => {
  const firstNon2s = emptyArr;
  console.log(layers.length);

  while (col < layers[0].length) {
    if (layers[row][col] !== "2") {
      firstNon2s.push(layers[row][col]);
      [col, row] = [col + 1, -1];
    }

    row = (row + 1) % layers.length;
  }

  return firstNon2s;
};

const main = () => {
  const str = Deno.readTextFileSync("./day_08_space_image_format_data.txt");
  const layers = chunk(str, 25 * 6);

  const allNon2s = non2s(0, layers, 0, []);

  const string = allNon2s.map((pix) => +pix ? "⬜️" : "⬛️");

  console.log(chunk(string, 25).map((each) => each.join("")).join("\n"));
};

console.log(main());
