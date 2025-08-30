/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.0.10.41',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/w320/**',
      },
      {
        protocol: 'http',
        hostname: '104.236.194.254',
        port: '9420',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
