/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withImages = require('next-images');

const nextConfig = withImages({
  reactStrictMode: true,
  swcMinify: true,
  i18n,
});

module.exports = nextConfig;
