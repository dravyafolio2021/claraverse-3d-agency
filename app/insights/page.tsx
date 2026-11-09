import {PageShell} from '@/components/PageShell';
import {InteriorHero,PageClose} from '@/components/Interior';
import {InsightsIndex} from '@/components/InsightsIndex';
export const metadata={title:'Insights & studio notes — claraverse',description:'Perspectives on commerce architecture, customer experience and connected operations from Claraverse Studio.'};
export default function Insights(){return <PageShell><div className="interior-page"><InteriorHero eyebrow="Insights / studio notes" title="Useful thinking for what comes next." copy="Perspectives on the customer experience, commerce architecture and the connected systems behind a better business."/><InsightsIndex/><PageClose title="A question worth untangling?" copy="Bring the challenge to the studio. Let’s find a useful starting point."/></div></PageShell>;}
