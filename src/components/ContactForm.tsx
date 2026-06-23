import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Info, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Simulate submission
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-12 bg-neutral-950 text-white min-h-[70vh]" dir="rtl" id="contact-panel">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* TOP INTRO: ABOUT STORY (من نحن) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 border-b border-neutral-900 pb-16">
          <div className="lg:col-span-7 space-y-5 text-right">
            <div className="inline-flex items-center gap-1 bg-blue-650/10 text-blue-400 border border-blue-500/15 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles size={12} />
              <span>قصتنا وخبرتنا التقنية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              تصفح الحواسيب بمفهوم جديد وثقة مطلقة مع <br />
              <span className="text-blue-500 font-sans font-extrabold">Micro Tech Berhoum</span>
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              بدأت رحلة <b>Micro Tech</b> من بلدية برهوم بولاية المسيلة بهدف أساسي: تذليل العقبات أمام الطلاب، المبرمجين، والمهندسين الجزائريين للحصول على حواسيب احترافية أصلية ممتازة مستوردة مباشرة من الشركات الأوروبية الكبرى بأسعار معقولة تنافسية.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              نحن نلتزم بالشفافية المطلقة؛ لا نقوم بمغالطة العميل أو بيع أجهزة معطلة. كل لابتوب أو شاشة نعرضها تخضع لسلسلة فحوصات فيزيائية وبرمجية تتعدى 15 اختباراً (صحة الهاردسك، سعة البطارية الحقيقية، ضغط المعالج، وسلامة الشاشة من البيكسلات الميتة). لهذا يثق فينا المئات من ولايات الوطن.
            </p>

            {/* Core Values badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-850 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                <span className="text-xs font-bold">ضمان حقيقي</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-850 flex items-center gap-2">
                <Heart size={18} className="text-red-500 shrink-0" />
                <span className="text-xs font-bold font-sans">الأمانة والمصداقية</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-850 flex items-center gap-2 col-span-2 sm:col-span-1">
                <Info size={18} className="text-blue-550 text-blue-500 shrink-0" />
                <span className="text-xs font-bold">استشارة ومرافقة</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            {/* Success background graphics */}
            <div className="absolute inset-0 bg-blue-600/5 rounded-3xl blur-2xl group-hover:bg-blue-600/10 transition-all" />
            
            <div className="relative p-6 rounded-3xl border border-neutral-800 bg-neutral-900/40 text-right space-y-4">
              <p className="text-xs text-neutral-400 font-bold block">موقع المحل الفعلي:</p>
              <h4 className="font-extrabold text-neutral-100 flex items-center gap-1.5 text-sm sm:text-base">
                <MapPin size={18} className="text-red-500" />
                <span>Rue Lycée Houari Boumediene, Berhoum, Algeria</span>
              </h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                محلنا يتواجد في بلدية برهوم (ولاية المسيلة) على مستوى نهج ثانوية هواري بومدين. نرحب بزيارتكم الكريمة للفحص والمعاينة والاستئناس بآرائنا التقنية!
              </p>

              {/* Algerian map representation vector mock */}
              <div className="w-full aspect-video rounded-2xl bg-neutral-950 border border-neutral-850 overflow-hidden relative p-3 flex flex-col justify-end">
                <div className="absolute inset-x-0 bottom-0 top-0 opacity-40 [background-size:12px_12px] [background-image:linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)]" />
                
                {/* SVG mock map pins */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="absolute w-8 h-8 rounded-full bg-blue-500/20 animate-ping" />
                  <MapPin size={24} className="text-red-500 relative z-10 drop-shadow-md animate-bounce" />
                  <span className="text-[10px] font-bold bg-neutral-900 border border-neutral-800 py-0.5 px-2 rounded-full mt-1.5 z-10">مقر Micro Tech</span>
                </div>

                <div className="text-[9px] font-mono text-neutral-500 relative z-10">ALGERIA MAP SYSTEM v2.6</div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: CONTACT CARDS & FORM (اتصل بنا) */}
        <h3 className="text-xl font-extrabold text-white mb-8 border-r-4 border-blue-500 pr-3">اتصل بنا واطلب عتادك</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Call card */}
            <a 
              href="tel:213791764469"
              className="p-5 rounded-2xl border border-neutral-850 bg-neutral-900/30 hover:bg-neutral-900 hover:border-blue-500/40 transition-all flex items-start gap-4 text-right"
            >
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-blue-500">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-bold">هاتف المبيعات المباشر</span>
                <span className="text-base sm:text-lg font-black font-sans text-neutral-100 mt-0.5 block tracking-wider">0791 76 44 69</span>
                <span className="text-[11px] text-neutral-400 font-sans block mt-1">متوفر طيلة أيام الأسبوع من 9:00 صباحاً إلى 20:58 مساءً</span>
              </div>
            </a>

            {/* Email card */}
            <a 
              href="mailto:halimrezig2021@gmail.com"
              className="p-5 rounded-2xl border border-neutral-850 bg-neutral-900/30 hover:bg-neutral-900 hover:border-blue-500/40 transition-all flex items-start gap-4 text-right"
            >
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-blue-500">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-bold font-sans">البريد الإلكتروني التجاري</span>
                <span className="text-sm font-bold font-sans text-neutral-100 mt-1 block">halimrezig2021@gmail.com</span>
                <span className="text-[11px] text-neutral-450 text-neutral-400 block mt-1">أرسل لنا طلبيات الشركات أو عروض الشراكة وقطع الغيار الوفيرة</span>
              </div>
            </a>

            {/* Social card */}
            <div className="p-5 rounded-2xl border border-neutral-850 bg-neutral-900/30 flex items-start gap-4 text-right">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-blue-500">
                <Facebook size={20} />
              </div>
              <div className="flex-grow">
                <span className="text-[10px] text-neutral-400 block font-bold">صفحتنا الرسمية على فيسبوك</span>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal">تابع عروض الفلاش اليومية والمنشورات التعليمية لمعرفة جودة الحواسيب المعروضة.</p>
                <a 
                  href="https://facebook.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-500 font-bold hover:underline mt-2"
                >
                  <span>زيارة صفحة فيسبوك</span>
                  <Send size={12} className="rotate-180" />
                </a>
              </div>
            </div>

          </div>

          {/* Electronic Contact Form */}
          <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-850 p-6 rounded-3xl" id="contact-form-area">
            <h4 className="font-extrabold text-neutral-100 mb-2">أرسل لنا استفسارك أو طلبك المالي</h4>
            <p className="text-xs text-neutral-400 mb-6 font-sans">إذا كنت تبحث عن لابتوب معين بخصائص محددة غير متوفرة بالمعرض، يكفي إرساله وسنبحث عنه لأجلك في أوروبا.</p>

            {submitted && (
              <div className="p-4 mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-xs">
                <span className="font-bold block">✓ تم تسجيل الرسالة بنجاح وبسرعة!</span>
                <span className="text-[10px] block mt-1 text-neutral-300">سيتواصل معك فريق مبيعات Micro Tech هاتفياً أو بريدياً في أقرب وقت.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-450 text-neutral-400 block mb-1.5">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: صالح بلحاج"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-right p-3 bg-neutral-950 border border-neutral-850 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-neutral-200"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1.5">رقم الهاتف النشط (يرجى التدقيق)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: 0791764469"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-right p-3 bg-neutral-950 border border-neutral-850 rounded-xl focus:outline-none focus:border-blue-500 font-sans text-neutral-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5">البريد الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  placeholder="مثال: customer@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-right p-3 bg-neutral-950 border border-neutral-850 rounded-xl focus:outline-none focus:border-blue-500 font-sans text-neutral-200"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1.5">الرسالة أو العتاد المطلوب تفاصيله</label>
                <textarea
                  required
                  rows={4}
                  placeholder="مثال: أرجو البحث لي عن لابتوب Lenovo Thinkpad T14s بشاشة ويز كيبورد معالج i7 رامات 32 جيجابايت..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-right p-3 bg-neutral-950 border border-neutral-850 rounded-xl focus:outline-none focus:border-blue-500 font-sans text-neutral-200"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
              >
                <Send size={14} />
                <span>إرسال الرسالة لفني المحل</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
