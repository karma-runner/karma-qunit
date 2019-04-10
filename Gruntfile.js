module.exports = function (grunt) {
  grunt.initConfig({
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
    }
  })

  grunt.loadNpmTasks('grunt-bump')
  grunt.loadNpmTasks('grunt-npm')
  grunt.loadTasks('tasks')

  grunt.registerTask('test', ['build'])
  grunt.registerTask('default', 'test')

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
