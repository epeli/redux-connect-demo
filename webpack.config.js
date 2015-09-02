module.exports = {
  devtool: "source-map",
  entry: {
    app: ["./index.js"]
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    },

};
