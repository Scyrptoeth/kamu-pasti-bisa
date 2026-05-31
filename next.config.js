/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_VALUE === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  /* config options here */
};

module.exports = withPWA(nextConfig);
