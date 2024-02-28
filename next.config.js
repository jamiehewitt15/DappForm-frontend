/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  fonts: {
    enable: true // Enable font optimization
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  }
}
