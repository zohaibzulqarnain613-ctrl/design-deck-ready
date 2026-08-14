import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Github,
  ExternalLink,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ContactFooter: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    try {
      if (!supabase) {
        throw new Error('Contact form backend is not connected yet.');
      }
      const { error } = await supabase

        .from('visitors')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          message: formData.message
        });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      }, 5000);
    } catch (err) {
      setSubmitError('Failed to send message. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      console.log('Newsletter email submitted:', newsletterEmail);
      setNewsletterSubmitted(true);
      setNewsletterEmail('');

      setTimeout(() => {
        setNewsletterSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl mx-auto max-w-7xl overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 p-6"
          >
            <div className="inline-block rounded-3xl bg-white/10 border border-white/20 px-3 py-1 text-sm text-blue-300 font-medium mb-2">Contact</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight text-white drop-shadow-2xl">Let's Work Together</h2>
            <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Ready to start your next project? Get in touch with us to discuss how we can help bring your vision to life.
            </p>
            <div className="mt-8 space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Our Location</h3>
                  <p className="text-sm text-gray-300">Ontario, Canada</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Email Us</h3>
                  <a href="mailto:samy@samysai.info" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                    samy@samysai.info
                  </a>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Call Us</h3>
                  <a href="tel:+14378292544" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                    +1 (437) 829-2544
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="mt-8 flex space-x-3">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram", href: "https://www.instagram.com/samys.ai?igsh=bzVxcHdndzBmYTZ3" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "https://x.com/samys_ai?s=21" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "#" },
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook", href: "#" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <a
                    href={social.href}
                    {...(social.href !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
                    className="rounded-3xl border border-white/20 bg-white/10 p-2 text-gray-300 hover:text-white hover:border-blue-400/50 transition-colors backdrop-blur-sm"
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
            <p className="text-sm text-gray-300 mb-6">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-12 space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-400" />
                  </motion.div>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-white"
                  >
                    Message Sent Successfully!
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-center max-w-md"
                  >
                    Thank you for reaching out! We've received your message and will get back to you shortly.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium leading-none text-gray-300"
                  >
                    First name
                  </label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name" 
                    className="rounded-3xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium leading-none text-gray-300"
                  >
                    Last name
                  </label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name" 
                    className="rounded-3xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-gray-300"
                >
                  Email
                </label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email" 
                  className="rounded-3xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none text-gray-300"
                >
                  Message
                </label>
                <Textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message" 
                  className="min-h-[120px] rounded-3xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                />
              </div>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-3xl bg-red-500/20 border border-red-500/50 text-red-400 text-sm"
                >
                  {submitError}
                </motion.div>
              )}
              <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold h-12 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>

                  {/* Book Appointment Button */}
                  <div className="flex justify-center pt-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <a
                        href="https://calendly.com/samysai/clients"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-500 ease-in-out overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center space-x-2">
                          <span>📅</span>
                          <span>Book Consultation</span>
                          <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg scale-110"></div>
                        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                      </a>
                    </motion.div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container grid gap-12 px-4 py-16 md:px-6 lg:grid-cols-4 mx-auto max-w-7xl"
        >
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <span className="font-bold text-xl text-white">SamysAI</span>
            </Link>
            <p className="text-sm text-gray-300">
              AI automation that scales your business with intelligent solutions.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram", href: "https://www.instagram.com/samys.ai?igsh=bzVxcHdndzBmYTZ3" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "https://x.com/samys_ai?s=21" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "#" },
                { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "#" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <a
                    href={social.href}
                    {...(social.href !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h3 className="text-lg font-medium text-white">Company</h3>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('services');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </a>
                <Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('testimonials');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Testimonials
                </a>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Services</h3>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link to="/services/ai-phone-callers" className="text-gray-300 hover:text-white transition-colors">
                  AI Phone Callers
                </Link>
                <Link to="/services/ai-chatbots" className="text-gray-300 hover:text-white transition-colors">
                  AI Chatbots
                </Link>
                <Link to="/services/web-development" className="text-gray-300 hover:text-white transition-colors">
                  Web Development
                </Link>
                <Link to="/services/content-creation" className="text-gray-300 hover:text-white transition-colors">
                  Content Creation
                </Link>
                <Link to="/services/cold-email-dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Cold Email Dashboards
                </Link>
              </nav>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h3 className="text-lg font-medium text-white">Resources</h3>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Guides & Tutorials
                </Link>
                <Link to="/faqs" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Legal</h3>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Subscribe to our newsletter</h3>
            <p className="text-sm text-gray-300">
              Stay updated with our latest AI automation tips and company news.
            </p>
            {newsletterSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 p-4 rounded-3xl bg-green-500/20 border border-green-500/50 text-green-400"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Check your email for confirmation!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-3">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="max-w-lg flex-1 rounded-3xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default ContactFooter;