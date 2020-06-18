import { WaitGroup } from "./waitgroup.ts";
import { assert, assertEquals, assertThrows } from "../test_deps.ts";

Deno.test("exports class constructor", () => {
  assertEquals(typeof WaitGroup, "function");
});

Deno.test("creates a class instance when run", () => {
  const wg = new WaitGroup();
  assert(wg instanceof WaitGroup);
});

Deno.test("wait() instantly returns if no actions taken yet", async () => {
  const wg = new WaitGroup();
  const wait = wg.wait();
  const res = await wait;
  assertEquals(res, undefined);
});

Deno.test("wait() waits for internal to reach 0", async () => {
  const wg = new WaitGroup();
  let isResolved = false;
  wg.add(2);
  const waiting = wg.wait().then(() => {
    isResolved = true;
  });

  assert(!isResolved);
  wg.done();
  assert(!isResolved);
  wg.done();
  const res = await waiting;
  assert(isResolved);
});

Deno.test("add() increments internal counter by default of 1", () => {
  const wg = new WaitGroup();
  wg.add();
  assertEquals(wg["_current"], 1);
});

Deno.test("add() increments internal counter given value", () => {
  const wg = new WaitGroup();
  wg.add(3);
  assertEquals(wg["_current"], 3);
});

Deno.test("add() throws if results in a negative number", () => {
  const wg = new WaitGroup();
  assertThrows(() => wg.add(-1), Error, "Negative WaitGroup counter");
});

Deno.test("done() decrements internal counter by 1", () => {
  const wg = new WaitGroup();
  wg.add(3);
  assertEquals(wg["_current"], 3);
  wg.done();
  assertEquals(wg["_current"], 2);
});

Deno.test("done() throws if results in a negative number", () => {
  const wg = new WaitGroup();
  assertThrows(() => wg.done(), Error, "Negative WaitGroup counter");
});
