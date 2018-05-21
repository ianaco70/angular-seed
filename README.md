# Angular Seed

> Angular application seed using webpack, npm scripts, and bootstrap framework. Along with Karma/Jasmine setup for unit testing and Protractor for e2e testing.

## Setup

* Install node.js (http://nodejs.org)
* Clone repository

## Installation

* Install package manager by running the following command in the terminal:

```
npm i -g yarn
```

* Then _cd_ into cloned project directory and run the below command to install required project dependencies:

```
yarn install
```

## Run Project

* Development
  > Runs a pre-process for generating a vendor dll bundle. The dev build is then run referencing the vendor bundle and served using webpack's dev server in which processed files are located in a virtual folder. Defaults to http://localhost:3000/

```
yarn start
```

* Production
  > Runs a pre-process which installs required dependencies. The distribution folder is then cleaned before newly processed files are added.

```
yarn run build
```

## Application Start-up

> On application start-up you should see 'hello angular!'.

## Webpack Configurations

### Vendor

> Contains configuration for creating a Dynamic-link library (DLL) for third-party dependencies. The vendor bundle is referenced by the development configuration through a generated manifest to allow for faster build times.

### Common

> Contains common configuration setup between development and production configurations.

### Development

> Contains development specific configuration. This includes the following:

* Development server
* Dynamic-link library (DLL)
* Hot module replacement (HMR)

### Production

> Contains production specific configuration. This includes the following:

* Generated typedoc
* Ahead of time compilation (see To-Do below)

### Test

> Contains test specific configuration for use by karma test runner.

## To-Do's

### Development

* Fix HMR issue 
  * For loaders using mini-css-extract-plugin which does not currently support HMR, this is a known issue https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
  * check if compatible with angular scoped styles

### Production

* Add AOT plugin
* Add split chunks plugins

### General

* Add minify, uglify
* Fix issue with test being run before gloabl environment varaible set
