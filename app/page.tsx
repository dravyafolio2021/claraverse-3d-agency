import { ArrowDown, ArrowUpRight, MoveRight } from 'lucide-react';
import Image from 'next/image';
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
        <a className="nav-cta" href="/start">
          Get a growth plan <ArrowUpRight size={15} strokeWidth={1.8} />
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-stage">
        <div className="hero-grid" aria-hidden="true" />
        <div className="scene-wrap"><HeroScene /></div>

        <div className="hero-copy">
          <p className="eyebrow"><span className="signal-dot" />Shopify growth, powered by AI</p>
          <h1>
            Turn Shopify traffic
            <br />into <em>profitable growth.</em>
          </h1>
          <p className="hero-deck">
            We grow ecommerce brands with performance marketing, AI creative
            and conversion-first Shopify experiences.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/start">
              Get your growth plan
            </a>
            <a className="text-link" href="#work">
              See client results <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-proof">
          <p className="live-orders-kicker"><span /> Live commerce pulse</p>
          <h2>Live orders across<br /><em>our clients’ stores.</em></h2>
          <p className="client-proof-note">Representative order activity · Revenue displayed in your currency</p>
        </div>

        <div className="hero-foot">
          <div className="capabilities" aria-label="Core capabilities">
            <span>Paid media</span><span>AI creative</span><span>Shopify CRO</span><span>Global growth</span>
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
              <a href="/services/performance-marketing">Explore performance <MoveRight size={17} /></a>
            </div>
          </article>
          <article className="service-card violet">
            <span className="service-number">02</span>
            <div>
              <p className="service-meta">Persuade</p>
              <h3>AI Video &<br />Creative</h3>
              <p>A high-velocity creative engine built to find new winning angles every week.</p>
              <a href="/services/ai-creative">Explore creative <MoveRight size={17} /></a>
            </div>
          </article>
          <article className="service-card acid-card">
            <span className="service-number">03</span>
            <div>
              <p className="service-meta">Convert</p>
              <h3>CRO Commerce<br />Experiences</h3>
              <p>Research-led Shopify experiences that turn paid attention into profitable customers.</p>
              <a href="/services/cro-commerce">Explore commerce <MoveRight size={17} /></a>
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
        <a className="featured-insight" href="/insights">
          <span>Field note 001</span>
          <h3>Why your next growth hire might be a creative operating system.</h3>
          <p>7 minute read</p>
          <ArrowUpRight size={24} />
        </a>
      </section>

      <section className="closing-section" id="contact">
        <p className="section-kicker acid">Ready to grow?</p>
        <h2>Turn more Shopify traffic<br />into profitable sales.</h2>
        <a className="closing-link" href="/start">
          Get your growth plan <ArrowUpRight size={34} strokeWidth={1.3} />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
