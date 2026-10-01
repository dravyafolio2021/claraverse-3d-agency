'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Html, PresentationControls, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const CLIENT_LOCATIONS = [
  { city: 'Mumbai', market: 'India', lat: 19.076, lon: 72.8777 },
  { city: 'Delhi', market: 'India', lat: 28.6139, lon: 77.209 },
  { city: 'Bengaluru', market: 'India', lat: 12.9716, lon: 77.5946 },
  { city: 'Hyderabad', market: 'India', lat: 17.385, lon: 78.4867 },
  { city: 'Chennai', market: 'India', lat: 13.0827, lon: 80.2707 },
  { city: 'Kolkata', market: 'India', lat: 22.5726, lon: 88.3639 },
  { city: 'Pune', market: 'India', lat: 18.5204, lon: 73.8567 },
  { city: 'Ahmedabad', market: 'India', lat: 23.0225, lon: 72.5714 },
  { city: 'Surat', market: 'India', lat: 21.1702, lon: 72.8311 },
  { city: 'Jaipur', market: 'India', lat: 26.9124, lon: 75.7873 },
  { city: 'Lucknow', market: 'India', lat: 26.8467, lon: 80.9462 },
  { city: 'Kochi', market: 'India', lat: 9.9312, lon: 76.2673 },
  { city: 'Chandigarh', market: 'India', lat: 30.7333, lon: 76.7794 },
  { city: 'Indore', market: 'India', lat: 22.7196, lon: 75.8577 },
  { city: 'Goa', market: 'India', lat: 15.4909, lon: 73.8278 },
  { city: 'New York', market: 'USA', lat: 40.7128, lon: -74.006 },
  { city: 'Los Angeles', market: 'USA', lat: 34.0522, lon: -118.2437 },
  { city: 'Chicago', market: 'USA', lat: 41.8781, lon: -87.6298 },
  { city: 'Houston', market: 'USA', lat: 29.7604, lon: -95.3698 },
  { city: 'Miami', market: 'USA', lat: 25.7617, lon: -80.1918 },
  { city: 'San Francisco', market: 'USA', lat: 37.7749, lon: -122.4194 },
  { city: 'Seattle', market: 'USA', lat: 47.6062, lon: -122.3321 },
  { city: 'Boston', market: 'USA', lat: 42.3601, lon: -71.0589 },
  { city: 'Austin', market: 'USA', lat: 30.2672, lon: -97.7431 },
  { city: 'Denver', market: 'USA', lat: 39.7392, lon: -104.9903 },
  { city: 'Atlanta', market: 'USA', lat: 33.749, lon: -84.388 },
  { city: 'Dallas', market: 'USA', lat: 32.7767, lon: -96.797 },
  { city: 'Phoenix', market: 'USA', lat: 33.4484, lon: -112.074 },
  { city: 'San Diego', market: 'USA', lat: 32.7157, lon: -117.1611 },
  { city: 'Washington DC', market: 'USA', lat: 38.9072, lon: -77.0369 },
  { city: 'Sydney', market: 'Australia', lat: -33.8688, lon: 151.2093 },
  { city: 'Melbourne', market: 'Australia', lat: -37.8136, lon: 144.9631 },
  { city: 'Brisbane', market: 'Australia', lat: -27.4698, lon: 153.0251 },
  { city: 'Perth', market: 'Australia', lat: -31.9505, lon: 115.8605 },
  { city: 'Adelaide', market: 'Australia', lat: -34.9285, lon: 138.6007 },
  { city: 'Gold Coast', market: 'Australia', lat: -28.0167, lon: 153.4 },
  { city: 'Canberra', market: 'Australia', lat: -35.2809, lon: 149.13 },
  { city: 'Hobart', market: 'Australia', lat: -42.8821, lon: 147.3272 },
  { city: 'Darwin', market: 'Australia', lat: -12.4634, lon: 130.8456 },
  { city: 'Newcastle', market: 'Australia', lat: -32.9283, lon: 151.7817 },
  { city: 'London', market: 'Europe', lat: 51.5072, lon: -0.1276 },
  { city: 'Paris', market: 'Europe', lat: 48.8566, lon: 2.3522 },
  { city: 'Berlin', market: 'Europe', lat: 52.52, lon: 13.405 },
  { city: 'Amsterdam', market: 'Europe', lat: 52.3676, lon: 4.9041 },
  { city: 'Madrid', market: 'Europe', lat: 40.4168, lon: -3.7038 },
  { city: 'Milan', market: 'Europe', lat: 45.4642, lon: 9.19 },
  { city: 'Stockholm', market: 'Europe', lat: 59.3293, lon: 18.0686 },
  { city: 'Dublin', market: 'Europe', lat: 53.3498, lon: -6.2603 },
  { city: 'Copenhagen', market: 'Europe', lat: 55.6761, lon: 12.5683 },
  { city: 'Lisbon', market: 'Europe', lat: 38.7223, lon: -9.1393 },
] as const;

