var gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDocs',['build'],function(){
    browserSync.init({
		notify: false,
		server: {
			baseDir: ""
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
        './app/temp/styles/fonts/**/*',
        '!./app/index.html',
        '!./app/assets/scripts/*',
        '!./app/assets/scripts/**/*',
        '!./app/assets/images/**',
        '!./app/assets/styles/base',
        '!./app/assets/styles/base/*',
        '!./app/assets/styles/module*',
        '!./app/assets/styles/module*/**',
        '!./app/assets/styles/style.css',
        '!./app/temp',
        '!./app/temp/**',
        '!./app/temp/**/*',
        '!./app/assets/styles/fonts/specimen_files',
        '!./app/assets/styles/fonts/specimen_files/*',
        '!./app/assets/styles/fonts/*.txt',
        '!./app/assets/styles/fonts/*.html',
        '!./app/assets/styles/fonts/*.ttf',
        '!./app/assets/styles/fonts/*.css',
        './app/assets/styles/fonts/*.woff',
        './app/assets/styles/fonts/*.woff2',
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
        css: [function(){return rev();}],
        js: [function(){return rev();}, function(){return uglify();}]
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('build',['deletedocsFolder','optimizeImages','usemin','copyGeneralFiles','favicon']);