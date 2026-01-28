/**
 * Creates a scheduler to observe microtask vs macrotask execution order
 * This demonstrates how the JavaScript event loop prioritizes different task queues
 */

export function createScheduler() {
  // Internal log to track execution order
  // This helps us visualize when tasks actually run (not when they're scheduled)
  const executionLog = [];
  /**
   * Schedules a function in the microtask queue
   * Microtasks run BEFORE the next macrotask, after the current script completes
   *
   * @param {Function} fn - The callback to execute
   * @param {string} label - Optional label for debugging
   */

  const enqueueMicrotask =
    typeof queueMicrotask !== "undefined"
      ? queueMicrotask
      : (cb) => Promise.resolve().then(cb);

  function micro(fn, label = "(anonymous)") {
    // Use queueMicrotask if available (modern browsers)
    // Otherwise fallback to Promise.resolve().then() which also creates a microtask
    if (typeof fn !== "function") {
      throw new TypeError(`micro() expected a function, got ${typeof fn}`);
    }

    enqueueMicrotask(() => {
      // Log when execution STARTS (not when we schedule it)
      executionLog.push(`micro:start ${label}`);
      try {
        //execute the actual callback
        fn();
        // Only log 'end' if no error occurred
        executionLog.push(`micro:end ${label}`);
      } catch (error) {
        // Log the error but don't swallow it
        // showing proper error handling is crucial
        executionLog.push(`micro:error ${label}`);
        throw error;
      }
    });
  }

  /**
   * Schedules a function in the macrotask queue
   * Macrotasks run AFTER all microtasks in the current cycle complete
   *
   * @param {Function} fn - The callback to execute
   * @param {string} label - Optional label for debugging
   * @param {number} delayMs - Delay in milliseconds (default: 0)
   */
  function macro(fn, label = "(anonymous)", delayMs = 0) {
    if (typeof fn !== "function") {
      throw new TypeError(`micro() expected a function, got ${typeof fn}`);
    }

    // setTimeout always creates a macrotask
    // Even with delay=0, it goes to the macrotask queue
    setTimeout(() => {
      executionLog.push(`macro:start ${label}`);

      try {
        fn();
        executionLog.push(`macro:end ${label}`);
      } catch (error) {
        executionLog.push(`macro:error ${label}`);
        throw error;
      }
    }, delayMs);
  }
  /**
   * Returns the current log and clears it
   * Useful for testing and debugging
   *
   * @returns {string[]} Array of execution log entries
   */

  function flushLog() {
    // Create a copy of the log
    const log = [...executionLog];
    // Clear the internal log for next test
    executionLog.length = 0;
    return log;
  }

  /**
   * Returns a Promise that resolve after:
   * the current callstack is finished
   * drain current microtask
   * at least one macrotask is executed
   */

  function idle() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
  }

  return {
    micro,
    macro,
    flushLog,
    idle,
  };
}
