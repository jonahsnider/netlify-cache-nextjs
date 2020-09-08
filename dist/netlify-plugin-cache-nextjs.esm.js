import { existsSync } from 'fs';
import { join } from 'path';

function generateAbsolutePaths(options) {
  /** The name of the build folder. `.next`, unless specially configured. */
  var buildDirName = options.inputs.custom_build_dir_name;
  /** The directory the build folder is in. Defaults to current directory, although some larger repositories might keep this in a `frontend` folder. */

  var buildDirPathFromProject = options.inputs.build_dir_path;
  /** The absolute path to the build folder for Next.js. */

  var absoluteBuildDirPath = join(buildDirPathFromProject, buildDirName, 'cache');
  /** The absolute path to the build manifest Next.js uses. */
  // I don't actually know if this build manifest has any relation to the cache folder

  var manifestPath = join(absoluteBuildDirPath, '..', 'build-manifest.json');
  return {
    absolute: {
      buildDir: absoluteBuildDirPath,
      manifest: manifestPath
    },
    buildDirName: buildDirName
  };
}

module.exports = {
  // Restore file/directory cached in previous builds.
  // Does not do anything if:
  //  - the file/directory already exists locally
  //  - the file/directory has not been cached yet
  onPreBuild: function onPreBuild(_ref) {
    var utils = _ref.utils,
        inputs = _ref.inputs;

    try {
      var paths = generateAbsolutePaths({
        inputs: inputs
      });
      return Promise.resolve(utils.cache.restore(paths.absolute.buildDir)).then(function (success) {
        console.log(paths.absolute.buildDir + " " + (existsSync(paths.absolute.buildDir) ? 'exists' : 'does not exist') + " on disk");

        if (success) {
          console.log("Restored the cached " + paths.buildDirName + " folder at the location `" + paths.absolute.buildDir + "`");
        } else {
          console.log("Couldn't restore the cache for the " + paths.buildDirName + " folder at the location `" + paths.absolute.buildDir + "`");
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  // Cache file/directory for future builds.
  // Does not do anything if:
  //  - the file/directory does not exist locally
  //  - the file/directory is already cached and its contents has not changed
  //    If this is a directory, this includes children's contents
  // Note that this will cache after the build, even if it fails, which fcould be unwanted behavior
  onPostBuild: function onPostBuild(_ref2) {
    var utils = _ref2.utils,
        inputs = _ref2.inputs;

    try {
      var paths = generateAbsolutePaths({
        inputs: inputs
      });
      console.log(paths.absolute.buildDir + " " + (existsSync(paths.absolute.buildDir) ? 'exists' : 'does not exist') + " on disk");
      return Promise.resolve(utils.cache.save(paths.absolute.buildDir, {
        digests: [paths.absolute.manifest]
      })).then(function (success) {
        if (success) {
          console.log("Cached the " + paths.buildDirName + " folder at the location `" + paths.absolute.buildDir + "`");
        } else {
          console.log("Couldn't cache the " + paths.buildDirName + " folder at the location `" + paths.absolute.buildDir + "`");
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
//# sourceMappingURL=netlify-plugin-cache-nextjs.esm.js.map
