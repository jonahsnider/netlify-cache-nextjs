import {join as joinPaths} from 'path';
import {ReadonlyDeep} from 'type-fest';

interface NetlifyUtils {
	cache: {
		restore(path: string, options?: Partial<{move: boolean}>): Promise<any>;
		save(path: string, options?: Partial<{digests: string[]; move: boolean; ttl: number}>): Promise<any>;
	};
}

interface NetlifyInputs {
	// The TOML config uses camelcase for readability and because it's convention
	custom_build_dir_name: string;
	build_dir_path: string;
}

interface NetlifyOpts {
	utils: NetlifyUtils;
	netlifyConfig: {build: {base: string}};
	inputs: NetlifyInputs;
}

function generateAbsolutePaths(
	options: ReadonlyDeep<Pick<NetlifyOpts, 'inputs'>>
): {
	absolute: {
		/** The absolute path to the build folder for Next.js. */
		buildDir: string;
		/** The absolute path to the build manifest Next.js uses. */
		manifest: string;
	};
	/** The name of the build directory. */
	buildDirName: string;
} {
	/** The name of the build folder. `.next`, unless specially configured. */
	const buildDirName = options.inputs.custom_build_dir_name;
	/** The directory the build folder is in. Defaults to current directory, although some larger repositories might keep this in a `frontend` folder. */
	const buildDirPathFromProject = options.inputs.build_dir_path;

	/** The absolute path to the build folder for Next.js. */
	const absoluteBuildDirPath = joinPaths(buildDirPathFromProject, buildDirName, 'cache');
	/** The absolute path to the build manifest Next.js uses. */
	// I don't actually know if this build manifest has any relation to the cache folder
	const manifestPath = joinPaths(absoluteBuildDirPath, '..', 'build-manifest.json');

	return {
		absolute: {
			buildDir: absoluteBuildDirPath,
			manifest: manifestPath
		},
		buildDirName
	};
}

module.exports = {
	// Restore file/directory cached in previous builds.
	// Does not do anything if:
	//  - the file/directory already exists locally
	//  - the file/directory has not been cached yet
	async onPreBuild({utils, inputs}: ReadonlyDeep<NetlifyOpts>) {
		const paths = generateAbsolutePaths({inputs});
		const success = await utils.cache.restore(paths.absolute.buildDir);

		if (success) {
			console.log(`Restored the cached ${paths.buildDirName} folder at the location \`${paths.absolute.buildDir}\``);
		} else {
			console.log(`No cache found for the ${paths.buildDirName} folder at the location \`${paths.absolute.buildDir}\``);
		}
	},
	// Cache file/directory for future builds.
	// Does not do anything if:
	//  - the file/directory does not exist locally
	//  - the file/directory is already cached and its contents has not changed
	//    If this is a directory, this includes children's contents
	// Note that this will cache after the build, even if it fails, which fcould be unwanted behavior
	async onPostBuild({utils, inputs}: ReadonlyDeep<NetlifyOpts>) {
		const paths = generateAbsolutePaths({inputs});

		const success = await utils.cache.save(paths.absolute.buildDir, {
			digests: [paths.absolute.manifest]
		});

		if (success) {
			console.log(`Cached the ${paths.buildDirName} folder at the location \`${paths.absolute.buildDir}\``);
		} else {
			console.log(`No ${paths.buildDirName} folder at the location \`${paths.absolute.buildDir}\``);
		}
	}
};
