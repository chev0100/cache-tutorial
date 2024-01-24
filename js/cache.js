const CACHE = {
	cache: 'content-cache',
	version: 1.0,
	cacheName: null,
	init() {
		CACHE.cacheName = `${CACHE.cache}-v${CACHE.version}`;
		console.log(`CACHE initialized: ${CACHE.cacheName}`);
	},
};

export default CACHE;
