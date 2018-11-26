'use strict';
var gulp      = require('gulp');
var webserver = require('gulp-webserver');
var opn       = require('opn');

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
  host: 'localhost',
  port: '8001'
}

gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false,
      proxies: [{
          source: '/api', 
          target: 'http://localhost:1000/api/'
      }]
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.files);
});

gulp.task('default', ['webserver', 'watch', 'openbrowser']);