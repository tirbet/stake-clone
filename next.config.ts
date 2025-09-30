import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/service-api/:path*',
        destination: 'https://linebet.com/service-api/:path*',
      }
    ]
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
