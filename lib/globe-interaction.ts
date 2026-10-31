/** Input state is independent of rendering so focus, scroll and dragging never fight. */
export type GlobeMotion={
 yaw:number;pitch:number;velocityYaw:number;velocityPitch:number;
 panX:number;panY:number;previousProgress:number;holdUntil:number;
 dragging:boolean;panning:boolean;
};
const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));
const maxPitch=1.15;
export function createGlobeMotion(progress=0):GlobeMotion{
 return {yaw:0,pitch:.28,velocityYaw:0,velocityPitch:0,panX:0,panY:0,previousProgress:progress,holdUntil:0,dragging:false,panning:false};
}
export function beginGlobeGesture(state:GlobeMotion,now:number,panning=false){
 state.dragging=true;state.panning=panning;state.velocityYaw=state.velocityPitch=0;state.holdUntil=now+4000;
}
export function dragGlobe(state:GlobeMotion,dx:number,dy:number,seconds:number,options:{allowPitch:boolean;panWidth:number;panHeight:number}){
 if(!state.dragging)return;
 if(state.panning){state.panX=clamp(state.panX+dx,-options.panWidth,options.panWidth);state.panY=clamp(state.panY+dy,-options.panHeight,options.panHeight);return;}
 const yaw=dx*.006,pitch=options.allowPitch?dy*.0035:0,dt=Math.max(.008,Math.min(.1,seconds));
 state.yaw+=yaw;state.pitch=clamp(state.pitch+pitch,-maxPitch,maxPitch);
 state.velocityYaw=state.velocityYaw*.55+clamp(yaw/dt,-1.4,1.4)*.45;
 state.velocityPitch=state.velocityPitch*.55+clamp(pitch/dt,-.8,.8)*.45;
}
export function endGlobeGesture(state:GlobeMotion,now:number,inertia=true){
 state.dragging=false;state.holdUntil=now+4000;
 if(!inertia||state.panning)state.velocityYaw=state.velocityPitch=0;
 state.panning=false;
}
export function focusGlobeMotion(state:GlobeMotion,yaw:number,pitch:number,renderedYaw:number,progress:number,now:number){
 state.yaw=renderedYaw+Math.atan2(Math.sin(yaw-renderedYaw),Math.cos(yaw-renderedYaw));
 state.pitch=clamp(pitch,-maxPitch,maxPitch);state.velocityYaw=state.velocityPitch=0;
 state.panX=state.panY=0;state.previousProgress=progress;state.holdUntil=now+4500;
}
export function nudgeGlobeMotion(state:GlobeMotion,yaw:number,pitch:number,now:number){
 state.yaw+=yaw;state.pitch=clamp(state.pitch+pitch,-maxPitch,maxPitch);
 state.velocityYaw=state.velocityPitch=0;state.holdUntil=now+4000;
}
export function stepGlobeMotion(state:GlobeMotion,options:{progress:number;delta:number;now:number;regional:boolean;autoRotate:boolean;scrollRotate:boolean;inertia:boolean}){
 const progress=clamp(options.progress,0,1),difference=progress-state.previousProgress,dt=clamp(options.delta,0,.05);
 state.previousProgress=progress;
 // Consume progress even while dragging, so releasing cannot replay old scroll.
 if(state.dragging)return;
 if(options.scrollRotate&&Math.abs(difference)>.000001){
  state.yaw+=difference*(options.regional?0.45:2.1);
  state.velocityYaw=state.velocityPitch=0;state.holdUntil=Math.max(state.holdUntil,options.now+700);
 }else if(options.inertia){
  state.yaw+=state.velocityYaw*dt;state.pitch=clamp(state.pitch+state.velocityPitch*dt,-maxPitch,maxPitch);
  const decay=Math.exp(-6*dt);state.velocityYaw*=decay;state.velocityPitch*=decay;
  if(Math.abs(state.velocityYaw)<.001)state.velocityYaw=0;
  if(Math.abs(state.velocityPitch)<.001)state.velocityPitch=0;
 }else state.velocityYaw=state.velocityPitch=0;
 if(options.autoRotate&&!options.regional&&options.now>state.holdUntil)state.yaw+=dt*.026;
}
