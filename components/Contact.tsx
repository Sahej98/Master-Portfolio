import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  MessageSquare,
  Loader2,
  Send,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  SOCIAL_LINKS,
  GOOGLE_SHEET_SCRIPT_URL,
} from '../constants';
import { SectionID } from '../types';

const Contact = () => {
  const locationQuery = encodeURIComponent(PERSONAL_INFO.location);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    if (
      !GOOGLE_SHEET_SCRIPT_URL ||
      GOOGLE_SHEET_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
    ) {
      console.error(
        'Google Sheet script URL is not configured. Form submission is disabled.'
      );
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('message', formData.message);
    formPayload.append('timestamp', new Date().toISOString());

    try {
      const response = await fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: 'POST',
        body: formPayload,
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Form Submission Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      id={SectionID.CONTACT}
      className='py-20 md:py-32 relative'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='bg-white/50 dark:bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className='flex flex-col gap-10'>
              <div>
                <h3 className='text-3xl font-bold text-dark dark:text-white mb-6'>
                  Contact Information
                </h3>
                <div className='flex flex-col gap-5'>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className='text-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-4 group'>
                    <Mail className='h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0' />{' '}
                    <span>{PERSONAL_INFO.email}</span>
                  </a>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className='text-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-4 group'>
                    <Phone className='h-6 w-6 text-emerald-400 flex-shrink-0' />{' '}
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                  <a
                    href={googleMapsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-4 group'>
                    <MapPin className='h-6 w-6 text-emerald-400 flex-shrink-0' />{' '}
                    <span>{PERSONAL_INFO.location}</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className='text-3xl font-bold text-dark dark:text-white mb-6'>
                  Find Me On
                </h3>
                <div className='flex items-center gap-6'>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn'
                    className='text-slate-600 dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors'>
                    <motion.div whileHover={{ scale: 1.2, y: -3 }}>
                      <Linkedin className='h-7 w-7' />
                    </motion.div>
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='GitHub'
                    className='text-slate-600 dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors'>
                    <motion.div whileHover={{ scale: 1.2, y: -3 }}>
                      <Github className='h-7 w-7' />
                    </motion.div>
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Instagram'
                    className='text-slate-600 dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors'>
                    <motion.div whileHover={{ scale: 1.2, y: -3 }}>
                      <Instagram className='h-7 w-7' />
                    </motion.div>
                  </a>
                  <a
                    href={SOCIAL_LINKS.contact}
                    aria-label='Message'
                    className='text-slate-600 dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors'>
                    <motion.div whileHover={{ scale: 1.2, y: -3 }}>
                      <MessageSquare className='h-7 w-7' />
                    </motion.div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}>
              <h3 className='text-3xl font-bold text-dark dark:text-white mb-8'>
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className='space-y-8'>
                <div className='relative pt-4'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className='peer w-full px-1 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors text-dark dark:text-white'
                    placeholder=' '
                  />
                  <label
                    htmlFor='name'
                    className='absolute left-1 -top-3 text-slate-600 dark:text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 dark:peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400'>
                    Full Name
                  </label>
                </div>
                <div className='relative pt-4'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className='peer w-full px-1 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors text-dark dark:text-white'
                    placeholder=' '
                  />
                  <label
                    htmlFor='email'
                    className='absolute left-1 -top-3 text-slate-600 dark:text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 dark:peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400'>
                    Email Address
                  </label>
                </div>
                <div className='relative pt-4'>
                  <textarea
                    name='message'
                    id='message'
                    rows={2}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className='peer w-full px-1 bg-transparent border-b-2 border-slate-600 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 transition-colors text-dark dark:text-white resize-none'
                    placeholder=' '></textarea>
                  <label
                    htmlFor='message'
                    className='absolute left-1 -top-3 text-slate-600 dark:text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 dark:peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400'>
                    Message
                  </label>
                </div>
                <div>
                  <button
                    type='submit'
                    disabled={status === 'submitting'}
                    className='w-full inline-flex items-center justify-center px-6 py-3 text-base font-bold text-slate-900 bg-emerald-600 dark:bg-emerald-400 rounded-md hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/40 disabled:bg-emerald-400/50 disabled:cursor-not-allowed'>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className='mr-2 h-5 w-5' />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
              {status === 'success' && (
                <p className='mt-4 text-center text-green-600 dark:text-green-400'>
                  Message sent successfully! Thank you.
                </p>
              )}
              {status === 'error' && (
                <p className='mt-4 text-center text-red-600 dark:text-red-400'>
                  Something went wrong. Please try again later.
                </p>
              )}
              {GOOGLE_SHEET_SCRIPT_URL ===
                'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' && (
                <div className='mt-6 text-center text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-700/10 dark:bg-yellow-500/10 p-3 rounded-lg border border-yellow-700/20 dark:border-yellow-500/20'>
                  <p>
                    <strong>Developer Note:</strong> Contact form is not
                    configured. Please add your Google Apps Script URL in
                    `constants.tsx` to enable form submissions.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
