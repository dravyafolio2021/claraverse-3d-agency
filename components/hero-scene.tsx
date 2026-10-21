'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { domesticRouteCount, locations, networkRoutes, seededRandom } from '@/lib/commerce-network';

// One coordinate convention is shared by geography, customer dots and every route.
function point(lat: number, lon: number, radius = 1) {
  const p = THREE.MathUtils.degToRad(lat), l = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(radius * Math.cos(p) * Math.sin(l), radius * Math.sin(p), radius * Math.cos(p) * Math.cos(l));
}
type Motion = { yaw: number; pitch: number; dragging: boolean; cursorX: number; cursorY: number; lastX: number; lastY: number };
type Country = { polygons: [number, number][][] };
function inside(lat: number, lon: number, poly: [number, number][]) {
  let found = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [y1, x1] = poly[i], [y2, x2] = poly[j];
    if ((y1 > lat) !== (y2 > lat) && lon < (x2 - x1) * (lat - y1) / (y2 - y1) + x1) found = !found;
  }
  return found;
}

function Geography() {
  const raw = useLoader(THREE.FileLoader, '/globe-land.json') as string;
  const geometry = useMemo(() => {
    const polygons = (JSON.parse(raw) as Country[]).flatMap(country => country.polygons).map(poly => ({ poly, minLat: Math.min(...poly.map(p => p[0])), maxLat: Math.max(...poly.map(p => p[0])), minLon: Math.min(...poly.map(p => p[1])), maxLon: Math.max(...poly.map(p => p[1])) }));
    const positions: number[] = [];
    const random = seededRandom(812);
    for (let lat = -58; lat < 80; lat += 1.05) for (let lon = -180; lon < 180; lon += 1.05 / Math.max(.2, Math.cos(lat * Math.PI / 180))) {
      const a = lat + random() * .65, b = lon + random() * .65;
      if (!polygons.some(p => a >= p.minLat && a <= p.maxLat && b >= p.minLon && b <= p.maxLon && inside(a, b, p.poly))) continue;
      const v = point(a, b, 1.004); positions.push(v.x, v.y, v.z);
    }
    return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  }, [raw]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <points geometry={geometry}><shaderMaterial transparent depthWrite={false}
    vertexShader="void main(){vec4 v=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*v;gl_PointSize=clamp(3.0/-v.z,1.,2.3);}"
    fragmentShader="void main(){float a=1.-smoothstep(.12,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.66,.88,.39,a*.75);}" /></points>;
}

const CAPACITY = 48, TRAIL = 14;
function NetworkTraffic({ paused }: { paused: boolean }) {
  const clock = useRef(0);
  const random = useMemo(() => seededRandom(3491), []);
  const simulation = useMemo(() => {
    const routes = networkRoutes.map(([from, to], index) => {
      const a = point(locations[from].lat, locations[from].lon), b = point(locations[to].lat, locations[to].lon);
      const angle = a.angleTo(b), sin = Math.sin(angle);
      return Array.from({ length: 97 }, (_, i) => {
        const t = i / 96;
        const dir = Math.abs(sin) < .001 ? a.clone().lerp(b, t).normalize() : a.clone().multiplyScalar(Math.sin((1 - t) * angle) / sin).add(b.clone().multiplyScalar(Math.sin(t * angle) / sin));
        return dir.multiplyScalar(1.012 + Math.sin(Math.PI * t) * (index < domesticRouteCount ? .025 : .055));
      });
    });
    const flights = Array.from({ length: CAPACITY }, (_, i) => { const duration = 3.5 + random() * 5.5; return { route: i % networkRoutes.length, born: -random() * duration, duration, live: i < 30 }; });
    const trails = new THREE.BufferGeometry();
    trails.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CAPACITY * TRAIL * 2 * 3), 3).setUsage(THREE.DynamicDrawUsage));
    trails.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(CAPACITY * TRAIL * 2), 1).setUsage(THREE.DynamicDrawUsage));
    const heads = new THREE.BufferGeometry();
    heads.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CAPACITY * 3), 3).setUsage(THREE.DynamicDrawUsage));
    heads.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(CAPACITY), 1).setUsage(THREE.DynamicDrawUsage));
    const nodes = new THREE.BufferGeometry().setFromPoints(locations.map(l => point(l.lat, l.lon, 1.015)));
    nodes.setAttribute('aArrival', new THREE.BufferAttribute(new Float32Array(locations.length).fill(-20), 1).setUsage(THREE.DynamicDrawUsage));
    return { routes, flights, trails, heads, nodes, nextLaunch: 0, time: { value: 0 } };
  }, [random]);
  const simulationRef = useRef(simulation);
  const vector = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => () => { simulation.trails.dispose(); simulation.heads.dispose(); simulation.nodes.dispose(); }, [simulation]);
  useFrame((_, delta) => {
    const simulation = simulationRef.current;
    if (!paused) clock.current += Math.min(delta, .05);
    const time = clock.current;
    simulation.time.value = time;
    if (!paused && time >= simulation.nextLaunch) {
      const free = simulation.flights.find(f => !f.live);
      if (free) {
        // Domestic traffic is more frequent; international orders have longer transit.
        const cross = random() > .78;
        free.route = cross ? domesticRouteCount + Math.floor(random() * (networkRoutes.length - domesticRouteCount)) : Math.floor(random() * domesticRouteCount);
        free.born = time; free.duration = cross ? 7 + random() * 4 : 3.2 + random() * 3.8; free.live = true;
      }
      simulation.nextLaunch = time + .19 + random() * .36;
    }
    const positions = simulation.trails.getAttribute('position'), alpha = simulation.trails.getAttribute('aAlpha');
    const heads = simulation.heads.getAttribute('position'), headAlpha = simulation.heads.getAttribute('aAlpha');
    simulation.flights.forEach((f, index) => {
      const progress = (time - f.born) / f.duration;
      if (f.live && progress >= 1) {
        f.live = false;
        simulation.nodes.getAttribute('aArrival').setX(networkRoutes[f.route][1], time);
        simulation.nodes.getAttribute('aArrival').needsUpdate = true;
      }
      const visible = f.live && progress >= 0 && progress < 1;
      const curve = simulation.routes[f.route];
      const sample = (p: number) => { const at = Math.max(0, Math.min(.9999, p)) * 96, i = Math.floor(at); return vector.copy(curve[i]).lerp(curve[i + 1], at - i); };
      sample(progress); heads.setXYZ(index, vector.x, vector.y, vector.z); headAlpha.setX(index, visible ? 1 : 0);
      for (let j = 0; j < TRAIL; j++) for (let end = 0; end < 2; end++) {
        const amount = (j + end) / TRAIL, p = progress - (1 - amount) * .15, slot = (index * TRAIL + j) * 2 + end;
        sample(p); positions.setXYZ(slot, vector.x, vector.y, vector.z); alpha.setX(slot, visible && p > 0 ? amount * amount * .8 : 0);
      }
    });
    positions.needsUpdate = alpha.needsUpdate = heads.needsUpdate = headAlpha.needsUpdate = true;
  });
  const routesGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(simulation.routes.flatMap(curve => curve.slice(0, -1).flatMap((p, i) => [p, curve[i + 1]]))), [simulation]);
  useEffect(() => () => routesGeometry.dispose(), [routesGeometry]);
  return <group>
    <lineSegments geometry={routesGeometry}><lineBasicMaterial color="#a9d86d" transparent opacity={.095} depthWrite={false} /></lineSegments>
    <lineSegments geometry={simulation.trails}><shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending}
      vertexShader="attribute float aAlpha;varying float vAlpha;void main(){vAlpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}" fragmentShader="varying float vAlpha;void main(){gl_FragColor=vec4(.74,1.,.4,vAlpha);}" /></lineSegments>
    <points geometry={simulation.heads}><shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending}
      vertexShader="attribute float aAlpha;varying float vAlpha;void main(){vAlpha=aAlpha;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(7./-p.z,2.,4.);}" fragmentShader="varying float vAlpha;void main(){gl_FragColor=vec4(.88,1.,.63,vAlpha*(1.-smoothstep(.1,.5,length(gl_PointCoord-.5))));}" /></points>
    <points geometry={simulation.nodes}><shaderMaterial transparent depthWrite={false} uniforms={{ uTime: simulation.time }}
      vertexShader="attribute float aArrival;uniform float uTime;varying float vPulse;void main(){vPulse=max(0.,1.-(uTime-aArrival)/1.5);vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp((6.+vPulse*9.)/-p.z,2.,8.);}" fragmentShader="varying float vPulse;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(.8,1.,.5,(1.-smoothstep(.08,.5,d))*(.6+vPulse*.4));}" /></points>
  </group>;
}

