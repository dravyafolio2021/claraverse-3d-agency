import {notFound} from 'next/navigation';
import {PageShell} from '@/components/PageShell';
import {IndustryDetail} from '@/components/IndustryPages';
import {industries} from '@/lib/site-content';
import {industryPages} from '@/lib/industry-pages';
export function generateStaticParams(){return industries.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const industry=industries.find(item=>item.slug===slug);if(!industry)notFound();return {title:`Shopify for ${industry.name} brands — claraverse`,description:industryPages[slug].intro,alternates:{canonical:`/industries/${slug}`}};}
export default async function Industry({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const industry=industries.find(item=>item.slug===slug);if(!industry)notFound();return <PageShell><IndustryDetail industry={industry}/></PageShell>;}
