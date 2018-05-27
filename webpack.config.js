const path = require('path');
const env = process.env.NODE_ENV;

module.exports = require(path.resolve(
  __dirname,
  'config',
  `./webpack.${env}.js`,
));
