/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
  poweredByHeader: false,
  compress: true,
  images: {
    // Photos are resized and sent as WebP automatically (by Vercel), at the sizes below.
    formats: ["image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1200],
    imageSizes: [96, 192, 384],
    minimumCacheTTL: 31536000,
  },
  // Pictures, fonts and music are cached by the browser for a day (and refreshed quietly for a week).
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return ["/images/:path*", "/fonts/:path*", "/audio/:path*"].map((source) => ({ source, headers: cache }));
  },
=======
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
};

module.exports = nextConfig;
