import { env } from 'cloudflare:workers';
import { createLeadsTable } from '@/db/schema';

type Lead = {
  firstName: string;
  lastName: string;
  email: string;
  brand: string;
  market: string;
  spend: string;
  constraints: string[];
  context: string;
};

function database() {
  return (env as unknown as { DB: D1Database }).DB;
}

export async function saveLead(lead: Lead) {
  const db = database();
  await db.prepare(createLeadsTable).run();
  await db.prepare(`
    INSERT INTO leads (
      id, first_name, last_name, email, brand, market, spend,
      constraints_json, context, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(), lead.firstName, lead.lastName, lead.email,
    lead.brand, lead.market, lead.spend, JSON.stringify(lead.constraints),
    lead.context, Date.now(),
  ).run();
}
