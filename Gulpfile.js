var gulp           = require("gulp"),
    concat         = require("gulp-concat"),
    uglify         = require("gulp-uglify"),
    cssmin         = require("gulp-cssmin"),
    uncss          = require("gulp-uncss"),
    imagemin       = require("gulp-imagemin"),
    sourcemaps     = require("gulp-sourcemaps"),
    inject         = require("gulp-inject"),
    filter         = require("gulp-filter"),
    glob           = require("glob"),
    del            = require("del"),
    browserSync    = require("browser-sync");

var config = {
    paths: {
        html: {
            src:  "src/**/*.html",
            dest: "build"
        },
        javascript: {
            src:  ["src/js/**/*.js"],
            dest: "build/js"
        },
        css: {
            src: ["src/css/**/*.css"],
            dest: "build/css",
            vendor: "build/css/vendor"
        },
        images: {
            src: ["src/img/**/*.jpg", "src/img/**/*.jpeg", "src/img/**/*.png"],
            dest: "build/img"
        },
        npm: {
            src: "node_modules"
        },
        verbatim: {
            src: ["src/manifest.json", "src/favicon.png"],
            dest: "build"
        }
    }
};

gulp.task("clean", function(){
  return del([
    'build/**/*'
  ]);
});

gulp.task("html", function(){
    return gulp.src(config.paths.html.src)
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task("scripts", function(){
    return gulp.src(config.paths.javascript.src)
        .pipe(sourcemaps.init())
        //.pipe(concat("app.min.js"))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.javascript.dest));
});

gulp.task("css", function(){
    return gulp.src(config.paths.css.src)
        .pipe(sourcemaps.init())
        //.pipe(cssmin())
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.paths.css.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("css:vendor", function(){
  return gulp.src(config.paths.npm.src + '/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(config.paths.css.vendor));
});

gulp.task("images", function(){
    return gulp.src(config.paths.images.src)
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.paths.images.dest));
});

gulp.task("verbatim", function(){
    gulp.src(config.paths.verbatim.src)
        .pipe(gulp.dest(config.paths.verbatim.dest));
});

gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task("build", ["html", "scripts", "css", "css:vendor", "images", "verbatim"]);

gulp.task("default", ["build", "browser-sync"], function(){
    gulp.watch(config.paths.html.src, ["html", browserSync.reload]);
    gulp.watch(config.paths.javascript.src, ["scripts", browserSync.reload]);
    gulp.watch(config.paths.images.src, ["images", browserSync.reload]);
    gulp.watch(config.paths.verbatim.src, ["verbatim", browserSync.reload]);

    gulp.watch(config.paths.css.src, ["css"]);
});
