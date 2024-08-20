const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    vendor: [
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
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // Enable this after configure the dev host.
    // allowedHosts: [
    //   'all'
    // ],
    port: 6884,
    hot: true,
    liveReload: true,
    static: {
      // directory: './assets',
      publicPath: '/assets',
    },
    proxy: [
      {
        context: ["/"],
        target: 'http://0.0.0.0:7845',
      },
    ],
  },
});
