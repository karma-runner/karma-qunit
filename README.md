# karma-qunit

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/karma-runner/karma-qunit)
 [![npm version](https://img.shields.io/npm/v/karma-qunit.svg?style=flat-square)](https://www.npmjs.com/package/karma-qunit) [![npm downloads](https://img.shields.io/npm/dm/karma-qunit.svg?style=flat-square)](https://www.npmjs.com/package/karma-qunit)

[![Build Status](https://img.shields.io/travis/karma-runner/karma-qunit/master.svg?style=flat-square)](https://travis-ci.org/karma-runner/karma-qunit) [![Dependency Status](https://img.shields.io/david/karma-runner/karma-qunit.svg?style=flat-square)](https://david-dm.org/karma-runner/karma-qunit) [![devDependency Status](https://img.shields.io/david/dev/karma-runner/karma-qunit.svg?style=flat-square)](https://david-dm.org/karma-runner/karma-qunit#info=devDependencies)

> Adapter for the [QUnit](http://qunitjs.com/) testing framework.

## Installation

The easiest way is to keep `karma-qunit` as a devDependency in your `package.json` by running

```bash
$ npm install karma-qunit --save-dev
```

## Configuration

Add `qunit` in the `frameworks` array in your `karma.conf.js` file. Then, in the `plugins`
array, add `karma-qunit`.
The following code shows the default configuration:

```js
// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['qunit'],
    plugins: ['karma-qunit'],
    files: [
      '*.js'
    ]
  })
}
```

### Running a single test module or test case

`karma-qunit` supports running a single test module or test case within a module by using Karma client config.  To use this functionality you will need to make some changes to your `karma.conf.js`:

```js
// karma.conf.js
var filter;
var dashDashIndex = process.argv.indexOf('--');
if (dashDashIndex !== -1) {
    filter = process.argv.slice(dashDashIndex + 1).join(' ');
}

module.exports = function (config) {
    // ...
    client: {
        filter: (filter ? [filter] : undefined)
    }
}
```

Filter string is of the form "module name: test case", for example:

```bash
# run tests in just myTestModule
$ karma start -- myTestModule

# run just one test in myTestModule
$ karma start -- myTestModule: testSomething
```

Note that this uses a prefix string match, so with appropriately named modules you could even use this to run a subset of test modules if they start with the same prefix.

----

For more information on Karma see the [homepage]. If you're using `karma-qunit` to test Ember.js, you might find Karma's [Ember guide](http://karma-runner.github.io/0.12/plus/emberjs.html) helpful.

[homepage]: http://karma-runner.github.com
