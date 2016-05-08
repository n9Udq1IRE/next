module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        cwd: 'projets',
        src: '**',
        dest: 'dist/',
        options: {
          process: function (content, srcpath) {
            console.log(srcpath);
            return content;
          },
        },
      },
    },
    uglify: {
      dist: {
        files: {
          'dist/radios/assets/js/application.min.js': ['dist/radios/assets/js/application.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['copy', 'uglify']);
};
