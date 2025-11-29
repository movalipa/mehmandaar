import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // if using standalone
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
}

export default nextConfig
