import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Loader2,
  Send,
  User,
  AtSign,
  MessageCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  SOCIAL_LINKS,
  GOOGLE_SHEET_SCRIPT_URL,
} from '../constants';
import { SectionID } from '../types';
import FormField from './FormField';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

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
      console.warn(
        'Google Sheet script URL is not configured. Simulating success for demo purposes.'
      );
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, 1000);
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

  const contactItems = [
    {
      icon: Mail,
      text: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      icon: Phone,
      text: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`,
    },
    {
      icon: MapPin,
      text: PERSONAL_INFO.location,
      href: googleMapsUrl,
      target: '_blank',
    },
  ];

  const socialIcons = [
    {
      icon: Linkedin,
      href: SOCIAL_LINKS.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Github,
      href: SOCIAL_LINKS.github,
      label: 'GitHub',
    },
    {
      icon: Instagram,
      href: SOCIAL_LINKS.instagram,
      label: 'Instagram',
    },
    {
      icon: MessageSquare,
      href: SOCIAL_LINKS.whatsapp,
      label: 'WhatsApp',
    },
  ];

  return (
    <motion.section
      id={SectionID.CONTACT}
      className='py-16 md:py-24'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1 }}>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight'>
            Get In Touch
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto'>
            Have a project in mind or just want to say hi? I'd love to hear from
            you.
          </p>
          <div className='w-24 h-1 bg-emerald-500/50 dark:bg-emerald-400/50 mx-auto mt-6 rounded-full'></div>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 lg:grid-cols-3 gap-8'
          variants={containerVariants}>
          {/* Left Column */}
          <motion.div
            className='lg:col-span-1 flex flex-col gap-8'
            variants={itemVariants}>
            {/* Contact Info Card */}
            <div className='bg-white/50 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/50 h-full'>
              <h3 className='font-bold text-xl text-gray-800 dark:text-white mb-5'>
                Contact Details
              </h3>
              <ul className='space-y-4'>
                {contactItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      target={item.target || '_self'}
                      rel='noopener noreferrer'
                      className='flex items-center gap-4 group transition-colors'>
                      <div className='flex-shrink-0 w-12 h-12 bg-emerald-100/60 dark:bg-slate-700/80 rounded-lg flex items-center justify-center group-hover:bg-emerald-200/80 dark:group-hover:bg-slate-700 transition-colors'>
                        <item.icon className='w-6 h-6 text-emerald-600 dark:text-emerald-400' />
                      </div>
                      <span className='text-gray-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors text-sm font-medium'>
                        {item.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Socials Card */}
            <div className='bg-white/50 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/50'>
              <h3 className='font-bold text-xl text-gray-800 dark:text-white mb-5'>
                Follow Me
              </h3>
              <div className='flex items-center gap-4'>
                {socialIcons.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className='w-12 h-12 flex items-center justify-center bg-emerald-100/60 dark:bg-slate-700/80 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-emerald-200/80 dark:hover:bg-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300'
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}>
                    <social.icon className='h-6 w-6' />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            className='lg:col-span-2 bg-white/50 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-slate-200/80 dark:border-slate-700/50'
            variants={itemVariants}>
            <h3 className='font-bold text-2xl text-gray-800 dark:text-white mb-6'>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <FormField
                id='name'
                name='name'
                placeholder='Your Name'
                value={formData.name}
                onChange={handleInputChange}
                IconComponent={User}
              />
              <FormField
                id='email'
                name='email'
                type='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleInputChange}
                IconComponent={AtSign}
              />
              <FormField
                id='message'
                name='message'
                placeholder='Your Message'
                value={formData.message}
                onChange={handleInputChange}
                IconComponent={MessageCircle}
                as='textarea'
              />
              <div>
                <motion.button
                  type='submit'
                  disabled={status === 'submitting'}
                  className='w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
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
                </motion.button>
              </div>
            </form>
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='mt-4 flex items-center justify-center gap-2 text-green-600 dark:text-green-400'>
                  <CheckCircle className='h-5 w-5' /> Message sent successfully!
                  Thank you.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='mt-4 flex items-center justify-center gap-2 text-red-600 dark:text-red-400'>
                  <XCircle className='h-5 w-5' /> Something went wrong. Please
                  try again later.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
