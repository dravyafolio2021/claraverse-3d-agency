// Temporary design identities. Replace these entries with approved client names
// and local SVG logo paths when the real client assets are supplied.
export type ClientBrand={name:string;style:string;symbol:string;logo?:string};
export const clientBrands:ClientBrand[] = [
 {name:'north',style:'north',symbol:'compass'},
 {name:'SOLA',style:'sola',symbol:'sun'},
 {name:'offscript',style:'offscript',symbol:'slash'},
 {name:'everkind',style:'everkind',symbol:'petal'},
 {name:'FIELD',style:'field',symbol:'field'},
 {name:'goodform',style:'goodform',symbol:'orbit'},
];

// The expanded wall is also a preview; it makes no client-engagement claims.
export const brandWallBrands:ClientBrand[]=[...clientBrands,
 {name:'morrow',style:'morrow',symbol:'sun'},
 {name:'ARC',style:'arc',symbol:'orbit'},
 {name:'common',style:'common',symbol:'field'},
 {name:'Sunday',style:'sunday',symbol:'petal'},
 {name:'nook',style:'nook',symbol:'compass'},
 {name:'VANTA',style:'vanta',symbol:'slash'},
];
