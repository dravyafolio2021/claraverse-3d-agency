'use client';

import { useState, type ComponentProps } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';

type Brief = { subject: string; body: string };

export function ContactForm() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const prepare: NonNullable<ComponentProps<'form'>['onSubmit']> = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => { const entry = data.get(key); return typeof entry === 'string' ? entry.trim() : ''; };
    const subject = 'Shopify efficiency review — ' + value('store');
    const body = [
      'Hello Claraverse,', '', 'I would like to discuss improving our Shopify store.', '',
      'Store: ' + value('store'),
      'Email: ' + value('email'),
      'Name: ' + (value('name') || 'Not provided'),
      'Shopify plan: ' + value('plan'),
      'Main priority: ' + value('priority'),
      '', value('context'), '', 'Please let me know a useful next step.',
    ].join('\n');
    setBrief({ subject, body });
    setCopyStatus('');
  };

  async function copyBrief() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief.subject + '\n\n' + brief.body);
      setCopyStatus('Brief copied.');
    } catch {
      setCopyStatus('Select and copy the brief below, then email hello@claraverse.in.');
    }
  }

  if (brief) {
    return <div className="brief-ready" aria-labelledby="brief-heading">
      <p className="eyebrow"><Check size={13} aria-hidden="true" /> Ready for your next step</p>
      <h2 id="brief-heading">Your review brief is ready.</h2>
      <p>Open it in your email app and send it to our team. Your request has not been submitted yet.</p>
      <pre>{brief.body}</pre>
      <div className="page-actions">
        <a className="primary-button" href={`mailto:hello@claraverse.in?subject=${encodeURIComponent(brief.subject)}&body=${encodeURIComponent(brief.body)}`}>Open email draft <Mail size={16} aria-hidden="true" /></a>
        <button className="text-link" type="button" onClick={copyBrief}>Copy brief <Copy size={14} aria-hidden="true" /></button>
        <button className="text-link" type="button" onClick={() => setBrief(null)}>Edit details</button>
      </div>
      <output className="copy-status" aria-live="polite">{copyStatus}</output>
      <p>Prefer another email app? Copy the brief and send it to <a href="mailto:hello@claraverse.in">hello@claraverse.in</a>.</p>
    </div>;
  }

  return (
    <form className="lead-form" onSubmit={prepare}>
      <label>Store website<input type="url" name="store" placeholder="https://yourstore.com" autoComplete="url" maxLength={300} required /></label>
      <div className="form-row">
        <label>Your email<input type="email" name="email" autoComplete="email" placeholder="you@yourbrand.com" maxLength={200} required /></label>
        <label>Your name <span className="muted">(optional)</span><input name="name" autoComplete="name" maxLength={100} /></label>
      </div>
      <label>Main priority<select name="priority" defaultValue="" required><option value="" disabled>What would you like to improve?</option><option>Ongoing management & development</option><option>Storefront & conversion</option><option>Integrations & automation</option><option>Shopify Plus or market expansion</option><option>Not sure — help me find the priority</option></select></label>
      <label>Shopify plan<select name="plan" defaultValue="Not sure"><option>Shopify</option><option>Shopify Plus</option><option>Not sure</option><option>Planning a move to Shopify</option></select></label>
      <label>A little context <span className="muted">(optional)</span><textarea name="context" rows={4} maxLength={1500} placeholder="What is getting in the way, and what would you like your store to do better?" /></label>
      <button className="primary-button" type="submit">Prepare my review request <ArrowUpRight size={17} aria-hidden="true" /></button>
      <small>Your details stay in this page until you choose to open and send the email draft. Please do not include passwords or customer data. <Link href="/privacy">Privacy details</Link></small>
    </form>
  );
}
