import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';

export default function FaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 bg-[var(--bg-main)] text-[var(--text-primary)] relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase nature-gradient-text block mb-2">
            Voyager Knowledge Base
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight text-balance">
            Frequently Addressed Inquiries
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            Everything you need to know about our VIP permits, alpine medical standards, and bespoke reservations.
          </p>
        </div>

        {/* Accordion List with Double-Bezel Architecture */}
        <div className="space-y-3 sm:space-y-4">
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
                    className="w-full p-4 sm:p-5 lg:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm md:text-base font-bold text-[var(--text-primary)] pr-2">
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
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] shrink-0 transition-all duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3.5 sm:pt-4 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-8 sm:mt-12 double-bezel">
          <div className="double-bezel-inner p-4 sm:p-6 lg:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5">
            <div className="text-left">
              <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">Need personal assistance with your route?</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Our Senior Travel Curators are on-call 24 hours a day for priority phone consultations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
              <a
                href="https://wa.me/919918001088"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full text-xs font-semibold secondary-btn flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+919918001088"
                className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold primary-btn flex items-center justify-center gap-2 text-center"
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
