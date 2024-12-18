/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'loremflickr.com'], // Allow images from Unsplash
  },
}

// Export the configuration using ES module syntax
export default nextConfig
