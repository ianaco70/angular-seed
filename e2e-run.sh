#!/usr/bin/env bash
set protractor='node_modules/.bin/protractor'
set tsc='node_modules/.bin/tsc'
set webdriver='node_modules/.bin/webdriver-manager'

# transpile ts files
tsc --project e2e/tsconfig.e2e.json

# download the selenium server jar and driver binaries
webdriver-manager update

# start selenium test server
(webdriver-manager start &)

# run protractor
protractor protractor.conf.js

# clean up webdriver-manager
webdriver-manager shutdown