const ORDER_ROUTES = [
  { from: [19.076, 72.8777], to: [25.2048, 55.2708], speed: 0.105, offset: 0.05, color: '#d45655' },
  { from: [19.076, 72.8777], to: [51.5072, -0.1276], speed: 0.082, offset: 0.42, color: '#f2a15f' },
  { from: [28.6139, 77.209], to: [1.3521, 103.8198], speed: 0.112, offset: 0.73, color: '#d45655' },
  { from: [40.7128, -74.006], to: [43.6532, -79.3832], speed: 0.12, offset: 0.22, color: '#f2a15f' },
  { from: [34.0522, -118.2437], to: [35.6762, 139.6503], speed: 0.076, offset: 0.58, color: '#d45655' },
  { from: [41.8781, -87.6298], to: [19.4326, -99.1332], speed: 0.116, offset: 0.86, color: '#f2a15f' },
  { from: [-33.8688, 151.2093], to: [-36.8509, 174.7645], speed: 0.124, offset: 0.32, color: '#d45655' },
  { from: [-37.8136, 144.9631], to: [1.3521, 103.8198], speed: 0.09, offset: 0.67, color: '#f2a15f' },
  { from: [51.5072, -0.1276], to: [40.7128, -74.006], speed: 0.084, offset: 0.14, color: '#d45655' },
  { from: [52.52, 13.405], to: [59.3293, 18.0686], speed: 0.118, offset: 0.93, color: '#f2a15f' },
] as const;

const COUNTRY_CURRENCIES: Record<string, string> = {
  AE: 'AED', AU: 'AUD', BR: 'BRL', CA: 'CAD', CH: 'CHF', CN: 'CNY',
  CZ: 'CZK', DK: 'DKK', GB: 'GBP', HK: 'HKD', ID: 'IDR', IN: 'INR',
  JP: 'JPY', KR: 'KRW', MX: 'MXN', MY: 'MYR', NO: 'NOK', NZ: 'NZD',
  PH: 'PHP', PL: 'PLN', SA: 'SAR', SE: 'SEK', SG: 'SGD', TH: 'THB',
  TR: 'TRY', US: 'USD', ZA: 'ZAR',
};

const EURO_COUNTRIES = new Set([
  'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE',
  'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK',
]);

const USD_CONVERSION: Record<string, number> = {
  AED: 3.67, AUD: 1.52, BRL: 5.45, CAD: 1.38, CHF: 0.8, CNY: 7.12,
  CZK: 20.9, DKK: 6.38, EUR: 0.86, GBP: 0.74, HKD: 7.8, IDR: 16650,
  INR: 88.7, JPY: 147, KRW: 1400, MXN: 18.4, MYR: 4.2, NOK: 10.2,
  NZD: 1.72, PHP: 58.2, PLN: 3.65, SAR: 3.75, SEK: 9.5, SGD: 1.28,
  THB: 32.5, TRY: 41.8, USD: 1, ZAR: 17.3,
};

