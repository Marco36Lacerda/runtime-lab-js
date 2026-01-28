import { createLogger } from "../core/logger.js";
import { createScheduler } from "../core/scheduler.js";

/**
 * Test 1: Basic microtask vs macrotask ordering
 *
 * Expected order:
 * 1. "A" - executes immediately (synchronous)
 * 2. "D" - executes immediately (synchronous)
 * 3. "C" - microtask runs after synchronous code, before macrotasks
 * 4. "B" - macrotask runs last
 */

const logEl = document.querySelector("#log");
const runBtn = document.querySelector("#run");
const runBtn2 = document.querySelector("#run2");

const logger = createLogger({ target: logEl });
const scheduler = createScheduler();

function third() {
  logger.log("3) third() start");
  logger.log("3) third() end");
}

function second() {
  logger.log("2) second() start");
  third();
  logger.log("2) second() end");
}

function first() {
  logger.log("1) first() start");
  second();
  logger.log("1) first() end");
}

function runTest1() {
  logger.log("A"); // Synchronous - runs immediately

  // Schedule a macrotask - goes to macrotask queue
  scheduler.macro(() => logger.log("B"), "B");

  // Schedule a microtask - goes to microtask queue
  scheduler.micro(() => logger.log("C"), "C");

  logger.log("D"); // Synchronous - runs immediately

  // After this function completes:
  // 1. Event loop checks microtask queue → runs "C"
  // 2. Then checks macrotask queue → runs "B"
}

function runTest2() {
  logger.log("A");

  scheduler.micro(() => logger.log("B"), "B");

  scheduler.idle().then(() => logger.log("C"));

  logger.log("D");
}

runBtn.addEventListener("click", () => {
  logger.clear();

  logger.log("## click handler start");
  logger.log("--- test1 ---");
  runTest1();
  logger.log("--- call stack demo ---");
  first();
  logger.log("## click handler end");
  setTimeout(() => {
    logger.log("");
    logger.log("--- scheduler log ---");
    for (const line of scheduler.flushLog()) logger.log(line);
  }, 0);
});

runBtn2.addEventListener("click", () => {
  logger.clear();
  logger.log("--- test1 ---");
  runTest2();
  logger.log("--- call stack demo ---");
  setTimeout(() => {
    logger.log("");
    logger.log("--- scheduler log ---");
    for (const line of scheduler.flushLog()) logger.log(line);
  }, 0);
});
