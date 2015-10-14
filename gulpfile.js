var gulp        = require('gulp')
  , gutil       = require('gulp-util')
  , browserify  = require('browserify')
  , watchify    = require('watchify')
  , source      = require('vinyl-source-stream')
  , buffer      = require('vinyl-buffer')
  , karma       = require('karma')
  , $           = require('gulp-load-plugins')()
  , extend      = require('object-extend')
  , del         = require('del')

function browserifySrc (options) {
  var b = browserify(extend({
    debug: true,
    entries: 'src/index.js'
  }, options))

  b.on('error', gutil.log)

  return b
}

function browserifyTests (options) {
  var b = browserify(extend({
    entries: 'tests/immutable-stack.spec.js',
    paths  : [ '.' ]
  }, options))

  b.on('error', gutil.log)

  return b
}

function bundler (b, name, dest) {
  return function () {
    return b.bundle()
      .pipe(source(name))
      .pipe(buffer())
      .pipe(gulp.dest(dest || 'dist'))
  }
}

function karmaServer (done, options) {
  return new karma.Server(extend({
    configFile: __dirname + '/karma.conf.js'
  }, options), done)
}

gulp.task('bundle:src', function () {
  var b = browserifySrc()
  var bundle = bundler(b, 'immutable-stack.js')
  return bundle()
})

gulp.task('bundle:src:watch', function () {
  var b = browserifySrc()
  b     = watchify(b)

  var bundle = bundler(b, 'immutable-stack.js')

  b.on('update', bundle)
  b.on('log', gutil.log)

  bundle()
})

gulp.task('bundle:test', function () {
  var b = browserifyTests()

  var bundle = bundler(b, 'immutable-stack.spec.js', 'dist/tests')

  bundle()
})

gulp.task('bundle:test:watch', function () {
  var b = browserifyTests()
  b = watchify(b)

  var bundle = bundler(b, 'immutable-stack.spec.js', 'dist/tests')

  b.on('update', bundle)
  b.on('log', gutil.log)

  bundle()
})

gulp.task('clean', function () {
  return del('dist')
})

gulp.task('bundle', [ 'bundle:src', 'bundle:test' ])
gulp.task('bundle:watch', [ 'bundle:src:watch', 'bundle:test:watch' ])

gulp.task('tdd', [ 'bundle:watch' ], function (done) {
  var server = karmaServer(done)

  return server.start()
})

gulp.task('test', [ 'bundle' ], function (done) {
  var server = karmaServer(done, {
    singleRun : true
  })

  return server.start()
})
