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
            if (srcpath === 'projets/radios/index.html') {
              content = content.replace('src="assets/js/application.js"', 'src="assets/js/application.min.js"');
            }
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
