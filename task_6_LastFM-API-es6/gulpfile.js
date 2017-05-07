var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require("gulp-babel");

gulp.task('default', function() {
  return gulp.src(['./lib/request.js','./lib/*.js', "./main.js"])
    .pipe(concat('all.js'))
    .pipe(babel())
    .pipe(gulp.dest('./'));
});
