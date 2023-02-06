const { withAxiom } = require("next-axiom")

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  experimental: {
    appDir: true,
    fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }],
  },
})

module.exports = nextConfig