function Earth({ paused, motion }: { paused: boolean; motion: RefObject<Motion> }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  useFrame((_, delta) => {
    const state = motion.current;
    if (!paused && !state.dragging) spin.current += Math.min(delta, .05) * .025;
    if (group.current) {
      // The same group owns drag, cursor response and auto-rotation. No camera orbit
      // or React Euler prop can reapply an old orientation when controls re-render.
      const targetPitch = THREE.MathUtils.clamp(state.pitch + state.cursorY * .025, -.42, .42);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.yaw + spin.current + state.cursorX * .035, 7, Math.min(delta, .05));
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetPitch, 7, Math.min(delta, .05));
    }
  });
  return <group ref={group}>
    <mesh><sphereGeometry args={[1, 64, 48]} /><meshBasicMaterial color="#08170f" /></mesh>
    <mesh><sphereGeometry args={[1.012, 64, 48]} /><shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending}
      vertexShader="varying vec3 n;varying vec3 eye;void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);eye=normalize(-p.xyz);gl_Position=projectionMatrix*p;}"
      fragmentShader="varying vec3 n;varying vec3 eye;void main(){float f=pow(1.-max(0.,dot(normalize(n),normalize(eye))),3.);gl_FragColor=vec4(.58,.95,.3,f*.46);}" /></mesh>
    <Geography /><NetworkTraffic paused={paused} />
  </group>;
}

