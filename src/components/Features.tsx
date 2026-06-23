import React from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  Truck, 
  Layers, 
  Wrench, 
  SearchCheck, 
  HelpCircle 
} from 'lucide-react';

export const Features: React.FC = () => {
  const list = [
    {
      title: "أجهزة أصلية ومجربة",
      description: "جميع الحواسيب مستوردة مباشرة من أوروبا أصلية وغير مجددة، تخضع لاختبارات أداء شاقة.",
      icon: <ShieldCheck size={26} className="text-blue-500" />
    },
    {
      title: "ضمان حقيقي وموثق",
      description: "نقدم شهادة ضمان رسمية وموثقة من المحل من 3 إلى 6 أشهر على الأجهزة وقطع الغيار.",
      icon: <Layers size={26} className="text-emerald-550 text-emerald-500" />
    },
    {
      title: "شحن لـ 58 ولاية",
      description: "توصيل سريع لباب بيتك أو لمكتب الشحن مع إمكانية فحص الجهاز قبل تسليم المال.",
      icon: <Truck size={26} className="text-blue-500" />
    },
    {
      title: "أسعار تنافسية ومدروسة",
      description: "نضمن لك الحصول على أفضل قيمة عتادية في السوق الجزائري مقارنة بالنظافة والضمان.",
      icon: <DollarSign size={26} className="text-emerald-500" />
    },
    {
      title: "فحص كامل قبل التسليم",
      description: "يتم تشغيل وفحص شاشة الجهاز، حالة البطارية، لوحة المفاتيح والحرارة قبل إرساله لك.",
      icon: <SearchCheck size={26} className="text-blue-500" />
    },
    {
      title: "دعم واستشارة مجانية",
      description: "مهندسونا مستعدون دائماً لتوجيهك واختيار الحاسوب المثالي لتخصصك وميزانيتك.",
      icon: <HelpCircle size={26} className="text-neutral-400" />
    }
  ];

  return (
    <section className="py-16 bg-neutral-950 text-white border-b border-neutral-900" id="features-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center" dir="rtl">
        
        {/* Section Title */}
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            لماذا يثق العملاء في <span className="text-blue-500 font-sans font-black">Micro Tech</span>؟
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            نحن لا نبيع الحواسيب فقط، بل نقدم تجربة متكاملة تتسم بالشفافية المطلقة والضمان الفعلي ومرافقتك التقنية.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((feat, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-850 hover:border-blue-500/40 hover:bg-neutral-900 transition-all text-right group flex flex-col justify-start items-start gap-4"
              id={`feature-card-${idx}`}
            >
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-blue-500 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
