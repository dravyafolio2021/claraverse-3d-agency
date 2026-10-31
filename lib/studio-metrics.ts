export type StudioMetric={id:string;value:number|null;suffix:string;label:string;description:string};

/** Agency figures supplied by the owner on 2026-10-30. */
export const studioMetrics:StudioMetric[]=[
 {id:'projects',value:24,suffix:'+',label:'Projects completed',description:'Commerce projects spanning the customer experience and the operation behind it.'},
 {id:'industries',value:5,suffix:'+',label:'Industries served',description:'Considered solutions for different products, customers and ways of doing business.'},
 {id:'satisfaction',value:92,suffix:'%',label:'Client satisfaction',description:'A focus on clear communication, thoughtful collaboration and dependable delivery.'},
 {id:'experience',value:4,suffix:'',label:'Years of experience',description:'Design, engineering and connected commerce expertise brought to each project.'},
];
