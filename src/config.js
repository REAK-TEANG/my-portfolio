// Site-wide settings that more than one component needs.

/** Where the contact form (and every "email me" link) sends mail. */
export const CONTACT_EMAIL = 'broreakzxz@gmail.com';

/**
 * Formspree form URL, e.g. https://formspree.io/f/xxxxxxxx
 * Set VITE_FORM_ENDPOINT in .env (and in Vercel's Environment Variables).
 * Empty = the form falls back to opening the visitor's email app.
 */
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
