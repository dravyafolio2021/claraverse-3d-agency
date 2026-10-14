export const MARKET_IDS = ['global', 'us', 'europe', 'india'] as const;

export type MarketId = (typeof MARKET_IDS)[number];

export type MarketFeature = {
  label: string;
  title: string;
  description: string;
};

export type MarketContent = {
  label: string;
  summary: string;
  features: readonly [MarketFeature, MarketFeature, MarketFeature];
  note: string;
};

export const MARKET_STORAGE_KEY = 'claraverse:market';

export const MARKETS: Record<MarketId, MarketContent> = {
  global: {
    label: 'Global',
    summary:
      'An ongoing Shopify team for the storefront, systems and release decisions that keep your business moving.',
    features: [
      {
        label: 'Storefront',
        title: 'Keep the experience improving',
        description:
          'Refine product discovery, mobile journeys and reusable Shopify sections as your catalog and campaigns evolve.',
      },
      {
        label: 'Operations',
        title: 'Connect the moving parts',
        description:
          'Bring apps, inventory and fulfilment into a clear workflow, with attention to data mapping and the exceptions that need a person.',
      },
      {
        label: 'Delivery',
        title: 'Make each release count',
        description:
          'Test changes across devices and checkout paths, then review performance and funnel evidence to choose the next improvement.',
      },
    ],
    note:
      'Every regional example is available wherever you browse. Choose the context that matches the markets you serve.',
  },
  us: {
    label: 'United States',
    summary:
      'Support for established Shopify brands across accelerated checkout, recurring purchases and connected fulfilment.',
    features: [
      {
        label: 'Payments',
        title: 'Shop Pay and wallet journeys',
        description:
          'Review eligible Shop Pay, Apple Pay and Google Pay experiences alongside standard checkout, including address, discount and cart states.',
      },
      {
        label: 'Recurring commerce',
        title: 'Subscriptions that fit your stack',
        description:
          'Shape purchase and account journeys around compatible subscription apps, products and payment providers.',
      },
      {
        label: 'Operations',
        title: 'Orders through to fulfilment',
        description:
          'Connect inventory, warehouse and returns workflows so the team can find and resolve order exceptions.',
      },
    ],
    note:
      'Payment and subscription options depend on your provider, products, device and store configuration. Plus checkout enhancements are scoped separately.',
  },
  europe: {
    label: 'Europe',
    summary:
      'Country-specific Shopify experiences, with payment, language and currency decisions grounded in where you sell.',
    features: [
      {
        label: 'Payments',
        title: 'The right methods for each country',
        description:
          'Assess iDEAL | Wero for the Netherlands, Bancontact for Belgium and Klarna in eligible markets, subject to provider and currency requirements.',
      },
      {
        label: 'Localization',
        title: 'Language and currency clarity',
        description:
          'Plan maintained translations, country-appropriate pricing and checkout currencies without treating Europe as one market.',
      },
      {
        label: 'Quality',
        title: 'Review the complete journey',
        description:
          'Check consent-sensitive analytics, delivery information and standard or accelerated checkout paths for the countries you serve.',
      },
    ],
    note:
      'Availability varies by merchant country, shopper location, currency, provider and eligibility. Language preference is separate from country.',
  },
  india: {
    label: 'India',
    summary:
      'Shopify improvements shaped around mobile journeys, eligible local payments and the operational detail behind each order.',
    features: [
      {
        label: 'Payments',
        title: 'UPI for eligible setups',
        description:
          'Work with supported third-party providers such as Razorpay and test the mobile UPI journey for your approved configuration.',
      },
      {
        label: 'Checkout',
        title: 'COD and payment states',
        description:
          'Review cash on delivery, pending and failed payments, and order-status handling so fulfilment follows the right payment rules.',
      },
      {
        label: 'Operations',
        title: 'Support beyond checkout',
        description:
          'Connect inventory, logistics and returns workflows while keeping the mobile storefront clear and easy to use.',
      },
    ],
    note:
      'Shopify Payments is not currently available for India-based businesses. UPI and other methods depend on provider approval and store configuration.',
  },
};

export function parseMarketId(value: unknown): MarketId | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return MARKET_IDS.find((market) => market === normalized) ?? null;
}

// A small country grouping for suggestions, not a list of payment eligibility.
const EUROPE_COUNTRIES = new Set(
  'AD AL AT BA BE BG BY CH CY CZ DE DK EE ES FI FR GB GR HR HU IE IS IT LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS SE SI SK SM UA VA XK'.split(
    ' ',
  ),
);

export function marketFromCountry(country: unknown): MarketId | null {
  if (typeof country !== 'string') return null;
  const normalized = country.trim().toUpperCase();
  if (normalized === 'US') return 'us';
  if (normalized === 'IN') return 'india';
  if (EUROPE_COUNTRIES.has(normalized)) return 'europe';
  return null;
}
