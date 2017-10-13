const gulp 	= require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const serve = require('gulp-serve');
const concat = require('gulp-concat');
 
gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('serve', serve({
  root: ['./public'],
  port: 3000,
}));

gulp.task('babel', () => {
	gulp.src(['./public/js/**/*.js'])
		.pipe(babel({
			presets:['env'],
		}))
		.pipe(gulp.dest('./public/dist/'))
}
);

gulp.task('watch',()=>{
	gulp.watch('./public/sass/**/*.scss',['sass']);
	gulp.watch('./public/js/**/*.js',['babel']);
})



gulp.task('start', ['sass','babel', 'serve', 'watch']);