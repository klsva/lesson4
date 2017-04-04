'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    mainfiles = require('main-bower-files'),
      clean = require('gulp-clean'),
      soursemaps = require('gulp-sourcemaps'),
      var sftp = require('gulp-sftp'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function(done){
    gulp.src('./build/*', {read:false}) //удаляет и не читает файл
//    .on('data', function(file){
//        console.log({
//            relative:file.relative,
//            content:file.contents
//        })
//        })
        .pipe(clean());
   
    done();
});

gulp.task('fonts', function(done){
    gulp.src(mainfiles(["**/*.{ttf,woff,woff2,eot,svg,otf}"],{
        "overrides":{
            "font-awesome":{
                "main":[
                    "fonts/*.*"
                ]
            },
            "bootstrap-sass":{
                "main":[
                    "assets/fonts/bootstrap/*.*"
                ]
            }
        }
       
    }))
    .pipe(gulp.dest('./build/fonts'));
    done();
});

//вариант, если тот не работает
//gulp.task('fonts', function(done){
//    gulp.src('./bower_components/**/*.*')
//    .pipe(gulp.dest('./build'));
//    done();
//});

gulp.task('js', function(done){
    gulp.src(mainfiles(["**/*.js"],{
        "overrides":{
            "jquery":{
                "main":[
                    "dist/jquery.min.js"
                ]
            },
            "bootstrap-sass":{
                "main":[
                    "assets/javascripts/bootstrap.min.js"
                ]
            }
        }
       
    }))
    .pipe(gulp.dest('./src/js'));
    done();
});

gulp.task('default', function () {
    return gulp.src('src/*')
        .pipe(sftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234'
        }));
});



