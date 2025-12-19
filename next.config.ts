import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "insightful-gazelle-692.convex.cloud",
        pathname: "/**", // povolí všechny cesty z této domény
      },
    ],
  },
};

export default nextConfig;



// původní, údajně zastaralý způsob nastavení. v konzoli vsc bylo upozornění, abych ho změnila
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["insightful-gazelle-692.convex.cloud"],
//   },
// };

// export default nextConfig;
