/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withImages = require('next-images');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    ALCHEMY_APIKEY: process.env.ALCHEMY_APIKEY
  }
};

module.exports = withImages(nextConfig);
