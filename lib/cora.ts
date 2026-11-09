import 'server-only';
import {cache} from 'react';
import {createCoraClient, type FormSchema} from '@heycora/sdk';

export const quoteFormKey = 'frm_ff956abc';

function getCoraClient() {
 const key = process.env.CORA_SECRET_KEY;
 const baseUrl = process.env.CORA_API_URL;
 if (!key || !baseUrl) return null;
 // The static build reads the published schema without Next draft mode or ISR.
 return createCoraClient({key, baseUrl, site: process.env.CORA_SITE_ID, timeoutMs: 8000});
}

async function safe<T>(read: Promise<T>, fallback: T): Promise<T> {
 try {
  return await read;
 } catch {
  return fallback;
 }
}

export const getQuoteForm = cache(async (): Promise<FormSchema | null> => {
 const cora = getCoraClient();
 return cora ? safe<FormSchema | null>(cora.forms.get(quoteFormKey), null) : null;
});
