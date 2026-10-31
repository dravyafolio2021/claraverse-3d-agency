import Link from 'next/link';
import {PageShell,PageIntro} from '@/components/PageShell';
export default function NotFound(){return <PageShell><PageIntro eyebrow="404 / a little off orbit" title="let’s find your way back." description="That page could not be found. There is still plenty to explore."/><section className="section"><Link href="/" className="text-link">Back to claraverse ↗</Link></section></PageShell>;}
