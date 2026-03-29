/**
 * CoreLinq Platform Integration
 *
 * Captures leads from the Lone Star Tortillas website into the CoreLinq platform
 * for AI inbox routing (Maria auto-responses), contact management, and campaign enrollment.
 */

const CORELINQ_API_URL = process.env.CORELINQ_API_URL || 'https://corelinq-platform.vercel.app';
const LONESTAR_ORG_ID = process.env.CORELINQ_ORG_ID || '534f058c-c51e-42f2-8986-9311a91639d1';

interface LeadCaptureData {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  subject?: string;
  message?: string;
  leadType: string;
  leadSource: string;
  metadata?: Record<string, unknown>;
}

export async function captureLeadToCoreLinq(data: LeadCaptureData) {
  const res = await fetch(`${CORELINQ_API_URL}/api/public/leads/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      org_id: LONESTAR_ORG_ID,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName || '',
      phone: data.phone || undefined,
      source: 'web_form',
      subject: data.subject || undefined,
      message: data.message || undefined,
      metadata: {
        lead_type: data.leadType,
        lead_source: data.leadSource,
        ...data.metadata,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`CoreLinq lead capture failed (${res.status}): ${body}`);
  }

  return res.json();
}
