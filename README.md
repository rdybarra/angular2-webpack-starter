**Angular 2 starter kit using:**
* typscript
* lite-server (browser-sync)
* webpack

Tries to be as minimal as possible.

## Usage

Starts webpack in watch mode and runs lite-server:
```
npm start
```

Build the javascript dependencies:
```
npm run build
```

## Configuration
- bs-config.json: Browser Sync configuration options. Used by lite-server.
- package.json: NPM dependencies and scripts. Used by webpack and our main app. (See Appendix A below)
- tsconfig.json: Rules for typscript. Used by typsecript.
- typings.json: Imports additional syntax definitions for typescript. Used in the postintall npm script in generating the typing definitions that will ultimately be used by typescript.
- tslint.json: Linter rules for our typsecript. To make it look pretty :)
- webpack.config.js: Used by webpack. (See Appendix B below)

## Direction
* Better use of npm scripts
* SASS loading for CSS
* Test tooling

---

## Appendix

### Apendix A: package.json

This is a brief overview of the package.json file. Explaining its composition.

#### Scripts
```
  "scripts": {
    "start": "lite-server & webpack --watch",
    "build": "webpack",
    "postinstall": "typings install"
  }
```
- `start`: runs the development serer and turn webpack on in watch mode.
- `build`: runs webpack once to generate the assets.
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
- lite-server: let's us run a server in our local environment.
- typescript: the typescript language
- typings: used by typescript to manage definitions. It needs to be ran as a `postinstall` script. Without it, you get a lot of missing and unrecognzied syntax.
- webpack: compiles our typscript and bundles our assets.
- ts-loader: a webpack loader to load typescript files

### Apendix B: webpack.config.json

Webpack has two entry points:
```
vendor: './client-app/vendor.ts',
app: './client-app/main.ts'
```

The `vendor.ts` file is composed of the polyfills and Angular libraries. The `main.ts` file contains the bootstrap method that launches your app.

After Webpack runs on those, the built files are placed into `public/js/vendor.js` and `public/js/app.js` respectively.

Those files must be included in your HTML.