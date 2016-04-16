//Required
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    browser_sync = require('browser-sync'),
    reload = browser_sync.reload,
    auto_prefixer = require('gulp-autoprefixer')


//Scripts Tasks
gulp.task('scripts', function(){
  //Glob Pattern
  //includes all js files and sub directories
  gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
  .pipe(plumber())
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(reload({stream: true}));
  //bangs exclude
  //!css/style.css
});

//HTML Watch Task
gulp.task('html', function(){
  gulp.src('app/**/*.html')
  //reload is always last pipe
  .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function(){
  browser_sync({
    server: {
      baseDir: "./app/"
    }
  });
})

//task to create build directory for all files
gulp.task('build:copy', function(){
  return gulp.src('app/**/*/')
  .pipe(gulp.dest('build/'))
})

//clear out all files and folders from build folders
gulp.task('build:cleanfolder', function(callback) {
  del([
    'build/**'
  ], callback);
})

//list all files and directories that don't want to include
gulp.task('build:remove', ['build:copy'], function(callback){
  del([
    'build/scss/',
    'build/js/!(*.min.js)'
  ], callback);
});

//task to run build server for testing final app
gulp.task('build:serve', function() {
  browser_sync({
    server:{
      baseDir: "./build/"
    }
  })
});

gulp.task('build', ['build:copy', 'build:remove']);

//Watch Task
gulp.task('watch', function(){
  gulp.watch('app/js/**/*.js',['scripts']);
  gulp.watch('app/**/*.html', ['html']);
});

//Build Task

//Browser Sync
//Uses injection instead of a reload
//uses socket.io

//Styles Task
// gulp.task('compass', function(){
//   gulp.src('app/scss/style.scss')
//   .pipe(gulp.dest('app/css/'));
// });

//Default Task
//This is a runner that runs all other tasks
//Pass in all tasks in array here.
gulp.task('default', ['scripts','browser-sync','html','watch']);

//plumber ensures that if there is an error during watch
//it will continue to run
