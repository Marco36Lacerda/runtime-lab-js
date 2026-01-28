export function createLogger({ target }) {
  const lines = [];

  function write(line) {
    lines.push(line);
    target.textContent = lines.join("\n");
  }
  return {
    log: (msg) => write(String(msg)),
    clear: () => {
      lines.length = 0;
      target.textContent = "";
    },
  };
}
