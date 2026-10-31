'use client';
import {useEffect,useRef,useState} from 'react';
import type {BufferGeometry,NormalBufferAttributes} from 'three';
import type {CapabilityShape} from '@/lib/capabilities';

/** One decorative renderer, mounted only for the expanded capability. */
export function CapabilitySculpture({shape}:{shape:CapabilityShape}){
 const host=useRef<HTMLDivElement>(null),[ready,setReady]=useState(false);
 useEffect(()=>{
  const element=host.current;if(!element)return;
  let disposed=false,started=false,inView=false,teardown=()=>{};
  setReady(false);
  const start=async()=>{
   if(started)return;started=true;
   try{
    const [THREE,{RoomEnvironment},{RoundedBoxGeometry}]=await Promise.all([import('three'),import('three/addons/environments/RoomEnvironment.js'),import('three/addons/geometries/RoundedBoxGeometry.js')]);
    if(disposed)return;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:window.innerWidth>700,powerPreference:'low-power'});
    teardown=()=>{renderer.dispose();renderer.domElement.remove();};
    renderer.setClearColor(0x080d0b,0);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.domElement.setAttribute('aria-hidden','true');element.appendChild(renderer.domElement);
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(32,1,.1,40),group=new THREE.Group();camera.position.z=6.8;scene.add(group);
    const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
    const material=new THREE.MeshPhysicalMaterial({color:0x1b241b,metalness:1,roughness:.18,clearcoat:1,clearcoatRoughness:.12,iridescence:.85,iridescenceIOR:1.4,iridescenceThicknessRange:[120,420],envMapIntensity:1.3});
    const lime=new THREE.DirectionalLight(0xcbff65,3);lime.position.set(-3,4,3);scene.add(lime);const rim=new THREE.DirectionalLight(0xa5d9e0,1.5);rim.position.set(4,1,-2);scene.add(rim);
    const mesh=(geometry:BufferGeometry<NormalBufferAttributes>)=>new THREE.Mesh(geometry,material);
    if(shape==='architecture'){
     for(let i=0;i<3;i++){const layer=mesh(new RoundedBoxGeometry(1.65,.33,1.5,4,.12));layer.position.set((i-1)*.16,(i-1)*.48,0);layer.rotation.y=(i-1)*.14;group.add(layer);}
     group.rotation.set(.4,.55,-.1);
    }else if(shape==='design'){
     group.add(mesh(new THREE.TorusKnotGeometry(.72,.23,144,20,2,3)));group.rotation.set(.2,.3,-.2);
    }else if(shape==='integration'){
     const a=mesh(new THREE.TorusGeometry(.65,.19,24,80)),b=mesh(new THREE.TorusGeometry(.65,.19,24,80));a.position.x=-.45;b.position.x=.45;b.rotation.y=Math.PI/2;group.add(a,b);group.rotation.set(.4,.5,-.4);
    }else if(shape==='migration'){
     for(let i=0;i<3;i++){const arc=mesh(new THREE.TorusGeometry(.78,.14,20,75,Math.PI*1.65));arc.position.z=(i-1)*.34;arc.rotation.z=(i-1)*.3;group.add(arc);}group.rotation.set(.35,.65,-.4);
    }else{
     const core=mesh(new THREE.IcosahedronGeometry(.8,0));group.add(core);
     const orbit=mesh(new THREE.TorusGeometry(1.22,.055,12,100));orbit.rotation.x=1;orbit.rotation.y=.45;group.add(orbit);
     const second=mesh(new THREE.TorusGeometry(1.06,.035,10,90));second.rotation.set(-.5,.7,.2);group.add(second);group.rotation.set(.2,.3,-.2);
    }
    const baseX=group.rotation.x,baseY=group.rotation.y,baseZ=group.rotation.z;
    let frame=0,lastFrame=0,elapsed=0,lastTime=performance.now(),pageVisible=!document.hidden,lessMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paint=()=>renderer.render(scene,camera);
    const resize=()=>{const width=Math.max(1,element.clientWidth),height=Math.max(1,element.clientHeight);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();paint();};
    const size=new ResizeObserver(resize);size.observe(element);resize();
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const changeMotion=()=>{lessMotion=preference.matches;lastTime=performance.now();paint();};
    const visibility=()=>{pageVisible=!document.hidden;lastTime=performance.now();};
    preference.addEventListener('change',changeMotion);document.addEventListener('visibilitychange',visibility);
    const animate=(now:number)=>{if(disposed)return;frame=requestAnimationFrame(animate);const delta=Math.min(.05,(now-lastTime)/1000);lastTime=now;if(!inView||!pageVisible||lessMotion)return;elapsed+=delta;if(now-lastFrame<1000/30)return;lastFrame=now;group.rotation.set(baseX+Math.sin(elapsed*.3)*.1,baseY+elapsed*.12,baseZ+Math.sin(elapsed*.23)*.06);paint();};
    teardown=()=>{cancelAnimationFrame(frame);size.disconnect();preference.removeEventListener('change',changeMotion);document.removeEventListener('visibilitychange',visibility);const geometries=new Set<InstanceType<typeof THREE.BufferGeometry>>();group.traverse(object=>{if('geometry'in object)geometries.add(object.geometry as InstanceType<typeof THREE.BufferGeometry>);});geometries.forEach(geometry=>geometry.dispose());material.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();};
    if(disposed){teardown();return;}setReady(true);frame=requestAnimationFrame(animate);
   }catch(error){teardown();if(!disposed)console.warn('Capability sculpture unavailable; retaining its static mark.',error);}
  };
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView)void start();},{rootMargin:'100px'});observer.observe(element);
  return()=>{disposed=true;observer.disconnect();teardown();};
 },[shape]);
 return <div className={`capability-sculpture capability-sculpture--${shape}`} ref={host} aria-hidden="true" data-ready={ready}><div className="sculpture-fallback"><span/><span/><span/></div></div>;
}
