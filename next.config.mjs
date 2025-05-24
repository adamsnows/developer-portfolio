/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: false,
    esmExternals: 'loose',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "site.maestrialaw.com.br",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev.to",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.dev.to",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "repository-images.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 300, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
