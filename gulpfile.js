const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass'); //sass转换成css
const less = require('gulp-less'); //less转换成css
const htmlmin = require('gulp-htmlmin'); //html压缩
const rename = require('gulp-rename'); //改名
const uglify = require('gulp-uglify'); //js压缩
const img64 = require('gulp-img64'); //压缩base64
// const cssBase64 = require('gulp-css-base64'); //压缩css的base64
const base64 = require('gulp-base64'); // 转化成base64
const cssmin = require('gulp-clean-css'); //压缩css
const autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
const imagemin = require('gulp-imagemin'); //压缩图片
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache'); //记录缓存
const browserSync = require('browser-sync').create(); // 安装服务
const del = require('del');
const babel = require("gulp-babel"); //es6转es5
const jsonminify = require('gulp-jsonminify2'); // json压缩

//less转为css，再压缩
gulp.task('less', function () {
  gulp.src(['moss/src/**/**/**/*.less', 'moss/src/**/**/*.less', 'moss/src/*.less'])
      .pipe(less())
      .pipe(cssmin({
        keepSpecialComments: '*'
        //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      }))
      .pipe(rename(function(path){
          path.extname = '.wxss';
      }))
      .pipe(gulp.dest('moss/dist'))
});

//sass转为css，再压缩
gulp.task('sass', () => {
  gulp.src(['moss/src/**/**/**/*.scss', 'moss/src/**/**/*.scss', 'moss/src/*.scss'])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(base64({
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
      maxImageSize: 1024 * 500,
      debug: false
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: false
    }))
    .pipe(cssmin({
      keepSpecialComments: '*'
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }))
    .pipe(rename((path) => {
      path.extname = ".wxss";
    }))
    .pipe(gulp.dest('moss/dist'));
});

//压缩html
gulp.task('html', () => {
  gulp.src(['moss/src/**/**/*.wxml', 'moss/src/**/**/**/*.wxml'])
    .pipe(htmlmin({
      collapseWhitespace: true, // 压缩HTML
      removeComments: true, // 清除HTML注释
      keepClosingSlash: true // 保持元素末尾的斜杠
    }))
    // .pipe(img64({
    //   extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
    //   maxImageSize: 1024 * 5,
    //   debug: false
    // }))
    .pipe(rename((path) => {
      path.extname = ".wxml";
    }))
    .pipe(gulp.dest('moss/dist'));
});

//压缩js
gulp.task('js', () => {
  gulp.src(['moss/src/*.js', 'moss/src/**/*.js', 'moss/src/**/**/*.js', 'moss/src/**/**/**/*.js'])
    .pipe(babel())
    .pipe(uglify({
      compress: true,
      // mangle: { except: ['require', 'exports', 'module', '_', 'config'] } // 排除混淆关键字
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('moss/dist'));
});

//压缩json
gulp.task('json', () => {
  gulp.src(['moss/src/*.json', 'moss/src/**/**/*.json', 'moss/src/**/**/**/*.json'])
    .pipe(jsonminify())
    .pipe(gulp.dest('moss/dist'));
});

// 压缩图片  
gulp.task('imagemin', () => {
  gulp.src(['moss/src/**/*.{png,jpg,gif,ico}'])
    .pipe(cache(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('moss/dist'));
});

//删除dist下的所有文件  
gulp.task('delete', (cb) => {
  del(['moss/dist/*'], cb);
});

//移动wxs文件  
gulp.task('wxs', () => {
  gulp.src(['moss/src/filter/*.wxs'])
  .pipe(gulp.dest('moss/dist/filter'));
});

//监听
gulp.task('watch', () => {
  gulp.watch(['moss/src/**/**/**/*.less', 'moss/src/**/**/*.less', 'moss/src/*.less'], ['less']);
  gulp.watch(['moss/src/**/**/*.wxml', 'moss/src/**/**/**/*.wxml'], ['html']);
  gulp.watch(['moss/src/*.js', 'moss/src/**/*.js', 'moss/src/**/**/*.js', 'moss/src/**/**/**/*.js'], ['js']);
  gulp.watch(['moss/src/*.json', 'moss/src/**/**/*.json', 'moss/src/**/**/**/*.json'], ['json']);
  gulp.watch('moss/src/images/*.{png,jpg,gif,ico}', ['imagemin']);
  gulp.watch('moss/src/filter/*.wxs', ['wxs']);
});

gulp.task('dev', ['less', 'html', 'js', 'json', 'imagemin', 'watch','wxs']);

// gulp.task('default',['serve']);