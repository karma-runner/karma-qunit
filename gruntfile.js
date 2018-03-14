module.exports = function (grunt) {
  grunt.initConfig({
    pkgFile: 'package.json',
    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    },
    build: {
      adapter: ['src/adapter.js']
    },
    bump: {
      options: {
        commitMessage: 'chore: release v%VERSION%',
        pushTo: 'upstream',
        commitFiles: [
          'package.json'
        ]
      }
    },
    karma: {
      options: {
        singleRun: true
      },
      adapter: {
        configFile: 'karma.conf.js'
      },
      simplequnit: {
        configFile: 'examples/simple/karma.conf.js'
      }
    },
    eslint: {
      target: [
        'src/adapter.js',
        'lib/index.js',
        'test/**/*.js',
        'examples/**/*.js',
        'gruntfile.js',
        'karma.conf.js'
      ]
    }
  })

  require('load-grunt-tasks')(grunt)
  grunt.loadTasks('tasks')

  grunt.registerTask('test', ['build', 'karma'])
  grunt.registerTask('default', ['eslint', 'test'])

  grunt.registerTask('release', 'Bump the version and publish to NPM.', function (type) {
    grunt.task.run([
      'npm-contributors',
      'build',
      'bump-only:' + (type || 'patch'),
      'bump-commit',
      'npm-publish'
    ])
  })
}
