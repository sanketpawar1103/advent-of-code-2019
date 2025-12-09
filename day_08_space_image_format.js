import { chunk } from "jsr:@std/collections";

const occurances = (layer, pix) =>
  layer.filter((element) => element === pix).length;

const leastZeros = (layers) => {
  const zeros = layers.map((layer) => occurances(layer, "0"));
  const leastZeros = Math.min(...zeros);

  return zeros.findIndex((element) => element === leastZeros);
};

const main = () => {
  const str = Deno.readTextFileSync("./day_08_space_image_format_data.txt");
  const layers = chunk(str, 25 * 6);

  const layerIndex = leastZeros(layers);
  return occurances(layers[layerIndex], "1") *
    occurances(layers[layerIndex], "2");
};

console.log(main());