function currencyForCountry(country: string | null | undefined) {
  if (!country) return null;
  const code = country.toUpperCase();
  if (EURO_COUNTRIES.has(code)) return 'EUR';
  return COUNTRY_CURRENCIES[code] ?? null;
}

function regionFromLocale(locale: string) {
  try {
    return new Intl.Locale(locale).region ?? null;
  } catch {
    return locale.match(/[-_]([a-z]{2})\b/i)?.[1]?.toUpperCase() ?? null;
  }
}

function currencyForTimezone(timeZone: string | undefined) {
  if (!timeZone) return null;
  if (timeZone === 'Asia/Kolkata' || timeZone === 'Asia/Calcutta') return 'INR';
  if (timeZone.startsWith('Australia/')) return 'AUD';
  if (timeZone === 'Europe/London') return 'GBP';
  if (timeZone.startsWith('Europe/')) return 'EUR';
  if (timeZone.startsWith('America/Toronto') || timeZone.startsWith('America/Vancouver')) return 'CAD';
  if (timeZone.startsWith('America/Mexico')) return 'MXN';
  if (timeZone.startsWith('America/Sao_Paulo')) return 'BRL';
  if (timeZone.startsWith('America/')) return 'USD';
  if (timeZone.startsWith('Asia/Dubai')) return 'AED';
  if (timeZone.startsWith('Asia/Singapore')) return 'SGD';
  if (timeZone.startsWith('Asia/Tokyo')) return 'JPY';
  if (timeZone.startsWith('Asia/Seoul')) return 'KRW';
  if (timeZone.startsWith('Pacific/Auckland')) return 'NZD';
  return null;
}

function latLonVector(lat: number, lon: number, radius = 2.04) {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.cos(theta),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.sin(theta),
  );
}

function ease(value: number) {
  return value * value * (3 - 2 * value);
}

function Atmosphere() {
  return (
    <mesh scale={1.028}>
      <sphereGeometry args={[2, 96, 96]} />
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          void main() {
            float rim = pow(0.78 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.7);
            gl_FragColor = vec4(0.62, 0.78, 0.79, rim * 0.16);
          }
        `}
      />
    </mesh>
  );
}

function CloudLayer({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh scale={1.007}>
      <sphereGeometry args={[2, 96, 96]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{ cloudMap: { value: texture } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D cloudMap;
          varying vec2 vUv;
          void main() {
            vec4 cloud = texture2D(cloudMap, vUv);
            float mask = smoothstep(0.06, 0.82, cloud.a);
            gl_FragColor = vec4(1.0, 0.98, 0.94, mask * 0.22);
          }
        `}
      />
    </mesh>
  );
}

