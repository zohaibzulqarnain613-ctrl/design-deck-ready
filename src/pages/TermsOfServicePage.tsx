import React from 'react';
import { Link } from '@tanstack/react-router';
import { Shield, Mail, Scale, CreditCard, AlertCircle, FileText, ArrowLeft } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Use of Services',
      content: [
        'You agree to use our AI tools and automations responsibly and in compliance with all applicable laws.',
        'Misuse of our platform for spam, fraud, or illegal activity is strictly prohibited.'
      ]
    },
    {
      icon: Shield,
      title: 'Ownership',
      content: [
        'All software, AI models, and content developed by SamysAI remain our intellectual property.',
        'Clients receive limited rights to use deliverables as defined in project agreements.'
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment & Billing',
      content: [
        'All fees and payment terms are agreed upon before project initiation.',
        'Late payments may result in service suspension until resolved.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Limitation of Liability',
      content: [
        'SamysAI is not liable for indirect or incidental damages arising from the use or inability to use our services.'
      ]
    },
    {
      icon: Scale,
      title: 'Modifications',
      content: [
        'We may update these terms from time to time.',
        'Continued use of our services constitutes acceptance of any new terms.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Terms of Service
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>SamysAI</span>
            <span>•</span>
            <span>Effective Date: October 2025</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg text-gray-300 leading-relaxed">
            Welcome to <span className="text-white font-medium">SamysAI</span>. By accessing or using our services,
            you agree to these Terms of Service. Please read them carefully.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className="group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">
                      {index + 1}. {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-400 leading-relaxed">
                          <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Contact Section */}
          <div className="group">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">
                  6. Contact
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  For any questions about these terms:
                </p>
                <a
                  href="mailto:legal@samysai.com"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  legal@samysai.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
