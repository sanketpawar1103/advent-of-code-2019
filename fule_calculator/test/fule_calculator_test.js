import { assertEquals } from "@std/assert";
import { calculateEach } from "../src/fule_calculator.js";

Deno.test("Sample test", () => {
  assertEquals(calculateEach(12), 2);
});
