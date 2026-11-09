import type {ServiceShape} from './services';

export const studioPrinciples:{number:string;theme:string;title:string;copy:string;shape:ServiceShape;signals:string[]}[]=[
 {number:'01',theme:'Understanding',title:'See the whole picture.',copy:'Connect the customer, the catalogue and the operation before choosing the next move.',shape:'intelligence',signals:['Customer','Product','Operation']},
 {number:'02',theme:'Clarity',title:'Make progress visible.',copy:'Use shared decisions and working demonstrations to keep everyone moving in the same direction.',shape:'integration',signals:['Brief','Prototype','Review']},
 {number:'03',theme:'Craft',title:'Care in every detail.',copy:'Consider the product page, the mobile interaction and the order handoff with the same care.',shape:'design',signals:['Experience','Performance','Delivery']},
 {number:'04',theme:'Collaboration',title:'Build with your team.',copy:'Bring your product knowledge and our design and engineering into one working conversation.',shape:'architecture',signals:['Your team','Our studio','One direction']},
 {number:'05',theme:'Purpose',title:'A role for every system.',copy:'Give products, stock and orders clear ownership and dependable connections.',shape:'migration',signals:['Ownership','Data','Connections']},
 {number:'06',theme:'Continuity',title:'Ready for what’s next.',copy:'Hand over useful controls and a clear path for the next stage of the business.',shape:'intelligence',signals:['Launch','Learn','Evolve']},
];

export const studioProcess=[
 {number:'01',name:'Discover',line:'Understand the business before shaping the solution.',copy:'Map the important customer journeys, catalogue structures and operating dependencies. Agree the priorities, constraints and decisions the project needs to resolve.',outputs:['Customer and operating context','Agreed priorities and requirements','A practical delivery scope'],href:'/services/growth/consulting',link:'Strategy & discovery'},
 {number:'02',name:'Build',line:'Bring the experience and the operation together.',copy:'Translate the direction into design, working storefronts and the connections behind them. Review real journeys with your team as the solution takes shape.',outputs:['A considered customer experience','Connected technical decisions','Working releases to review'],href:'/services/development',link:'Design & development'},
 {number:'03',name:'Improve',line:'Validate the important moments. Keep learning.',copy:'Test the critical flows, prepare the people who will run them and agree what to observe after launch. Use the evidence to prioritise the next useful improvement.',outputs:['Validated business journeys','Operating guidance and ownership','A clear next set of priorities'],href:'/services/growth',link:'Optimisation & growth'},
];

/** Planning options, not published prices or fixed commercial commitments. */
export const studioEngagements:{number:string;name:string;for:string;copy:string;shape:ServiceShape;steps:string[]}[]=[
 {number:'01',name:'Project.',for:'One clear outcome.',copy:'Define the challenge, agree the outcome and build a focused solution.',shape:'architecture',steps:['Scope','Build','Deliver']},
 {number:'02',name:'Programme.',for:'Several connected workstreams.',copy:'Bring experience, product information and systems together through reviewed phases.',shape:'integration',steps:['Connect','Coordinate','Release']},
 {number:'03',name:'Improvement.',for:'A business ready to evolve.',copy:'Prioritise the friction, make useful changes and review what happens next.',shape:'intelligence',steps:['Observe','Refine','Repeat']},
];
