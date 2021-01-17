import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const { PRODUCTION } = process.env;

const plugins = ({ module }) => {
  return [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    PRODUCTION && terser({
      module,
      mangle: true,
      compress: true,
    }),
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
    plugins: plugins({ module: false }),
  },
  {
    input: 'sources/script.js',
    watch: false,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'ReadingTime'
    },
    plugins: plugins({ module: true }),
  }
];