const path = require("path");

module.exports = {
  entry: {
    app: "./src/App",
    libs: [
      "@emotion/react",
      "@emotion/styled",
      "@fontsource/roboto",
      "@inertiajs/inertia",
      "@inertiajs/progress",
      "@inertiajs/react",
      "@mui/icons-material",
      "@mui/material",
      "@mui/styled-engine-sc",
      "styled-components",
      "react",
      "react-dom"
    ],
  },
  output: {
    path: path.resolve(__dirname, "..", "assets"),
    // filename: "[name].[hash].js",
    filename: "[name].js",
    chunkFilename: "js/[name].js?id=[chunkhash]",
    publicPath: process.env.BASE_URL,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
  ],
};
