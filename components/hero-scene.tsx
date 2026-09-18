'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type Market = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  client: string;
  category: string;
  services: string;
  result: string;
  image: string;
  href: string;
};

const MARKETS: Market[] = [
  { city: 'Las Vegas', country: 'United States', lat: 36.17, lon: -115.14, client: 'GLOV Beauty', category: 'Beauty technology', services: 'Shopify management · CRO', result: '+18% AOV · 2.6× ROAS', image: '/work/glov.png', href: 'https://claraverse.in/portfolio/https-glovbeauty-com/' },
  { city: 'Delray Beach', country: 'United States', lat: 26.46, lon: -80.07, client: 'Amala Beauty', category: 'Premium skincare', services: 'CRO · High-ticket funnels', result: 'Digital spa experience', image: '/work/amala.png', href: 'https://claraverse.in/portfolio/https-amalabeauty-com/' },
  { city: 'Australia', country: 'Australia', lat: -33.87, lon: 151.21, client: 'ANS Shopping', category: 'Ethical fashion', services: 'Shopify development · UX', result: '+29% AOV · 3.4× ROAS', image: '/work/ans.png', href: 'https://claraverse.in/portfolio/ans-shopping/' },
  { city: 'Surat', country: 'India', lat: 21.17, lon: 72.83, client: 'Man Mandir', category: 'Premium handloom', services: 'DTC commerce · Growth', result: '+18% AOV · 2.6× ROAS', image: '/work/man-mandir.png', href: 'https://claraverse.in/portfolio/manmandir/' },
  { city: 'Gurugram', country: 'India', lat: 28.46, lon: 77.03, client: 'Imperial Knots', category: 'Luxury lifestyle', services: 'Digital growth retainer', result: '+42% CTR · 2.2× ROAS', image: '/work/imperial-knots.png', href: 'https://claraverse.in/portfolio/imperial-knots/' },
];

function latLonVector(lat: number, lon: number, radius = 2.34) {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta),
  );
}

function nearestMarketFromTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
  if (timezone.includes('kolkata') || timezone.includes('calcutta')) return 3;
  if (timezone.includes('sydney') || timezone.includes('melbourne')) return 2;
  if (timezone.startsWith('america/')) return 0;
  if (timezone.startsWith('asia/')) return 4;
  return 0;
}

function marketFromCountry(country: string | null) {
  if (!country) return nearestMarketFromTimezone();
  const code = country.toUpperCase();
  if (['US', 'CA', 'MX', 'BR', 'AR'].includes(code)) return 0;
  if (['GB', 'IE', 'FR', 'DE', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK'].includes(code)) return 0;
  if (['AE', 'SA', 'QA', 'KW', 'BH', 'OM'].includes(code)) return 4;
  if (['IN', 'PK', 'BD', 'LK', 'NP'].includes(code)) return 3;
  if (['SG', 'MY', 'ID', 'TH', 'PH', 'HK', 'JP', 'KR', 'CN'].includes(code)) return 2;
  if (['AU', 'NZ'].includes(code)) return 2;
  return nearestMarketFromTimezone();
}

function DottedGlobe({ active }: { active: number }) {
  const globe = useRef<THREE.Group>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, '/earth-atmos.jpg');
  const front = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const target = useMemo(
    () => latLonVector(MARKETS[active].lat, MARKETS[active].lon, 1).normalize(),
    [active],
  );
  const destination = useMemo(() => new THREE.Quaternion(), []);
  const scrollTurn = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);

  useFrame((state, delta) => {
    if (!globe.current) return;
    const scroll = typeof window === 'undefined' ? 0 : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5);
    destination.setFromUnitVectors(target, front);
    scrollTurn.setFromEuler(euler.set(scroll * 0.16, scroll * 0.72, 0));
    destination.multiply(scrollTurn);
    globe.current.quaternion.slerp(destination, 1 - Math.pow(0.0008, delta));
    globe.current.position.y = -1.12 + scroll * 0.78 + Math.sin(state.clock.elapsedTime * 0.45) * 0.018;
    globe.current.scale.setScalar(1 + scroll * 0.08);
  });

  return (
    <group ref={globe}>
      <mesh>
        <sphereGeometry args={[2.3, 128, 128]} />
        <meshBasicMaterial color="#f3f3f1" />
      </mesh>
      <mesh scale={1.003}>
        <sphereGeometry args={[2.3, 128, 128]} />
        <shaderMaterial
          ref={shader}
          transparent
          uniforms={{ uMap: { value: texture } }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D uMap;
            varying vec2 vUv;
            void main() {
              vec3 source = texture2D(uMap, vUv).rgb;
              float ocean = smoothstep(0.02, 0.19, source.b - max(source.r, source.g));
              float land = 1.0 - ocean;
              vec2 cell = fract(vUv * vec2(300.0, 150.0));
              float dotShape = 1.0 - smoothstep(0.22, 0.39, length(cell - 0.5));
              float alpha = land * dotShape * 0.92;
              gl_FragColor = vec4(vec3(0.055), alpha);
            }
          `}
        />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[2.3, 64, 64]} />
        <meshBasicMaterial color="#111111" transparent opacity={0.035} wireframe />
      </mesh>

      {MARKETS.map((market, index) => {
        const point = latLonVector(market.lat, market.lon);
        return (
          <group key={market.city}>
            <mesh position={point} scale={index === active ? 1.3 : 0.72}>
              <sphereGeometry args={[0.055, 18, 18]} />
              <meshBasicMaterial color="#111111" />
            </mesh>
            {index === active && (
              <Html position={point.clone().multiplyScalar(1.035)} center distanceFactor={7.2}>
                <div className="pin-pulse" />
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function HeroScene() {
  const [active, setActive] = useState(1);
  const market = MARKETS[active];

  useEffect(() => {
    let cancelled = false;
    fetch('/api/geo')
      .then((response) => response.json())
      .then((data) => {
        const geo = data as { country?: string | null };
        if (!cancelled) setActive(marketFromCountry(geo.country ?? null));
      })
      .catch(() => {
        if (!cancelled) setActive(nearestMarketFromTimezone());
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="globe-experience">
      <Canvas camera={{ position: [0, 0.2, 7.4], fov: 39 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <DottedGlobe active={active} />
      </Canvas>

      <a className="market-card" href={market.href} target="_blank" rel="noreferrer" aria-label={`View the ${market.client} case study`}>
        <Image src={market.image} alt="" width={246} height={78} />
        <div className="market-card-top">
          <span><MapPin size={13} fill="currentColor" /> Nearest proof point</span>
          <i>0{active + 1}</i>
        </div>
        <h3>{market.client}</h3>
        <p>{market.city} · {market.country}</p>
        <div className="market-card-meta"><span>{market.category}</span><span>{market.services}</span></div>
        <strong>{market.result} <span aria-hidden="true">↗</span></strong>
      </a>

      <div className="market-switcher" aria-label="Explore global markets">
        {MARKETS.map((item, index) => (
          <button key={item.city} onClick={() => setActive(index)} className={index === active ? 'active' : ''}>{item.city}</button>
        ))}
      </div>
    </div>
  );
}
