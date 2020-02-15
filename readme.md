# Netlify Next.js cache

[![npm](https://img.shields.io/npm/v/netlify-plugin-cache-nextjs)](https://www.npmjs.com/package/netlify-plugin-cache-nextjs)
[![Build Status](https://github.com/pizzafox/netlify-cache-nextjs/workflows/CI/badge.svg)](https://github.com/pizzafox/netlify-cache-nextjs/actions)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Cache the `.next` folder in Netlify builds.
A [Netlify plugin](https://www.netlify.com/build/plugins-beta/) [published on npm](https://www.npmjs.com/package/netlify-plugin-cache-nextjs).

## Usage

This is a Netlify plugin, which will run during your Netlify builds.
As of now, Netlify plugins are in closed beta.
You can learn more about them, and apply for the beta [here](https://www.netlify.com/build/plugins-beta/).

The npm package name is [`netlify-plugin-cache-nextjs`](https://www.npmjs.com/package/netlify-plugin-cache-nextjs).

```yaml
plugins:
  - type: netlify-plugin-cache-nextjs
```

## Contributing

### Prequisites

This project uses [Node.js](https://nodejs.org) 12 to run.

This project uses [Yarn](https://yarnpkg.com) to install dependencies, although you can use another package manager like [npm](https://www.npmjs.com) or [pnpm](https://pnpm.js.org).

```sh
yarn install
# or `npm install`
# or `pnpm install`
```

### Building

Run the `build` script to compile the TypeScript into the `tsc_output` folder.

### Style

This project uses [Prettier](https://prettier.io) and [XO](https://github.com/xojs/xo).

You can run Prettier in the project with this command:

```sh
yarn run style
```

You can run XO with this command:

```sh
yarn run lint
```

Note that XO will also error if you have TypeScript errors, not just if your formatting is incorrect.

### Linting

This project uses [XO](https://github.com/xojs/xo) (which uses [ESLint](https://eslint.org) and some plugins internally) to perform static analysis on the TypeScript.
It reports things like unused variables or not following code conventions.

```sh
yarn run lint
```

Note that XO will also error if you have incorrect formatting, not just if your TypeScript code has errors.
