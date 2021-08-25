const path = require("path")

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader",
      }
    ]
  },
  output: {
    filename: "bundle.js",
    publicPath:"public",
    path: path.resolve(__dirname, "public"),
  },
};