function LightEarthSurface({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[2, 128, 128]} />
      <shaderMaterial
        uniforms={{ earthMap: { value: texture } }}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D earthMap;
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vec3 source = texture2D(earthMap, vUv).rgb;
            float landSignal = max(source.r, source.g) - source.b * 0.72;
            float land = smoothstep(0.015, 0.13, landSignal);
            float snow = smoothstep(0.7, 0.94, min(source.r, min(source.g, source.b)));
            float detail = dot(source, vec3(0.28, 0.54, 0.18));

            vec3 oceanColor = vec3(0.66, 0.81, 0.82);
            vec3 landColor = vec3(0.86, 0.72, 0.58);
            vec3 color = mix(oceanColor, landColor, land);
            color += (detail - 0.38) * mix(0.09, 0.13, land);
            color = mix(color, vec3(0.95, 0.94, 0.89), snow * 0.72);

            float light = 0.9 + max(dot(vNormal, normalize(vec3(-0.35, 0.65, 0.8))), 0.0) * 0.12;
            float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
            color = mix(color * light, vec3(0.82, 0.9, 0.89), rim * 0.14);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function locationMetrics(index: number, currency: string, locale: string) {
  const growth = 18 + ((index * 7) % 31);
  const monthlyUsd = 62000 + ((index * 17300) % 168000);
  const converted = monthlyUsd * (USD_CONVERSION[currency] ?? 1);
  let revenue: string;
  try {
    revenue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(converted);
  } catch {
    revenue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(monthlyUsd);
  }
  return { revenue, growth };
}

function OrderFlow() {
  const particles = useRef<Array<THREE.Mesh | null>>([]);
  const arrivals = useRef<Array<THREE.Mesh | null>>([]);
  const routes = useMemo(() => ORDER_ROUTES.map((route) => {
    const start = latLonVector(route.from[0], route.from[1], 2.045);
    const end = latLonVector(route.to[0], route.to[1], 2.045);
    const angle = start.angleTo(end);
    const control = start.clone().add(end).normalize().multiplyScalar(2.18 + angle * 0.46);
    return { ...route, start, end, curve: new THREE.QuadraticBezierCurve3(start, control, end) };
  }), []);

  useFrame(({ clock }) => {
    routes.forEach((route, index) => {
      const progress = (clock.elapsedTime * route.speed + route.offset) % 1;
      const particle = particles.current[index];
      const arrival = arrivals.current[index];
      if (particle) {
        particle.position.copy(route.curve.getPointAt(progress));
        const breathe = 0.9 + Math.sin(progress * Math.PI) * 0.28;
        particle.scale.setScalar(breathe);
      }
      if (arrival) {
        const flash = Math.max(0, 1 - Math.abs(progress - 0.985) * 65);
        arrival.scale.setScalar(0.8 + flash * 2.1);
      }
    });
  });

  return (
    <group>
      {routes.map((route, index) => (
        <group key={`${route.from.join('-')}-${route.to.join('-')}`}>
          <mesh raycast={() => undefined}>
            <tubeGeometry args={[route.curve, 56, 0.008, 5, false]} />
            <meshBasicMaterial
              color={route.color}
              transparent
              opacity={0.34}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          <mesh
            ref={(node) => { particles.current[index] = node; }}
            raycast={() => undefined}
          >
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color={route.color} toneMapped={false} />
          </mesh>
          <mesh
            ref={(node) => { arrivals.current[index] = node; }}
            position={route.end}
            raycast={() => undefined}
          >
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshBasicMaterial color="#fff8ee" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FloatingForms() {
  const group = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const target = THREE.MathUtils.clamp(window.scrollY / Math.max(window.innerHeight * 1.08, 1), 0, 1);
    scrollProgress.current = THREE.MathUtils.damp(scrollProgress.current, target, 4.2, delta);
    const progress = ease(scrollProgress.current);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * -0.08, 4, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.11, 4, delta);
    group.current.position.y = THREE.MathUtils.lerp(0, 2.25, progress);
    group.current.position.z = THREE.MathUtils.lerp(0, -1.1, progress);
    group.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.58, progress));
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.28} floatIntensity={0.55}>
        <RoundedBox args={[0.78, 0.78, 0.78]} radius={0.18} smoothness={5} position={[-3.15, 1.45, -0.2]} rotation={[0.35, 0.45, -0.2]}>
          <meshStandardMaterial color="#e87359" roughness={0.5} />
        </RoundedBox>
      </Float>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.42}>
        <mesh position={[3.3, 1.25, -0.35]} rotation={[0.9, 0.2, 0.45]}>
          <torusGeometry args={[0.62, 0.18, 28, 80]} />
          <meshStandardMaterial color="#54263a" roughness={0.38} />
        </mesh>
      </Float>
      <Float speed={1.35} rotationIntensity={0.18} floatIntensity={0.48}>
        <mesh position={[2.58, 2.18, -0.6]} rotation={[0.2, 0.2, 0.35]}>
          <capsuleGeometry args={[0.2, 1.05, 12, 28]} />
          <meshStandardMaterial color="#f3c09d" roughness={0.52} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.22} floatIntensity={0.38}>
        <mesh position={[-2.55, 2.38, -0.7]}>
          <sphereGeometry args={[0.35, 36, 36]} />
          <meshStandardMaterial color="#e7a184" roughness={0.42} />
        </mesh>
      </Float>
      <Float speed={1.55} rotationIntensity={0.24} floatIntensity={0.35}>
        <RoundedBox args={[0.48, 1.22, 0.48]} radius={0.2} smoothness={5} position={[3.75, -0.2, -0.5]} rotation={[0.15, 0.1, -0.5]}>
          <meshStandardMaterial color="#cf7c8c" roughness={0.5} />
        </RoundedBox>
      </Float>
    </group>
  );
}

