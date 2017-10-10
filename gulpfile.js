var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('del');
var streamqueue  = require('streamqueue');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var watch = require('gulp-watch');

gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('bcpie', function() {
	return streamqueue({ objectMode: true },
			gulp.src('node_modules/js-cookie/src/js.cookie.js'),
			gulp.src('node_modules/alertify-js/lib/alertify.js'),
			gulp.src('node_modules/moment/moment.js'),
			gulp.src('node_modules/moment/locale/es.js'),
			gulp.src('node_modules/moment/locale/de.js'),
			gulp.src('node_modules/moment/locale/it.js'),
			gulp.src('node_modules/moment/locale/fr.js'),
			gulp.src('node_modules/moment/locale/pt.js'),
			gulp.src('node_modules/moment/locale/ru.js'),
			gulp.src('node_modules/moment-timezone/moment-timezone-with-data-2012-2022.js'),
			gulp.src('node_modules/moment-timezone/moment-timezone-utils.js'),
			gulp.src('node_modules/moment-parseformat/dist/moment-parseformat.js'),
			gulp.src('node_modules/moment-duration-format/lib/moment-duration-format.js'),
			gulp.src('node_modules/jquery.mobilephonenumber/lib/jquery.mobilePhoneNumber.js'),
			gulp.src('node_modules/expr-eval/dist/bundle.js'),
			gulp.src('src/bcpieSDK.js'),
			gulp.src('src/tricks/*.js')
		)
		.pipe(concat('bcpie.js', {newLine: ';'}))
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(rename('bcpie.min.js'))
		.pipe(gulp.dest('dist'))
		.on('error', gutil.log);
});

gulp.task('watch', function () {
	watch(['src/bcpieSDK.js','src/tricks/*.js'], function () {
		gulp.start('bcpie');
	});
});

// Update bower_components folder with "yarn upgrade --latest"
// Update dist folder manually with "bcpie"
// Update dist folder automatically with "gulp watch"