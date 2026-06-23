import React, { useState } from 'react';
import { MessageSquare, X, Send, AlertCircle } from 'lucide-react';

export const WhatsAppChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('السلام عليكم، أريد الاستفسار عن كفاءة لابتوب وسعر التوصيل للمحل...');

  const handleOpen = () => setIsOpen(!isOpen);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const phoneNumber = "213791764469"; // Owner number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-end" dir="rtl" id="whatsapp-widget-bubble">
      
      {/* Expanded Support box */}
      {isOpen && (
        <div className="w-72 sm:w-80 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden mb-3 animate-slideUp">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-xs text-emerald-400">
                  M.T
                </div>
                {/* Active Indicator dots */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-600"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm">دعم فني Micro Tech</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span>● نشط الآن لمساعدتك</span>
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-emerald-700 text-emerald-100"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat text panel */}
          <div className="p-4 max-h-48 overflow-y-auto space-y-3 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:12px_12px] bg-neutral-950/40 text-xs">
            {/* Owner response message bubble */}
            <div className="p-3 rounded-lg rounded-tr-none bg-neutral-900 border border-neutral-850 text-neutral-300 leading-relaxed font-sans max-w-[90%] float-right">
              👋 أهلاً بك في Micro Tech! <br />
              معك حليم، كيف يمكنني مساعدتك في اختيار الحاسوب أو تلبية طلبك اليوم؟
            </div>
            <div className="clear-both" />
          </div>

          {/* Form and submission */}
          <form onSubmit={handleSend} className="p-3 border-t border-neutral-850 bg-neutral-900/60 text-xs space-y-2">
            <textarea
              required
              rows={2}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full text-right p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 text-[11px] font-sans"
            />
            <button
               type="submit"
               className="w-full flex items-center justify-center gap-1.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors"
            >
              <Send size={12} className="rotate-180" />
              <span>بدء المحادثة في واتساب</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating support bubble button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/20 active:scale-95 transition-all text-sm font-bold border border-emerald-500/20"
        title="تواصل مباشر للاستفسارات"
      >
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.894 0c3.18 0 6.171 1.242 8.413 3.496C22.548 5.75 23.8 8.749 23.8 11.933c-.004 6.57-5.328 11.894-11.895 11.894-1.996-.001-3.957-.502-5.713-1.455L0 24zm6.59-4.846c1.66.983 3.308 1.494 5.302 1.495 5.564 0 10.093-4.524 10.097-10.08-.002-2.69-1.047-5.223-2.944-7.123C17.15 1.545 14.62 1.5 11.898 1.5c-5.568 0-10.1 4.525-10.104 10.081-.001 2.003.528 3.951 1.53 5.679L2.247 21.6l4.4-1.446zm12.515-5.529c-.324-.162-1.916-.946-2.207-1.052-.293-.105-.507-.158-.718.162-.213.318-.82.1.318-1.004.1-1.03-.213.264-.315-.105-.105-.327-.162-1.921-.937-2.61-.606-.541-1.011-.893-1.011-.893s-.404.352-.607.893c-.623.689-1.503.689-1.503.689s.345.347.561.424c.732.261.345 1.503.345 1.503s.069 2.062.906 3.033c.839.972 1.83 1.529 3.013 1.81.93.22 1.854.128 2.529.028.752-.113 2.31-.944 2.633-1.856.324-.913.324-1.698.228-1.856-.097-.158-.358-.264-.683-.426z"/>
        </svg>
        <span className="hidden sm:inline">دردشة تقنية مباشرة</span>
      </button>

    </div>
  );
};
