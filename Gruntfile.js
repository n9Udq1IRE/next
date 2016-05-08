module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      main: {
        src: 'projets',
        dest: 'dest',
        options: {
          process: function (content, srcpath) {
            return content;
          },
        },
      },
    },
    uglify: {
      dist: {
        files: {
          'dest/radios/assets/js/application.min.js': ['dest/radios/assets/js/application.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['copy', 'uglify']);
};
