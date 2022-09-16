import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    external: ["react"],
    plugins: [esbuild(), terser()],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        exports: "named",
      },
      {
        file: packageJson.module,
        format: "es",
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: "es",
    },
  },
];
