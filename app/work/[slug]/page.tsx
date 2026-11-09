import {notFound} from 'next/navigation';
import {PageShell} from '@/components/PageShell';
import {ProjectStory} from '@/components/ProjectStory';
import {projects} from '@/lib/site-content';
import {projectStories} from '@/lib/project-stories';

export function generateStaticParams(){return projects.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const project=projects.find(item=>item.slug===slug);
 return {title:`${project?.name||'Work'} — a claraverse concept`,description:project?`${projectStories[slug].headline} Explore the thinking, customer experience and proposed commerce operation behind this Claraverse concept.`:undefined};
}
export default async function Project({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const project=projects.find(item=>item.slug===slug);
 if(!project)notFound();
 return <PageShell><ProjectStory project={project}/></PageShell>;
}
