/**
 * Creates a minimal state store (a "Redux baby") with the right design decisions:
 *
 * - Single source of truth (single state object)
 * - Subscription-based updates (subscribers)
 * - setState supports both object updates and updater functions
 * - Subscribers are notified at the correct time after state changes
 * @param {Object} initialState - The initial state object (treated as immutable by convention).
 */

export function createStore(initialState) {
  // 1) state “vive” aqui dentro (closure)
  // 2) listeners vivem aqui dentro
  // 3) retorna { getState, setState, subscribe }

  /**
   * Current state value.
   * @type {*}
   */
  let state = initialState;

  /**
   * Set of listener functions subscribed to state changes.
   * @type {Set<Function>}
   */
  const listeners = new Set();

  /**
   * Returns the current state.
   * @returns {*} The current state value
   */
  function getState() {
    return state;
  }
  /**
   * Returns the updated state.
   * @param {*} updater -
   * @returns {*} The current state value
   */
  function setState(updater) {
    //1) snapshot of the previous state
    const prevState = state;
    // 2) resolve patch
    const patch = typeof updater === "function" ? updater(prevState) : updater;

    if (patch == null || typeof patch !== "object" || Array.isArray(patch)) {
      throw new TypeError(`setState updater most return an object`);
    }
    // 3) create nextState and update state
    const nextState = { ...prevState, ...patch };
    state = nextState;

    // 4) notify listeners
    for (const listener of listeners) {
      try {
        listener(state, prevState);
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * Subscribes a listener function to state changes.
   * @param {Function} listener - Callback function to be notified of changes
   * @returns {Function} Unsubscribe function to remove the listener
   * @throws {TypeError} If listener is not a function
   */
  function subscribe(listener) {
    // 1) validate listener  as function
    if (typeof listener !== "function") {
      throw new TypeError(
        `subscribe() expected a function, got ${typeof listener}`,
      );
    }
    // 2) add to the Set
    listeners.add(listener);
    // 3) return unsubscribe()
    const unsubscribe = () => listeners.delete(listener);
    return unsubscribe;
  }
  return {
    getState,
    setState,
    subscribe,
  };
}