function RealEarth({
  zoomRef,
  viewerCurrency,
  viewerLocale,
}: {
  zoomRef: { current: number };
  viewerCurrency: string;
  viewerLocale: string;
}) {
  const motion = useRef<THREE.Group>(null);
  const rotating = useRef<THREE.Group>(null);
  const clouds = useRef<THREE.Group>(null);
  const orderFlow = useRef<THREE.Group>(null);
  const markers = useRef<Array<THREE.Group | null>>([]);
  const reducedMotion = useRef(false);
  const hovered = useRef(false);
  const hidePinTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollProgress = useRef(0);
  const [activePin, setActivePin] = useState<number | null>(null);
  const [sourceTexture, sourceClouds] = useLoader(THREE.TextureLoader, [
    '/earth-blue-marble.jpg',
    '/earth-clouds.png',
  ]);
  const { texture, cloudTexture } = useMemo(() => {
    const color = sourceTexture.clone();
    color.colorSpace = THREE.SRGBColorSpace;
    color.anisotropy = 8;
    color.needsUpdate = true;
    const cloud = sourceClouds.clone();
    cloud.anisotropy = 8;
    cloud.needsUpdate = true;
    return { texture: color, cloudTexture: cloud };
  }, [sourceTexture, sourceClouds]);
  const pins = useMemo(() => CLIENT_LOCATIONS.map((location, index) => {
    const point = latLonVector(location.lat, location.lon, 2.025);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      point.clone().normalize(),
    );
    return { ...location, ...locationMetrics(index, viewerCurrency, viewerLocale), point, quaternion };
  }), [viewerCurrency, viewerLocale]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => {
      if (hidePinTimer.current) clearTimeout(hidePinTimer.current);
      texture.dispose();
      cloudTexture.dispose();
    };
  }, [texture, cloudTexture]);

  useFrame((state, delta) => {
    if (!motion.current || !rotating.current) return;
    const target = THREE.MathUtils.clamp(window.scrollY / Math.max(window.innerHeight * 1.85, 1), 0, 1);
    scrollProgress.current = reducedMotion.current
      ? target
      : THREE.MathUtils.damp(scrollProgress.current, target, 1.9, delta);
    const raw = scrollProgress.current;
    const grow = THREE.MathUtils.smootherstep(raw, 0.18, 0.5);
    const dock = THREE.MathUtils.smootherstep(raw, 0.67, 0.94);
    const mobile = state.size.width < 640;

    const startScale = mobile ? 0.15 : 0.34;
    const centerScale = mobile ? 0.46 : 0.96;
    const dockedScale = mobile ? 0.22 : 0.38;
    const grownScale = THREE.MathUtils.lerp(startScale, centerScale, grow);
    const scale = THREE.MathUtils.lerp(grownScale, dockedScale, dock) * zoomRef.current;

    const startY = mobile ? -2.65 : -2.04;
    const centerY = mobile ? -0.68 : 0.06;
    const dockedY = mobile ? 1.02 : 0.95;
    const grownY = THREE.MathUtils.lerp(startY, centerY, grow);
    const positionY = THREE.MathUtils.lerp(grownY, dockedY, dock);

    const grownZ = THREE.MathUtils.lerp(-0.32, 0.03, grow);
    const positionZ = THREE.MathUtils.lerp(grownZ, -0.22, dock);

    motion.current.position.y = THREE.MathUtils.damp(
      motion.current.position.y,
      positionY,
      2.65,
      delta,
    );
    motion.current.position.z = THREE.MathUtils.damp(
      motion.current.position.z,
      positionZ,
      2.65,
      delta,
    );
    motion.current.scale.setScalar(THREE.MathUtils.damp(motion.current.scale.x, scale, 2.65, delta));
    motion.current.rotation.z = THREE.MathUtils.damp(
      motion.current.rotation.z,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.025, -0.018, grow), 0, dock),
      2.4,
      delta,
    );

    rotating.current.rotation.x = THREE.MathUtils.damp(
      rotating.current.rotation.x,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.08, -0.06, grow), 0.02, dock),
      2.4,
      delta,
    );
    const rotationSpeed = hovered.current ? 0.0015 : THREE.MathUtils.lerp(0.015, 0.024, grow);
    if (!reducedMotion.current) rotating.current.rotation.y += delta * rotationSpeed;
    if (clouds.current && !reducedMotion.current) clouds.current.rotation.y += delta * rotationSpeed * 0.18;

    const revealIn = THREE.MathUtils.smoothstep(raw, 0.4, 0.56);
    const reveal = revealIn;
    if (orderFlow.current) orderFlow.current.visible = reveal > 0.08;
    markers.current.forEach((marker) => {
      if (!marker) return;
      marker.visible = reveal > 0.01;
      marker.scale.setScalar(0.72 + reveal * 0.28);
    });
  });

  return (
    <group ref={motion} position={[0, -2.04, -0.32]} scale={0.31} rotation={[0, 0, 0.025]}>
      <PresentationControls
        cursor
        global={false}
        speed={0.78}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 2, Math.PI / 2]}
        azimuth={[-Infinity, Infinity]}
        damping={0.2}
      >
        <group ref={rotating} rotation={[0.08, 0.65, 0]}>
          <group
            onPointerOver={() => { hovered.current = true; }}
            onPointerOut={() => { hovered.current = false; }}
          >
            <LightEarthSurface texture={texture} />
          </group>
          <group ref={clouds}><CloudLayer texture={cloudTexture} /></group>
          <Atmosphere />
          <group ref={orderFlow} visible={false}><OrderFlow /></group>

          {pins.map((pin, index) => {
            return (
              <group
                ref={(node) => { markers.current[index] = node; }}
                key={`${pin.market}-${pin.city}`}
                position={pin.point}
                quaternion={pin.quaternion}
                visible={false}
              >
                <mesh
                  position={[0, 0, 0.08]}
                  onPointerOver={(event) => {
                    event.stopPropagation();
                    if (hidePinTimer.current) clearTimeout(hidePinTimer.current);
                    hovered.current = true;
                    setActivePin(index);
                  }}
                  onPointerOut={() => {
                    hidePinTimer.current = setTimeout(() => {
                      hovered.current = false;
                      setActivePin(null);
                    }, 110);
                  }}
                >
                  <sphereGeometry args={[0.095, 14, 14]} />
                  <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
                <mesh position={[0, 0, 0.04]} raycast={() => undefined}>
                  <sphereGeometry args={[0.036, 16, 16]} />
                  <meshBasicMaterial color="#fffaf5" />
                </mesh>
                <mesh position={[0, 0, 0.066]} raycast={() => undefined}>
                  <sphereGeometry args={[0.019, 14, 14]} />
                  <meshBasicMaterial color="#9e3146" />
                </mesh>
                <mesh position={[0, 0, 0.025]} raycast={() => undefined}>
                  <ringGeometry args={[0.049, 0.058, 24]} />
                  <meshBasicMaterial color="#54283c" transparent opacity={0.64} side={THREE.DoubleSide} />
                </mesh>
                {activePin === index ? (
                  <Html position={[0, 0.16, 0.08]} center distanceFactor={4} occlude sprite>
                    <div className="earth-client-label">
                      <strong>{pin.city}</strong>
                      <span><b>{pin.revenue}</b> / mo</span>
                      <em>+{pin.growth}%</em>
                    </div>
                  </Html>
                ) : null}
              </group>
            );
          })}
        </group>
      </PresentationControls>
    </group>
  );
}

