const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              throwIfNamespace: false,
            },
          },
          'svg-url-loader',
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: false,
    },
  },
  plugins: [],
};
