module.exports = function(grunt) {
    var path = require('path');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
        uglify: {
            options: {
                preserveComments: function (info, comment) {
                    return comment.pos === 0;
                }
            },
            phone_number: {
                files: {
                    'dist/phoneNumber.min.js': path.join('src', 'phoneNumber.js')
                }
            }
        }
    });
    grunt.registerTask('build', 'Builds the app into a distributable package.', function() {
        grunt.task.run('uglify:phone_number');
    });
};