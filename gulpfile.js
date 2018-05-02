const gulp          = require('gulp')
    , http          = require('http')
    , sass          = require('gulp-sass')
    , pug           = require('gulp-pug')
    , minify        = require('gulp-cssnano')
    , liveReload    = require('gulp-livereload')
    , st            = require('st')
    , path          = require('path')
    , plumber       = require('gulp-plumber')
    
gulp.task('copy', () => {
    gulp.src([
        'dev/dist/**/*.*',
        '!dev/dist/**/*.scss'

    ])
        .pipe(gulp.dest('./prod/dist'))
})

gulp.task('sass', () => {
   gulp.src('./dev/dist/main/scss/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit('end');
                }
            })
        )
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest('./prod/dist/main/css'))
        .pipe(liveReload())
});

gulp.task('pug', () => {
    gulp.src('./dev/*.pug')
    .pipe(plumber({
        errorHandler: function (error) {
                console.log(error.toString());
                this.emit('end');
            }
        })
    )
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./prod'));
})

gulp.task('watch-sass', () => {
    liveReload.listen();
    gulp.watch([
        './dev/dist/main/scss/**/*.scss'],
        ['sass']);
})
gulp.task('watch-pug', () => {
    liveReload.listen();
    gulp.watch([
        './dev/**/*.pug'], 
        ['pug']);
})

gulp.task('server', function(done) {
    http.createServer(
      st({ path: __dirname + '/prod', index: 'index.html', cache: false })
    ).listen(8080, done);
    gulp.run(['watch-sass', 'watch-pug', 'copy'])
});

