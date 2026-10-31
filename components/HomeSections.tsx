import {PortfolioShowcase} from './PortfolioShowcase';
import {MotionReveal} from './MotionReveal';
import {SiteFooter} from './PageShell';
import {ClientShowcase} from './ClientShowcase';
import {StudioStatement} from './StudioStatement';
import {StudioCounters} from './StudioCounters';
import {BrandWall} from './BrandWall';
import {Capabilities} from './Capabilities';
import {ProjectBento} from './ProjectBento';
import {ClientReviews} from './ClientReviews';
import {HomeFAQ} from './HomeFAQ';
export function HomeSections(){return <MotionReveal className="home-sections">
 <ClientShowcase/>
 <StudioStatement/>
 <StudioCounters/>
 <PortfolioShowcase/>
 <BrandWall/>
 <Capabilities/>
 <ProjectBento/>
 <ClientReviews/>
 <HomeFAQ/>
 <SiteFooter/>
 </MotionReveal>;}
