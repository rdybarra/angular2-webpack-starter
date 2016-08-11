**Angular 2 starter kit using:**
* Typscript
* Webpack for JS
* Gulp for SCSS and misc.
* Browsersync

Tries to be as minimal as possible.

## Usage

Starts webpack in watch mode and, launches Browsersync and starts scss watching:
```
npm start
```

Build the javascript and scss dependencies (no watching or Browsersync):
```
npm run build
```

## Configuration
- package.json: NPM dependencies and scripts. Used by webpack and our main app. (See Appendix A below)
- tsconfig.json: Rules for typscript. Used by typsecript.
- typings.json: Imports additional syntax definitions for typescript. Used in the postintall npm script in generating the typing definitions that will ultimately be used by typescript.
- tslint.json: Linter rules for our typsecript. To make it look pretty :)
- webpack.config.js: Used by webpack. (See Appendix B below)

## Directory Structure
In many cases you want your client app to be in the same repo as your server-side app. Instead of having a mysterioues `src` directory at the root level, I put it inside `client_app`. Your Angular code would be located in the `src` directory inside `client_app`. Everything you need to build is in the root directory of `client_app`. When you build, you will get a `node_modules` and a `typings` directory inside `client_app` as well.

Lastly, the build process looks for a directory called `public` that is one level up. That's a very common scenario. In parallel with your `public` and `client_app` you could imagine an `app` directory if you're using something like Laravel or Rails, or `routes` if you're using Express.

## Why gulp?
The way that scss is often included in webpack is via the [Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin). Ultimately, plugging in the sample code led to errors. It apparently doesn't work with all versions of node. In any event I found myself asking why I was going through all the yak-shaving when I like gulp.

Additionally, I just don't like the idea of having to `require` a scss file in a JS file to get it to be built. It basically takes a file that would otherwise be bundled in the JS package and strips it out and lets you do things to it. I understand they did that. That's how webpack works. But, it just didn't feel right to me. So for these reasons, I chose to go back to comfortable Gulp land to handle scss and browser syncing.

---

## Appendix

### Apendix A: package.json

This is a brief overview of the package.json file. Explaining its composition.

#### Scripts
```
  "scripts": {
    "start": "gulp serve & webpack --watch",
    "build": "gulp & webpack",
    "postinstall": "typings install"
  }
```
- `start`: turns webpack on in watch mode, launches Browsersync and starts scss watching:
- `build`: runs webpack once to generate the assets. Also build the scss via gulp.
- `postinstall`: installs type definitions that typescript needs lest you get many errors.

#### Production dependencies

To start, our only dependencies for runtime are Angular libraries and the polyfills that it needs.

Concerning the Angular core files. **These modules make use of NPM's peer dependencies... so even if you don't use them expclicitely, they still will cause errors if they are missing and they won't be installed automatically.**

These are the modules I expclicitely use:
- @angular/core: The core angular library.
- @angular/platform-browser-dynamic: Lets us bootstrap angular for web sites.

These are the peer dependencies of those modules:
- @angular/platform-browser
- @angular/compiler
- @angular/common

Polyfills on which Angular depends:
- core-js
- reflect-metadata
- rxjs
- zone.js

#### Dev dependencies

These dependencies are used during the build process:
- typescript: the typescript language
- typings: used by typescript to manage definitions. It needs to be ran as a `postinstall` script. Without it, you get a lot of missing and unrecognzied syntax.
- webpack: compiles our typscript and bundles our assets.
- ts-loader: a webpack loader to load typescript files
- gulp: task runner, used for scss watching and building, and Browsersync
- gulp-autoprefixer: used to make compiled css include vendor prefixes to be more robust.
- gulp-sass: converts scss to css
- gulp-sourcemaps: provides scss sourcemaps in the css for easier debugging.
(browsersync is recommended to be installed globally: `npm install -g browser-sync`)

### Apendix B: webpack.config.json

Webpack has two entry points:
```
vendor: './src/vendor.ts',
app: './src/main.ts'
```

The `vendor.ts` file is composed of the polyfills and Angular libraries. The `main.ts` file contains the bootstrap method that launches your app.

After Webpack runs on those, the built files are placed into `public/js/vendor.js` and `public/js/app.js` respectively.

Those files must be included in your HTML.