import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import cleanup from "rollup-plugin-cleanup";

import pkg from "./package.json";
const input = "sources/script.js";

const { PRODUCTION } = process.env;

export default [
  {
    input,
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    watch: false,
    output: {
      name: "ReadingTime",
      format: "iife",
      file: pkg.main,
      sourcemap: true,
    },
  },
  {
    input,
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    watch: false,
    output: {
      name: "ReadingTime",
      format: "iife",
      sourcemap: false,
      file: "dist/readingTime.min.js",
      plugins: [terser()],
    },
  },
  {
    input,
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    output: {
      name: "ReadingTime",
      format: "iife",
      sourcemap: true,
      file: "docs/readingTime.min.js",
      plugins: [
        terser({
          mangle: true,
        }),
        !PRODUCTION && serve({ open: true, contentBase: ["docs"] }),
        !PRODUCTION && livereload(),
      ],
    },
  },
  {
    input,
    watch: false,
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    output: [
      {
        name: "ReadingTime",
        format: "umd",
        sourcemap: true,
        file: "dist/readingTime.umd.js",
      },
      {
        name: "ReadingTime",
        format: "umd",
        sourcemap: false,
        file: "dist/readingTime.umd.min.js",
        plugins: [
          terser({
            mangle: true,
            compress: { drop_console: true, drop_debugger: true },
          }),
        ],
      },
    ],
  },
  {
    input,
    watch: false,
    plugins: [babel({ babelHelpers: "bundled" }), cleanup()],
    output: [
      {
        name: "ReadingTime",
        format: "es",
        sourcemap: true,
        file: "dist/readingTime.esm.js",
      },
      {
        name: "ReadingTime",
        format: "es",
        sourcemap: false,
        file: "dist/readingTime.esm.min.js",
        plugins: [
          terser({
            mangle: true,
            compress: { drop_console: true, drop_debugger: true },
          }),
        ],
      },
    ],
  },
];
