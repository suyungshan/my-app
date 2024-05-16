/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            url: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
