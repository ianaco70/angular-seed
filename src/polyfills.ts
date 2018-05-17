// include polyfills needed to run Angular applications in browsers
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

if (process.env.ENV === 'prod') {
  console.log(`environment: prod`);
} else {
  console.log(`environment: dev`);
}
