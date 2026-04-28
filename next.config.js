/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    const backend =
      process.env.NEXT_PUBLIC_REQUEST_BASE_URL ||
      process.env.REQUEST_BASE_URL ||
      "";
    if (!backend) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
