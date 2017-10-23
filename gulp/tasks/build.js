var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
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
        './app/temp/styles*.css',
        './app/assets/styles/fonts/**/*',
        '!./app/index.html',
        '!./app/assets/scripts/*',
        '!./app/assets/scripts/**/*',
        '!./app/assets/images/**',
        '!./app/assets/styles/bas*',
        '!./app/assets/styles/module*',
        '!./app/assets/styles/module*/**',
        '!./app/assets/styles/style.css',
        '!./app/temp',
        '!./app/temp/**'
    ];
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deletedocsFolder'],function() {
    return gulp.src(["./app/assets/images/**/*", '!./app/assets/images/icons',"!./app/assets/images/icons/**/*"])
    .pipe(imageMin({
        progressive: true,
        interlaces: true,
        multipass: true
    },{
        verbose: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin',['deletedocsFolder', 'css','scripts'],function(){
    return gulp.src("./app/index.html")
    .pipe(usemin({
        js: [function(){return rev();}, function(){return uglify();}]
    }))
    .pipe(gulp.dest("./docs/"));
});

gulp.task('build',['deletedocsFolder','usemin','copyGeneralFiles']);