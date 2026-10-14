export type ServiceSlug = 'shopify-management' | 'storefront-conversion' | 'integrations-automation' | 'shopify-plus';
type ContentItem = { title: string; copy: string };
export type ServiceContent = {
  slug: ServiceSlug;
  href: string;
  index: string;
  label: string;
  title: string;
  summary: string;
  description: string;
  audience: string;
  problem: string;
  outcomes: ContentItem[];
  deliverables: ContentItem[];
  cycle: ContentItem[];
  responsibilities: { ours: string; yours: string; boundaries: string };
  faqs: { question: string; answer: string }[];
  article: { title: string; href: string; copy: string };
  sources?: { title: string; href: string }[];
};

export const services: ServiceContent[] = [
  {
    slug: 'shopify-management', href: '/services/shopify-management', index: '01', label: 'Shopify management',
    title: 'A store that keeps moving.',
    summary: 'Ongoing development, maintenance and releases for your existing Shopify store.',
    description: 'Give your Shopify roadmap a dependable place to move forward. We bring store improvements, technical upkeep and release planning into one working relationship.',
    audience: 'Established Shopify brands with a store already trading, a growing backlog and a team that needs development support without coordinating a different specialist for every change. Shopify Plus is supported where the work calls for it.',
    problem: 'Small issues accumulate: a campaign waits for a new section, an app update changes the cart, and the same theme defect keeps coming back. The cost is felt in lost team time and a roadmap that never quite catches up.',
    outcomes: [
      { title: 'A clearer queue', copy: 'Separate urgent defects from planned improvements, agree the priority and know what is ready to release.' },
      { title: 'Less repeat work', copy: 'Use reusable theme sections, documented decisions and resolved root causes to make future changes easier.' },
      { title: 'Better release confidence', copy: 'Check important buying paths before publishing, with an agreed approval and recovery plan.' },
    ],
    deliverables: [
      { title: 'Store and backlog review', copy: 'An initial view of theme structure, apps, recurring defects and business priorities, followed by an agreed list of work.' },
      { title: 'Theme improvements', copy: 'Scoped changes to product and collection templates, navigation, content sections, landing pages and the cart.' },
      { title: 'Maintenance and defect resolution', copy: 'Investigation of reproducible issues, compatibility review for agreed app changes, and fixes with a record of what changed.' },
      { title: 'Release QA and handover', copy: 'A preview for approval, checks on agreed devices and purchase paths, release notes and instructions for merchant-editable content.' },
      { title: 'Ongoing priority review', copy: 'A recurring review of completed work, unresolved risks and the next priorities within the agreed capacity.' },
    ],
    cycle: [
      { title: 'Understand', copy: 'Review the store, your campaign calendar and the issues taking time from your team.' },
      { title: 'Agree', copy: 'Choose the next batch of work, its scope, dependencies and approval owner.' },
      { title: 'Build and check', copy: 'Make changes in a preview, test affected flows and resolve feedback.' },
      { title: 'Release and review', copy: 'Publish approved work, document it and feed the next decision back into the queue.' },
    ],
    responsibilities: {
      ours: 'We own the agreed development tasks, technical investigation, release preparation and documentation. Communication, capacity and response arrangements are defined in the engagement.',
      yours: 'Your team owns commercial priorities, approved product and campaign content, store permissions and final release approval. We need a clear decision-maker and access to the systems in scope.',
      boundaries: 'Customer support, daily merchandising, fulfillment operations, paid media and round-the-clock incident cover are not assumed. Larger rebuilds, migrations and third-party subscription costs are scoped separately.',
    },
    faqs: [
      { question: 'Can you work with our current theme and apps?', answer: 'Yes. The first step is to understand the existing setup and its constraints. Keeping and improving it may be the right decision; a rebuild is discussed only when the evidence supports it.' },
      { question: 'Do we need Shopify Plus?', answer: 'No. Ongoing theme development and maintenance are relevant to established Shopify stores across plans. We check plan requirements when a requested feature depends on them.' },
      { question: 'How are urgent issues handled?', answer: 'We agree how to report issues, what counts as urgent and the support coverage in scope. A review request does not create a response-time guarantee or a 24/7 support agreement.' },
      { question: 'Can you work alongside our agency or internal team?', answer: 'Yes. We define who owns the backlog, code, approvals and release coordination so work can fit an existing team.' },
    ],
    article: { title: 'A practical Shopify store health check', href: '/insights/shopify-store-health-check', copy: 'Start with the buying journey, release history and recurring operational friction.' },
  },
  {
    slug: 'storefront-conversion', href: '/services/storefront-conversion', index: '02', label: 'Storefront & conversion',
    title: 'Make the next purchase easier.',
    summary: 'Shopify design, performance and conversion improvements grounded in the buying journey.',
    description: 'Help customers find the right product, understand it and buy with confidence. We connect storefront design and engineering with the evidence behind each improvement.',
    audience: 'Established Shopify brands with traffic already reaching the store, but with product discovery, mobile usability, performance or purchase friction that needs attention.',
    problem: 'More visits cannot fix an unclear product page or a difficult cart. Useful improvements begin with where customers hesitate, what your data can reliably show and what your team can actually change.',
    outcomes: [
      { title: 'Clearer decisions', copy: 'Improve product information, variants, navigation and collection discovery around the questions shoppers need answered.' },
      { title: 'A lighter experience', copy: 'Review images, scripts and app behavior that affect real shopping journeys, especially on mobile.' },
      { title: 'Evidence for the next change', copy: 'Define a baseline and a success measure before a release, then interpret the result with its limitations.' },
    ],
    deliverables: [
      { title: 'Journey and measurement review', copy: 'An assessment of the product-to-purchase path, available funnel data, customer feedback and tracking gaps.' },
      { title: 'Prioritized opportunity list', copy: 'Findings ranked by business relevance, evidence, effort and dependencies, with a reason for each recommendation.' },
      { title: 'UX and storefront design', copy: 'Scoped designs for product pages, collections, navigation, cart interactions or campaign journeys, including mobile states.' },
      { title: 'Shopify implementation', copy: 'Theme sections and templates built around the approved design, content needs and current storefront architecture.' },
      { title: 'Performance and release checks', copy: 'Checks on affected journeys and performance signals before and after launch, with regression issues recorded.' },
      { title: 'Result review', copy: 'An assessment of the agreed measure. Testing is used where traffic and measurement support it; otherwise the limitations of observational results are made clear.' },
    ],
    cycle: [
      { title: 'Find the friction', copy: 'Read the available data and walk the purchase journey on real device sizes.' },
      { title: 'Choose one priority', copy: 'Define the problem, the proposed change and the measure that would make it useful.' },
      { title: 'Design and release', copy: 'Build the approved experience, check its states and publish with a baseline.' },
      { title: 'Learn and adjust', copy: 'Review results alongside traffic mix, campaigns and other changes before choosing the next improvement.' },
    ],
    responsibilities: {
      ours: 'We own the agreed analysis, design, development and release checks. Recommendations explain the evidence and assumptions behind them.',
      yours: 'Your team provides access to available analytics, customer feedback, brand assets and product knowledge. You approve commercial claims, promotion rules and final designs.',
      boundaries: 'Conversion uplift, search rankings and a particular performance score are not guaranteed. Media buying, photography, legal review and platform features outside your plan are separate from the agreed storefront scope.',
    },
    faqs: [
      { question: 'Will you redesign the whole store?', answer: 'Only if that is the appropriate scope. A collection template, clearer product page or specific cart fix may be more useful than replacing a functioning storefront.' },
      { question: 'Can you guarantee a conversion increase?', answer: 'No. We can define the problem, build the improvement and measure what happens. Results also depend on product, price, traffic quality, stock and concurrent campaigns.' },
      { question: 'What if our traffic is too low for an A/B test?', answer: 'We use usability evidence, customer feedback and carefully defined before-and-after observation. We do not present those methods as controlled experiments or promise statistical certainty.' },
      { question: 'Does checkout work require Plus?', answer: 'It depends on the change. Cart and storefront improvements do not automatically require Plus. UI extensions inside the information, shipping and payment steps require Plus; other surfaces have different eligibility.' },
    ],
    article: { title: 'A practical Shopify store health check', href: '/insights/shopify-store-health-check', copy: 'Use five questions to find friction worth investigating before commissioning a redesign.' },
    sources: [{ title: 'Shopify checkout customization options', href: 'https://shopify.dev/docs/apps/build/checkout/technologies' }],
  },
  {
    slug: 'integrations-automation', href: '/services/integrations-automation', index: '03', label: 'Integrations & automation',
    title: 'Less work between systems.',
    summary: 'Connect Shopify with the systems your team uses and reduce recurring manual handoffs.',
    description: 'Stock, orders and customer information should reach the right place without repeated copying. We map the workflow, choose a suitable connection and plan for the exceptions that happen in daily trading.',
    audience: 'Shopify brands whose teams repeatedly reconcile spreadsheets, move data between apps or investigate mismatched inventory, fulfillment or customer records.',
    problem: 'An integration is useful only when the team can depend on it. A successful transfer is one part of the job; duplicates, missed updates and unclear ownership can leave the same manual work behind.',
    outcomes: [
      { title: 'Fewer handoffs', copy: 'Move agreed information between Shopify and operational tools without repeatedly entering it.' },
      { title: 'Clear ownership', copy: 'Define which system owns each record, when it updates and who deals with an exception.' },
      { title: 'Recoverable workflows', copy: 'Make failures visible and agree how to reconcile data or safely repeat a task.' },
    ],
    deliverables: [
      { title: 'Workflow and system map', copy: 'Document the current process, records, owners and recurring problems before selecting an app or custom connection.' },
      { title: 'Integration scope', copy: 'Specify data fields, direction, timing, permissions, dependencies and acceptance criteria for the agreed workflow.' },
      { title: 'Connection or automation', copy: 'Configure suitable existing tools, Shopify Flow or a scoped custom integration where the requirement warrants it.' },
      { title: 'Exception and reconciliation plan', copy: 'Define duplicate handling, retry behavior, visible failure states and checks for missing or inconsistent records.' },
      { title: 'Testing and operating notes', copy: 'Check normal and failure scenarios, document what to monitor and identify the owner of each dependency.' },
    ],
    cycle: [
      { title: 'Map the work', copy: 'Follow one process from start to finish and identify the manual steps that recur.' },
      { title: 'Set the rules', copy: 'Agree record ownership, update timing, failure handling and available-tool limits.' },
      { title: 'Connect and test', copy: 'Build the scoped flow and check duplicates, delays, invalid inputs and recovery.' },
      { title: 'Observe and maintain', copy: 'Review exceptions and adapt the connection when agreed systems or requirements change.' },
    ],
    responsibilities: {
      ours: 'We own the connection and automation work agreed in scope, its test scenarios and operating documentation. Ongoing maintenance and monitoring arrangements are defined separately.',
      yours: 'Your team identifies the system of record, approves data access and provides the relevant operational owners. Vendors must supply the interfaces, permissions or configuration required for their side of the connection.',
      boundaries: 'Third-party outages, vendor API limits, data quality and subscription charges remain dependencies. Hosting, alert coverage and ongoing integration support are agreed explicitly.',
    },
    faqs: [
      { question: 'Do we always need a custom app?', answer: 'No. An existing connector or Shopify Flow can be sufficient. We compare fit, running cost, maintainability and failure handling before recommending custom development.' },
      { question: 'Is Shopify Flow only available on Plus?', answer: 'No. Flow is available on Basic, Grow, Advanced and Plus. The Send HTTP Request action requires Grow or higher, while tasks from custom partner apps require Plus. Your exact workflow determines which option fits.' },
      { question: 'Can you connect our ERP, CRM or fulfillment platform?', answer: 'We first review that system’s available interfaces, permissions and data model. The achievable scope depends on what both platforms support and the quality of the existing data.' },
      { question: 'Who supports the integration after launch?', answer: 'The proposal defines which parts we maintain, the vendor responsibilities, where failures are reported and how changes are handled. We avoid leaving ownership implicit.' },
    ],
    article: { title: 'How to review your Shopify app stack', href: '/insights/shopify-app-stack-review', copy: 'Understand which tools earn their place before adding another layer of automation.' },
    sources: [{ title: 'Shopify Flow features by plan', href: 'https://help.shopify.com/en/manual/shopify-flow' }],
  },
  {
    slug: 'shopify-plus', href: '/services/shopify-plus', index: '04', label: 'Shopify Plus',
    title: 'More capability. A clear reason.',
    summary: 'Checkout, wholesale and complex commerce work when your requirements call for Shopify Plus.',
    description: 'Plus is a capability decision. We help define the requirement, check what your current plan can already do and scope the Shopify Plus work that serves a clear business need.',
    audience: 'Brands already on Shopify Plus, or established Shopify teams considering it because of specific checkout, wholesale, catalog or operational requirements. An upgrade is not a prerequisite for working with Claraverse.',
    problem: 'A larger plan does not solve an unclear process. The useful question is which requirement needs a Plus capability, how it connects to the wider operation and who will maintain the result.',
    outcomes: [
      { title: 'A justified scope', copy: 'Distinguish requirements that need Plus from those an existing Shopify plan or suitable app can support.' },
      { title: 'A more useful checkout', copy: 'Apply supported extensions and rules to the buying process within Shopify’s available surfaces.' },
      { title: 'Connected complexity', copy: 'Plan wholesale, market and integration requirements together so the storefront does not become another isolated system.' },
    ],
    deliverables: [
      { title: 'Requirement and plan review', copy: 'A documented comparison of requested behavior, relevant plan restrictions and options in the current setup.' },
      { title: 'Checkout enhancement scope', copy: 'Supported UI extensions, app configuration or checkout logic for the agreed target, including failure and eligibility states.' },
      { title: 'Wholesale and market planning', copy: 'A scoped plan for catalogs, company accounts, ordering, market content and connected systems based on actual merchant requirements.' },
      { title: 'Custom development where needed', copy: 'Approved theme, app or integration work, with architecture and maintenance responsibilities defined before build.' },
      { title: 'Purchase-path QA and handover', copy: 'Checks for agreed customer types, markets, promotions and payment paths, followed by operating notes and a release plan.' },
    ],
    cycle: [
      { title: 'Clarify the need', copy: 'Translate the business requirement into specific storefront and operational behavior.' },
      { title: 'Check the boundary', copy: 'Confirm plan, app, payment and API eligibility before committing to an implementation.' },
      { title: 'Build the agreed scope', copy: 'Develop on supported surfaces and test relevant customer and market scenarios.' },
      { title: 'Keep it maintainable', copy: 'Document decisions, ownership and how platform or app changes will be reviewed.' },
    ],
    responsibilities: {
      ours: 'We own the agreed technical review, architecture, development and testing. The proposal identifies which capabilities are used and which dependencies need confirmation.',
      yours: 'Your team owns the plan decision, commercial rules, legal and tax advice, vendor agreements and final approval. Relevant store and operational stakeholders take part in scope decisions.',
      boundaries: 'Plus does not permit arbitrary checkout changes. Payment methods depend on merchant and provider eligibility. Platform subscriptions, vendor contracts and services outside the agreed build remain separate.',
    },
    faqs: [
      { question: 'Do all Shopify brands need Plus?', answer: 'No. Many storefront, maintenance and automation improvements can be delivered on other Shopify plans. We start with the requirement rather than an assumed upgrade.' },
      { question: 'Is native Shopify B2B exclusive to Plus?', answer: 'No. Shopify currently lists native B2B on Basic, Grow, Advanced and Plus. Catalog limits and features vary: Plus adds direct company/location catalogs and advanced payment options. We confirm eligibility and scope for your store.' },
      { question: 'What checkout changes need Plus?', answer: 'UI extensions inside the information, shipping and payment steps require Plus. Thank you and Order status extensions are available on other eligible plans. The exact target and feature determine the boundary.' },
      { question: 'Are custom Shopify Functions available on every plan?', answer: 'Public App Store apps containing Functions can serve stores across plans. Custom apps containing Shopify Function APIs require Plus, and individual Function capabilities may have additional restrictions.' },
    ],
    article: { title: 'A practical Shopify store health check', href: '/insights/shopify-store-health-check', copy: 'Understand the current constraint before making a platform or plan decision.' },
    sources: [
      { title: 'Shopify B2B features by plan', href: 'https://help.shopify.com/en/manual/b2b/getting-started/plan-features' },
      { title: 'Shopify checkout customization', href: 'https://shopify.dev/docs/apps/build/checkout/technologies' },
      { title: 'Shopify Functions availability', href: 'https://shopify.dev/docs/apps/build/functions' },
    ],
  },
];

export function getService(slug: ServiceSlug): ServiceContent {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
