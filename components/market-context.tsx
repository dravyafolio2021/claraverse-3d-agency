'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MARKET_IDS,
  MARKETS,
  MARKET_STORAGE_KEY,
  marketFromCountry,
  parseMarketId,
  type MarketId,
} from '@/lib/markets';

function savedMarket(): MarketId | null {
  try {
    return parseMarketId(window.localStorage.getItem(MARKET_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function MarketContext() {
  const [market, setMarket] = useState<MarketId>('global');
  const [suggestion, setSuggestion] = useState<MarketId | null>(null);
  const explicitChoice = useRef(false);
  const geoRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    let disposed = false;

    function resolvePreference() {
      geoRequest.current?.abort();
      const query = parseMarketId(
        new URLSearchParams(window.location.search).get('market'),
      );
      const preference = query ?? savedMarket();
      setSuggestion(null);
      explicitChoice.current = preference !== null;
      setMarket(preference ?? 'global');

      if (preference !== null) return;

      const controller = new AbortController();
      geoRequest.current = controller;
      fetch('/api/geo', { cache: 'no-store', signal: controller.signal })
        .then(async (response) => {
          if (!response.ok) return null;
          const result: unknown = await response.json();
          if (typeof result !== 'object' || result === null) return null;
          return marketFromCountry(
            'country' in result ? result.country : undefined,
          );
        })
        .then((suggested) => {
          if (
            !disposed &&
            !controller.signal.aborted &&
            !explicitChoice.current &&
            suggested !== null &&
            suggested !== 'global'
          ) {
            setMarket(suggested);
            setSuggestion(suggested);
          }
        })
        .catch(() => {
          // A missing location signal leaves the Global experience available.
        });
    }

    resolvePreference();
    window.addEventListener('popstate', resolvePreference);
    return () => {
      disposed = true;
      geoRequest.current?.abort();
      window.removeEventListener('popstate', resolvePreference);
    };
  }, []);

  function chooseMarket(nextMarket: MarketId) {
    explicitChoice.current = true;
    geoRequest.current?.abort();
    setMarket(nextMarket);
    setSuggestion(null);

    try {
      window.localStorage.setItem(MARKET_STORAGE_KEY, nextMarket);
    } catch {
      // Selection still works when browser storage is unavailable.
    }

    const url = new URL(window.location.href);
    url.searchParams.set('market', nextMarket);
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

  const content = MARKETS[market];

  return (
    <section
      className="market-section"
      id="markets"
      aria-labelledby="market-heading"
      data-market={market}
    >
      <p className="section-label">Across markets</p>
      <h2 className="section-heading" id="market-heading">
        Commerce, in your context.
      </h2>
      <fieldset
        className="market-tabs"
      >
        <legend className="sr-only">Choose regional examples</legend>
        {MARKET_IDS.map((id) => (
          <button
            className={`market-tab${market === id ? ' active' : ''}`}
            type="button"
            aria-pressed={market === id}
            key={id}
            onClick={() => chooseMarket(id)}
          >
            {MARKETS[id].label}
          </button>
        ))}
      </fieldset>
      <p className="market-note" aria-live="polite" aria-atomic="true">
        {content.summary}
      </p>
      {suggestion !== null && (
        <aside className="market-note market-suggestion" aria-live="polite" aria-label="Location suggestion">
          <p>
            Showing {MARKETS[suggestion].label} examples for your approximate location.
            You can choose a different market at any time.
          </p>
          <button
            className="market-tab"
            type="button"
            onClick={() => setSuggestion(null)}
            aria-label="Dismiss location suggestion"
          >
            Dismiss
          </button>
        </aside>
      )}
      <div className="market-cards">
        {content.features.map((feature, index) => (
          <article className="market-card" key={`${market}-${feature.label}`}>
            <p className="section-label">
              <span aria-hidden="true">0{index + 1} / </span>
              {feature.label}
            </p>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
      <p className="market-note">{content.note}</p>
    </section>
  );
}
