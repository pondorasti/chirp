const { withAxiom } = require("next-axiom")

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  experimental: {
    appDir: true,
    fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }],
  },
  images: {
    minimumCacheTTL: 31536000, // 1 year ~infinite cache
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
})

module.exports = nextConfig
