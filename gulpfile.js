const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine');
const zip = require('gulp-zip');
const gulpClean = require('gulp-clean');

gulp.task('lint', () =>
  gulp.src(['extension/**/*.js', '!extension/jquery-*.js', 'spec/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('test', () =>
  gulp.src('spec/*_spec.js')
    .pipe(jasmine())
);

gulp.task('build', () =>
  gulp.src('extension/**/*')
    .pipe(zip('yahoo-pre-draft.zip'))
    .pipe(gulp.dest('dist'))
);

gulp.task('clean', () =>
  gulp.src('dist/', {read: false, allowEmpty: true})
    .pipe(gulpClean())
);

gulp.task('default', gulp.series('lint', 'test'));
