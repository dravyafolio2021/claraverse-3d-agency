import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
 reactStrictMode: true,
 // Cora supplies export mode on its build server. This flag reproduces it locally.
 output: process.env.CLARAVERSE_STATIC_EXPORT === '1' ? 'export' : undefined,
 images: {unoptimized: true},
 trailingSlash: true,
 distDir: process.env.CLARAVERSE_BUILD_DIR || '.next',
};

export default nextConfig;
