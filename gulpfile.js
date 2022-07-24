import gulp from 'gulp';
import pump from 'pump';

// gulp plugins and utils
import livereload from 'gulp-livereload';
import postcss from 'gulp-postcss';
import gulpZip from 'gulp-zip';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import beeper from 'beeper';

// postcss plugins
import autoprefixer from 'autoprefixer';
import colorFunction from 'postcss-color-mod-function';
import cssnano from 'cssnano';
import easyImport from 'postcss-easy-import';

const {series, watch, src, dest, parallel} = gulp;

function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    pump([
        src('assets/css/*.css', {sourcemaps: true}),
        postcss([
            easyImport,
            colorFunction(),
            autoprefixer(),
            cssnano()
        ]),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function js(done) {
    pump([
        src([
            // pull in lib files first so our own code can depend on it
            'assets/js/lib/*.js',
            'assets/js/*.js'
        ], {sourcemaps: true}),
        concat('blog-theme.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    // Sorry, I am too lazy to load the theme name from the package.json file.
    const filename = 'blog-theme.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!yarn-error.log',
            '!yarn.lock',
            '!gulpfile.js'
        ]),
        gulpZip(filename),
        dest('dist/')
    ], handleError(done));
}

const cssWatcher = () => watch('assets/css/**', css);
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const jsWatcher = () => watch('assets/js/**', js);
const watcher = parallel(cssWatcher, hbsWatcher, jsWatcher);

export const build = series(css, js);
export const zip = series(build, zipper);
export default series(build, serve, watcher);
