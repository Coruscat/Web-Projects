module.exports = {
    mode: 'production',
    entry: ['./project2refactor/main.js'],
    output: {
      filename: './bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      }	
  };