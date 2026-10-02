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

const LEAD_ENDPOINT = 'https://claraverse.in/wp-admin/admin-ajax.php';

export async function saveLead(lead: Lead) {
  const form = new FormData();
  form.set('action', 'cora_workspace_submit_lead');
  form.set('names', `${lead.firstName} ${lead.lastName}`.trim());
  form.set('email', lead.email);
  form.set('scale', 'Monthly Retainer');
  form.set('price', lead.spend);
  form.set('notes', [
    `Brand: ${lead.brand}`,
    `Primary market: ${lead.market}`,
    `Growth constraints: ${lead.constraints.join(', ') || 'Not specified'}`,
    '',
    lead.context,
  ].join('\n'));

  const response = await fetch(LEAD_ENDPOINT, {
    method: 'POST',
    body: form,
    signal: AbortSignal.timeout(12_000),
  });

  const result = await response.json().catch(() => null) as { success?: boolean } | null;
  if (!response.ok || result?.success !== true) {
    throw new Error('Claraverse lead endpoint rejected the submission.');
  }
}
