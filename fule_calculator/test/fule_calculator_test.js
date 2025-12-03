import { assertEquals } from "@std/assert";
import { calculateFule } from "../src/fule_calculator.js";

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
  const data = Deno.readTextFileSync('./src/input_data.txt');
  assertEquals(calculateFule(data), 3125750);
})
