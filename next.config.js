/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "script-src 'self' 'unsafe-inline' hash('sha256-joC7reiv/dIkR+09K78mednkCl5Rmm2WBT7APoyLY+g=') hash('sha256-9HyNyG0GZyabMBeQyib5LJELLQE2s41lRmpcThEwjzI=') hash('sha256-HYnfXErrk8ReZ9R550ygLloQTX5CHk8kFeSiBMmBaws=') hash('sha256-EPYEwfJvupPVNF/iwOzS5GWMK70IilwW5QTaUSQkmlY=') hash('sha256-kxw+nAOdsyc2OQqWGaIkyqUGiOlaOUv+NMwcul31b7k=') hash('sha256-L9SK8yiPu7TwmThptvArJosC6bLnfLhlCtMgqrQFgf8=') hash('sha256-8//zSBdstORCAlBMo1/Cig3gKc7QlPCh9QfWbRu0OjU=') hash('sha256-yhd6PwjoWYTBnndhpLUkTn5EsNHml/N9we///jSYsCE=') hash('sha256-PxpWULeDrIdov0YQWrt6Bmg9TT+/+g5UjThNitFT2ic=') hash('sha256-iRcQj5aZEFZkb4uNJVwwlURvMo2Gl2O7fKWfIqkjFuQ=') hash('sha256-dWJBTUYIehWQeYz1GvwRaTkI+KDGjUWEnQesSIcAEZE=') hash('sha256-65CE2FOJFBHue4CcyglEEakRkPVPm79q3605/6psvkk=') hash('sha256-qDN2Dgpn1iTKNi4q10wUSPuFz4bAS+HBxZG6P3wPUIE=') 'sha256-r2AApiRY3FiAayRD1cK5mE6UuyRo6G6GcULnM0cT16A=' hash('sha256-uwZD9meGcYf1wTTgVLoyRAttv2fUnJt53zHY9SLkfXU=') hash('sha256-r9zonY/0EBur45sTRD/qPtjrpc82Cy+rd5UsKL16ylc=') hash('sha256-Gcc6z51/N6sU4HeTUwpMo8kmHIxYkUqHiFYCW5Y4Ghc=') hash('sha256-9IhiZWL6sk7lRp5pcjkkVpTeNxZ5cYjy3ExyRjoy+as=') snap.licdn.com *.tripletech.com *.tripletech.com.br *.googlesyndication.com *.googleapis.com *.g.doubleclick.net *.doubleclick.net *.googleapis.com *.googletagmanager.com cdn.jsdelivr.net cdnjs.cloudflare.com",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
