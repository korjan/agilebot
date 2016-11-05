var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject('tsconfig.json');

gulp.task("default",  () => {
  return gulp
    .src("src/**/*.ts")
    .pipe(tsProject())
    .js
    .pipe(gulp.dest("dist"));
});
