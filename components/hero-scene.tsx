'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function point(lat: number, lon: number, radius = 1.025) {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(radius * Math.cos(phi) * Math.cos(theta), radius * Math.sin(phi), -radius * Math.cos(phi) * Math.sin(theta));
}

const regions = [[19.076, 72.8777], [40.7128, -74.006], [52.3676, 4.9041]] as const;

function Connection({ from, to, offset, paused }: { from: readonly [number, number]; to: readonly [number, number]; offset: number; paused: boolean }) {
  const particle = useRef<THREE.Mesh>(null);
  const elapsed = useRef(offset);
  const points = useMemo(() => {
    const start = point(...from).normalize();
    const end = point(...to).normalize();
    return Array.from({ length: 65 }, (_, index) => {
      const t = index / 64;
      return start.clone().lerp(end, t).normalize().multiplyScalar(1.03 + Math.sin(t * Math.PI) * 0.2);
    });
  }, [from, to]);
  useFrame((_, delta) => {
    if (!paused) elapsed.current += Math.min(delta, 0.05) * 0.035;
    const value = (elapsed.current % 1) * 64;
    particle.current?.position.copy(points[Math.floor(value)]).lerp(points[Math.min(64, Math.floor(value) + 1)], value % 1);
  });
  return <group><Line points={points} color="#b88d70" lineWidth={0.75} transparent opacity={0.48} /><mesh ref={particle}><sphereGeometry args={[0.015, 12, 12]} /><meshBasicMaterial color="#a97658" /></mesh></group>;
}

function Earth({ paused, hovering }: { paused: boolean; hovering: boolean }) {
  const group = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, '/earth-blue-marble.jpg');
  const uniforms = useMemo(() => ({ earthMap: { value: texture } }), [texture]);
  useFrame((_, delta) => {
    if (group.current && !paused) group.current.rotation.y += Math.min(delta, 0.05) * (hovering ? 0.006 : 0.027);
  });
  return (
    <group ref={group} rotation={[0.12, -1.6, 0.08]}>
      <mesh>
        <sphereGeometry args={[1, 80, 80]} />
        <shaderMaterial uniforms={uniforms}
          vertexShader={`varying vec2 vUv; varying vec3 vNormal; void main(){vUv=uv;vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
          fragmentShader={`
            uniform sampler2D earthMap; varying vec2 vUv; varying vec3 vNormal;
            void main() {
              vec3 source = texture2D(earthMap, vUv).rgb;
              float land = smoothstep(0.10, 0.36, max(source.r, source.g) - source.b * 0.75);
              float ice = smoothstep(0.64, 0.9, min(source.r, min(source.g, source.b)));
              vec3 ocean = vec3(0.66, 0.80, 0.80);
              vec3 terrain = mix(vec3(0.78,0.75,0.64),vec3(0.90,0.83,0.70),source.r);
              vec3 color = mix(ocean, terrain, land);
              color = mix(color, vec3(0.96,0.95,0.89),ice);
              float light = 0.84 + max(0.0,dot(normalize(vNormal),normalize(vec3(-0.6,0.8,1.7)))) * 0.18;
              gl_FragColor = vec4(color * light,1.0);
            }`} />
      </mesh>
      {regions.map(([lat, lon]) => <mesh key={lat} position={point(lat, lon)}><sphereGeometry args={[0.022, 16, 16]} /><meshBasicMaterial color="#a46f53" /></mesh>)}
      <Connection from={regions[0]} to={regions[1]} offset={0.15} paused={paused} />
      <Connection from={regions[1]} to={regions[2]} offset={0.5} paused={paused} />
      <Connection from={regions[2]} to={regions[0]} offset={0.82} paused={paused} />
    </group>
  );
}

export function HeroScene({ paused, hovering, active }: { paused: boolean; hovering: boolean; active: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.1], fov: 44 }} dpr={[1, 1.5]} frameloop={active && !paused ? 'always' : 'demand'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
      <Suspense fallback={null}><Earth paused={paused} hovering={hovering} /></Suspense>
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.07} rotateSpeed={0.45} minPolarAngle={0.3} maxPolarAngle={Math.PI - 0.3} />
    </Canvas>
  );
}
