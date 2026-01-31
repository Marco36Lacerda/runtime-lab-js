# Runtime Lab JS

## Overview

This project is a **JavaScript Runtime Playground** created to deeply understand how JavaScript actually works under the hood — beyond syntax and frameworks.

Instead of focusing on APIs or libraries, the goal is to build a **clear mental model of execution, time, memory, and state**, which are the real foundations behind tools like React, Redux, Node.js, and modern frontend architectures.

This repository is both:

- a **learning lab**, and
- a **case study** of deliberate, high-efficiency technical learning.

---

## Goals

- Understand JavaScript execution at runtime level
- Build intuition about:
  - Call Stack
  - Event Loop
  - Microtasks vs Macrotasks
  - Closures and scope
  - `this` binding
  - State, identity, and mutation
- Develop senior-level explanations for interviews
- Create a strong foundation for future React and system design work

---

## Why Vanilla JavaScript?

Frameworks abstract behavior — they don’t replace it.

React, Redux, Next.js, and Node.js all rely on the same JavaScript runtime concepts:

- execution order
- memory references
- async scheduling
- state transitions

By mastering these fundamentals in **pure JavaScript**, frameworks become easier to learn, debug, and explain.

---

## Project Structure

```bash
runtime-lab-js/
├─ index.html
├─ src/
│ ├─ core/
│ │ ├─ logger.js // execution tracing
│ │ ├─ store.js // state & identity
│ │ ├─ scheduler.js // task scheduling (micro/macro)
│ │ └─ effect.js // side effects & lifecycle
│ ├─ adapters/
│ │ ├─ browser.js // DOM & browser events
│ │ └─ node.js // Node.js adapter (optional)
│ └─ demo/
│ └─ app.js // demo application using the core
```

The **core is runtime-agnostic** and can run in both browser and Node.js environments.

---

## Learning Methodology

This project follows a **deliberate practice** approach:

- Concepts are learned by **building**, not memorizing
- Each feature exposes real runtime behavior
- Bugs are intentionally created and analyzed
- Predictions are made before executing code
- Explanations are written as if for an interview

### AI-Assisted Learning

AI is used as:

- a **technical coach**
- a **source of counterexamples**
- a **generator of interview-style questions**
- a **feedback loop for explanations**

AI does **not** write the project — it supports faster iteration, reflection, and validation of mental models.

---

## Key Concepts Covered

- JavaScript Call Stack
- Synchronous execution
- Event Loop
- Promise microtasks
- Macrotasks (`setTimeout`)
- Closures and memory retention
- `this` binding rules
- State mutation vs immutability
- Async flows and side effects

---

## Current Status

- [x] Call Stack & execution flow
- [x] Event Loop visualization
- [x] State store implementation
- [ ] Effect system (React-like)
- [ ] Async scheduling & cancellation
- [ ] Interview simulations

---

## Next Steps

- Extend the runtime core
- Simulate React-like hooks using vanilla JS
- Apply the same mental model to algorithms
- Use this project as a reference during technical interviews

---

## Author

This project is a part of a concerted effort to improve mental models of JavaScript, from a superficial understanding to a deep system-level understanding. The focus is on clarity, predictability, and explainability.
