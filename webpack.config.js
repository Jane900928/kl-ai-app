const { resolve } = require('path');
const merge = require('webpack-merge');
const args = require('yargs-parser')(process.argv.slice(2));
const _mode = args.mode || 'development';
const _modeConfig = require(`./config/webpack.${_mode}.js`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _modeflag = _mode === 'production' ? true : false
const webpackBaseConfig = {
    entry: {
        main: resolve('src/index.tsx'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    // '.swcrc' can be used to configure swc
                    loader: 'swc-loader',
                },
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
                ],
                // 使用js方式插入
                // use: ['style-loader', 'css-loader'],
            }
        ],
    },
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // }
    resolve: {
        alias: {
            '@': resolve('src/'),
            '@components': resolve('src/components'),
            '@hooks': resolve('src/hooks'),
            '@pages': resolve('src/pages'),
            '@layouts': resolve('src/layouts'),
            '@routes': resolve('src/routes'),
            '@assets': resolve('src/assets'),
            '@states': resolve('src/states'),
            '@service': resolve('src/service'),
            '@utils': resolve('src/utils'),
            '@lib': resolve('src/lib'),
            '@constants': resolve('src/constants'),
            '@connections': resolve('src/connections'),
            '@abis': resolve('src/abis'),
            '@types': resolve('src/types'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
        fallback: {
            // stream: require.resolve('stream-browserify'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            ignoreOrder: false,
        }),
        // new ThemedProgressPlugin(),
    ]
};
module.exports = merge.default(webpackBaseConfig, _modeConfig);