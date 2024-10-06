// webpack.config.js
import webpack from "webpack"; // Ensure you import webpack

export default {
  // Your existing configuration...
  resolve: {
    fallback: {
      buffer: require.resolve("buffer"), // Add buffer fallback
      // You may also want to add other fallbacks depending on your dependencies
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"], // Provide the Buffer globally
    }),
  ],
};
