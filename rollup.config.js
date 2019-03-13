import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const plugins = [
    babel({
        runtimeHelpers: true,
        exclude: '/node_modules/'
    }),

    resolve({
        jsnext: true
    }),

    commonjs()
]

export default [{
    external: ['react'],
    input: 'src/index.js',
    output: {
        globals: { react: 'React' },
        file: 'dist/life-cyclec.js',
        format: 'umd',
        name: 'life-cyclec',
        indent: false
    },
    plugins: plugins.concat([
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ])
}, {
    external: ['react'],
    input: 'src/index.js',
    output: {
        file: 'dist/life-cyclec.min.js',
        format: 'umd',
        name: 'life-cyclec',
        globals: { react: 'React' },
        indent: false
    },
    plugins: plugins.concat([
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    ])
}]
    
