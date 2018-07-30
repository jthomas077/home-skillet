# Home Skillet
> Front End Build Toolkit

[![npm][npm-image]]()

[![Dependency Status][dep-image]][dep-url] [![devDependency Status][dev-dep-image]][dev-dep-url]

[![MIT][mit-image]][mit-url]

## Getting Started

### Requirements
* [Node][node-url] - `>= 8.x.x`

### Install dependencies
```sh
npm i
```
This will install all required `dependencies` and `devDependencies` defined in `package.json`.

#### node-sass
If you get any errors related to `node-sass`, execute the following:
```sh
npm rebuild node-sass
```

-----------------------

### DEV
After NPM installs all required dependencies, navigate to `node_modules/name-that-color/index.js` and modify the  module as follows:
```sh
// console.log(chalk.magenta(process.argv[2]) + ' name is ' + chalk.cyan(ntc.name(oneColor(process.argv[2]).hex())[1]));

module.exports = ntc;
```

Then execute the following command:
```sh
npm start
```
This will compile the project into `_dev`, launch your browser and watch for changes in `_src`.

The toolkit has options to launch in different modes:

#### HMR Mode - Hot Module Replacement
```sh
npm run hmr
```

#### Tooling Mode
```sh
npm run tooling
```

#### Fun Mode :)
```sh
npm run fun
```

#### Conf Mode
```sh
npm run conf
```

You can also chain these modes:
```sh
npm start --hmr --tooling --fun --conf
```

-----------------------

### Build
```sh
npm run build
```
This will compile and minify the project into `_build`.

-----------------------

## Source code
All source code is located in `_src`.

* Core JavaScript/Typescript => `_src/js`
* Core SASS => `_src/sass`
* Modules (Javascript/Typescript, SCSS and HTML) => `_src/modules`

-----------------------

### TODO:

1. Optimize webpack =>
    1. Hashing for core bundles + injecting hash in `_scripts.html`
    1. Update dev server / hmr to not auto bundle on start.

1. Improve error handling... `pump`.
1. Add / update linting.
1. Add comments.

### LAUNDRY LIST
1. Create custom jQuery build...
1. Create version without jQuery dependency... add axios.
1. Create `name that color` gulp plugin and submit PR to original author of `name that color` to include `module.exports = ntc;`
1. Add changed plugin to pipeline in some tasks.
1. New sass globber for nested imports.

[node-url]: https://nodejs.org/en/
[npm-url]: https://www.npmjs.com/
[npm-image]: https://img.shields.io/npm/v/npm.svg
[mit-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[mit-url]: https://github.com/jthomas077/home-skillet/blob/master/LICENSE
[dev-dep-image]: https://david-dm.org/jthomas077/home-skillet/dev-status.svg
[dev-dep-url]: https://david-dm.org/jthomas077/home-skillet/?type=dev
[dep-image]: https://david-dm.org/jthomas077/home-skillet/status.svg
[dep-url]: https://david-dm.org/jthomas077/home-skillet
