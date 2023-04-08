# karma-qunit

[![npm version](https://img.shields.io/npm/v/karma-qunit?style=flat-square&logo=npm&logoColor=fff)](https://www.npmjs.com/package/karma-qunit) [![Build Status](https://img.shields.io/github/actions/workflow/status/karma-runner/karma-qunit/test.yml?style=flat-square&logo=github&branch=master)](https://github.com/karma-runner/karma-qunit/actions/workflows/test.yml?query=workflow%3ATests+branch%3Amaster) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen?style=flat-square)](https://github.com/karma-runner/karma-qunit) [![npm downloads](https://img.shields.io/npm/dm/karma-qunit?style=flat-square)](https://www.npmjs.com/package/karma-qunit)

> Adapter for the [QUnit](https://qunitjs.com/) testing framework.

## Installation

The easiest way is to keep `karma-qunit` as a devDependency in your `package.json` by running

```bash
npm install karma-qunit --save-dev
```

## Configuration

Add `qunit` in the `frameworks` array in your `karma.conf.js` file. Then, in the `plugins`
array, add `karma-qunit`. The following code shows the default configuration:

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

You can also pass options for `QUnit.config` (documented [here](https://api.qunitjs.com/config/QUnit.config)) as such:

```js
/// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['qunit'],
    plugins: ['karma-qunit'],
    files: [
      '*.js'
    ],

    // client configuration
    client: {
      clearContext: false,
      qunit: {
        showUI: true,
        testTimeout: 5000
      }
    }
  })
}
```

Note: `showUI: true` needs the `clearContext: false` option to display correctly in non-debug mode.

----

For more information on Karma see the [homepage]. If you're using `karma-qunit` to test Ember.js, you might find Karma's [Ember guide](https://karma-runner.github.io/latest/plus/emberjs.html) helpful.

[homepage]: https://karma-runner.github.io/
