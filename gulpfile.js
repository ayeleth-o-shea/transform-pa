'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  vendor: {
    js: 'app/js/',
    css: 'app/css/',
    fonts: 'app/fonts/'
  },
  dist: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'dist/',
    php: 'dist/',
    js: 'dist/js/',
    scss: 'dist/css/',
    css: 'dist/css/',
    img: 'dist/img/',
    fonts: 'dist/fonts/'
  },
  app: { //Пути откуда брать исходники
    html: 'app/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    php: 'app/*.php',
    js: 'app/js/*.js', //В стилях и скриптах нам понадобятся только main файлы
    scss: 'app/css/*.scss',
    css: 'app/css/*.css',
    img: 'app/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    fonts: 'app/fonts/**/*.*'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'app/**/*.html',
    php: 'app/**/*.php',
    js: 'app/js/**/*.js',
    scss: 'app/css/**/*.scss',
    css: 'app/css/**/*.css',
    img: 'app/img/**/*.*',
    fonts: 'app/fonts/**/*.*'
  },
  clean: './dist'
};

var config = {
  proxy: "transform",
  notify: false
};

gulp.task('html:build', function() {
  gulp.src(path.app.html) //Выберем файлы по нужному пути
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest(path.dist.html)) //Выплюнем их в папку build
    .pipe(reload({
      stream: true
    })); //И перезагрузим наш сервер для обновлений
});

gulp.task('php:build', function() {
  gulp.src(path.app.php) //Выберем файлы по нужному пути
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest(path.dist.php)) //Выплюнем их в папку build
    .pipe(reload({
      stream: true
    })); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function() {
  gulp.src(path.app.js) //Найдем наш main файл
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest(path.dist.js)) //Выплюнем готовый файл в build
    .pipe(reload({
      stream: true
    })); //И перезагрузим сервер
});

gulp.task('scss:build', function() {
  gulp.src(path.app.scss) //Выберем наш main.scss
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sass()) //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.scss)) //И в build
    .pipe(reload({
      stream: true
    }));
});

gulp.task('css:build', function() {
  gulp.src(path.app.css) //Выберем наш main.css
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest(path.dist.css)) //И в build
    .pipe(reload({
      stream: true
    }));
});

gulp.task('image:build', function() {
  gulp.src(path.app.img) //Выберем наши картинки
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.dist.img)) //И бросим в build
    .pipe(reload({
      stream: true
    }));
});

gulp.task('fonts:build', function() {
  gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('build', [
  'html:build',
  'php:build',
  'js:build',
  'scss:build',
  'css:build',
  'fonts:build',
  'image:build'
]);

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.php], function(event, cb) {
    gulp.start('php:build');
  });
  watch([path.watch.scss], function(event, cb) {
    gulp.start('scss:build');
  });
  watch([path.watch.css], function(event, cb) {
    gulp.start('css:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('webserver', function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
