# karma-qunit [![Build Status](https://travis-ci.org/karma-runner/karma-qunit.png?branch=master)](https://travis-ci.org/karma-runner/karma-qunit)

> Adapter for the [QUnit](http://qunitjs.com/) testing framework.

## Installation

The easiest way is to keep `karma-qunit` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.9",
    "karma-qunit": "~0.0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-qunit --save-dev
```

## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['qunit'],

    files: [
      '*.js'
    ]
  });
};
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
