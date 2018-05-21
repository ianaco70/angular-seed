#!/usr/bin/env bash
set tsc='node_modules/.bin/tsc'
set webdriver='node_modules/.bin/webdriver-manager'

# transpile ts files
tsc e2e/tests/app.e2e-spec.ts --outDir e2e/build --lib es2016,es2017

# download the selenium server jar and driver binaries
webdriver-manager update

# start selenium test server
(webdriver-manager start &)

# run protractor
node_modules/.bin/protractor protractor.conf.js

# clean up webdriver-manager
webdriver-manager shutdown
