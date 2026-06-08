/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Allow next/image to optimize media served from the WordPress CMS.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_WP_IMAGE_HOST || "cms.faprompt.com",
      },
      // local WP during development
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async redirects() {
    // Preserve old .html deep links from the v1 static site.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/work.html", destination: "/work", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/services/:slug.html", destination: "/services/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
