/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['n.nhentai.net', 't3.nhentai.net', 'i3.nhentai.net'],
	},
	redirects: async () => {
		return [
			{
				source: '/tag/:tags',
				destination: '/tag/:tags/1',
				permanent: true,
			},
			{
				source: '/search/:query',
				destination: '/search/:query/1',
				permanent: true,
			},
			{
				source: '/',
				destination: '/1',
				permanent: true,
			},
		];
	}
};

module.exports = nextConfig
