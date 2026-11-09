export type RGB=readonly [number,number,number];
export type NavigationTheme='lifted'|'deep';
export function relativeLuminance(rgb:RGB){
 const linear=rgb.map(channel=>{const value=channel/255;return value<=.04045?value/12.92:((value+.055)/1.055)**2.4;});
 return linear[0]*.2126+linear[1]*.7152+linear[2]*.0722;
}
export function contrastRatio(a:RGB,b:RGB){
 const first=relativeLuminance(a),second=relativeLuminance(b);
 return (Math.max(first,second)+.05)/(Math.min(first,second)+.05);
}
/** Hysteresis avoids alternating themes at a section's tonal boundary. */
export function navigationThemeFor(luminance:number,previous:NavigationTheme):NavigationTheme{
 if(luminance<.24)return 'lifted';
 if(luminance>.36)return 'deep';
 return previous;
}
/** Computed RGB backgrounds only; transparent layers defer to their parent. */
export function opaqueBackground(value:string):RGB|null{
 const match=value.match(/^rgba?\((.*)\)$/);if(!match)return null;
 const parts=match[1].trim().split(/[\s,/]+/);
 if(parts.length<3)return null;
 const alpha=parts[3]===undefined?1:parseFloat(parts[3])/(parts[3].endsWith('%')?100:1);
 if(!Number.isFinite(alpha)||alpha<.85)return null;
 const rgb=parts.slice(0,3).map(part=>parseFloat(part)*(part.endsWith('%')?2.55:1));
 return rgb.every(Number.isFinite)?[rgb[0],rgb[1],rgb[2]]:null;
}
