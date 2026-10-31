'use client';
import {useState} from 'react';
import Link from 'next/link';
import {clientReviews,isApprovedReview} from '@/lib/client-reviews';
import {Heading} from './Heading';
const pad=(value:number)=>String(value).padStart(2,'0');

export function ClientReviews(){
 const [active,setActive]=useState(0);
 const published=clientReviews.filter(isApprovedReview);
 const entries=published.length?published:clientReviews;
 const selected=Math.min(active,entries.length-1);
 const review=entries[selected],approved=isApprovedReview(review);
 const ready=published.length;
 const select=(index:number)=>setActive((index+entries.length)%entries.length);
 return <section id="client-reviews" className="client-reviews" aria-labelledby="client-reviews-title" aria-describedby={ready?undefined:'client-reviews-note'}>
  <header className="client-reviews__intro"><div><span className="eyebrow">client perspectives</span><Heading id="client-reviews-title">good work starts with<br/>a good partnership.</Heading></div><div><p>The brief is only the beginning.<br/>How it feels to work together matters.</p><p id="client-reviews-note" className="client-reviews__note">{ready?'Perspectives shared with permission.':'Review layout preview · approved client quotes to follow.'}</p></div></header>
  <div className="review-stage">
   <span className="review-stage__ornament" aria-hidden="true">“</span>
   <div id="review-story" className="review-stage__main" aria-live="polite" aria-atomic="true"><div key={review.id} className="review-stage__story">
    <span className="review-stage__category">{review.category}{approved?null:<span> / preview</span>}</span>
    {approved?<blockquote className="review-stage__quote"><p>{review.quote}</p></blockquote>:<div className="review-stage__placeholder"><p>Their experience.<br/>In their own words.</p><span>A space for an approved client’s perspective on working together.</span></div>}
    <div className="review-stage__attribution"><span className="review-stage__avatar" aria-hidden="true">{approved?review.name!.trim().charAt(0):'✳'}</span><div>{approved?<><p>{review.name}</p><span>{[review.role,review.company].filter(Boolean).join(' · ')}</span></>:<><p>Client name / company</p><span>Approved attribution to follow</span></>}</div></div>
   </div></div>
   <div className="review-stage__navigation"><div className="review-stage__choices" role="group" aria-label={ready?'Choose a client review':'Choose a review layout preview'}>{entries.map((item,index)=><button key={item.id} type="button" aria-pressed={index===selected} aria-controls="review-story" onClick={()=>select(index)} aria-label={`${isApprovedReview(item)?'Read':'Preview'} ${item.category.toLowerCase()}`}><span>{pad(index+1)}</span><span>{item.category}</span></button>)}</div><div className="review-stage__browse"><button type="button" onClick={()=>select(selected-1)} aria-label="Previous review">Prev</button><span aria-hidden="true">{pad(selected+1)} / {pad(entries.length)}</span><button type="button" onClick={()=>select(selected+1)} aria-label="Next review">Next</button></div></div>
  </div>
  <div className="client-reviews__end"><span>Clear communication. Shared ownership. Considered work.</span><Link href="/quote" className="text-link">Let’s talk about your project</Link></div>
 </section>;
}
