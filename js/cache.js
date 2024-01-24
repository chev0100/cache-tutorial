const CACHE = {
	cache: 'content-cache',
	version: 1.0,
	cacheName: null,
	init() {
		CACHE.cacheName = `${CACHE.cache}-v${CACHE.version}`;
		console.log(`CACHE initialized: ${CACHE.cacheName}`);
	},
	async openCache() {
		const cache = await caches.open(CACHE.cacheName);
		return cache;
	},
	async saveInCache(url, response) {
		const cache = await CACHE.openCache();
		return cache.put(url, response);
	},
};

export default CACHE;
