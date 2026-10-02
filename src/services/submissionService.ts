import { supabase } from '../integrations/supabase/client';

const db = supabase as any;

export async function subscribeToNewsletter(email: string, language: 'es' | 'en') {
  const normalized = email.trim().toLowerCase();
  const { error } = await db
    .from('newsletter_subscribers')
    .upsert(
      {
        email: normalized,
        language,
        source: 'website',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email', ignoreDuplicates: true }
    );

  if (error) throw error;
}

export async function submitContact(input: {
  email: string;
  message?: string;
  inquiryType?: string;
  language: 'es' | 'en';
}) {
  const { error } = await db.from('contact_submissions').insert({
    email: input.email.trim().toLowerCase(),
    message: input.message?.trim() || null,
    inquiry_type: input.inquiryType || 'general',
    language: input.language,
  });

  if (error) throw error;
}
