'use client';

import {CoraForm} from '@heycora/next/client';
import type {FormSchema} from '@heycora/sdk';
import {useSearchParams} from 'next/navigation';
import {Heading} from './Heading';
import {findOffering, resolveService} from '@/lib/services';

export function QuoteForm({form, schema}:{form:string; schema:FormSchema | null}) {
 const params = useSearchParams();
 const service = resolveService(params.get('service') ?? undefined);
 const offering = findOffering(service, params.get('offering') ?? undefined);
 const context = offering?.name ?? service?.name;

 if (!schema?.fields.length) {
  return <p className="form-error" role="status">The project enquiry form is currently unavailable. Please try again later.</p>;
 }

 return <div>
  {context && <p className="quote-context">Interested in {context}? Include it in your project details below.</p>}
  <CoraForm
   form={form}
   schema={schema}
   className="quote-form"
   submitLabel="Send your project brief"
   success={<div className="quote-success moving-border" role="status">
    <Heading mode="load">Your brief is in.</Heading>
    <p>Thank you for sharing your project with Claraverse.</p>
   </div>}
  />
  <p className="small-note">Share project details only. Please leave out passwords and private access credentials.</p>
 </div>;
}
