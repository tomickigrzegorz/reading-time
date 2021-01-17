import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const { PRODUCTION } = process.env;

const plugins = () => {
  return [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    PRODUCTION && terser(),
    !PRODUCTION && serve({ open: true, contentBase: 'docs' }),
    !PRODUCTION && livereload(),
  ]
}

export default [
  {
    input: 'sources/script.js',
    output: {
      file: pkg.main,
      format: 'iife',
      name: 'ReadingTime',
      sourcemap: !PRODUCTION,
    },
    plugins: plugins(),
  },
  {
    input: 'sources/script.js',
    watch: false,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'ReadingTime'
    },
    plugins: plugins(),
  }
];