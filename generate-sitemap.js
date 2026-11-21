
const fs = require("node:fs");
const path = require("node:path");

const BASE_URL = "https://calcconvert.calcconvert.workers.dev";

const root = __dirname;

const pages = fs.readdirSync(root)
  .filter(file => file.toLowerCase().endsWith(".html"))
  .sort();

const urls = pages.map(file => {
  if (file.toLowerCase() === "index.html") {
    return `${BASE_URL}/`;
  }

  return `${BASE_URL}/${encodeURIComponent(file)}`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  xml,
  "utf8"
);

console.log(`Sitemap generated with ${urls.length} pages.`);
// Trigger fresh deployment with sitemap build command. 