export function HeroScene({ paused, active }: { paused: boolean; active: boolean }) {
  const motion = useRef<Motion>({ yaw: .32, pitch: .22, dragging: false, cursorX: 0, cursorY: 0, lastX: 0, lastY: 0 });
  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- A native input cannot contain the WebGL canvas; this custom rotation slider implements arrow/Home keys and ARIA values.
  return <div className="earth-interaction" role="slider" aria-valuemin={0} aria-valuemax={360} aria-valuenow={0} aria-valuetext="Horizontal globe rotation. Use left and right arrows; Home to reset." tabIndex={0} aria-label="Interactive illustrative order network. Drag or use arrow keys to rotate the globe." onKeyDown={event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); motion.current.yaw += event.key === 'ArrowLeft' ? -.18 : .18; }
    if (event.key === 'Home') { event.preventDefault(); motion.current.yaw = .32; motion.current.pitch = .22; }
    event.currentTarget.setAttribute('aria-valuenow', String(Math.round(((motion.current.yaw - .32) * 180 / Math.PI % 360 + 360) % 360)));
  }} onPointerDown={event => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId); motion.current.dragging = true; motion.current.lastX = event.clientX; motion.current.lastY = event.clientY;
  }} onPointerMove={event => {
    const state = motion.current;
    if (state.dragging) { state.yaw += (event.clientX - state.lastX) * .004; if (event.pointerType !== 'touch') state.pitch = THREE.MathUtils.clamp(state.pitch + (event.clientY - state.lastY) * .002, -.35, .35); state.lastX = event.clientX; state.lastY = event.clientY; event.currentTarget.setAttribute('aria-valuenow', String(Math.round(((state.yaw - .32) * 180 / Math.PI % 360 + 360) % 360))); }
    else if (event.pointerType === 'mouse') { const box = event.currentTarget.getBoundingClientRect(); state.cursorX = (event.clientX - box.left) / box.width - .5; state.cursorY = (event.clientY - box.top) / box.height - .5; }
  }} onPointerUp={event => { motion.current.dragging = false; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { motion.current.dragging = false; }} onPointerLeave={() => { motion.current.cursorX = motion.current.cursorY = 0; }}>
    <Canvas camera={{ position: [0, 0, 3.25], fov: 44 }} dpr={[1, 1.35]} frameloop={active ? 'always' : 'never'} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}>
      <Suspense fallback={null}><Earth paused={paused} motion={motion} /></Suspense>
    </Canvas>
  </div>;
}
