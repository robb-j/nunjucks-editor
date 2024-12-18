const version = "njk-playground-001";
const assets = [
	"https://fonts.openlab.dev/rubik/rubik.css",
	"https://fonts.openlab.dev/rubik/Rubik-VariableFont_wght.woff2?v=2.200",
	"https://fonts.openlab.dev/rubik/Rubik-Italic-VariableFont_wght.woff2?v=2.200",
	"https://alembic.openlab.dev/labcoat.css",
	"https://alembic.openlab.dev/everything.js",
	"https://mozilla.github.io/nunjucks/files/nunjucks.min.js",
];

self.addEventListener("install", (e) => e.waitUntil(install()));
self.addEventListener("activate", (e) => e.waitUntil(activate()));
self.addEventListener("fetch", (e) => e.respondWith(performFetch(e.request)));

// Cache assets on install (no-cors allows external assets to be cached)
async function install() {
	console.log("@install");
	const cache = await caches.open(version);
	await cache.addAll(assets);
}

// Uncache old assets when opened
async function activate() {
	console.log("@activate");
	for (const key of await caches.keys()) {
		if (key !== version) await caches.delete(key);
	}
}

/** @param {Request} request */
async function performFetch(request) {
	console.log("@fetch", request.url);

	let response = await caches.match(request);
	if (response) response;

	// TODO: could also cache these requests?
	return fetch(request);
}
