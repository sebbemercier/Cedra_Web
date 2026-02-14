import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // Disable memory cache to force Valkey and avoid inconsistency between Nomad nodes
  cacheMaxMemorySize: 0,

  experimental: {
    optimizePackageImports: [
      "@chakra-ui/react",
      "@heroui/react",
      "lucide-react",
      "framer-motion"
    ],
  },

  // Asset Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.cedra.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },

  // Security & Performance Headers
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
        ],
      },
    ];
  },
};

export default nextConfig;