import type { NextConfig } from "next";
import {serviceAliases} from './lib/services';
const nextConfig: NextConfig = {
 reactStrictMode:true,
 async redirects(){return serviceAliases.map(alias=>({source:`/services/${alias.from}`,destination:`/services/${alias.to}`,permanent:true}));},
 distDir:process.env.CLARAVERSE_BUILD_DIR||'.next',
 async headers(){return [{source:'/globe/:path*',headers:[{key:'Cache-Control',value:'public, max-age=86400, stale-while-revalidate=604800'}]}];}
};
export default nextConfig;
