import { Product, Review } from './types';

export const WILAYAS_ALGERIA = [
  "Adrar - 01", "Chlef - 02", "Laghouat - 03", "Oum El Bouaghi - 04", "Batna - 05",
  "Béjaïa - 06", "Biskra - 07", "Béchar - 08", "Blida - 09", "Bouira - 10",
  "Tamanrasset - 11", "Tébessa - 12", "Tlemcen - 13", "Tiaret - 14", "Tizi Ouzou - 15",
  "Alger - 16", "Djelfa - 17", "Jijel - 18", "Sétif - 19", "Saïda - 20",
  "Skikda - 21", "Sidi Bel Abbès - 22", "Annabat - 23", "Guelma - 24", "Constantine - 25",
  "Médéa - 26", "Mostaganem - 27", "M'Sila - 28", "Mascara - 29", "Ouargla - 30",
  "Oran - 31", "El Bayadh - 32", "Illizi - 33", "Bordj Bou Arréridj - 34", "Boumerdès - 35",
  "El Tarf - 36", "Tindouf - 37", "Tissemsilt - 38", "El Oued - 39", "Khenchela - 40",
  "Souk Ahras - 41", "Tipaza - 42", "Mila - 43", "Aïn Defla - 44", "Naâma - 45",
  "Aïn Témouchent - 46", "Ghardaïa - 47", "Relizane - 48", "Timimoun - 49", "Bordj Badji Mokhtar - 50",
  "Ouled Djellal - 51", "Béni Abbès - 52", "In Salah - 53", "In Guezzam - 54", "Touggourt - 55",
  "Djanet - 56", "El M'Ghair - 57", "El Meniaa - 58"
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hp-elitebook-840-g8',
    name: 'HP EliteBook 840 G8',
    brand: 'HP',
    category: 'حواسيب محمولة',
    price: 89000,
    originalPrice: 99000,
    condition: 'used',
    batteryHealth: '94% ممتازة',
    cpu: 'Intel Core i5-1145G7 (11th Gen)',
    ram: '16 GB DDR4',
    storage: '512 GB NVMe SSD',
    gpu: 'Intel Iris Xe Graphics',
    screen: '14" FHD IPS Anti-Glare',
    description: 'لابتوب احترافي فائق النحافة من الفئة الفاخرة لشركة HP، مستورد من أوروبا بحالة ممتازة شبه جديد. مثالي للعمل والدراسة والبرمجة والتنقل.',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'المعالج', value: 'Intel Core i5-1145G7 يصل إلى 4.4 جيجاهرتز' },
      { label: 'الذاكرة العشوائية', value: '16 جيجابايت DDR4 قابلة للترقية' },
      { label: 'التخزين', value: '512 جيجابايت SSD NVMe فائق السرعة' },
      { label: 'كرت الشاشة', value: 'Intel Iris Xe Graphics' },
      { label: 'الشاشة', value: '14 بوصة دقة FHD IPS مضادة للانعكاس' },
      { label: 'البطارية', value: 'أصلية تدوم حتى 5-7 ساعات فحص كامل' },
      { label: 'المنافذ', value: '2x Thunderbolt 4 / USB-C, 2x USB-A, HDMI, Audio Jack' },
      { label: 'الوزن', value: '1.35 كجم - خفيف جداً' }
    ],
    countInStock: 5,
    rating: 4.8,
    reviewsCount: 12,
    isBestseller: true
  },
  {
    id: 'dell-latitude-5420',
    name: 'Dell Latitude 5420',
    brand: 'Dell',
    category: 'حواسيب محمولة',
    price: 79000,
    condition: 'used',
    batteryHealth: '91% ممتازة',
    cpu: 'Intel Core i5-1135G7 (11th Gen)',
    ram: '8 GB DDR4',
    storage: '256 GB NVMe SSD',
    gpu: 'Intel Iris Xe Graphics',
    screen: '14" FHD IPS Screen',
    description: 'لابتوب ألماني مستورد أصلي من عائلة Latitude المعروفة بالصلابة والاعتمادية والبطارية الطويلة. مناسب للشركات، الطلاب والبرمجة.',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'المعالج', value: 'Intel Core i5-1135G7 (4 Cores / 8 Threads)' },
      { label: 'الذاكرة العشوائية', value: '8 جيجابايت DDR4' },
      { label: 'التخزين', value: '256 جيجابايت NVMe SSD' },
      { label: 'كرت الشاشة', value: 'Intel Iris Xe' },
      { label: 'البطارية', value: 'فوق 90% ممتازة' },
      { label: 'نظام التشغيل', value: 'Windows 11 Pro أصلي ومفعل' }
    ],
    countInStock: 8,
    rating: 4.6,
    reviewsCount: 9,
    isNewArrival: true
  },
  {
    id: 'lenovo-thinkpad-t14-g2',
    name: 'Lenovo ThinkPad T14 Gen 2',
    brand: 'Lenovo',
    category: 'حواسيب محمولة',
    price: 98000,
    originalPrice: 110000,
    condition: 'used',
    batteryHealth: '96% ممتازة جداً',
    cpu: 'Intel Core i7-1165G7 (11th Gen)',
    ram: '16 GB DDR4',
    storage: '512 GB SSD NVMe',
    gpu: 'Intel Iris Xe Graphics',
    screen: '14" FHD IPS',
    description: 'الدبابة السوداء من لينوفو ThinkPad T14 الجيل الثاني بمعالج i7 القوي جداً وهيكل قوي مقاوم للظروف القاسية مع كيبورد رائع ومقاوم لانسكاب السوائل.',
    images: [
      'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'المعالج', value: 'Intel Core i7-1165G7' },
      { label: 'الذاكرة العشوائية', value: '16 جيجابايت DDR4' },
      { label: 'التخزين', value: '512 جيجابايت SSD NVMe' },
      { label: 'المميزات', value: 'كيبورد مضيء، بصمة إصبع، حماية الكاميرا' }
    ],
    countInStock: 4,
    rating: 4.9,
    reviewsCount: 15,
    isBestseller: true
  },
  {
    id: 'dell-xps-15-9510',
    name: 'Dell XPS 15 9510 Touch Laptop',
    brand: 'Dell',
    category: 'حواسيب محمولة',
    price: 215000,
    originalPrice: 235000,
    condition: 'used',
    batteryHealth: '89% حالة جيدة',
    cpu: 'Intel Core i7-11800H Octa-Core',
    ram: '16 GB DDR4 Dual Channel',
    storage: '1 TB NVMe SSD',
    gpu: 'Nvidia GeForce RTX 3050 Ti 4GB',
    screen: '15.6" OLED 3.5K Touchscreen',
    description: 'التحفة الفنية الغنية عن التعريف Dell XPS 15، شاشة مذهلة بدقة OLED تعمل باللمس وتصميم فاخر جداً من الألمنيوم وألياف الكربون، مخصص لمحترفي التصميم والمونتاج وصناع المحتوى والمهندسين.',
    images: [
      'https://images.unsplash.com/photo-1593642702821-c8da2696406e?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'المعالج', value: 'Intel Core i7-11800H (8 Cores, Up to 4.6GHz)' },
      { label: 'الذاكرة العشوائية', value: '16 جيجابايت DDR4 3200MHz' },
      { label: 'التخزين', value: '1 تيرابايت NVMe SSD فائق السرعة' },
      { label: 'كرت الشاشة', value: 'Nvidia Geforce RTX 3050 Ti (4GB GDDR6)' },
      { label: 'الشاشة', value: '15.6" OLED 3.5K (3456x2160) Touch InfiniteEdge' }
    ],
    countInStock: 2,
    rating: 5.0,
    reviewsCount: 7,
    isBestseller: true
  },
  {
    id: 'pc-gamer-rtx-3070',
    name: 'PC Desktop Gamer Power Core i7',
    brand: 'Micro Tech Build',
    category: 'حواسيب مكتبية',
    price: 245000,
    condition: 'new',
    batteryHealth: 'جديد (تيار متصل)',
    cpu: 'Intel Core i7-12700K',
    ram: '32 GB DDR5 5200Mhz',
    storage: '1 TB M.2 NVMe Gen4',
    gpu: 'Nvidia GeForce RTX 3070 8GB GDDR6',
    screen: 'بدون شاشة (علبة كيس فقط)',
    description: 'تجميعة ألعاب ومونتاج احترافية مجهزة ومجربة بالكامل بقطع جديدة مضمونة لأقصى أداء مع نظام تبريد مائي مغلق وإضاءة RGB مذهلة.',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'المعالج', value: 'Intel Core i7-12700K (12 Cores / 20 Threads)' },
      { label: 'المبرد', value: 'Water Cooling RGB 240mm' },
      { label: 'البورد', value: 'MSI PRO Z690-A WiFi' },
      { label: 'الرام', value: '32 جيجابايت DDR5' },
      { label: 'الكرت', value: 'GigaByte RTX 3070 Gaming OC 8GB' },
      { label: 'الباور', value: '750W 80+ Gold Fully Modular' }
    ],
    countInStock: 3,
    rating: 4.9,
    reviewsCount: 5,
    isNewArrival: true
  },
  {
    id: 'dell-ultrasharp-27',
    name: 'Dell UltraSharp 27 Monitor U2722D',
    brand: 'Dell',
    category: 'شاشات',
    price: 64000,
    condition: 'new',
    batteryHealth: 'جديد',
    cpu: 'N/A',
    ram: 'N/A',
    storage: 'N/A',
    gpu: 'N/A',
    screen: '27" 2K QHD IPS (60Hz)',
    description: 'شاشة ديل الاحترافية لعشاق التصوير وتعديل الألوان بنقاء لا يصدق وتغطية 100% sRGB و95% DCI-P3 مع حواف متناهية الصغر وتصميم مريح جداً للرقبة.',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'المقاس والنوع', value: '27 بوصة IPS لوحة احترافية بالألوان' },
      { label: 'الدقة', value: '2K QHD (2560 x 1440) في 60 هيرتز' },
      { label: 'زمن الاستجابة', value: '5ms' },
      { label: 'المنافذ', value: 'HDMI, DisplayPort, USB ports' }
    ],
    countInStock: 6,
    rating: 4.7,
    reviewsCount: 11
  },
  {
    id: 'rk-r87-keyboard',
    name: 'Royal Kludge RK87 Mechanical',
    brand: 'Royal Kludge',
    category: 'لوحات المفاتيح',
    price: 11500,
    originalPrice: 13500,
    condition: 'new',
    batteryHealth: 'جديد',
    cpu: 'N/A',
    ram: 'N/A',
    storage: 'N/A',
    gpu: 'N/A',
    description: 'لوحة مفاتيح ميكانيكية ذات الحجم العملي مع أزرار سويتش زرقاء أو حمراء مريحة جداً وصوت كليك مميز لكل ضغطة، مدعومة بإضاءة RGB رائعة.',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'النوع', value: 'ميكانيكي Mechanical' },
      { label: 'السويتشات', value: 'RK Red/Blue Linear & Tactile' },
      { label: 'لوحة الإضاءة', value: 'Full RGB Dynamic lighting' },
      { label: 'الاتصال', value: 'كابل USB-C قابل للفصل' }
    ],
    countInStock: 12,
    rating: 4.5,
    reviewsCount: 22
  },
  {
    id: 'logitech-g502-hero',
    name: 'Logitech G502 Hero Gaming Mouse',
    brand: 'Logitech',
    category: 'الفأرات',
    price: 9500,
    condition: 'new',
    batteryHealth: 'جديد',
    cpu: 'N/A',
    ram: 'N/A',
    storage: 'N/A',
    gpu: 'N/A',
    description: 'الفأرة الأكثر مبيعاً في العالم للاعبين المحترفين، بأقوى حساس هيرو بدقة تصل إلى 25600 DPI، مع أوزان قابلة للتعديل والتحكم الكامل.',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'الحساس', value: 'HERO 25K (100 - 25,600 DPI)' },
      { label: 'الأزرار', value: '11 زر قابل للبرمجة عبر البرمجيات' },
      { label: 'الوزن', value: 'نظام أوزان معدني إضافي (5 قطع بقوة 3.6 جرام)' }
    ],
    countInStock: 20,
    rating: 4.8,
    reviewsCount: 43,
    isBestseller: true
  },
  {
    id: 'corsair-vengeance-16',
    name: 'Corsair Vengeance PRO RGB 16GB',
    brand: 'Corsair',
    category: 'قطع الغيار',
    price: 13500,
    condition: 'new',
    batteryHealth: 'جديد',
    cpu: 'N/A',
    ram: '16 GB DDR4',
    storage: 'N/A',
    gpu: 'N/A',
    description: 'طقم رام قطعتين (2x8GB) بتردد 3200 ميجاهيرتز مصمم لإعطاء سرعة إضافية مع منظر رائع في تجميعتك بفضل شريط الضوء RGB المتفاعل.',
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'السعة', value: '16 جيجابايت (2 × 8 جيجابايت)' },
      { label: 'النوع', value: 'DDR4 SDRAM' },
      { label: 'السرعة الترددية', value: '3200 MHz' }
    ],
    countInStock: 15,
    rating: 4.7,
    reviewsCount: 18
  },
  {
    id: 'hyperx-cloud-ii',
    name: 'Saber HyperX Cloud II Red Headset',
    brand: 'HyperX',
    category: 'ملحقات الحاسوب',
    price: 16500,
    originalPrice: 18000,
    condition: 'new',
    batteryHealth: 'جديد',
    cpu: 'N/A',
    ram: 'N/A',
    storage: 'N/A',
    gpu: 'N/A',
    description: 'سماعة رأس سلكية للألعاب احترافية للغاية بجودة صوت مجسم محيطي خيالي 7.1 وميكروفون يعزل الضوضاء، مفضلة لمحبي ألعاب التصويب CS2, Valorant والمزيد.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'
    ],
    specs: [
      { label: 'نوع الصوت', value: 'صوت محيطي افتراضي 7.1 مجسم' },
      { label: 'وسائد الأذن', value: 'جلد فاخر ببطانة ميموري فوم ناعمة جداً' },
      { label: 'الميكروفون', value: 'قابل للفصل مع خاصية كتم الضوضاء' }
    ],
    countInStock: 10,
    rating: 4.9,
    reviewsCount: 37,
    isBestseller: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'hp-elitebook-840-g8',
    productName: 'HP EliteBook 840 G8',
    userName: 'سفيان بوالروايح (البليدة)',
    rating: 5,
    comment: 'جهاز رائع وكأنه لابتوب جديد تماماً، نظيف وخفيف وبطاريته ممتازة جداً دامت معي حوالي 6 ساعات عمل متواصل. تعامل المحل راقٍ جداً والشحن كان سريعاً في يومين وصلني إلى الولاية. أنصح بشدة.',
    date: '2026-06-15',
    isVerifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'lenovo-thinkpad-t14-g2',
    productName: 'Lenovo ThinkPad T14 Gen 2',
    userName: 'عبد الرزاق زروالي (قسنطينة)',
    rating: 5,
    comment: 'أفضل لابتوب للبرمجة استعملته. الدبابة لينوفو وصلتني مغلفة ومفحوصة فحص كامل مع فاتورة وضمان من المحل. الأسعار أرخص بكثير مما تجده في السوق المحلي.',
    date: '2026-06-10',
    isVerifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'dell-xps-15-9510',
    productName: 'Dell XPS 15 9510 Touch Laptop',
    userName: 'إيمان رحماني (الجزائر العاصمة)',
    rating: 5,
    comment: 'استخدم هذا الجهاز لتعديل الفيديوهات 4K والتصاميم الهندسية. الشاشة خيالية OLED اللمسية وسرعة معالجة الريندير ممتازة. شكراً Micro Tech على الأجهزة الأوروبية النظيفة.',
    date: '2026-06-20',
    isVerifiedPurchase: true
  }
];

