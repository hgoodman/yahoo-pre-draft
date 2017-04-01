const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const zip = require('gulp-zip');
const fs = require('fs-extra');

gulp.task('default', () =>
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
