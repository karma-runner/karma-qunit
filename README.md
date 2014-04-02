# karma-qunit [![Build Status](https://travis-ci.org/karma-runner/karma-qunit.png?branch=master)](https://travis-ci.org/karma-runner/karma-qunit)

> Adapter for the [QUnit](http://qunitjs.com/) testing framework.

## Installation

The easiest way is to keep `karma-qunit` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-qunit": "~0.1"
  }
}
```

You can also use the simple command line installation:
```bash
npm install karma-qunit --save-dev
```

## Configuration
Add `qunit` in the `frameworks` array in your `karma.conf.js` file. Then, in the `plugins` array, add `karma-qunit`.
The following code shows the default configuration:
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['qunit'],
    plugins: ['karma-qunit'],
    files: [
      '*.js'
    ]
  });
};
```

----

For more information on Karma see the [homepage]. If you're using `karma-qunit` to test Ember.js, you might find Karma's [Ember guide](http://karma-runner.github.io/0.12/plus/emberjs.html) helpful.

[homepage]: http://karma-runner.github.com
