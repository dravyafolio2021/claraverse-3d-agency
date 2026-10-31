import {Heading} from './Heading';

/** An editorial bridge from the client identities into the selected work. */
export function StudioStatement(){
 return <section id="studio-statement" className="studio-statement" aria-labelledby="studio-statement-title">
  <div className="studio-statement__inner"><span className="studio-statement__label">About</span><Heading id="studio-statement-title" className="studio-statement__heading" pace="relaxed" readingGuide>We partner with ambitious brands to connect the experience their customers see with the operation behind it. Through design, Shopify expertise and intelligent systems, we create commerce that is easier to run, ready to grow and unmistakably yours.</Heading></div>
 </section>;
}
