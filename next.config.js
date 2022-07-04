module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://www.datocms-assets.com/:path*',
          },
        ]
    },
    future: {
        webpack5: true,
    }
};