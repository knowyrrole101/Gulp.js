//Required
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

//Scripts Tasks
gulp.task('scripts', function(){
  //Glob Pattern
  //includes all js files and sub directories
  gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
  //bangs exclude
  //!css/style.css
});

//Default Task
//This is a runner that runs all other tasks
//Pass in all tasks in array here.
gulp.task('default', ['scripts']);