export function HeroScene() {
  const experience = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(1);
  const [viewerCurrency, setViewerCurrency] = useState('USD');
  const [viewerLocale, setViewerLocale] = useState('en-US');

  useEffect(() => {
    let active = true;
    const locale = navigator.languages.find((item) => regionFromLocale(item)) ?? navigator.language ?? 'en-US';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localeCurrency = currencyForTimezone(timeZone) ?? currencyForCountry(regionFromLocale(locale));
    setViewerLocale(locale);
    if (localeCurrency) setViewerCurrency(localeCurrency);

    fetch('/api/geo', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data: { country?: string | null } | null) => {
        if (!active) return;
        const detectedCurrency = currencyForCountry(data?.country);
        if (detectedCurrency) setViewerCurrency(detectedCurrency);
      })
      .catch(() => undefined);

    return () => { active = false; };
  }, []);

  useEffect(() => {
    const element = experience.current;
    if (!element) return;
    let startDistance = 0;
    let startZoom = 1;

    const distance = (touches: TouchList) => {
      const x = touches[0].clientX - touches[1].clientX;
      const y = touches[0].clientY - touches[1].clientY;
      return Math.hypot(x, y);
    };
    const touchStart = (event: TouchEvent) => {
      if (event.touches.length !== 2) return;
      event.preventDefault();
      startDistance = distance(event.touches);
      startZoom = zoomRef.current;
    };
    const touchMove = (event: TouchEvent) => {
      if (event.touches.length !== 2 || startDistance === 0) return;
      event.preventDefault();
      zoomRef.current = THREE.MathUtils.clamp(
        startZoom * (distance(event.touches) / startDistance),
        0.82,
        1.52,
      );
    };
    const touchEnd = () => { startDistance = 0; };
    const wheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      zoomRef.current = THREE.MathUtils.clamp(
        zoomRef.current * Math.exp(-event.deltaY * 0.006),
        0.82,
        1.52,
      );
    };
    const preventGesture = (event: Event) => event.preventDefault();

    element.addEventListener('touchstart', touchStart, { passive: false });
    element.addEventListener('touchmove', touchMove, { passive: false });
    element.addEventListener('touchend', touchEnd);
    element.addEventListener('touchcancel', touchEnd);
    element.addEventListener('wheel', wheel, { passive: false });
    element.addEventListener('gesturestart', preventGesture, { passive: false });
    element.addEventListener('gesturechange', preventGesture, { passive: false });
    return () => {
      element.removeEventListener('touchstart', touchStart);
      element.removeEventListener('touchmove', touchMove);
      element.removeEventListener('touchend', touchEnd);
      element.removeEventListener('touchcancel', touchEnd);
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('gesturestart', preventGesture);
      element.removeEventListener('gesturechange', preventGesture);
    };
  }, []);

  return (
    <div
      ref={experience}
      className="globe-experience"
      aria-label="Interactive client order globe. Drag to rotate and pinch to zoom the globe."
    >
      <Canvas
        camera={{ position: [0, 0.2, 7.5], fov: 38 }}
        dpr={[1, 1.65]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        shadows
      >
        <ambientLight intensity={2.1} />
        <hemisphereLight color="#ffffff" groundColor="#b8d8e8" intensity={2.2} />
        <directionalLight position={[-4, 5, 5]} intensity={4.2} color="#ffffff" castShadow />
        <directionalLight position={[4, -1, 3]} intensity={1.8} color="#dff2ff" />
        <FloatingForms />
        <RealEarth
          zoomRef={zoomRef}
          viewerCurrency={viewerCurrency}
          viewerLocale={viewerLocale}
        />
      </Canvas>
    </div>
  );
}
