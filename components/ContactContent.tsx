import {Suspense} from 'react';
import {getQuoteForm, quoteFormKey} from '@/lib/cora';
import {InteriorHero, PageClose} from './Interior';
import {Heading} from './Heading';
import {QuoteForm} from './QuoteForm';
import {PageFAQ} from './PageFAQ';

const projectSteps = [
 ['The context', 'Your current setup, challenge and priorities.'],
 ['The conversation', 'Clarify the requirements and dependencies.'],
 ['The plan', 'Agree a useful scope and a way forward.'],
];

const projectQuestions = [
 {question: 'Do we need a complete brief?', answer: 'Your business goal, current website and challenge are enough to start. Add system, timing or budget context if you have it.'},
 {question: 'Can we discuss a specific service?', answer: 'Name the service or capability in your project details. Links from service pages show the relevant service beside the form.'},
 {question: 'Should we share access credentials?', answer: 'Please share project context only. Credentials, private customer records and access arrangements belong in a separate, agreed process.'},
];

export async function ContactContent() {
 const schema = await getQuoteForm();
 return <div className="interior-page">
  <InteriorHero
   eyebrow="Start a conversation"
   title="Tell us what’s next."
   copy="For Beauty, Fashion, Wellness and Petcare brands: a new experience, a more capable platform or an operational challenge. Share the context and let’s find the right starting point."
  />
  <section className="interior-section contact-layout">
   <aside>
    <span className="eyebrow">A considered beginning</span>
    <Heading>Your ambition. Our next conversation.</Heading>
    <p>Share your current website, the business goal and the systems or constraints involved. If you are still defining the scope, start with what you want to improve.</p>
    <ol>{projectSteps.map(([title, copy], index) =>
     <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>
    )}</ol>
   </aside>
   <Suspense fallback={<p role="status">Loading the project form…</p>}>
    <QuoteForm form={quoteFormKey} schema={schema}/>
   </Suspense>
  </section>
  <PageFAQ items={projectQuestions}/>
  <PageClose title="Still exploring the possibilities?" copy="See how the five service areas connect around a commerce business." href="/services" label="Explore the services"/>
 </div>;
}
