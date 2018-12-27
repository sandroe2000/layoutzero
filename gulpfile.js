'use strict';
var gulp      = require('gulp');
var webserver = require('gulp-webserver');

var sourcePaths = {
  files: [
    './index.html',
    './view/pages/*.html', 
    './view/css/*.*css', 
    './view/scripts/*.js',
    './assets/*.js',
    './assets/module/*.js'
  ]
};

var server = {
  host: 'http://localhost',
  port: '80',
  restSource: '/app',
  restApp: 'http://localhost:8080/app'
}

gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      port: server.port,
      livereload: true,
      open: server.host,
      proxies: [{
        source: server.restSource,
        target: server.restApp
      }]
    }));
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.files);
});

gulp.task('default', ['webserver', 'watch']);