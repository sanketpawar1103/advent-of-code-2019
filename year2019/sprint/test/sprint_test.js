import { assertEquals } from "@std/assert";
import { sprint } from "../src/sprint.js";

Deno.test("Sample test", () => {
  assertEquals(sprint("1,0,0,0,99"), 2);
});

// Deno.test("Sample test", () => {
//   assertEquals(sprint("2,3,0,3,99"), 6);
// });
