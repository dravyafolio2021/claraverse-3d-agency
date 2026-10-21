'use client';

import dynamic from 'next/dynamic';
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
  const [hovering, setHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const load = () => {
      if (reduced.matches) return;
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
    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const height = window.innerHeight;
      const width = window.innerWidth;
      const progress = clamp(-rect.top / Math.max(1, rect.height - height));
      const grow = ease((progress - 0.05) / 0.39);
      const leave = ease((progress - 0.76) / 0.24);
      const initial = Math.min(width < 700 ? 270 : 310, height * 0.33);
      const full = Math.min(height * 0.82, width * (width < 700 ? 0.96 : 0.66));
      const base = initial + (full - initial) * grow;
      const size = Math.min(full * 1.16, base * zoomRef.current) * (1 - leave * 0.68);
      const firstY = Math.max(height * 0.79, (heroContent.current?.offsetHeight ?? height * 0.53) + initial * 0.48 + 24);
      const y = firstY + (height * 0.54 - firstY) * grow - height * 0.32 * leave;
      const heroOpacity = 1 - ease(progress / 0.24);
      const copyOpacity = ease((progress - 0.28) / 0.17) * (1 - leave);
      element.style.setProperty('--earth-size', size + 'px');
      element.style.setProperty('--earth-y', y + 'px');
      element.style.setProperty('--hero-opacity', String(heroOpacity));
      element.style.setProperty('--hero-shift', progress * -110 + 'px');
      element.style.setProperty('--globe-copy-opacity', String(copyOpacity));
      element.dataset.interactive = String(progress > 0.27 && progress < 0.9);
      if (heroContent.current) heroContent.current.inert = heroOpacity < 0.1;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
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
    <section className="commerce-experience" ref={section} aria-label="Claraverse Shopify expertise">
      <div className="experience-stage">
        <div ref={heroContent} className="hero-content">{children}</div>
        <div className="globe-story">
          <p className="eyebrow">Commerce is connected</p>
          <h2>Every detail.<br /><em>Working together.</em></h2>
          <p>Your storefront, checkout and operations are one experience. We connect the work behind it.</p>
        </div>
        <div className="earth-box" ref={globeBox} onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
          {ready ? <SceneBoundary><Globe active={active} paused={paused} hovering={hovering} /></SceneBoundary> : <EarthFallback />}
        </div>
        <div className="globe-toolbar">
          <span>Drag to explore · Pinch to zoom</span>
          <div><button type="button" onClick={() => setZoom(value => clamp(value - 0.1, 0.8, 1.35))} aria-label="Zoom out globe"><Minus size={15} /></button><button type="button" onClick={() => setZoom(value => clamp(value + 0.1, 0.8, 1.35))} aria-label="Zoom in globe"><Plus size={15} /></button><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume globe rotation' : 'Pause globe rotation'}>{paused ? <Play size={13} /> : <Pause size={13} />}</button></div>
        </div>
        <div className="experience-bottom"><span>Shopify development · Optimization · Management</span><a href="#expertise">Explore the whole picture <ArrowDown size={14} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
