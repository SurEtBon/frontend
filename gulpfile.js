const preprocess = require("gulp-preprocess");
const realFavicon = require("@realfavicongenerator/gulp-real-favicon");
const fs = require("fs");
const gulp = require("gulp");

const FaviconDataFile = "faviconData.json";

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
  gulp.watch("./src/*.html", gulp.series("html", "inject-favicon-markups"));
});

gulp.task("generate-favicon", function (done) {
  realFavicon.generateFavicon(
    {
      masterIcon: "./src/light-mode-favicon.svg",
      dest: "./dist",
      settings: {
        path: "./",
        icon: {
          desktop: {
            darkIconTransformation: {
              type: "background",
              backgroundColor: "#000000",
              backgroundRadius: 1,
              imageScale: 1,
              brightness: 1,
            },
            darkIconType: "specific",
            regularIconTransformation: {
              type: "background",
              backgroundColor: "#ffffff",
              backgroundRadius: 1,
              imageScale: 1,
              brightness: 1,
            },
          },
          touch: {
            transformation: {
              type: "background",
              backgroundColor: "#ffffff",
              backgroundRadius: 0,
              imageScale: 1,
              brightness: 1,
            },
            appTitle: "SûrEtBon",
          },
          webAppManifest: {
            transformation: {
              type: "background",
              backgroundColor: "#ffffff",
              backgroundRadius: 0,
              imageScale: 1,
              brightness: 1,
            },
            name: "SûrEtBon",
            shortName: "SûrEtBon",
            backgroundColor: "#ffffff",
            themeColor: "#ffffff",
          },
        },
      },
      markupFile: FaviconDataFile,
    },
    function () {
      done();
    },
  );
});

gulp.task("inject-favicon-markups", function () {
  return gulp
    .src(["./dist/*.html"])
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FaviconDataFile)),
      ),
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", gulp.series("leaflet", "html", "generate-favicon"));
