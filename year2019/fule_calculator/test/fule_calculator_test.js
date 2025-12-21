import { assertEquals } from "@std/assert";
import { calculateFule, calculateFule2 } from "../src/fule_calculator.js";
const data = Deno.readTextFileSync("./src/input_data.txt");


Deno.test("Sample test", () => {
  assertEquals(calculateFule("12"), 2);
});

Deno.test("Sample test", () => {
  assertEquals(calculateFule("14"), 2);
});

Deno.test("Sample test", () => {
  assertEquals(calculateFule("1969"), 654);
});

Deno.test("Sample test", () => {
  assertEquals(calculateFule("100756"), 33583);
});

Deno.test("Input data", () => {
  assertEquals(calculateFule(data), 3125750);
});

Deno.test("Sample test part 2", () => {
  assertEquals(calculateFule2("12"), 2);
});

Deno.test("Sample test part 2", () => {
  assertEquals(calculateFule2("14"), 2);
});

Deno.test("Sample test part 2", () => {
  assertEquals(calculateFule2("1969"), 966);
});

Deno.test("Sample test part 2", () => {
  assertEquals(calculateFule2("100756"), 50346);
});

Deno.test("Data test part 2", () => {
  assertEquals(calculateFule2("100756"), 50346);
});

Deno.test("Input data part 2", () => {
  assertEquals(calculateFule2(data), 4685788);
});