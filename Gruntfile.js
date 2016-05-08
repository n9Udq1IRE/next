module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        src: ['projets/**'],
        dest: 'dist/',
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
          'dist/projets/radios/assets/js/application.min.js': ['dist/projets/radios/assets/js/application.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['copy', 'uglify']);
};
