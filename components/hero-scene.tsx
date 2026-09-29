'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Html, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const REGIONS = [
  { label: 'USA', value: '30%', lat: 38.5, lon: -98.4, color: '#e96952' },
  { label: 'Australia', value: '20%', lat: -25.3, lon: 133.8, color: '#f1a27f' },
  { label: 'India', value: '30%', lat: 22.6, lon: 79.0, color: '#df8fa2' },
  { label: 'Europe', value: '20%', lat: 50.3, lon: 10.4, color: '#c65b55' },
];

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
    <mesh scale={1.06}>
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
            float rim = pow(0.82 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
            gl_FragColor = vec4(0.38, 0.68, 0.82, rim * 0.54);
          }
        `}
      />
    </mesh>
  );
}

function FloatingForms() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight * 1.05, 1), 1);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * -0.08, 4, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.11, 4, delta);
    group.current.position.y = THREE.MathUtils.lerp(0, 1.5, ease(progress));
    group.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.78, progress));
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

function RealEarth() {
  const motion = useRef<THREE.Group>(null);
  const rotating = useRef<THREE.Group>(null);
  const surface = useRef<THREE.Mesh>(null);
  const labels = useRef<Array<HTMLDivElement | null>>([]);
  const reducedMotion = useRef(false);
  const sourceTexture = useLoader(THREE.TextureLoader, '/earth-atmos.jpg');
  const texture = useMemo(() => {
    const prepared = sourceTexture.clone();
    prepared.colorSpace = THREE.SRGBColorSpace;
    prepared.anisotropy = 8;
    prepared.needsUpdate = true;
    return prepared;
  }, [sourceTexture]);
  const points = useMemo(() => REGIONS.map((region) => latLonVector(region.lat, region.lon)), []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => texture.dispose();
  }, [texture]);

  useFrame((state, delta) => {
    if (!motion.current || !rotating.current) return;
    const raw = Math.min(window.scrollY / Math.max(window.innerHeight * 0.95, 1), 1);
    const progress = ease(raw);
    const mobile = window.innerWidth < 640;

    motion.current.position.y = THREE.MathUtils.lerp(mobile ? -2.75 : -2.62, mobile ? -0.48 : -0.15, progress);
    motion.current.scale.setScalar(THREE.MathUtils.lerp(mobile ? 0.48 : 0.58, mobile ? 0.96 : 1.12, progress));
    rotating.current.rotation.x = THREE.MathUtils.lerp(0.08, -0.04, progress);
    if (!reducedMotion.current) rotating.current.rotation.y += delta * THREE.MathUtils.lerp(0.09, 0.045, progress);
    rotating.current.rotation.y += state.pointer.x * delta * 0.035;

    const reveal = THREE.MathUtils.smoothstep(raw, 0.48, 0.78);
    labels.current.forEach((label, index) => {
      if (!label) return;
      label.style.opacity = String(reveal);
      label.style.transform = `translate(-50%, -50%) translateY(${(1 - reveal) * 12}px) scale(${0.86 + reveal * 0.14})`;
      label.style.transitionDelay = `${index * 45}ms`;
    });
  });

  return (
    <group ref={motion}>
      <group ref={rotating} rotation={[0.08, -1.45, 0]}>
        <mesh ref={surface} castShadow receiveShadow>
          <sphereGeometry args={[2, 128, 128]} />
          <meshStandardMaterial map={texture} roughness={0.86} metalness={0.02} />
        </mesh>
        <Atmosphere />

        {REGIONS.map((region, index) => {
          const point = points[index];
          return (
            <group key={region.label} position={point}>
              <mesh>
                <sphereGeometry args={[0.055, 18, 18]} />
                <meshBasicMaterial color={region.color} />
              </mesh>
              <mesh scale={1.9}>
                <ringGeometry args={[0.04, 0.065, 28]} />
                <meshBasicMaterial color={region.color} transparent opacity={0.72} side={THREE.DoubleSide} />
              </mesh>
              <Html position={[0, 0.18, 0]} center distanceFactor={6.8} occlude>
                <div ref={(node) => { labels.current[index] = node; }} className="earth-region-label">
                  <span style={{ backgroundColor: region.color }} />
                  <strong>{region.label}</strong>
                  <b>{region.value}</b>
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="globe-experience">
      <Canvas
        camera={{ position: [0, 0.2, 7.5], fov: 38 }}
        dpr={[1, 1.65]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        shadows
      >
        <ambientLight intensity={1.45} />
        <hemisphereLight color="#fff4ed" groundColor="#5a2b3d" intensity={1.8} />
        <directionalLight position={[-4, 5, 5]} intensity={3.4} color="#fff4dd" castShadow />
        <pointLight position={[4, 1, 3]} intensity={8} distance={12} color="#ffb495" />
        <FloatingForms />
        <RealEarth />
      </Canvas>
    </div>
  );
}
