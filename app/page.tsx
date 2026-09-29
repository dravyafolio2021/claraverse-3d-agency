import { ArrowDown, ArrowUpRight, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroScene } from '@/components/hero-scene';
import { SiteFooter } from '@/components/site-footer';

const SELECTED_WORK = [
  { client: 'GLOV Beauty', market: 'Beauty technology · United States', scope: 'Full-stack Shopify management, CRO & AOV strategy', result: '+18% AOV · 2.6× ROAS', image: '/work/glov.png', href: 'https://claraverse.in/portfolio/https-glovbeauty-com/' },
  { client: 'ANS Shopping', market: 'Ethical fashion · Australia', scope: 'Shopify development & story-first UX strategy', result: '+29% AOV · 3.4× ROAS', image: '/work/ans.png', href: 'https://claraverse.in/portfolio/ans-shopping/' },
  { client: 'Man Mandir', market: 'Premium handloom · India', scope: 'From Surat legacy brand to global DTC commerce', result: '+18% AOV · 2.6× ROAS', image: '/work/man-mandir.png', href: 'https://claraverse.in/portfolio/manmandir/' },
  { client: 'Imperial Knots', market: 'Luxury lifestyle · Global', scope: 'Long-term digital growth partnership', result: '+42% CTR · 2.2× ROAS', image: '/work/imperial-knots.png', href: 'https://claraverse.in/portfolio/imperial-knots/' },
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="topbar home-topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Claraverse home">
          <Image className="brand-logo" src="/brand/claraverse-logo.svg" alt="Claraverse" width={146} height={33} priority />
        </a>
        <div className="nav-links" aria-label="Services">
          <a href="#expertise">Expertise</a>
          <a href="#work">Selected work</a>
          <a href="#insights">Insights</a>
        </div>
        <Link className="nav-cta" href="/start">
          Start a project <ArrowUpRight size={15} strokeWidth={1.8} />
        </Link>
      </nav>

      <section className="hero" id="top">
        <div className="hero-stage">
        <div className="hero-grid" aria-hidden="true" />
        <div className="scene-wrap"><HeroScene /></div>

        <div className="hero-kicker">
          <span className="signal-dot" />
          Serving fashion & skincare brands globally
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Global ecommerce growth partner</p>
          <h1>
            Build brands
            <br />that move <em>markets.</em>
          </h1>
          <p className="hero-deck">
            A founder-focused Shopify growth system for fashion and skincare—
            connecting performance media, AI-powered creative and conversion-first commerce.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/start">
              Book a growth audit
            </Link>
            <a className="text-link" href="#system">
              See how we work <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-proof" aria-hidden="true">
          <p>Our client footprint</p>
          <h2>One growth system.<br />Four active markets.</h2>
          <div className="distribution-grid">
            {[
              ['USA', '30%'],
              ['Australia', '20%'],
              ['India', '30%'],
              ['Europe', '20%'],
            ].map(([region, share]) => (
              <div key={region}><span>{region}</span><strong>{share}</strong></div>
            ))}
          </div>
        </div>

        <div className="hero-foot">
          <div className="capabilities" aria-label="Core capabilities">
            <span>Global media</span><span>AI creative</span><span>Shopify CRO</span><span>Local insight</span>
          </div>
          <a href="#expertise" className="scroll-cue">
            Scroll to explore <ArrowDown size={15} />
          </a>
        </div>
        </div>
      </section>

      <section className="manifesto-section" id="expertise">
        <div className="section-index">01 / Why Claraverse</div>
        <div className="manifesto-copy">
          <p className="section-kicker">One accountable growth partner</p>
          <h2>
            Your customer doesn’t experience <em>channels.</em>
            <br />They experience your brand.
          </h2>
          <p className="body-large">
            Media without creative burns out. Creative without conversion leaks
            intent. Stores without a growth system become expensive brochures.
            We connect all three—so every learning makes the next decision smarter.
          </p>
        </div>
      </section>

      <section className="system-section" id="system">
        <div className="system-sticky">
          <div className="section-index light">02 / The growth system</div>
          <div className="system-heading">
            <p className="section-kicker acid">Built to compound</p>
            <h2>Three disciplines.<br />One growth loop.</h2>
          </div>
          <div className="system-orbit" aria-hidden="true">
            <span className="orbit orbit-a" />
            <span className="orbit orbit-b" />
            <span className="orbit-core">C</span>
          </div>
        </div>

        <div className="service-stack">
          <article className="service-card coral">
            <span className="service-number">01</span>
            <div>
              <p className="service-meta">Acquire</p>
              <h3>Performance<br />Marketing</h3>
              <p>Full-funnel paid media shaped around contribution margin—not vanity ROAS.</p>
              <Link href="/services/performance-marketing">Explore performance <MoveRight size={17} /></Link>
            </div>
          </article>
          <article className="service-card violet">
            <span className="service-number">02</span>
            <div>
              <p className="service-meta">Persuade</p>
              <h3>AI Video &<br />Creative</h3>
              <p>A high-velocity creative engine built to find new winning angles every week.</p>
              <Link href="/services/ai-creative">Explore creative <MoveRight size={17} /></Link>
            </div>
          </article>
          <article className="service-card acid-card">
            <span className="service-number">03</span>
            <div>
              <p className="service-meta">Convert</p>
              <h3>CRO Commerce<br />Experiences</h3>
              <p>Research-led Shopify experiences that turn paid attention into profitable customers.</p>
              <Link href="/services/cro-commerce">Explore commerce <MoveRight size={17} /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="measurement-section" id="work">
        <div className="section-index">03 / Selected work</div>
        <div className="measurement-heading">
          <p className="section-kicker">Proof across markets</p>
          <h2>Built with founders.<br />Measured in the business.</h2>
        </div>
        <div className="work-grid">
          {SELECTED_WORK.map((item, index) => (
            <a className="work-card" href={item.href} target="_blank" rel="noreferrer" key={item.client}>
              <div className="work-image">
                <Image src={item.image} alt={`${item.client} ecommerce case study`} fill sizes="(max-width: 800px) 100vw, 50vw" />
                <span>0{index + 1}</span>
              </div>
              <div className="work-card-copy">
                <p>{item.market}</p>
                <ArrowUpRight size={20} />
                <h3>{item.client}</h3>
                <span>{item.scope}</span>
                <strong>{item.result}</strong>
              </div>
            </a>
          ))}
        </div>
        <p className="measurement-note">
          The system changes by brand. The operating principle does not: find the
          constraint, ship the highest-leverage fix, and let each result sharpen the next move.
        </p>
      </section>

      <section className="process-section">
        <div className="process-intro">
          <div className="section-index light">04 / The operating rhythm</div>
          <p className="section-kicker acid">Clarity creates speed</p>
          <h2>Senior thinking.<br /><em>Weekly momentum.</em></h2>
        </div>
        <ol className="process-list">
          {[
            ['Diagnose', 'Find the constraint across acquisition, creative and conversion.'],
            ['Architect', 'Build the measurement, testing and execution roadmap.'],
            ['Create', 'Ship campaigns, assets and experiences at learning speed.'],
            ['Compound', 'Turn every result into the next smarter experiment.'],
          ].map(([title, copy], index) => (
            <li key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="fit-section">
        <div className="section-index">05 / Built for</div>
        <div className="fit-copy">
          <p className="section-kicker">Focused by design</p>
          <h2>Fashion and skincare brands ready for their next operating level.</h2>
        </div>
        <div className="fit-panels">
          <div>
            <span>Good fit</span>
            <p>You have product-market pull, real ambition and the appetite to test with discipline.</p>
          </div>
          <div>
            <span>Not a fit</span>
            <p>You want a pair of hands, a viral shortcut or growth at any cost.</p>
          </div>
        </div>
      </section>

      <section className="insights-teaser" id="insights">
        <div>
          <div className="section-index">06 / Intelligence</div>
          <p className="section-kicker">Thinking for operators</p>
          <h2>Useful ideas.<br />No content theatre.</h2>
        </div>
        <Link className="featured-insight" href="/insights">
          <span>Field note 001</span>
          <h3>Why your next growth hire might be a creative operating system.</h3>
          <p>7 minute read</p>
          <ArrowUpRight size={24} />
        </Link>
      </section>

      <section className="closing-section" id="contact">
        <p className="section-kicker acid">Start with the real constraint</p>
        <h2>What’s standing between<br />you and the next level?</h2>
        <Link className="closing-link" href="/start">
          Tell us where growth is stuck <ArrowUpRight size={34} strokeWidth={1.3} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
