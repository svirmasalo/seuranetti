const gulp 	= require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
 
gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
    	browsers:['last 2 versions'],
    	cascade:false,
    }))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('watch',()=>{
	gulp.watch('./public/sass/**/*.scss',['sass']);
})


gulp.task('start', ['sass']);