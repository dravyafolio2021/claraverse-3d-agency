import {useId} from 'react';
import type {CapabilityShape} from '@/lib/capabilities';

const ink='#17271f',cream='#faf6e9',lime='#cbff65',purple='#a58bce',blue='#6e9da9';
function Spark({x,y,size=22}:{x:number;y:number;size?:number}){return <path d="m0-20 5 14 15-6-9 13 14 8-16 1 1 17-10-13-12 10 6-16-15-5 16-4z" transform={`translate(${x} ${y}) scale(${size/20})`} fill={lime} stroke={ink} strokeWidth="2"/>;}
function Parcel({x,y,scale=1,fill=cream}:{x:number;y:number;scale?:number;fill?:string}){return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={ink} strokeWidth="2.5" strokeLinejoin="round"><path d="m0 18 32-18 36 17-32 20z" fill={fill}/><path d="m0 18 36 19v38L0 55z" fill={fill}/><path d="m36 37 32-20v38L36 75z" fill={ink}/><path d="m16 9 35 19-1 16-12-6V26L16 15z" fill={lime}/><path d="m10 43 15 8m-15 1 10 5"/></g>;}
function WindowFrame({x,y,width=150,height=100,label='commerce'}:{x:number;y:number;width?:number;height?:number;label?:string}){return <g transform={`translate(${x} ${y})`}><rect x="6" y="7" width={width} height={height} rx="12" fill={ink}/><rect width={width} height={height} rx="12" fill={cream} stroke={ink} strokeWidth="2.5"/><path d={`M0 27h${width}`} stroke={ink} strokeWidth="2"/><circle cx="13" cy="14" r="3" fill={ink}/><circle cx="24" cy="14" r="3" fill={purple}/><circle cx="35" cy="14" r="3" fill={lime}/><text x={width-12} y="18" textAnchor="end" fontSize="9" fill={ink}>{label}</text></g>;}

