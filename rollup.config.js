import resolveNodeModules from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    resolveNodeModules({ module: true, jsnext: true, main: true }),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
  ],
  dest: 'dist/index.js',
}
