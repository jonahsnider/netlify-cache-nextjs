# [Netlify Next.js cache](https://app.netlify.com/plugins/netlify-plugin-cache-nextjs/install)

Cache the Next.js build folder in Netlify builds.

[![add to netlify](https://img.shields.io/badge/add%20to-netlify-00AD9F)](https://app.netlify.com/plugins/netlify-plugin-cache-nextjs/install)
[![npm](https://img.shields.io/npm/v/netlify-plugin-cache-nextjs)](https://www.npmjs.com/package/netlify-plugin-cache-nextjs)
[![downloads per week](https://img.shields.io/npm/dw/netlify-plugin-cache-nextjs)](https://www.npmjs.com/package/netlify-plugin-cache-nextjs)
[![Build Status](https://github.com/pizzafox/netlify-cache-nextjs/workflows/CI/badge.svg)](https://github.com/pizzafox/netlify-cache-nextjs/actions)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

A [Netlify build plugin](https://docs.netlify.com/configure-builds/build-plugins/), and [one of the most downloaded ones](https://www.netlify.com/blog/2020/06/22/top-10-netlify-build-plugins/#4-next-js-cache) at that.

[![add to netlify](https://img.shields.io/badge/add%20to-netlify-00AD9F)](https://app.netlify.com/plugins/netlify-plugin-cache-nextjs/install)

## Usage

This is a Netlify build plugin, which will run during your Netlify builds. You can learn more about Netlify Build Plugins in the [Netlify docs](https://docs.netlify.com/configure-builds/build-plugins/).

[![add to netlify](https://img.shields.io/badge/add%20to-netlify-00AD9F)](https://app.netlify.com/plugins/netlify-plugin-cache-nextjs/install)

If you want to manually install the plugin add the following lines to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-cache-nextjs"
```

And if you want to configure the plugin:

```toml
[[plugins]]
package = "netlify-plugin-cache-nextjs"

	# These options will cache the build directory at `${NETLIFY_BASE}/frontend/.next-build`
	[plugins.inputs]
	# The path to the build directory
	build_dir_path = "frontend"
	# Custom build directory if you aren't using `.next` (https://nextjs.org/docs/api-reference/next.config.js/setting-a-custom-build-directory)
	custom_build_dir_name = ".next-build"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

## Contributing

### Prequisites

This project uses any [Node.js](https://nodejs.org) version Netlify supports (8-13).
For best results use the latest Node.js LTS version.

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
