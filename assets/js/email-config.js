/**
 * assets/js/email-config.js
 * -------------------------
 * EmailJS configuration for client-side email sending.
 *
 * Steps to obtain these values:
 * 1. Create an EmailJS account: https://www.emailjs.com/
 * 2. Add an Email Service (e.g., Gmail via OAuth or SMTP).
 * 3. Create an Email Template that expects variables:
 *      - from_name
 *      - from_email
 *      - message
 *      - to_email  (optional if you set recipient in template)
 * 4. In the EmailJS dashboard you will see:
 *      - SERVICE ID (e.g. 'service_xxx')
 *      - TEMPLATE ID (e.g. 'template_yyy')
 *      - PUBLIC KEY (sometimes called USER ID; e.g. 'user_abc123')
 *
 * Paste those values into the consts below.
 *
 * SECURITY NOTE:
 * - EmailJS public key is safe for client usage.
 * - Do NOT store server-side service account keys in client code.
 */

// Replace the placeholder strings with your EmailJS values.
const EMAILJS_SERVICE_ID = 'REPLACE_WITH_EMAILJS_SERVICE_ID';    // e.g. 'service_xxx'
const EMAILJS_TEMPLATE_ID = 'REPLACE_WITH_EMAILJS_TEMPLATE_ID'; // e.g. 'template_yyy'
const EMAILJS_PUBLIC_KEY = 'REPLACE_WITH_EMAILJS_PUBLIC_KEY';   // e.g. 'user_abc123'

// Destination email (for template variable to_email) — recommended to set this in template instead
// but we also expose it so the client can pass it.
const DESTINATION_EMAIL = 'mahanaimgospelteam@gmail.com';

// Expose the config so main.js can read it
window.EMAIL_CONFIG = {
  serviceId: EMAILJS_SERVICE_ID,
  templateId: EMAILJS_TEMPLATE_ID,
  publicKey: EMAILJS_PUBLIC_KEY,
  destinationEmail: DESTINATION_EMAIL
};
