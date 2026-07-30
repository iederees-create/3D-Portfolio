import emailjs from '@emailjs/browser';

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export const sendPersonaEmail = async (name: string, email: string, persona: string, description: string) => {
  if (!publicKey || !serviceId || !templateId || publicKey === 'your_public_key_here') {
    console.warn('EmailJS is not configured. Skipping email send.');
    return;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_name: name,
        to_email: email,
        persona: persona,
        description: description,
      },
      publicKey
    );
    console.log('Persona email sent successfully via EmailJS');
  } catch (error) {
    console.error('Failed to send persona email:', error);
  }
};
