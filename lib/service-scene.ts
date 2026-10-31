/** Scene navigation stays independent of React and animation timing. */
export function serviceIndexAtProgress(progress:number,count:number){
 return Math.min(count-1,Math.max(0,Math.floor(progress*count)));
}
export function serviceProgressForIndex(index:number,count:number){
 return (Math.min(count-1,Math.max(0,index))+.5)/count;
}
export function createServiceSceneController(count:number,onChange:(index:number)=>void){
 let active=0,scrollIndex=0,seeking:number|null=null;
 const show=(index:number)=>{
  const next=Math.min(count-1,Math.max(0,index));
  if(active===next)return;
  active=next;onChange(next);
 };
 return {
  preview:show,
  restore:()=>show(seeking??scrollIndex),
  select(index:number,seek:boolean){
   seeking=seek?index:null;
   if(!seek)scrollIndex=index;
   show(index);
  },
  scroll(progress:number){
   const index=serviceIndexAtProgress(progress,count),changed=index!==scrollIndex;
   scrollIndex=index;
   // Keep a clicked scene visible during the journey to its scroll position.
   if(seeking!==null){if(index!==seeking)return;seeking=null;}
   if(changed)show(index);
  },
  interrupt(){if(seeking===null)return;seeking=null;show(scrollIndex);},
  release:()=>{seeking=null;},
 };
}
