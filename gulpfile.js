const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine');
const zip = require('gulp-zip');
const fs = require('fs-extra');

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
  fs.removeSync('dist/')
);

gulp.task('default', ['lint', 'test']);
