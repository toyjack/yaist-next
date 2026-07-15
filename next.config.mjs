import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["idsfind"],
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