export const FAQS = [
  {
    question: "هل الأجهزة المعروضة أصلية ومضمونة؟",
    answer: "نعم بصفة قطعية، جميع الأجهزة لدينا مستوردة مباشرة من أوروبا وهي أصلية 100٪. نقوم بعملية فحص فيزيائي وبرمجي شامل قبل عرض أي منتج، ونوفر شهادة ضمان موثقة من المحل من 3 إلى 6 أشهر على العتاد."
  },
  {
    question: "كيف تتم خدمة التوصيل والشحن إلى الولايات؟",
    answer: "نشحن لجميع ولايات الجزائر الـ 58 عبر شركات توصيل معتمدة وسريعة مثل (Yalidine) أو (Kazi Tour). يتم تغليف الأجهزة بحرفية متناهية المقاومة للصدمات. الدفع عند الاستلام بعد أن تقوم بفحص طردك والتحقق من جهازك بالكامل."
  },
  {
    question: "هل يمكنني زيادة الرام أو سعة التخزين قبل الشحن؟",
    answer: "بالتأكيد! إذا لقى جهاز ما إعجابك وترغب في ترقية الذاكرة العشوائية (RAM) أو قرص التخزين (SSD)، يكفي إبلاغ فريق الدعم الفني لدينا عبر واتس-آب عند الطلب وسيقوم الفريق بتركيب القطع المناسبة مع فحص التوافق وتقديم السعر المحدث."
  },
  {
    question: "كيف أقوم بطلب شراء منتج معين؟",
    answer: "سهل جداً! يمكنك البحث عن منتجك والضغط على زر 'اطلب عبر واتساب' أو الضغط على زر الشراء لملء معلومات التوصيل الخاصة بك (الاسم، رقم الهاتف، والولاية). سيتصل بك فريق المبيعات لتأكيد الطلب وشحن المنتج فوراً."
  }
];
