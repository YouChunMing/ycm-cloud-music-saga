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
            globals: {
                'ycm-cloud-music-redux': 'cloudMusicRedux',
                'ycm-cloud-music-api': 'cloudMusicApi',
            },
            exports:'named',
        },
        external: ['ycm-cloud-music-redux', 'ycm-cloud-music-api'],
        plugins: [
            builtins({
                crypto: true
            }),
            resolve({
                browser: true,
            }),
            commonjs({
                // namedExports: {
                //     'node_modules/ycm-cloud-music-api/dist/ycm-cloud-music-api.umd.js': ['banner'],
                //     'node_modules/ycm-cloud-music-redux/dist/ycm-cloud-music-redux.umd.js':['banner']
                // },
            }),
            globals(),
            babel({
                exclude: 'node_modules/**' 
            }),
            html({
                template: 'template/index.html',
                dest: "dist",
                filename: 'index.html',
                inject:'head',
                externals: [
                    { type: 'js', file: "node_modules/ycm-cloud-music-api/dist/ycm-cloud-music-api.umd.js", pos: 'before' },
                    { type: 'js', file: "node_modules/ycm-cloud-music-redux/dist/ycm-cloud-music-redux.umd.js", pos: 'before' }
                ],
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
        external: (id) => {
            const specificList = ['redux-saga/effects', 'ycm-cloud-music-redux', 'ycm-cloud-music-api', 'regenerator-runtime/runtime'];
            const specificPattern = new RegExp(`^(${specificList.join('|')})($|/)`);
            const externalPattern = new RegExp(`^core-js/modules`);
            return specificPattern.test(id) || externalPattern.test(id);
        },
        plugins: [
            commonjs(),
            babel({
                exclude: 'node_modules/**' 
            })
        ]
    }
]