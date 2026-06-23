import React, { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-neutral-950 text-white border-b border-neutral-900" id="faq-section" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Section title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-neutral-900 border border-neutral-850 text-blue-500 mb-4">
            <HelpCircle size={28} />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">الأسئلة الشائعة والاستفسارات التقنية</h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-sans">إليك الإجابات الوافية حول الشحن والضمان لـ 58 ولاية وفحص الأجهزة قبل الشراء</p>
        </div>

        {/* Accordions container */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-neutral-850 bg-neutral-900/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-neutral-100 hover:text-white transition-colors"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <span className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-850 text-neutral-400 shrink-0">
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-neutral-850/40 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans animate-slideDown">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
