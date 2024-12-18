const version = "njk-playground-001";
const assets = [
	"https://fonts.openlab.dev/rubik/rubik.css",
	"https://fonts.openlab.dev/rubik/Rubik-VariableFont_wght.woff2?v=2.200",
	"https://fonts.openlab.dev/rubik/Rubik-Italic-VariableFont_wght.woff2?v=2.200",
	"https://alembic.openlab.dev/labcoat.css",
	"https://alembic.openlab.dev/everything.js",
	"https://mozilla.github.io/nunjucks/files/nunjucks.min.js",
];

self.addEventListener("install", (event) => {
	event.waitUntil(install());
});

// Cache assets on install (no-cors allows external assets to be cached)
async function install() {
	console.log("@install");
	const cache = await caches.open(version);
	await cache.addAll(
		assets.map((url) => new Request(url, { mode: "no-cors" }))
	);
}

self.addEventListener("activate", (event) => {
	event.waitUntil(activate());
});

// Uncache old assets on activate
async function activate() {
	console.log("@activate");
	for (const key of await caches.keys()) {
		if (key !== version) await caches.delete(key);
	}
}
