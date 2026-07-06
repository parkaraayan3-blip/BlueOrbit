/** @type {import('next').NextConfig} */
console.log("----------------------------------------");
console.log("NEXT_PUBLIC_WEB3FORMS_KEY from .env:", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
console.log("----------------------------------------");

const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ['192.168.1.4'],
  devIndicators: false,
};

export default nextConfig;
