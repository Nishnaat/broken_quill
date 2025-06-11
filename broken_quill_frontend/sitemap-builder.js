const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const axios = require('axios'); // ✅ Move this to the top

async function generateSitemap() {
	const res = await axios.get('https://broken-quill-backend.onrender.com/api/posts');
	const posts = res.data;

	const links = [
		{ url: '/', changefreq: 'daily', priority: 1.0 },
		{ url: '/about', changefreq: 'monthly', priority: 0.7 },
		{ url: '/posts', changefreq: 'daily', priority: 0.8 },
		...posts.map(post => ({
			url: `/posts/${post.slug}`,
			changefreq: 'weekly',
			priority: 0.9
		}))
	];

	const sitemapStream = new SitemapStream({ hostname: 'https://nakedmetaphor.com' });

	// Write sitemap to a file
	const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));
	sitemapStream.pipe(writeStream); // ✅ No need to store in `pipeline` unless you're listening to events

	// Write each URL to the sitemap stream
	links.forEach(link => sitemapStream.write(link));
	sitemapStream.end();

	await streamToPromise(sitemapStream); // ✅ Wait for it to complete

	console.log('✅ Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
