'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower')

  grunt.initConfig({
    bower: {
      dist: {
        dest: 'public/javascripts'
      }
    }
  });

  grunt.registerTask('build', [
    'bower:dist'
  ]);
}
