const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require('webpack');

module.exports = (options, webpackRef) => ({
  ...options,
  entry: ['webpack/hot/poll?100', options.entry],
  externals: [nodeExternals({ allowlist: ['webpack/hot/poll?100'] })],
  plugins: [
    ...(options.plugins || []),
    new webpackRef.HotModuleReplacementPlugin(),
    new webpackRef.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
    new RunScriptWebpackPlugin({
      name: options.output.filename,
      autoRestart: false,
    }),
  ],
});
