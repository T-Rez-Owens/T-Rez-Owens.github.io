var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewdocs',function(){
    browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"
		}
	
	});
});

gulp.task('deletedocsFolder',function(){
    return del("./docs");
});

gulp.task('copyGeneralFiles', ['deletedocsFolder'],function(){
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/scripts/*',
        '!./app/assets/scripts/**/*',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/temp',
        '!./app/temp/**'
    ];
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deletedocsFolder','icons'],function() {
    return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
    .pipe(imageMin({
        progressive: true,
        interlaces: true,
        multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin',['deletedocsFolder', 'css','scripts'],function(){
    return gulp.src("./app/index.html")
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function(){return rev()}, function(){return uglify()}]
    }))
    .pipe(gulp.dest("./docs/"));
});

gulp.task('build',['deletedocsFolder','optimizeImages','usemin','copyGeneralFiles']);