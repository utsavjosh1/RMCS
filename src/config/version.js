/**
 * Application version information
 * Follows Semantic Versioning (MAJOR.MINOR.PATCH)
 * 
 * MAJOR version for incompatible API changes
 * MINOR version for backwards-compatible functionality
 * PATCH version for backwards-compatible bug fixes
 */

export const VERSION = {
  major: 1,
  minor: 1,
  patch: 0,
  build: process.env.NEXT_PUBLIC_BUILD_NUMBER || 'dev',
  get full() {
    return `${this.major}.${this.minor}.${this.patch}`;
  },
  get fullWithBuild() {
    return `${this.full}+${this.build}`;
  }
};

export const getVersionInfo = () => ({
  version: VERSION.full,
  build: VERSION.build,
  fullVersion: VERSION.fullWithBuild,
  lastUpdated: new Date().toISOString()
}); 