const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//установка mode в зависимости от режима запуска
let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}

console.log(mode + 'mode')

module.exports = {
  mode: mode,
  output: { //точки выхода
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]', //добавление папки для изображения
    clean: true //очищение папки dist перед компиляцией
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css' //добавление хеширование стилей css
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug' //основной html файл
    })
  ],
  module: {
    rules: [
      { //обработка изображений в html коде
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/, //обработка css стилей
        use: [
          (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, //обработка изображений
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, //обработка шрифтов
        type: 'asset/resource',
      },
      {
        test: /\.pug$/, //обработка pug
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.m?js$/, //обработка babel (js)
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //     presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  }
}