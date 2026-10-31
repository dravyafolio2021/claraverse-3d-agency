import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createGlobeMotion,beginGlobeGesture,dragGlobe,endGlobeGesture,focusGlobeMotion,nudgeGlobeMotion,stepGlobeMotion} from '../lib/globe-interaction.ts';

const step=(state,progress,overrides={})=>stepGlobeMotion(state,{progress,delta:1/60,now:10000,regional:false,autoRotate:false,scrollRotate:true,inertia:false,...overrides});
const bounds={allowPitch:true,panWidth:100,panHeight:25};
const globe=createGlobeMotion();
for(let i=1;i<=120;i++)step(globe,i/120);
assert.ok(globe.yaw>1.5&&globe.yaw<Math.PI,'Page scroll should turn the globe visibly without flipping it');
const globalTurn=globe.yaw;
for(let i=119;i>=0;i--)step(globe,i/120);
assert.ok(Math.abs(globe.yaw)<1e-9,'Reverse scrolling should reverse the scroll rotation');

const manual=createGlobeMotion(.4);
beginGlobeGesture(manual,0);dragGlobe(manual,80,30,.016,bounds);
const userYaw=manual.yaw,userPitch=manual.pitch;
step(manual,.8);assert.equal(manual.yaw,userYaw,'Scroll must not override an active drag');
endGlobeGesture(manual,100,false);step(manual,.8);
assert.equal(manual.yaw,userYaw,'Releasing must not replay scroll accumulated during dragging');
assert.ok(userPitch>.28,'Mouse dragging supports vertical tilt');

const touch=createGlobeMotion();beginGlobeGesture(touch,0);
dragGlobe(touch,60,90,.016,{...bounds,allowPitch:false});
assert.ok(touch.yaw>0);assert.equal(touch.pitch,.28,'Sideways touch orbit keeps native vertical-page intent separate');
endGlobeGesture(touch,100,false);assert.equal(touch.velocityYaw,0);

const pan=createGlobeMotion();beginGlobeGesture(pan,0,true);dragGlobe(pan,10000,-10000,.016,bounds);
assert.equal(pan.panX,100);assert.equal(pan.panY,-25);assert.equal(pan.yaw,0,'Panning must not rotate');
endGlobeGesture(pan,100);assert.equal(pan.velocityYaw,0);

const inertia=createGlobeMotion();beginGlobeGesture(inertia,0);dragGlobe(inertia,50,20,.016,bounds);endGlobeGesture(inertia,100);
const released=inertia.yaw;
for(let i=0;i<240;i++)step(inertia,0,{now:100+i*1000/60,inertia:true});
assert.ok(inertia.yaw>released&&inertia.yaw-released<.5,'Release momentum should be short and bounded');
assert.equal(inertia.velocityYaw,0);
for(let i=0;i<100;i++)nudgeGlobeMotion(inertia,0,1,1000);
assert.ok(inertia.pitch<=1.15);
for(let i=0;i<100;i++)nudgeGlobeMotion(inertia,0,-1,1000);
assert.ok(inertia.pitch>=-1.15,'Pole tilt stays bounded');

focusGlobeMotion(pan,-2.4,.6,7.2,.8,1000);
assert.ok(Math.abs(pan.yaw-7.2)<=Math.PI,'Market focus uses the nearest angle');
assert.equal(pan.panX,0);assert.equal(pan.panY,0);assert.equal(pan.previousProgress,.8);
const focused=pan.yaw;step(pan,.8);assert.equal(pan.yaw,focused);
const regional=createGlobeMotion();step(regional,1,{regional:true});
assert.ok(regional.yaw>0&&regional.yaw<globalTurn/2,'Regional views use a smaller scroll turn');
const reduced=createGlobeMotion();step(reduced,1,{scrollRotate:false});assert.equal(reduced.yaw,0);
const restored=createGlobeMotion(.8);step(restored,.81);assert.ok(restored.yaw>0&&restored.yaw<.1,'Late scene loads do not replay page history');

// Check the dedicated circle against the same orthographic world-to-screen mapping.
for(const [width,height] of [[390,844],[800,600],[1440,900]]){
 const diameter=Math.min(width*.8,height*.5),offsetX=32,panX=18,centerY=height*.48;
 const camera=new THREE.OrthographicCamera(-5*width/height,5*width/height,5,-5,.1,70);camera.position.z=20;camera.updateMatrixWorld();
 const sphere=new THREE.Mesh(new THREE.SphereGeometry(2.35,24,18),new THREE.MeshBasicMaterial());
 sphere.scale.setScalar(diameter/height*10/4.7);sphere.position.set((offsetX+panX)/height*10,(.5-centerY/height)*10,0);sphere.updateMatrixWorld();
 const center=sphere.position.clone().project(camera),screenX=(center.x+1)*width/2,screenY=(1-center.y)*height/2;
 assert.ok(Math.abs(screenX-(width/2+offsetX+panX))<1e-6&&Math.abs(screenY-centerY)<1e-6);
 const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(center.x,center.y),camera);
 assert.ok(ray.intersectObject(sphere).length,'The centre of the dedicated target hits the globe');
 sphere.geometry.dispose();sphere.material.dispose();
}
console.log('Globe checks passed: scroll/reverse, drag priority, touch intent, pan bounds, inertia, pole bounds, nearest-angle focus, reduced motion, late loads and three viewport hit targets.');
