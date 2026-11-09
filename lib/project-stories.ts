export type StoryStage={name:string;title:string;copy:string;label:string;detail:string};
export type ProjectStory={
 headline:string;premise:string;shift:[string,string];
 decisions:{title:string;reason:string;move:string}[];
 journey:StoryStage[];
 operations:{name:string;copy:string}[];
 validation:{title:string;copy:string}[];
 accent:string;
};

export const projectStories:Record<string,ProjectStory>={
 ritual:{
  headline:'From a product. To a daily ritual.',
  premise:'Beauty discovery asks people to make sense of ingredients, benefits and routines. This direction brings those questions into the shopping journey, exactly where they become useful.',
  shift:['A shelf of individual products.','A routine that makes sense together.'],accent:'#dcb598',
  decisions:[
   {title:'Start with the person.',reason:'A product category does not always describe what someone is looking for.',move:'Lead discovery with routine and intent, then connect each choice to relevant products.'},
   {title:'Let the detail unfold.',reason:'Ingredient education can help a decision without taking over the whole page.',move:'Keep the essentials close to purchase; layer ingredients and usage information underneath.'},
   {title:'Design the next step.',reason:'The relationship between products matters as much as each product on its own.',move:'Show where a product belongs in a routine and what would complement it.'},
  ],
  journey:[
   {name:'Discover',title:'Find your everyday ritual.',copy:'Explore care by the moment it belongs to, with a clear way into the collection.',label:'The starting point',detail:'Routine-led discovery'},
   {name:'Understand',title:'A little more understanding.',copy:'Bring ingredients, purpose and how to use a product into one considered view.',label:'Before the decision',detail:'Layered product education'},
   {name:'Choose',title:'Make room for what matters.',copy:'See how the product fits the routine before choosing the next step.',label:'At the decision',detail:'Connected product relationships'},
   {name:'Return',title:'Keep the ritual going.',copy:'Plan a clear route back to care instructions and the products already understood.',label:'Beyond the first visit',detail:'Continuity and replenishment planning'},
  ],
  operations:[{name:'Product knowledge',copy:'Ingredients, use and routine relationships held as structured content.'},{name:'Merchandising',copy:'One product story expressed consistently across discovery and detail.'},{name:'Purchase',copy:'Variants and availability stay close to the decision.'},{name:'Continuity',copy:'Care content and replenishment journeys planned around the product.'}],
  validation:[{title:'Understanding',copy:'Can someone explain what a product does and where it fits in their routine?'},{title:'Decision clarity',copy:'Can they find ingredients, usage and purchase information without losing their place?'},{title:'Content consistency',copy:'Can the team update product knowledge once and keep the experience aligned?'}],
 },
 form:{
  headline:'Editorial freedom. Shopping clarity.',
  premise:'A fashion collection needs space to express a point of view. The commerce underneath needs to make size, colour and the next step immediately understandable.',
  shift:['A campaign beside a product catalogue.','One connected collection experience.'],accent:'#c6c0a8',
  decisions:[
   {title:'Give the collection a voice.',reason:'Brand imagery should do more than decorate the route to a product.',move:'Build an editorial rhythm that moves naturally from campaign to collection.'},
   {title:'Keep the choice visible.',reason:'Unclear sizing and variants add friction at the point of intent.',move:'Connect imagery, colour and fit information around one product decision.'},
   {title:'Make the system flexible.',reason:'A seasonal campaign should not require a new storefront structure.',move:'Define reusable collection and content patterns that can support the next release.'},
  ],
  journey:[
   {name:'Discover',title:'The everyday, reimagined.',copy:'Enter through a collection story with a direct path to the pieces within it.',label:'The starting point',detail:'Campaign to collection'},
   {name:'Explore',title:'Find a different perspective.',copy:'Move between the collection and individual pieces without losing the editorial context.',label:'Inside the collection',detail:'Quiet, flexible product discovery'},
   {name:'Choose',title:'Your colour. Your fit.',copy:'Bring the image, available variants and sizing guidance together before purchase.',label:'At the decision',detail:'Variant and fit clarity'},
   {name:'Continue',title:'A collection that can grow.',copy:'Carry a consistent product story into future launches and repeat visits.',label:'Beyond one campaign',detail:'Reusable collection architecture'},
  ],
  operations:[{name:'Collection data',copy:'Products, variants and campaign relationships mapped clearly.'},{name:'Editorial system',copy:'Reusable content patterns for seasonal brand expression.'},{name:'Inventory',copy:'Availability considered at the level of the selected variant.'},{name:'Release planning',copy:'A consistent foundation for future collection launches.'}],
  validation:[{title:'Discoverability',copy:'Can people move from a campaign into the products that caught their attention?'},{title:'Purchase confidence',copy:'Can they understand fit and select a variant on a small screen?'},{title:'Team independence',copy:'Can the next collection be merchandised without rebuilding the experience?'}],
 },
 dwelling:{
  headline:'Considered objects. Confident decisions.',
  premise:'Choosing an object for a home is a decision about proportion, material and everyday use. The experience should help people picture ownership, not just admire a photograph.',
  shift:['An object on a beautiful page.','The detail to imagine it at home.'],accent:'#c4bc9c',
  decisions:[
   {title:'Let the object breathe.',reason:'Scale and texture are difficult to understand through a small product thumbnail.',move:'Give imagery generous space while keeping a clear route into the details.'},
   {title:'Make the detail useful.',reason:'Materials, dimensions and options answer different parts of the same decision.',move:'Structure product knowledge so those answers are easy to find and compare.'},
   {title:'Bring delivery forward.',reason:'A considered purchase includes the practicalities of receiving it.',move:'Place delivery expectations close to options and purchase information.'},
  ],
  journey:[
   {name:'Discover',title:'Objects for slower living.',copy:'Discover a collection through spaces, materials and the objects that belong together.',label:'The starting point',detail:'Room and collection discovery'},
   {name:'Picture',title:'Picture it in your space.',copy:'Give proportion and texture a place in the product story.',label:'Inside the product',detail:'Image-led product context'},
   {name:'Specify',title:'The details, considered.',copy:'Find dimensions, materials and options in a consistent, legible structure.',label:'At the decision',detail:'Structured product information'},
   {name:'Receive',title:'From the store to your door.',copy:'Consider delivery expectations alongside the selected product and its options.',label:'Beyond the product',detail:'Delivery clarity'},
  ],
  operations:[{name:'Product specification',copy:'Materials, dimensions and options kept in a consistent structure.'},{name:'Discovery',copy:'Objects connected to rooms, collections and relevant context.'},{name:'Availability',copy:'Selected options considered alongside stock information.'},{name:'Delivery',copy:'Product information connected to clear delivery expectations.'}],
  validation:[{title:'Product confidence',copy:'Can someone understand scale, material and available options?'},{title:'Practical clarity',copy:'Can they find delivery information before committing to a purchase?'},{title:'Data quality',copy:'Can the same specification structure support the next collection?'}],
 },
 gather:{
  headline:'A daily purchase. A lasting ritual.',
  premise:'Specialty coffee is personal: taste, origin and the way it fits the day. A repeat purchase should carry that context forward instead of asking people to start again.',
  shift:['Another product to reorder.','A familiar choice, easy to return to.'],accent:'#c2a78a',
  decisions:[
   {title:'Make provenance tangible.',reason:'Origin and tasting notes can help people find something they will enjoy.',move:'Give product education a consistent structure across discovery and detail.'},
   {title:'Respect the rhythm.',reason:'One-off orders and regular replenishment represent different needs.',move:'Plan clear purchase choices with understandable subscription context.'},
   {title:'Think beyond checkout.',reason:'A routine depends on what happens when it is time for the next order.',move:'Connect account, stock and repeat-order planning to the first purchase journey.'},
  ],
  journey:[
   {name:'Discover',title:'A better daily ritual.',copy:'Explore small-batch products through origin, taste and everyday preference.',label:'The starting point',detail:'Provenance-led discovery'},
   {name:'Understand',title:'Know what is in your cup.',copy:'Bring tasting information and product context into the same clear view.',label:'Before the decision',detail:'Structured tasting information'},
   {name:'Choose',title:'Find your own rhythm.',copy:'Consider a single order or an ongoing routine with clear purchase choices.',label:'At the decision',detail:'Subscription journey planning'},
   {name:'Reorder',title:'Return to a favourite.',copy:'Plan a familiar account journey that makes the next order easier to understand.',label:'Beyond the first order',detail:'Repeat-order continuity'},
  ],
  operations:[{name:'Product provenance',copy:'Origins and tasting information held as structured content.'},{name:'Purchase choices',copy:'One-off and subscription journeys planned distinctly.'},{name:'Stock context',copy:'Availability considered in merchandising and repeat orders.'},{name:'Customer account',copy:'A clear route to purchase history and replenishment choices.'}],
  validation:[{title:'Product fit',copy:'Can customers use tasting and origin information to make a choice?'},{title:'Choice transparency',copy:'Can they distinguish a one-off order from an ongoing purchase?'},{title:'Repeatability',copy:'Can they find a previous favourite and understand its availability?'}],
 },
 signal:{
  headline:'Technical depth. Human decisions.',
  premise:'A specification is only useful when someone understands what it means for them. This concept puts compatibility, comparison and support around the product decision.',
  shift:['A long list of specifications.','A clear reason to choose.'],accent:'#a5b8b0',
  decisions:[
   {title:'Translate the technical.',reason:'Feature lists do not always explain the experience a product offers.',move:'Organise product knowledge around the questions that shape a decision.'},
   {title:'Compare what matters.',reason:'People need to understand the meaningful differences between products.',move:'Use shared specification structures and visible compatibility information.'},
   {title:'Keep ownership in view.',reason:'The experience continues through setup, care and support.',move:'Connect product information to relevant post-purchase guidance.'},
  ],
  journey:[
   {name:'Discover',title:'Feel every detail.',copy:'Start with the listening experience, then explore the products that support it.',label:'The starting point',detail:'Experience-led discovery'},
   {name:'Compare',title:'A clearer comparison.',copy:'Bring meaningful product differences into a consistent, readable structure.',label:'Between the options',detail:'Guided product comparison'},
   {name:'Choose',title:'Make the right connection.',copy:'Surface compatibility and specifications close to the point of purchase.',label:'At the decision',detail:'Compatibility clarity'},
   {name:'Own',title:'Ready for what comes next.',copy:'Plan a direct route to setup, support and warranty information.',label:'Beyond checkout',detail:'Connected ownership content'},
  ],
  operations:[{name:'Specifications',copy:'Comparable product attributes held in a shared structure.'},{name:'Relationships',copy:'Compatibility and related products described explicitly.'},{name:'Purchase context',copy:'Relevant specifications carried into the product decision.'},{name:'Product support',copy:'Ownership guidance connected to the product it supports.'}],
  validation:[{title:'Comparison quality',copy:'Can someone explain why one product suits their needs better than another?'},{title:'Compatibility',copy:'Can they determine whether a product works with their existing setup?'},{title:'Ownership support',copy:'Can they find the right guidance after making a choice?'}],
 },
 terrain:{
  headline:'Built around the way people explore.',
  premise:'Outdoor equipment needs to work in a particular place, activity and condition. The storefront should help translate those plans into an informed product choice.',
  shift:['Equipment organised by category.','A journey organised around the trip.'],accent:'#bcc7a0',
  decisions:[
   {title:'Start with the activity.',reason:'The way someone explores gives a product its context.',move:'Connect collections to activities and conditions as well as product categories.'},
   {title:'Make function legible.',reason:'Fit, materials and technical detail all shape confidence in the field.',move:'Bring practical product education and variant guidance into one clear journey.'},
   {title:'Consider the departure.',reason:'Availability and delivery matter when a purchase is linked to a plan.',move:'Keep seasonal stock context and delivery expectations visible near purchase.'},
  ],
  journey:[
   {name:'Plan',title:'Take the long way.',copy:'Enter through an activity and explore the equipment relevant to it.',label:'The starting point',detail:'Activity-led collections'},
   {name:'Explore',title:'Ready for the conditions.',copy:'Understand materials and intended use within the product story.',label:'Inside the product',detail:'Technical product education'},
   {name:'Choose',title:'The right fit for the trip.',copy:'Bring options and fit guidance together with the selected product.',label:'At the decision',detail:'Variant and fit guidance'},
   {name:'Prepare',title:'Know what comes next.',copy:'Plan availability and delivery information around the chosen equipment.',label:'Before departure',detail:'Seasonal inventory planning'},
  ],
  operations:[{name:'Activity taxonomy',copy:'Products connected to relevant activities and conditions.'},{name:'Product knowledge',copy:'Materials, fit and technical attributes structured consistently.'},{name:'Seasonal inventory',copy:'Availability considered across variants and collections.'},{name:'Delivery context',copy:'Purchase information planned alongside delivery expectations.'}],
  validation:[{title:'Relevance',copy:'Can someone find equipment that fits the activity they are planning?'},{title:'Functional clarity',copy:'Can they understand fit, materials and intended conditions of use?'},{title:'Readiness',copy:'Can they understand availability and delivery before making a decision?'}],
 },
};
