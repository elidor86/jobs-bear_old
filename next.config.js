const nextConfig = {

    swcMinify: true, // Enable SWC minification
    distDir: 'build', // Set the build output directory
    webpack(config, options) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

module.exports = nextConfig;



