import type { NextConfig } from "next"
const nextConfig: NextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      async headers() {
        return [
          {
            source: "/_next/static/:path*",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable", // Cache por 1 ano
              },
            ],
          },
          {
            source: "/assets/:path*",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=86400", // Cache por 1 dia para recursos personalizados
              },
            ],
          },
        ]
      },
}

module.exports = nextConfig
