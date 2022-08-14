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
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(withImages(nextConfig),);
