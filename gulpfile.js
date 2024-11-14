const preprocess = require("gulp-preprocess");
const gulp = require("gulp");

gulp.task("leaflet", () => {
  return gulp
    .src(
      [
        "./node_modules/leaflet/dist/images/*",
        "./node_modules/leaflet/dist/leaflet.css",
        "./node_modules/leaflet/dist/leaflet.js",
      ],
      { base: "./node_modules/leaflet/dist" },
    )
    .pipe(gulp.dest("./dist/vendor/leaflet"));
});

gulp.task("html", () => {
  return gulp
    .src("./src/*.html")
    .pipe(
      preprocess({
        context: {
          DEBUG: process.env.DEBUG || false,
          BACKEND_URL: process.env.BACKEND_URL,
        },
      }),
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("watch", () => {
  gulp.watch("./src/*.html", gulp.series("html"));
});

gulp.task("default", gulp.series("leaflet", "html", "watch"));
