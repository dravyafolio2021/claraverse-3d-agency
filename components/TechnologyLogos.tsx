/** Shared technology signature. These identify tools, not sponsorships. */
export function TechnologyLogos({ compact = false }: { compact?: boolean }) {
  return <div className={`technology-logos${compact ? ' technology-logos--compact' : ''}`} aria-label="Commerce and AI tools">
    <a href="https://www.shopify.com" target="_blank" rel="noreferrer" aria-label="Shopify"><img src="/shopify-logo.svg" alt="Shopify" width="88" height="26" /></a>
    <span className="technology-logos__divider" aria-hidden="true" />
    <a href="https://chatgpt.com" target="_blank" rel="noreferrer" aria-label="ChatGPT"><img className="chatgpt-symbol" src="/chatgpt-logo.svg" alt="" width="23" height="23" /><span>ChatGPT</span></a>
    <a href="https://claude.com" target="_blank" rel="noreferrer" aria-label="Claude"><img src="/claude-logo.svg" alt="Claude" width="75" height="20" /></a>
  </div>;
}
