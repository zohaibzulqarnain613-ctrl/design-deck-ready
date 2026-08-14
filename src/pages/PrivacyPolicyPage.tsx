import React from 'react';
import { Link } from '@tanstack/react-router';
import { Shield, Mail, Lock, Eye, FileText, User, ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'Contact details (name, email, phone number)',
        'Business information (company name, role, and industry)',
        'Website usage data (cookies, analytics, and IP address)',
        'Data you provide when booking calls or submitting forms'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Improve our AI services and website experience',
        'Communicate updates, offers, or support',
        'Analyze performance to enhance automation workflows',
        'Maintain security and prevent fraud'
      ]
    },
    {
      icon: Lock,
      title: 'Data Sharing',
      content: [
        'We do not sell or trade your personal information.',
        'We may share data with trusted partners or integrations (e.g., Calendly, CRM tools) only to provide the requested service securely.'
      ]
    },
    {
      icon: Shield,
      title: 'Data Retention',
      content: [
        'We retain your data only for as long as needed to fulfill the purpose it was collected for.',
        'You can request deletion at any time.'
      ]
    },
    {
      icon: User,
      title: 'Your Rights',
      content: [
        'Access, correct, or delete your personal data',
        'Withdraw consent for communication or data storage',
        'Request a copy of data we hold about you'
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Privacy Policy
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>SamysAI</span>
            <span>•</span>
            <span>Last Updated: October 2025</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg text-gray-300 leading-relaxed">
            At <span className="text-white font-medium">SamysAI</span>, your privacy is our priority.
            This Privacy Policy explains how we collect, use, and protect your personal information when
            you visit our website, interact with our tools, or use our AI-powered services.
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
                  6. Contact Us
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy, contact us at:
                </p>
                <a
                  href="mailto:support@samysai.com"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  support@samysai.com
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

export default PrivacyPolicyPage;