/** Original filled editorial artwork; the adjacent copy carries its meaning. */
export function ServiceIllustration({shape}:{shape:CapabilityShape}){
 const id=useId().replace(/:/g,'');
 return <svg className="service-illustration" viewBox="0 0 560 420" fill="none" aria-hidden="true" focusable="false">
  <defs><pattern id={`dots-${id}`} width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill={ink} opacity=".13"/></pattern></defs>
  <ellipse cx="285" cy="354" rx="204" ry="22" fill={ink} opacity=".09"/>
  <circle cx="285" cy="209" r="171" fill={cream} opacity=".36"/>
  <circle cx="285" cy="209" r="171" fill={`url(#dots-${id})`}/>
  {shape==='architecture'?<>
   <path d="M118 224H72v69h99m235-71h79v-98h-75M280 102V61h100" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8"/>
   <g transform="translate(160 118) rotate(-5 115 112)" stroke={ink} strokeWidth="3" strokeLinejoin="round"><path d="m0 208 116-29 123 30-116 29z" fill={ink}/><rect x="20" y="68" width="200" height="140" rx="4" fill={cream}/><path d="M9 57 118 6l113 51v23H9z" fill={ink}/><path d="M9 80h222l-10 28h-31l-16-28-15 28h-31l-10-28-13 28H74L59 80l-14 28H17z" fill={lime}/><path d="M9 80h222M45 80v28m60-28v28m54-28v28"/><rect x="45" y="127" width="63" height="54" rx="2" fill={blue}/><path d="M76 127v54m-31-27h63"/><path d="M145 208v-75h48v75" fill={purple}/><circle cx="182" cy="170" r="2" fill={ink}/><rect x="82" y="34" width="72" height="28" rx="14" fill={cream}/><path d="m108 48 7 6 13-14"/></g>
   <WindowFrame x={59} y={94} width={112} height={89} label="orders"/><path d="M78 140h18m-18 12h39m8-12 8 8 15-19" stroke={ink} strokeWidth="3" strokeLinecap="round"/>
   <Parcel x={399} y={239} scale={.9} fill={purple}/><Parcel x={68} y={275} scale={.6}/><Spark x={435} y={82} size={22}/><circle cx="383" cy="61" r="6" fill={ink}/>
  </>:null}
  {shape==='design'?<>
   <g transform="rotate(-7 265 211)"><WindowFrame x={114} y={75} width={310} height={248} label="your next favourite"/><rect x="133" y="119" width="120" height="180" rx="5" fill={ink}/><path d="m158 169 21-21 21 8 18-12 19 24-17 19v81h-51v-79z" fill={lime} stroke={cream} strokeWidth="2"/><text x="276" y="149" fontFamily="Georgia,serif" fontStyle="italic" fontSize="27" fill={ink}>well</text><text x="276" y="178" fontFamily="Georgia,serif" fontStyle="italic" fontSize="27" fill={ink}>considered.</text><path d="M278 198h116m-116 10h82" stroke={ink} strokeWidth="3" strokeLinecap="round"/><circle cx="284" cy="233" r="8" fill={purple} stroke={ink} strokeWidth="2"/><circle cx="310" cy="233" r="8" fill={blue} stroke={ink} strokeWidth="2"/><circle cx="336" cy="233" r="8" fill={lime} stroke={ink} strokeWidth="2"/><rect x="273" y="258" width="125" height="28" rx="14" fill={ink}/><path d="M374 272h12m-5-5 5 5-5 5" stroke={cream} strokeWidth="2"/></g>
   <g transform="translate(346 238) rotate(-12)" stroke={ink} strokeWidth="3" strokeLinejoin="round"><path d="m0 0 17 88 19-29 32 3z" fill={lime}/><path d="m34 60 23 33 12-8-24-33" fill={cream}/></g>
   <g transform="translate(70 260) rotate(12)" stroke={ink} strokeWidth="2.5"><rect width="111" height="64" rx="9" fill={cream}/><rect x="12" y="13" width="24" height="37" rx="5" fill={purple}/><rect x="43" y="13" width="24" height="37" rx="5" fill={lime}/><rect x="74" y="13" width="24" height="37" rx="5" fill={blue}/></g><Spark x={441} y={93} size={24}/><Spark x={77} y={182} size={13}/>
  </>:null}
  {shape==='integration'?<>
   <path d="M120 123h94q29 0 29 29v93q0 30 30 30h150M100 283h66q29 0 29-30v-64q0-27 28-27h205" stroke={ink} strokeWidth="19" strokeLinecap="round"/><path d="M120 123h94q29 0 29 29v93q0 30 30 30h150M100 283h66q29 0 29-30v-64q0-27 28-27h205" stroke={cream} strokeWidth="12" strokeLinecap="round"/>
   <g transform="translate(208 180) rotate(-12 58 50)" stroke={ink} strokeWidth="3"><rect x="5" y="7" width="124" height="104" rx="24" fill={ink}/><rect width="124" height="104" rx="24" fill={lime}/><path d="m38 51 16 15 33-31" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/></g>
   <WindowFrame x={56} y={74} width={113} height={89} label="stock"/><path d="M77 139v-14m18 14v-27m18 27v-19m18 19v-33" stroke={purple} strokeWidth="10"/>
   <WindowFrame x={360} y={104} width={125} height={92} label="customers"/><circle cx="403" cy="150" r="10" fill={blue}/><path d="M386 180q0-23 17-23t17 23" fill={blue}/><path d="M434 146h30m-30 12h23" stroke={ink} strokeWidth="3"/>
   <Parcel x={390} y={258} scale={.9} fill={purple}/><Parcel x={67} y={251} scale={.75}/><circle cx="186" cy="232" r="8" fill={lime} stroke={ink} strokeWidth="2"/><circle cx="366" cy="274" r="8" fill={purple} stroke={ink} strokeWidth="2"/><Spark x={304} y={83} size={21}/><Spark x={486} y={235} size={14}/>
  </>:null}
  {shape==='migration'?<>
   <path d="M106 319q185 51 346-22" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeDasharray="5 9"/>
   <g transform="translate(228 70)" stroke={ink} strokeWidth="3"><path d="M0 254V113C0-38 209-38 209 113v141h-36V113c0-104-137-104-137 0v141z" fill={purple}/><path d="M36 254V113c0-104 137-104 137 0v141z" fill={ink}/><path d="M104 51v171m-32-33 32 33 32-33" stroke={lime} strokeWidth="3" strokeDasharray="7 9"/></g>
   <g transform="translate(62 138) rotate(-11 75 60)"><WindowFrame x={0} y={0} width={139} height={116} label="what’s next"/><rect x="15" y="43" width="35" height="50" rx="4" fill={blue}/><path d="M66 49h54m-54 13h42m-42 13h47" stroke={ink} strokeWidth="3"/><rect x="65" y="88" width="54" height="12" rx="6" fill={lime}/></g>
   <Parcel x={198} y={260} scale={.9}/><Parcel x={330} y={241} scale={.75} fill={lime}/><Parcel x={395} y={290} scale={.55} fill={blue}/>
   <path d="m181 96 54 23-51 17 8-21z" fill={cream} stroke={ink} strokeWidth="2.5" strokeLinejoin="round"/><path d="M183 135q-63 17-72-19" stroke={ink} strokeWidth="2" strokeDasharray="4 6"/><Spark x={452} y={113} size={23}/><Spark x={82} y={292} size={14}/>
  </>:null}
  {shape==='intelligence'?<>
   <g transform="rotate(-5 268 226)"><WindowFrame x={91} y={106} width={338} height={207} label="a clearer picture"/><path d="M115 281h287M115 168v113" stroke={ink} strokeWidth="2"/><path d="M139 281v-46h36v46" fill={blue} stroke={ink} strokeWidth="2.5"/><path d="M198 281v-77h36v77" fill={purple} stroke={ink} strokeWidth="2.5"/><path d="M257 281V174h36v107" fill={lime} stroke={ink} strokeWidth="2.5"/><path d="M316 281V151h36v130" fill={ink}/><path d="m132 213 73-28 57 8 96-55" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="205" cy="185" r="5" fill={cream} stroke={ink} strokeWidth="2"/><circle cx="262" cy="193" r="5" fill={cream} stroke={ink} strokeWidth="2"/></g>
   <g transform="translate(332 80) rotate(14)" stroke={ink} strokeWidth="3"><circle cx="42" cy="42" r="45" fill={cream}/><circle cx="42" cy="42" r="30" fill={lime}/><path d="m72 75 42 43" strokeWidth="22" strokeLinecap="round"/><path d="m31 41 8 8 15-17" strokeWidth="4" strokeLinecap="round"/></g>
   <g transform="translate(66 265) rotate(-12)" stroke={ink} strokeWidth="2.5"><path d="M0 0h102v65H56L32 82V65H0z" fill={purple}/><path d="m22 37 12-15 17 22 17-28 15 18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></g><Spark x={173} y={74} size={22}/><Spark x={454} y={305} size={17}/>
  </>:null}
 </svg>;
}
