import { saveLead } from '@/lib/leads';

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const lead = {
      firstName: text(body.firstName),
      lastName: text(body.lastName),
      email: text(body.email),
      brand: text(body.brand),
      market: text(body.market),
      spend: text(body.spend),
      constraints: Array.isArray(body.constraints) ? body.constraints.map(text).filter(Boolean) : [],
      context: text(body.context),
    };

    if (!lead.firstName || !lead.lastName || !lead.email.includes('@') || !lead.brand || !lead.market || !lead.spend || !lead.context) {
      return Response.json({ error: 'Please complete every required field.' }, { status: 400 });
    }

    await saveLead(lead);
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: 'We could not save the brief. Please try again.' }, { status: 500 });
  }
}
