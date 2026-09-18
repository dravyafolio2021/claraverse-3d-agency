'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const payload = {
      firstName: form.get('firstName'), lastName: form.get('lastName'),
      email: form.get('email'), brand: form.get('brand'), market: form.get('market'),
      spend: form.get('spend'), constraints: form.getAll('constraint'), context: form.get('context'),
    };
    try {
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('submit-failed');
      setSent(true);
    } catch {
      setError('We could not save your brief. Please try again or email hello@claraverse.com.');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={38} />
        <p>Brief received</p>
        <h2>We’ll review the opportunity and come back with a useful next step.</h2>
        <span>Typical response time: 1–2 working days.</span>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-row">
        <label>First name<input name="firstName" autoComplete="given-name" required /></label>
        <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
      </div>
      <label>Work email<input type="email" name="email" autoComplete="email" required /></label>
      <label>Brand + website<input name="brand" placeholder="Brand name · yourstore.com" required /></label>
      <div className="form-row">
        <label>Primary market<select name="market" defaultValue="" required><option value="" disabled>Select a region</option><option>North America</option><option>United Kingdom & Europe</option><option>Middle East</option><option>India & South Asia</option><option>Southeast Asia</option><option>Australia & New Zealand</option></select></label>
        <label>Monthly media spend<select name="spend" defaultValue="" required><option value="" disabled>Select a range</option><option>Pre-launch / testing</option><option>$10k–$50k</option><option>$50k–$150k</option><option>$150k–$500k</option><option>$500k+</option></select></label>
      </div>
      <fieldset>
        <legend>Where is growth stuck?</legend>
        <div className="choice-grid">
          {['Acquisition efficiency','Creative volume','Store conversion','Measurement','International scale','Not sure yet'].map((item) => (
            <label key={item}><input type="checkbox" name="constraint" value={item} /><span>{item}</span></label>
          ))}
        </div>
      </fieldset>
      <label>What should we understand?<textarea name="context" rows={5} placeholder="A little context on the brand, the opportunity and what you have tried so far." required /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send the brief'} <ArrowRight size={19} /></button>
      <small>By submitting, you agree that we can contact you about this enquiry.</small>
    </form>
  );
}
