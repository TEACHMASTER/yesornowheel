const { withContentlayer } = require('next-contentlayer');

const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table", ],
  images: {
    domains: ['webglmath.github.io','example.com','github.com','localhost','doodlebaseball.xyz','slope-unblocked-games.github.io'],
  }
}

module.exports = withNextIntl(withContentlayer(nextConfig))