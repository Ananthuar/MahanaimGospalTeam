/**
 * assets/js/email-config.js
 * -------------------------
 */

const EMAILJS_SERVICE_ID = 'REPLACE_WITH_SERVICE_ID';    // e.g. 'service_xxx'
const EMAILJS_TEMPLATE_ID = 'REPLACE_WITH_TEMPLATE_ID'; // e.g. 'template_yyy'
const EMAILJS_PUBLIC_KEY = 'REPLACE_WITH_PUBLIC_KEY';   // e.g. 'user_abc123'
const DESTINATION_EMAIL = 'mahanaimgospelteam@gmail.com';

window.EMAIL_CONFIG = {
  serviceId: EMAILJS_SERVICE_ID,
  templateId: EMAILJS_TEMPLATE_ID,
  publicKey: EMAILJS_PUBLIC_KEY,
  destinationEmail: DESTINATION_EMAIL
};
