import {PageShell} from '@/components/PageShell';
import {ProjectBento} from '@/components/ProjectBento';

export const metadata={
 title:'Featured Stores — claraverse',
 description:'Explore Claraverse’s selected Beauty and Fashion storefront concepts, with customer experience and connected commerce thinking.',
};

export default function Work(){
 return <PageShell><ProjectBento variant="page"/></PageShell>;
}
