interface NetlifyUtils {
	cache: {
		restore(path: string, options: {digest: string[]}): Promise<any>;
		save(path: string, options: {digest: string[]}): Promise<any>;
	};
}

export default {
	name: 'cache-nextjs',
	// Restore file/directory cached in previous builds.
	// Does not do anything if:
	//  - the file/directory already exists locally
	//  - the file/directory has not been cached yet
	async onGetCache({utils}: {utils: NetlifyUtils}) {
		await utils.cache.restore('./.next', {digest: ['./.next/build-manifest.json']});
	},
	// Cache file/directory for future builds.
	// Does not do anything if:
	//  - the file/directory does not exist locally
	//  - the file/directory is already cached and its contents has not changed
	//    If this is a directory, this includes children's contents
	async onSaveCache({utils}: {utils: NetlifyUtils}) {
		await utils.cache.save('./.next', {digest: ['./.next/build-manifest.json']});
	}
};
