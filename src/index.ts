import {join as joinPaths} from 'path';

interface NetlifyUtils {
	cache: {
		restore(path: string, options: {digest: string[]}): Promise<any>;
		save(path: string, options: {digest: string[]}): Promise<any>;
	};
}

interface NetlifyConstants {
  BUILD_DIR: string
}

interface NetlifyOpts {
  utils: NetlifyUtils,
  constants: NetlifyConstants
}

module.exports = {
	name: 'cache-nextjs',
	// Restore file/directory cached in previous builds.
	// Does not do anything if:
	//  - the file/directory already exists locally
	//  - the file/directory has not been cached yet
	async onPreBuild({utils, constants}: NetlifyOpts) {
		await utils.cache.restore(joinPaths(constants.BUILD_DIR, '.next'), {
			digest: [joinPaths(constants.BUILD_DIR, '.next', 'build-manifest.json')]
		});
	},
	// Cache file/directory for future builds.
	// Does not do anything if:
	//  - the file/directory does not exist locally
	//  - the file/directory is already cached and its contents has not changed
	//    If this is a directory, this includes children's contents
	// Note that this will cache after the build, even if it fails, which fcould be unwanted behavior
	async onPostBuild({utils, constants}: NetlifyOpts) {
		await utils.cache.save(joinPaths(constants.BUILD_DIR, '.next'), {
			digest: [joinPaths(constants.BUILD_DIR, '.next', 'build-manifest.json')]
		});
	}
};
