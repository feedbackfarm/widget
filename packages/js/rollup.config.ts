import { terser } from "rollup-plugin-terser";

export default {
  input: "src/widget.ts",
  plugins: [terser()],
  output: {
    file: "dist/widget.js",
    format: "cjs",
  },
};
