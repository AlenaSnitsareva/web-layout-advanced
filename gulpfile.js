const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
var imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

const clean = () => {
  return del(['dist']);
};

const fonts = () => {
  return src('src/assets/fonts/*', { encoding: false }).pipe(
    dest('dist/fonts')
  );
};

const stylesDev = () => {
  return src('src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(
      autoprefixes({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
};
const stylesBuild = () => {
  return src('src/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(
      autoprefixes({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
};
const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('src/assets/img/svg/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('dist/img'));
};

const scriptsDev = () => {
  return src(['src/js/components/**/*.js', 'src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
};

const scriptsBuild = () => {
  return src(['src/js/components/**/*.js', 'src/js/main.js'])
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(concat('app.js'))
    .pipe(
      uglify({
        toplevel: true,
      }).on('error', notify.onError())
    )
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
};

const images = () => {
  return src(
    [
      'src/assets/img/**/*.jpg',
      'src/assets/img/**/*.png',
      'src/assets/img/*.svg',
      'src/assets/img/**/*.jpeg',
      'src/assets/img/**/*.webp',
    ],
    { encoding: false }
  )
    .pipe(
      imagemin({
        verbose: true,
      })
    )
    .pipe(
      image({
        jpegRecompress: true,
        jpegoptim: false,
        mozjpeg: true,
        concurrent: 10,
      })
    )
    .pipe(dest('dist/img'));
};

watch('src/**/*.html', htmlMinify);
watch('src/assets/sass/**/*.scss', stylesDev);
watch(
  [
    'src/assets/img/**/*.jpg',
    'src/assets/img/**/*.png',
    'src/assets/img/*.svg',
    'src/assets/img/**/*.jpeg',
    'src/assets/img/**/*.webp',
  ],
  images
);
watch('src/css/**/*.css', stylesBuild);
watch('src/assets/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scriptsDev);
watch('src/js/**/*.js', scriptsBuild);

exports.styles = stylesDev;
exports.htmlMinify = htmlMinify;
exports.clean = clean;

exports.default = series(
  clean,
  fonts,
  htmlMinify,
  scriptsDev,
  stylesDev,
  images,
  svgSprites,
  watchFiles
);
exports.build = series(
  clean,
  fonts,
  htmlMinify,
  scriptsBuild,
  stylesBuild,
  images,
  svgSprites,
  watchFiles
);
