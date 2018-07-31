# Home Skillet

> Front End Build Toolkit


![homeskillet]


![homeskillet-badge]

[![Node][node-image]][node-url] [![npm][npm-image]]()

[![Dependency Status][dep-image]][dep-url] [![devDependency Status][dev-dep-image]][dev-dep-url]

[![MIT][mit-image]][mit-url]

[![typescript]][typescript-url]

<br />

## Getting Started

### Install Dependencies

```sh
npm i
```

This will install all required `dependencies` and `devDependencies` defined in `package.json`.

<br />

### DEV
After NPM installs all required dependencies, navigate to `node_modules/name-that-color/index.js` and modify the module as follows:

```sh
if (require.main === module)
{
    console.log(chalk.magenta(process.argv[2]) + ' name is ' + chalk.cyan(ntc.name(oneColor(process.argv[2]).hex())[1]));
}
else
{
    module.exports = ntc;
}
```

<br />

Next, create `.env` file using `.env.example` as well, an example lol.

<br />

Then execute the following command:
```sh
npm start
```

This will compile the project into `_dev`, launch your browser and watch for changes in `_src`.

<br />

### Modes

The toolkit has options to launch in different modes:

> __HMR Mode - Hot Module Replacement__

```sh
npm run hmr
```
*Not available when running a build.*

<br />

> __Tooling Mode__

```sh
npm run tooling
```

*While you can run HMR and Tooling modes together, HMR is only for `_src` development.*

<br />

> __Fun Mode__ :)

```sh
npm run fun
```

<br />

> __Conf Mode *Shush!*__

```sh
npm run conf
```

<br />

You can also chain these modes:

```sh
npm start --hmr --tooling --fun --conf
```

<br />

## Build
To run a production build, execute the following command:

```sh
npm run build
```
This will compile and minify the project into `_build`.

<br />

## Source code
All source code is located in `_src`.

* Core JavaScript/Typescript => `_src/js`
* Core SASS => `_src/sass`
* Modules (Javascript/Typescript, SCSS and HTML) => `_src/modules`



[node-image]: https://img.shields.io/badge/node-%3E%3D%208.x.x-blue.svg?longCache=true&style=flat-square
[node-url]: https://nodejs.org/en/
[npm-url]: https://www.npmjs.com/
[npm-image]: https://img.shields.io/badge/npm-%3E%3D%205.x.x-blue.svg?longCache=true&style=flat-square
[mit-image]: https://img.shields.io/badge/license-MIT-blue.svg?longCache=true&style=flat-square
[mit-url]: https://github.com/jthomas077/home-skillet/blob/master/LICENSE
[dev-dep-image]: https://david-dm.org/jthomas077/home-skillet/dev-status.svg
[dev-dep-url]: https://david-dm.org/jthomas077/home-skillet/?type=dev
[dep-image]: https://david-dm.org/jthomas077/home-skillet/status.svg
[dep-url]: https://david-dm.org/jthomas077/home-skillet
[homeskillet]: toolkit/home-skillet.jpg?raw=true&s=150 "Home Skillet"
[homeskillet-badge]: https://img.shields.io/badge/home%20skillet-sexy-blue.svg?longCache=true&style=flat-square "Home Skillet"
[typescript]: https://img.shields.io/badge/type%20definitions-TypeScript%202.9.2-blue.svg?longCache=true&style=flat-square "TypeScript"
[typescript-url]: https://www.typescriptlang.org/
