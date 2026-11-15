import { registerHooks } from "node:module";

const EMPTY_MODULE_URL = new URL("./empty-server-only.mjs", import.meta.url).href;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") {
      return {
        shortCircuit: true,
        url: EMPTY_MODULE_URL,
      };
    }
    return nextResolve(specifier, context);
  },
});
