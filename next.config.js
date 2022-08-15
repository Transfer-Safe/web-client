/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withImages = require('next-images');
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    ALCHEMY_APIKEY: process.env.ALCHEMY_APIKEY
  }
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(withImages(nextConfig), sentryWebpackPluginOptions);
