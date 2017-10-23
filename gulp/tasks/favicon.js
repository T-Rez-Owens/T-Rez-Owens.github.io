var gulp = require('gulp'),
ico = require('gulp-to-ico');

gulp.task('favicon', function() {
 return gulp.src('./app/assets/images/icons/favicon/*.png')
   .pipe(ico('favicon.ico'))
   .pipe(gulp.dest('./'));
});