import builtins from 'rollup-plugin-node-builtins'; // 插件，向bundle中加入内建模块代码
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';
import html from 'rollup-plugin-bundle-html';
//import builtinsModules from 'builtin-modules';  // builtinsModules是一个内建模块名组成的数组对象，用于cjs,esm中
import pkg from './package.json';


export default [
    {
        input: 'src/index.js',
        output: {
            file: pkg.browser,
            format: 'umd',
            name: 'cloudMusicSaga',
            exports:'named',
        },
        plugins: [
            builtins({
                crypto: true
            }),
            resolve({
                browser: true,
            }),
            commonjs(),
            globals(),
            babel({
                exclude: 'node_modules/**' 
            }),
            html({
                template: 'template/index.html',
                dest: "dist",
                filename: 'index.html',
                inject:'head',
                ignore: /(\.cjs\.js)|(\.esm\.js)$/i
            })
        ]
    },
    {
        input: 'src/index.js',
        output: [
            { file: pkg.main, format: 'cjs', exports:'named'},
            { file: pkg.module, format: 'esm' }
        ],
        external: [],
        plugins: [
            commonjs(),
            babel({
                exclude: 'node_modules/**' 
            })
        ]
    }
]