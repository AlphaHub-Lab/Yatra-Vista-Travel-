import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';

export default function FaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-[var(--bg-main)] text-[var(--text-primary)] relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase nature-gradient-text block mb-2">
            Voyager Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Frequently Addressed Inquiries
          </h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Everything you need to know about our VIP permits, alpine medical standards, and bespoke reservations.
          </p>
        </div>

        {/* Accordion List with Double-Bezel Architecture */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="double-bezel transition-colors"
              >
                <div className="double-bezel-inner overflow-hidden">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                      {faq.q}
                    </span>
                    <div
                      style={
                        isOpen
                          ? {
                              color: 'var(--nature-primary)',
                              backgroundColor: 'var(--nature-soft)',
                              borderColor: 'var(--nature-border)'
                            }
                          : {}
                      }
                      className={`w-8 h-8 rounded-full bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] shrink-0 transition-all duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-4 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 double-bezel">
          <div className="double-bezel-inner p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="text-left">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Need personal assistance with your route?</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Our Senior Travel Curators are on-call 24 hours a day for priority phone consultations.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919918001088"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full text-xs font-semibold secondary-btn flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+919918001088"
                className="px-5 py-2.5 rounded-full text-xs font-bold primary-btn flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Speak With Curator</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
