import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["idsfind"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "glyphwiki.org",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
