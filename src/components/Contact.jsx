import { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkedinLogo, InstagramLogo, BehanceLogo, PaperPlaneRight } from '@phosphor-icons/react';
import { WordReveal } from './Reveal';
import { CONTACT_EMAIL, FORM_ENDPOINT } from '../config';

const LIMITS = { name: 80, email: 120, message: 3000 };

const fieldClass =
  'w-full bg-white border-2 border-ink px-4 py-3 font-sans focus:outline-none focus:ring-4 focus:ring-accent-pink/50 transition-all';
const labelClass = 'block font-mono text-sm font-bold uppercase mb-2';

/** POSTs the message to Formspree. Throws an Error whose message is shown to the visitor. */
async function sendToFormspree(data) {
  let res;
  try {
    res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection and try again.");
  }
  if (res.ok) return;

  if (res.status === 429) throw new Error('Too many messages in a short time. Please wait a minute and try again.');

  // Formspree explains validation problems as { errors: [{ message }] }
  const body = await res.json().catch(() => null);
  const detail = body?.errors?.map((e) => e.message).join(' ');
  throw new Error(detail || "Something went wrong on my side, and your message didn't send.");
}

export default function Contact() {
  // idle | submitting | success | mailto (no form service set up: email app opened) | error
  const [status, setStatus] = useState('idle');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = new FormData(form);

    // Honeypot: people never see this field, bots fill it. Pretend it worked, send nothing.
    if (fields.get('_gotcha')) {
      setStatus('success');
      return;
    }

    const name = String(fields.get('name')).trim();
    const email = String(fields.get('email')).trim();
    const project = String(fields.get('project'));
    const message = String(fields.get('message')).trim();
    const subject = `Portfolio message: ${project} (${name})`;

    // No form service configured (e.g. local dev): hand the message to the visitor's email app.
    if (!FORM_ENDPOINT) {
      const body = `${message}\n\n- ${name}\n${email}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.reset();
      setStatus('mailto');
      return;
    }

    setStatus('submitting');
    setErrorText('');
    try {
      await sendToFormspree({ name, email, project, message, _subject: subject });
      form.reset();
      setStatus('success');
    } catch (err) {
      setErrorText(err.message);
      setStatus('error');
    }
  };

  const done = status === 'success' || status === 'mailto';

  return (
    <section id="contact" className="py-32 px-4 border-t-2 border-ink border-dashed bg-paper overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex flex-col justify-center"
        >
          <WordReveal
            text="Have a good problem? Let's solve it together."
            className="font-display text-3xl md:text-5xl text-ink leading-tight mb-6 text-balance"
          />
          <p className="font-sans text-base md:text-lg text-ink/80 mb-10 md:mb-12 max-w-md">
            Whether you have a project in mind, an interesting opportunity, or just want to exchange ideas, I'd love to hear from you.
          </p>

          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm font-bold text-ink/50 uppercase mb-1">Email</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block py-2 font-sans text-xl md:text-2xl break-words font-bold text-ink hover:text-accent-pink transition-colors">
                {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <p className="font-mono text-sm font-bold text-ink/50 uppercase mb-3">Socials</p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/teang-arpireak-569962289" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-full bg-accent-yellow border-2 border-ink flex items-center justify-center hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#2b2a29]">
                  <LinkedinLogo size={24} weight="bold" />
                </a>
                <a href="https://www.behance.net/teangarpiraek" target="_blank" rel="noreferrer" aria-label="Behance" className="w-12 h-12 rounded-full bg-accent-pink border-2 border-ink flex items-center justify-center hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#2b2a29]">
                  <BehanceLogo size={24} weight="bold" />
                </a>
                <a href="https://www.instagram.com/p.reak_10/" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full bg-accent-green border-2 border-ink flex items-center justify-center hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#2b2a29]">
                  <InstagramLogo size={24} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form (Sticky Note Style) */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          className="relative"
        >
          {/* Tape */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/60 backdrop-blur-sm shadow-sm rotate-2 z-10 border border-black/5" />

          <div className="bg-accent-yellow/30 border-2 border-ink shadow-[12px_12px_0_0_#2b2a29] p-8 md:p-12 torn-edge relative transition-transform duration-300 hover:rotate-0">
            {done ? (
              <motion.div
                role="status"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-accent-green rounded-full flex items-center justify-center border-2 border-ink mb-6">
                  <PaperPlaneRight size={32} className="text-ink" weight="bold" />
                </div>
                {status === 'success' ? (
                  <>
                    <h3 className="font-display text-2xl mb-4">Message Sent!</h3>
                    <p className="font-handwriting text-xl">I'll get back to you soon.</p>
                  </>
                ) : (
                  <>
                    <h3 className="font-display text-2xl mb-4">Almost there!</h3>
                    <p className="font-handwriting text-xl">Your email app should open with the message ready. Press Send there.</p>
                  </>
                )}
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 font-mono font-bold uppercase underline hover:text-accent-pink"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot: hidden from people and screen readers, bots fill it in */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="contact-name" className={labelClass}>Name</label>
                  <input id="contact-name" required name="name" type="text" maxLength={LIMITS.name} autoComplete="name" className={fieldClass} placeholder="John Doe" />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>Email</label>
                  <input id="contact-email" required name="email" type="email" maxLength={LIMITS.email} autoComplete="email" className={fieldClass} placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="contact-project" className={labelClass}>Project Type</label>
                  <select id="contact-project" name="project" className={`${fieldClass} appearance-none cursor-pointer`}>
                    <option>UI/UX Design</option>
                    <option>Web Development</option>
                    <option>Brand Identity</option>
                    <option>Other / Just saying hi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>Message</label>
                  <textarea id="contact-message" required name="message" rows={4} maxLength={LIMITS.message} className={`${fieldClass} resize-none`} placeholder="Tell me about your project..." />
                </div>

                {status === 'error' && (
                  <p role="alert" className="font-mono text-sm font-bold bg-accent-pink/40 border-2 border-ink px-3 py-2">
                    {errorText} You can also email me at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-ink text-white font-mono font-bold uppercase py-4 border-2 border-ink hover:bg-white hover:text-ink transition-colors flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <PaperPlaneRight size={18} className="group-hover:translate-x-1 transition-transform" weight="bold" />
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>

      <div className="pb-8" />
    </section>
  );
}
