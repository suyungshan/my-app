// next.config.js
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["tailwindcss", "autoprefixer"],
            },
          },
        },
      ],
    });
    return config;
  },
};
