import {join as joinPaths} from 'path';

interface NetlifyUtils {
	cache: {
		restore(path: string, options: {digest: string[]}): Promise<any>;
		save(path: string, options: {digest: string[]}): Promise<any>;
	};
}

interface NetlifyOpts {
	utils: NetlifyUtils;
	netlifyConfig: {build: {base: string}};
}

const buildCachePath = '.next';
const manifestPath = joinPaths(buildCachePath, 'build-manifest.json');

module.exports = {
	name: 'cache-nextjs',
	// Restore file/directory cached in previous builds.
	// Does not do anything if:
	//  - the file/directory already exists locally
	//  - the file/directory has not been cached yet
	async onPreBuild({utils, netlifyConfig}: NetlifyOpts) {
		const directory = joinPaths(netlifyConfig.build.base, buildCachePath);

		const success = await utils.cache.restore(directory, {
			digest: [joinPaths(netlifyConfig.build.base, manifestPath)]
		});

		if (success) {
			console.log(`Restored the cached .next folder at the location \`${directory}\``);
		} else {
			console.log(`Unable to restore the cached .next folder at the location \`${directory}\``);
		}
	},
	// Cache file/directory for future builds.
	// Does not do anything if:
	//  - the file/directory does not exist locally
	//  - the file/directory is already cached and its contents has not changed
	//    If this is a directory, this includes children's contents
	// Note that this will cache after the build, even if it fails, which fcould be unwanted behavior
	async onPostBuild({utils, netlifyConfig}: NetlifyOpts) {
		const directory = joinPaths(netlifyConfig.build.base, buildCachePath);

		const success = await utils.cache.save(directory, {
			digest: [joinPaths(netlifyConfig.build.base, manifestPath)]
		});

		if (success) {
			console.log(`Cached the .next folder at the location \`${directory}\``);
		} else {
			console.error(`An error occurred and the .next folder at the location \`${directory}\` could not be cached`);
		}
	}
};
