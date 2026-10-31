'use client';
import {Heading} from '@/components/Heading';
import {useState} from 'react';
import {services,resolveService,findOffering} from '@/lib/services';
export function QuoteForm({initialService='',initialOffering=''}:{initialService?:string;initialOffering?:string}){
 const initial=resolveService(initialService);
 const [focus,setFocus]=useState(initial?.slug??(initialService==='explore'?'explore':'')),[offering,setOffering]=useState(findOffering(initial,initialOffering)?.slug??'');
 const selected=resolveService(focus);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[reference,setReference]=useState('');
 if(reference)return <div className="quote-success moving-border" role="status"><span className="eyebrow">a new beginning</span><Heading mode="load">your brief<br/>is in.</Heading><p>Your project request has been saved with reference <strong>{reference}</strong>.</p><button className="text-link" onClick={()=>{setReference('');setError('');}}>Start another brief ↗</button></div>;
 return <form className="quote-form" onSubmit={async event=>{event.preventDefault();if(busy)return;setBusy(true);setError('');const data=Object.fromEntries(new FormData(event.currentTarget));try{const response=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(!response.ok)throw new Error(result.error||'We could not save your brief. Please try again.');setReference(result.reference);}catch(error){setError(error instanceof Error?error.message:'Please try again.');}finally{setBusy(false);}}}>
  <div className="form-grid"><label>Your name<input name="name" autoComplete="name" required maxLength={100}/></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label><label>Brand / company<input name="company" autoComplete="organization" required maxLength={150}/></label><label><span className="form-label">Website <small>(optional)</small></span><input name="website" type="url" placeholder="https://" maxLength={500}/></label><label>How can we help?<select name="service" value={focus} onChange={event=>{setFocus(event.target.value);setOffering('');}} required><option value="" disabled>Select a focus</option>{services.map(service=><option value={service.slug} key={service.slug}>{service.name}</option>)}<option value="explore">Let’s work it out together</option></select></label>{selected&&<label><span className="form-label">Specific service <small>(optional)</small></span><select name="offering" value={offering} onChange={event=>setOffering(event.target.value)}><option value="">Help me define the scope</option>{selected.offerings.map(item=><option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label>}<label><span className="form-label">Indicative budget <small>(optional)</small></span><input name="budget" maxLength={100} placeholder="Amount and currency, or let’s discuss"/></label></div>
  <label>What would you like to improve or build?<textarea name="project" required minLength={20} maxLength={5000} rows={5} placeholder="Your goals, current challenges, timing and anything else we should know."/></label>
  <label className="honeypot" aria-hidden="true">Leave this empty<input name="fax" tabIndex={-1} autoComplete="off"/></label>
  <label className="consent-label"><input type="checkbox" name="consent" required value="yes"/>I agree that Claraverse may use these details to respond to this project request.</label>
  {error&&<p className="form-error" role="alert">{error}</p>}
  <button className="button-lime" type="submit" disabled={busy}>{busy?'Saving your brief…':'Request a quote'} <span>↗</span></button>
  <p className="small-note">Share project details only. Please leave out passwords and private access credentials.</p>
 </form>;
}
