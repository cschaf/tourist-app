var gulp      = require('gulp'),
  connect     = require('gulp-connect'),
  watch       = require('gulp-watch'),
  sourcemaps  = require('gulp-sourcemaps');
  browserify  = require('browserify');
  buffer      = require('vinyl-buffer'); // to transform the browserify results into a 'stream'
  source      = require('vinyl-source-stream'); //to 'rename' your resulting file
  gutil       = require('gulp-util');
  deploy = require('gulp-deploy-git');

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 3000,
    root: [__dirname, __dirname + '/deploy']
  });
});
 
gulp.task('html', function() {
  gulp.src(['./*.html'])
    .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(['./app/style/*.css'])
        .pipe(connect.reload());
});

// Recipe from http://www.uberbrady.com/2015/05/how-to-do-gulp-browserify-coffeescript.html
gulp.task('coffee', function() {
  browserify({
    entries: ["./app/app.coffee"],
    debug: true,
    extensions: [".coffee"],
    paths: ["./app/modules"],
    transform: ["coffeeify"] // npm install --save-dev coffeeify
    })
  .bundle()
  .on('error', function(err){
    gutil.log(
      gutil.colors.red("Browserify compile error:"), 
      err.toString()
    );
  })
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true,debug: true}))
  // .pipe(uglify( {
  //       debug: true,
  //       options: {
  //         sourceMap: true,
  //       }
  //   }))
  .pipe(sourcemaps.write("./" /* optional second param here */))
  .pipe(gulp.dest('build'))
  .pipe(connect.reload())
      .on('end', function () {gulp.run(['built-gh-pages']); });;



});
 
gulp.task('watch', function() {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./app/style/*.css'], ['css']);
  gulp.watch('./app/**/*.coffee', ['coffee']);
});

gulp.task('export', function() {
  gulp.src(['app/**/*']).pipe(gulp.dest('export/tourist-app.framer'));
});

gulp.task('built-gh-pages', function() {
    gulp.src(['./index.html']).pipe(gulp.dest('deploy/'));
    gulp.src(['app/**/*']).pipe(gulp.dest('deploy/'));
    gulp.src(['build/**/*']).pipe(gulp.dest('deploy/'));
    gulp.src(['./node_modules/framerjs-prebuilt/*.js']).pipe(gulp.dest('deploy/node_modules/framerjs-prebuilt'));
    gulp.src(['./node_modules/framerjs-prebuilt/*.map']).pipe(gulp.dest('deploy/node_modules/framerjs-prebuilt'));
});

gulp.task('deploy-gh-pages', function() {
    return gulp.src('dist/**/*')
        .pipe(deploy({
            repository: 'https://github.com/cschaf/tourist-app.git',
            branches:   ['gh-pages']
        }));
});

gulp.task('default', ['coffee', 'webserver', 'html', 'css', 'watch']);