var gulp = require('gulp');
var del = require('del');
var requirejsOptimize = require('gulp-requirejs-optimize');
var bower = require('main-bower-files');

requireJS_config = {
    baseUrl: 'src/js',
    name: 'app',
    out: 'app.js'
};

gulp.task('clean:dist', function() {
    return del(['dist']);
});

gulp.task('move:dependencies', ['clean:dist'], function() {
    return gulp.src(bower()).pipe(gulp.dest('dist/js/extern'));
});

gulp.task('make:dev', ['move:dependencies'], function() {
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
    gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js'));
    gulp.src('src/js/app.js')
        .pipe(requirejsOptimize({optimize: 'none'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('dev', function() {
    gulp.watch(['./src/**/*', './gulpfile.js', './*.json'], ['make:dev']);
})

gulp.task('build', ['make:dev']);