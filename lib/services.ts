export type ServiceShape='architecture'|'design'|'migration'|'integration'|'international'|'intelligence';
export type ServiceOffering={slug:string;name:string;description:string};
export type Service={slug:string;number:string;name:string;shortName:string;shape:ServiceShape;teaser:string;title:string;hook:string;intro:string;offerings:ServiceOffering[];items:string[];steps:string[]};

/** The service catalog shared by the homepage, menu, pages and enquiry flow. */
const definitions:Omit<Service,'items'>[]=[
 {
  "slug": "development",
  "number": "01",
  "name": "Development",
  "shortName": "Development",
  "shape": "architecture",
  "teaser": "Build the capability.",
  "title": "built for the way your business works.",
  "hook": "The platform behind your next stage.",
  "intro": "Build a Shopify operation around your products, customers and teams. From the storefront to custom apps and wholesale, we connect the buying experience with the systems that make it work.",
  "steps": [
   "Map the customer journeys, operational needs and technical constraints.",
   "Build and connect the storefront, functionality and sales channels.",
   "Test real business workflows, prepare your team and support the launch."
  ],
  "offerings": [
   {
    "slug": "shopify-plus-development",
    "name": "Shopify Plus Development",
    "description": "Plan and build the commerce platform around complex catalogs, business workflows and the requirements of a growing brand."
   },
   {
    "slug": "theme-development",
    "name": "Shopify Theme Development",
    "description": "Develop a flexible, maintainable storefront with reusable sections, clear product journeys and room for your team to create."
   },
   {
    "slug": "mobile-apps",
    "name": "Shopify Mobile Apps",
    "description": "Extend the customer experience into a mobile app, with a clear role for product discovery, accounts and repeat purchases."
   },
   {
    "slug": "ai-storefronts",
    "name": "Shopify AI Storefronts",
    "description": "Create useful AI-assisted discovery and shopping experiences grounded in your product information, with clear paths to human help."
   },
   {
    "slug": "app-development",
    "name": "Shopify App Development",
    "description": "Build custom applications for the customer experience and the operational jobs that existing tools do not cover."
   },
   {
    "slug": "speed-optimisation",
    "name": "Shopify Speed Optimisation",
    "description": "Identify loading and interaction bottlenecks, reduce unnecessary weight and verify improvements across important customer journeys."
   },
   {
    "slug": "headless-commerce",
    "name": "Shopify Headless E-commerce",
    "description": "Design and develop a decoupled storefront when your content, experience and integration requirements justify a custom architecture."
   },
   {
    "slug": "b2b-wholesale",
    "name": "Shopify B2B / Wholesale Channel",
    "description": "Create wholesale buying journeys with the catalogs, customer groups, pricing and ordering workflows your trade customers need."
   },
   {
    "slug": "no-code-low-code",
    "name": "Shopify No-code / Low-code",
    "description": "Connect maintainable tools and workflows for well-defined business needs, with clear ownership and a path for future development."
   }
  ]
 },
 {
  "slug": "design",
  "number": "02",
  "name": "Design",
  "shortName": "Design",
  "shape": "design",
  "teaser": "Make every interaction count.",
  "title": "a considered experience. unmistakably yours.",
  "hook": "Brand character. Commercial clarity.",
  "intro": "Turn your brand and product story into a shopping experience people understand. We design around real buying decisions, making discovery, comparison and checkout feel connected.",
  "steps": [
   "Understand your customers, products and the decisions behind a purchase.",
   "Design the journeys and interface using real content and business requirements.",
   "Validate the experience across devices and hand over a practical design system."
  ],
  "offerings": [
   {
    "slug": "ux-ui-design",
    "name": "UX / UI Design",
    "description": "Define customer journeys, page structures and interface patterns that connect your brand with the way people actually shop."
   },
   {
    "slug": "website-design",
    "name": "Shopify Website Design",
    "description": "Create a distinctive storefront with strong product storytelling, consistent visual language and a mobile-first shopping experience."
   },
   {
    "slug": "usability-audit",
    "name": "Shopify UX & Usability Audit",
    "description": "Review the complete buying journey to identify confusing interactions, missing information and friction worth addressing first."
   }
  ]
 },
 {
  "slug": "integrations",
  "number": "03",
  "name": "Integrations",
  "shortName": "Integrations",
  "shape": "integration",
  "teaser": "Keep the business connected.",
  "title": "your systems. working as one.",
  "hook": "Less manual work. A connected operation.",
  "intro": "Connect Shopify with the systems that run your business. Keep product, inventory, customer, payment and delivery information moving with clear ownership, monitoring and recovery paths.",
  "steps": [
   "Identify the source of truth for each type of data and map the complete workflow.",
   "Build the connections, validation rules and recovery paths around your operation.",
   "Test failures as well as successful journeys, then document and monitor the flow."
  ],
  "offerings": [
   {
    "slug": "erp",
    "name": "Shopify ERP Integrations",
    "description": "Connect commerce with finance, inventory and order management, with clear rules for data ownership and reconciliation."
   },
   {
    "slug": "pim",
    "name": "Shopify PIM Integrations",
    "description": "Connect structured product information, attributes and media so your catalog stays consistent across systems and sales channels."
   },
   {
    "slug": "crm",
    "name": "Shopify CRM Integrations",
    "description": "Connect customer and order information with your CRM to support more informed service and customer relationships."
   },
   {
    "slug": "amazon",
    "name": "Shopify Amazon Integration",
    "description": "Coordinate marketplace product, inventory and order workflows with your Shopify operation and the systems behind it."
   },
   {
    "slug": "przelewy24",
    "name": "Przelewy24 Integration",
    "description": "Plan and implement the payment connection for your market, including payment states, testing and reconciliation requirements."
   },
   {
    "slug": "inpost",
    "name": "InPost Integration",
    "description": "Connect delivery and collection-point journeys with checkout, fulfilment and the information your team needs to manage orders."
   },
   {
    "slug": "shipment",
    "name": "Shipment Integration",
    "description": "Connect carriers and fulfilment partners around rates, labels, tracking, delivery updates and exception handling."
   }
  ]
 },
 {
  "slug": "migration",
  "number": "04",
  "name": "Migration",
  "shortName": "Migration",
  "shape": "migration",
  "teaser": "Move forward with a plan.",
  "title": "a new platform. a carefully managed move.",
  "hook": "Carry the business forward.",
  "intro": "Move to Shopify with a coordinated plan for data, customer journeys and connected operations. We audit the current setup, rehearse the migration and prepare the team for cutover.",
  "steps": [
   "Audit the current platform, data, URLs, integrations and business dependencies.",
   "Rehearse data transfers, rebuild journeys and validate redirects and connected systems.",
   "Coordinate cutover, reconcile the migrated data and review the operation after launch."
  ],
  "offerings": [
   {
    "slug": "woocommerce",
    "name": "WooCommerce to Shopify",
    "description": "Plan the move from WooCommerce, mapping products, customers, content, URLs and the functionality your business relies on."
   },
   {
    "slug": "magento",
    "name": "Magento to Shopify",
    "description": "Review complex catalog structures, custom workflows and integrations before defining and rehearsing your move to Shopify."
   },
   {
    "slug": "bigcommerce",
    "name": "BigCommerce to Shopify",
    "description": "Map the existing catalog, customer experience and connected systems into a clear Shopify migration and launch plan."
   },
   {
    "slug": "shopware",
    "name": "Shopware to Shopify",
    "description": "Assess product data, content and operational dependencies, then rebuild and validate the journeys needed for your Shopify launch."
   },
   {
    "slug": "wordpress",
    "name": "WordPress to Shopify",
    "description": "Plan how your content, commerce journeys and existing URLs move into Shopify, with a clear approach to redirects and ownership."
   }
  ]
 },
 {
  "slug": "growth",
  "number": "05",
  "name": "Growth",
  "shortName": "Growth",
  "shape": "intelligence",
  "teaser": "Improve what happens next.",
  "title": "better signals. better commerce.",
  "hook": "Turn evidence into your next move.",
  "intro": "Improve the experience and the operation with a clear view of what is happening. We combine conversion reviews, product information, lifecycle journeys and ongoing technical care into a practical improvement plan.",
  "steps": [
   "Establish useful baselines across customer journeys, commercial goals and operational friction.",
   "Prioritise improvements and define what success will look like for each change.",
   "Implement, measure and use the results to decide the next round of work."
  ],
  "offerings": [
   {
    "slug": "conversion-rate-optimisation",
    "name": "Conversion Rate Optimisation",
    "description": "Use customer behaviour and journey reviews to prioritise changes, plan experiments and assess their commercial effect."
   },
   {
    "slug": "plytix",
    "name": "Plytix — PIM for Shopify",
    "description": "Improve the structure and consistency of product content with a catalog workflow connecting Plytix and your Shopify operation."
   },
   {
    "slug": "klaviyo",
    "name": "Klaviyo for Shopify",
    "description": "Build lifecycle communication around useful customer and order signals, with clear segmentation, consent and measurement."
   },
   {
    "slug": "maintenance",
    "name": "Shopify Site Maintenance",
    "description": "Maintain your storefront and custom functionality with planned updates, issue resolution and checks on important business journeys."
   },
   {
    "slug": "seo-optimisation",
    "name": "Shopify SEO Optimisation",
    "description": "Review technical foundations, product information, content structure and migration concerns to prioritise practical search improvements."
   },
   {
    "slug": "consulting",
    "name": "Shopify Consulting Services",
    "description": "Get an independent view of platform choices, international expansion, operations and the roadmap for your next stage."
   }
  ]
 }
];
export const services:Service[]=definitions.map(service=>({...service,items:service.offerings.map(offering=>offering.name)}));

/** Keep existing links and older enquiry links useful after the new grouping. */
export const serviceAliases=[
 {from:'shopify-plus',to:'development'},
 {from:'experience-design',to:'design'},
 {from:'replatforming',to:'migration'},
 {from:'international-b2b',to:'development'},
 {from:'performance',to:'growth'},
];
export function resolveService(slug?:string){
 const canonical=serviceAliases.find(alias=>alias.from===slug)?.to??slug;
 return services.find(service=>service.slug===canonical);
}
export function findOffering(service:Service|undefined,slug?:string){return service?.offerings.find(offering=>offering.slug===slug);}
