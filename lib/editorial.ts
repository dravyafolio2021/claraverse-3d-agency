import type {articles} from './site-content';
export function articleMinutes(article:typeof articles[number]){return Math.max(1,Math.ceil([article.title,article.summary,...article.sections.flat()].join(' ').split(/\s+/).length/200));}
export const articleDirections:Record<string,{shape:'architecture'|'design'|'integration';label:string;takeaways:string[];service:string}>={
 'architecture-before-apps':{shape:'architecture',label:'Systems & ownership',takeaways:['Name the customer or operational problem first.','Assign ownership for products, stock, orders and customers.','Plan exceptions and recovery before adding another connection.'],service:'/services/integrations'},
 'performance-is-an-experience':{shape:'design',label:'Experience & performance',takeaways:['Measure a representative customer journey.','Review the purpose and cost of each dependency.','Check layout stability and interaction alongside loading speed.'],service:'/services/development/speed-optimisation'},
 'connected-commerce':{shape:'integration',label:'Commerce & intelligence',takeaways:['Keep product knowledge structured and consistent.','Align the promise made in the storefront with the operation.','Give intelligence a defined task and a useful human fallback.'],service:'/services/development/ai-storefronts'},
};
