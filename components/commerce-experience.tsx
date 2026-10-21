'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Component, type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowDown, Minus, Pause, Play, Plus } from 'lucide-react';

function EarthFallback() {
  return <div className="earth-fallback" aria-hidden="true" />;
}

const Globe = dynamic(() => import('./hero-scene').then(module => module.HeroScene), { ssr: false, loading: EarthFallback });

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <EarthFallback /> : this.props.children; }
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

export function CommerceExperience({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const heroContent = useRef<HTMLDivElement>(null);
  const globeBox = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(1);
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const load = () => {
      if (reduced.matches) setPaused(true);
      try {
        const test = document.createElement('canvas');
        const context = test.getContext('webgl2') || test.getContext('webgl');
        if (context) {
          context.getExtension('WEBGL_lose_context')?.loseContext();
          setReady(true);
        }
      } catch { /* The static globe remains available. */ }
    };
    const loadObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { load(); loadObserver.disconnect(); }
    }, { rootMargin: '100px' });
    loadObserver.observe(element);
    const visibilityObserver = new IntersectionObserver(entries => setActive(entries[0].isIntersecting), { threshold: 0 });
    visibilityObserver.observe(element);
    let frame = 0, currentProgress = 0;
    const paint = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const height = window.innerHeight;
      const width = window.innerWidth;
      const targetProgress = clamp(-rect.top / Math.max(1, rect.height - height));
      currentProgress = reduced.matches ? targetProgress : currentProgress + (targetProgress - currentProgress) * .15;
      const progress = currentProgress;
      const settle = ease((progress - .025) / .57);
      const initial = Math.min(width * 1.65, height * 1.95);
      const compact = Math.max(200, Math.min(height - (width < 700 ? 390 : 340), width * .86)) / .8;
      const size = (initial + (compact - initial) * settle) * zoomRef.current;
      const firstY = Math.max(height * .99, (heroContent.current?.offsetHeight ?? height * .6) + initial * .4 + 44);
      const y = firstY + (height * .53 - firstY) * settle;
      const heroOpacity = 1 - ease(progress / .25);
      const copyOpacity = ease((progress - .49) / .14);
      element.style.setProperty('--mark-shift', `${progress * -90}px`);
      element.style.setProperty('--mark-turn', `${-12 + progress * 18}deg`);
      element.style.setProperty('--hero-progress', String(progress));
      element.style.setProperty('--earth-size', size + 'px');
      element.style.setProperty('--earth-y', y + 'px');
      element.style.setProperty('--hero-opacity', String(heroOpacity));
      element.style.setProperty('--hero-shift', progress * -110 + 'px');
      element.style.setProperty('--globe-copy-opacity', String(copyOpacity));
      element.dataset.interactive = String(progress > .43);
      if (heroContent.current) heroContent.current.inert = heroOpacity < 0.1;
      if (Math.abs(targetProgress - currentProgress) > .0002) frame = requestAnimationFrame(paint);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    const contentObserver = new ResizeObserver(schedule);
    if (heroContent.current) contentObserver.observe(heroContent.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      contentObserver.disconnect();
      loadObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  useEffect(() => {
    zoomRef.current = zoom;
    window.dispatchEvent(new Event('resize'));
  }, [zoom]);

  useEffect(() => {
    const box = globeBox.current;
    if (!box) return;
    const distance = (touches: TouchList) => Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
    const start = (event: TouchEvent) => {
      if (event.touches.length === 2) { event.preventDefault(); pinch.current = { distance: distance(event.touches), zoom: zoomRef.current }; }
    };
    const move = (event: TouchEvent) => {
      if (event.touches.length === 2 && pinch.current) {
        event.preventDefault();
        setZoom(clamp(pinch.current.zoom * distance(event.touches) / Math.max(1, pinch.current.distance), 0.8, 1.35));
      }
    };
    const end = () => { pinch.current = null; };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) { event.preventDefault(); setZoom(previous => clamp(previous * Math.exp(-event.deltaY * 0.004), 0.8, 1.35)); }
    };
    box.addEventListener('touchstart', start, { passive: false });
    box.addEventListener('touchmove', move, { passive: false });
    box.addEventListener('touchend', end);
    box.addEventListener('touchcancel', end);
    box.addEventListener('wheel', wheel, { passive: false });
    return () => {
      box.removeEventListener('touchstart', start); box.removeEventListener('touchmove', move);
      box.removeEventListener('touchend', end); box.removeEventListener('touchcancel', end); box.removeEventListener('wheel', wheel);
    };
  }, []);

  return (
    <section id="top" className="commerce-experience" ref={section} aria-label="Connected ecommerce operations">
      <div id="commerce-network" className="network-anchor" aria-hidden="true" /><div className="experience-stage"><div className="commerce-monogram" aria-hidden="true"><Image src="/brand/shopify-bag.svg" alt="" width="890" height="1010" /></div>
        <div ref={heroContent} className="hero-content">{children}</div>
        <div className="globe-story">
          <p className="eyebrow">Commerce, continuously connected</p>
          <h2>Every order. <em>In motion.</em></h2>
          <p>United States · Europe · India</p>
        </div>
        <div className="earth-box" ref={globeBox}>
          {ready ? <SceneBoundary><Globe active={active} paused={paused} /></SceneBoundary> : <EarthFallback />}
        </div>
        <div className="globe-toolbar"><span className="flow-legend"><i /> Illustrative order flow <span>—</span> store → customer</span>
          <span>Drag to rotate · Scroll to explore</span>
          <div><button type="button" onClick={() => setZoom(value => clamp(value - 0.1, 0.8, 1.35))} aria-label="Zoom out globe"><Minus size={15} /></button><button type="button" onClick={() => setZoom(value => clamp(value + 0.1, 0.8, 1.35))} aria-label="Zoom in globe"><Plus size={15} /></button><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume globe rotation' : 'Pause globe rotation'}>{paused ? <Play size={13} /> : <Pause size={13} />}</button></div>
        </div>
        <div className="experience-bottom"><span>Architecture · Systems · Intelligence</span><a href="#expertise">Explore the whole picture <ArrowDown size={14} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
