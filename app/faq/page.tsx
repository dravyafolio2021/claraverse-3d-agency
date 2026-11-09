import {PageShell} from '@/components/PageShell';
import {InteriorHero,PageClose} from '@/components/Interior';
import {PageFAQ} from '@/components/PageFAQ';
import {homeFaqs} from '@/lib/home-faqs';
export const metadata={title:'Questions about working together — claraverse',description:'Answers about Shopify services, migrations, connected systems, project scope and working with Claraverse.'};
export default function FAQ(){return <PageShell><div className="interior-page"><InteriorHero eyebrow="Working together" title="Good questions. Clear answers." copy="The experience, the systems and what it takes to shape the work together."/><PageFAQ items={homeFaqs}/><PageClose/></div></PageShell>;}
