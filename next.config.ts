// /** @type {import('next').NextConfig} */
// const isDev = process.env.NODE_ENV === "development";
// const nextConfig = {
//   ...(isDev
//     ? {
//         experimental: {
//           allowDevelopmentBuild: true,
//         },
//       }
//     : {}),
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "api.goroqit.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "http",
//         hostname: "**",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;


const isDev = process.env.NODE_ENV === "development";
const nextConfig = {
  ...(isDev
    ? {
      experimental: {
        allowDevelopmentBuild: true,
      },
    }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.goroqit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;