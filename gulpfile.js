'use strict';

const config = require('./gulp.config')();
const port = process.env.PORT || config.defaultPort; //devPort

const gulp = require('gulp');
const args = require('yargs').argv;

const browserSync = require('browser-sync');
const runSequence = require('run-sequence');
const del = require('del');
const path = require('path');

const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins({lazy: true});
const $css =  loadPlugins({pattern: 'postcss-*', replaceString: /^postcss-/});
const autoprefixer = require('autoprefixer');

gulp.task('help', $.taskListing);
gulp.task('default', ['start']);

gulp.task('start', ['build'], () => {
    log('Starting nodemon');

	let nodeOptions = getNodeOptions();

    if (args.verbose) {
        console.log(nodeOptions);
    }

	return $.nodemon(nodeOptions)
		.on('start', function () {
	       log('*** nodemon started');
	       startBrowserSync();
	   	})
		.on('restart', ev => {
		    log('*** nodemon restarted');
		    log('files changed:\n' + ev);

		    setTimeout(function() {
		        browserSync.notify('reloading now ...');
		        browserSync.reload({stream: false});
		    }, config.browserReloadDelay);
		})
		.on('crash', function () {
		    log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', function () {
		    log('*** nodemon exited cleanly');
		});
});

gulp.task('build',  (cb) => {
    log('Building project');

    runSequence('clean', 'copy', 'css', cb);
});

gulp.task('clean',  () => {
    let delConfig = [].concat(config.dist);
	log('Cleaning: ' + $.util.colors.blue(delConfig));
	return del(delConfig);
});

gulp.task('copy',  () => {
    log('Copying files to dist');

    return gulp.src([
        config.src + '**/*',
        '!' + config.srcClient + '**/styles/*.css'
    ])
    .pipe(gulp.dest(config.dist));
});

gulp.task('css', function () {
    log('Processing css');

    let processors = [
      autoprefixer, $css.assets, $css.import, $css.mixins,
      $css.simpleVars, $css.nested, $css.customMedia,
      $css.mediaMinmax, $css.clearfix, $css.focus,
      $css.brandColors, $css.colorAlpha,$css.colorFunction,
      $css.calc, $css.size, $css.easings,
      $css.willChange
      /*cssnext, precss*/
    ];
    
    return gulp.src(config.srcCss)
      .pipe($.postcss(processors))
      .pipe(gulp.dest(config.distClient));
});

//========================================
function getNodeOptions() {
    return {
        script: config.nodeServer,
        delayTime: 1, //in seconds
        env: {
            'PORT': port
        },
        watch: [config.distServer]
    };
}

function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);

    watch();

	let options = {
        proxy: 'localhost:' + port,
        port: config.browserSyncPort,
        files: [
            config.distClient + '**/*.*'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logPrefix: 'browser-sync',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}

function watch(){
    gulp.watch([config.srcCss], ['css']);

    $.watch([
        config.src + '**/*',
        '!' + config.srcClient + '**/styles/*.css'
    ], {
        base: config.src, 
        verbose: true,
        ignoreInitial: true
    })
    .pipe(gulp.dest(config.dist));
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
